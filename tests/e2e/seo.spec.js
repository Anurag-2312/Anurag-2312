import { expect, test } from "@playwright/test";
import { PHONE } from "../phone.js";
import "./support.js"; // lets lib/projects.js load in Node

// Link previews run no scripts, so these checks run with JavaScript off.

const { projects } = await import("../../lib/projects.js");

test.use({ javaScriptEnabled: false });

const HOME_TITLE = "Anurag Kumar - Full Stack Developer";

const pages = [
  { path: "/", title: HOME_TITLE },
  ...projects.map(({ slug, title }) => ({
    path: `/projects/${slug}`,
    title: `${title} | Anurag Kumar`,
  })),
];

// Every <meta> in <head> with a property or name, as { key: content }.
const headMeta = (page) =>
  page.locator("head meta").evaluateAll((tags) =>
    Object.fromEntries(
      tags
        .map((tag) => [tag.getAttribute("property") ?? tag.getAttribute("name"), tag.content])
        .filter(([key]) => key),
    ),
  );

for (const { path, title } of pages) {
  test(`${path} emits an absolute og:image and twitter:image, a summary_large_image card and og:site_name`, async ({
    page,
  }) => {
    await page.goto(path);
    const tags = await headMeta(page);

    expect(tags["og:image"]).toMatch(/^https?:\/\//);
    expect(tags["twitter:image"]).toMatch(/^https?:\/\//);
    expect(tags["twitter:card"]).toBe("summary_large_image");
    expect(tags["og:site_name"]).toBe("Anurag Kumar");
  });

  test(`${path} has the title "${title}"`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
  });

  test(`${path}: no title, description or share-image alt text contains a phone-number pattern`, async ({
    page,
  }) => {
    await page.goto(path);
    const tags = await headMeta(page);

    const scanned = Object.entries(tags).filter(([key]) =>
      /(?:^|:)(?:title|description|alt)$/.test(key),
    );
    // The scan proves nothing if the tags it is about are missing.
    expect(scanned.map(([key]) => key)).toEqual(
      expect.arrayContaining(["description", "og:title", "og:description", "og:image:alt"]),
    );
    for (const [key, value] of [["<title>", await page.title()], ...scanned]) {
      expect(value, key).not.toMatch(PHONE);
    }
  });
}

for (const { slug, title, tagline } of projects) {
  test(`/projects/${slug} has its own og:title, og:description and og:url, none repeating the home page's`, async ({
    page,
  }) => {
    await page.goto("/");
    const home = await headMeta(page);
    await page.goto(`/projects/${slug}`);
    const own = await headMeta(page);

    expect(own["og:title"]).toContain(title);
    expect(own["og:description"]).toBe(tagline);
    // new URL() throws on a relative URL, so this also checks it is absolute.
    expect(new URL(own["og:url"]).pathname).toBe(`/projects/${slug}`);
    for (const key of ["og:title", "og:description", "og:url"]) {
      expect(own[key], key).not.toBe(home[key]);
    }
  });
}

test("the share image returns 200 as image/png, at 300 KB or less", async ({ page, request }) => {
  await page.goto("/");
  const { "og:image": imageUrl } = await headMeta(page);

  // The tag's origin is not this test server's, so fetch only its path.
  const { pathname, search } = new URL(imageUrl);
  const response = await request.get(pathname + search);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
  expect((await response.body()).length).toBeLessThanOrEqual(300_000);
});

// A malformed icon.svg passes the build but a browser refuses it.
test.describe("with JavaScript enabled", () => {
  test.use({ javaScriptEnabled: true });

  test("the icon linked from <head> loads as an image", async ({ page }) => {
    await page.goto("/");
    const href = await page.locator('head link[rel="icon"]').getAttribute("href");
    const loaded = await page.evaluate(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = src;
        }),
      href,
    );
    expect(loaded).toBe(true);
  });
});
