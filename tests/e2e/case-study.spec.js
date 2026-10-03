import { expect, test } from "@playwright/test";
import {
  expectNoAxeViolations,
  expectNoSidewaysScroll,
  hydrated,
  landingGap,
} from "./support.js";

const { identity, nav, sectionIds } = await import("../../lib/profile.js");
const { projects } = await import("../../lib/projects.js");

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

const main = (page) => page.getByRole("main");
const liveLink = (page) => main(page).getByRole("link", { name: /live demo/i });
const nextProject = (page) => page.getByRole("region", { name: "Next project" });

for (const { slug, title } of projects) {
  test(`/projects/${slug} returns 200, with the h1 "${title}" and the page title "${title} | Anurag Kumar"`, async ({
    page,
  }) => {
    const response = await page.goto(`/projects/${slug}`);

    expect(response.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page).toHaveTitle(`${title} | Anurag Kumar`);
  });
}

test("/projects/nope returns the 404 page", async ({ page }) => {
  const response = await page.goto("/projects/nope");

  expect(response.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
});

test('no project page\'s visible text or page title contains the words "case study"', async ({
  page,
}) => {
  const CASE_STUDY = /case[\s-]*stud(?:y|ies)/i;
  for (const { slug, title } of projects) {
    await page.goto(`/projects/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    expect(await page.locator("body").innerText(), slug).not.toMatch(CASE_STUDY);
    expect(await page.title(), slug).not.toMatch(CASE_STUDY);
  }
});

test("NIDS shows no Live button, and its GitHub link is https://github.com/Anurag-2312/NIDS-mini-project", async ({
  page,
}) => {
  await page.goto("/projects/nids");

  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText("NIDS");
  await expect(main(page).getByRole("link", { name: /live/i })).toHaveCount(0);
  const github = main(page).getByRole("link", { name: /github/i });
  await expect(github).toHaveAttribute("href", "https://github.com/Anurag-2312/NIDS-mini-project");
  await expect(github).toHaveAttribute("target", "_blank");
  await expect(github).toHaveAttribute("rel", "noopener noreferrer");
});

test("Zev's live note mentions Google sign-in; OpenStay's mentions the wake-up delay and the free account a listing needs, and its fallback sentence is present", async ({
  page,
}) => {
  await page.goto("/projects/zev");
  await expect(liveLink(page)).toHaveAttribute("href", bySlug.zev.live.url);
  await expect(liveLink(page)).toHaveAttribute("target", "_blank");
  await expect(liveLink(page)).toHaveAttribute("rel", "noopener noreferrer");
  await expect(liveLink(page)).toHaveAccessibleDescription(/google sign-in/i);
  await expect(main(page).getByText(bySlug.zev.live.note)).toBeVisible();

  await page.goto("/projects/openstay");
  await expect(liveLink(page)).toHaveAttribute("href", bySlug.openstay.live.url);
  for (const words of [/minute to wake/i, /free account/i, /listing/i]) {
    await expect(liveLink(page)).toHaveAccessibleDescription(words);
  }
  await expect(main(page).getByText(bySlug.openstay.live.note)).toBeVisible();
  await expect(main(page).getByText(bySlug.openstay.liveFallback)).toBeVisible();
});

test("/projects/openstay shows each part of a project page, the Live link and the next project", async ({
  page,
}) => {
  await page.goto("/projects/openstay");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("OpenStay");
  for (const heading of [
    "About the project",
    "Key features",
    "How it works",
    "Key numbers",
    "Screenshots",
    "Next project",
  ]) {
    await expect(main(page).getByRole("heading", { level: 2, name: heading })).toBeVisible();
  }
  await expect(liveLink(page)).toBeVisible();
  await expect(nextProject(page).getByRole("link")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

for (const width of [1280, 390]) {
  test(`at ${width} px, "All projects" and each header link on a project page land their sections within 4 px of the header's bottom edge`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    const header = page.getByRole("banner");
    const menu = header.locator("details");
    const links = [{ label: "All projects", id: sectionIds.projects }, ...nav];

    for (const { label, id } of links) {
      await page.goto(`/projects/${projects[0].slug}`);
      // The phone menu closes on a link choice once React hydrates.
      await hydrated(page);

      if (label === "All projects") {
        await main(page).getByRole("link", { name: label }).first().click();
      } else {
        if (await menu.isVisible()) await menu.locator("summary").click();
        await header.getByRole("link", { name: label, exact: true }).click();
      }
      await expect(page).toHaveURL(new RegExp(`/#${id}$`));
      await expect.poll(() => landingGap(page, id), { message: label }).toBeLessThanOrEqual(4);
    }
  });
}

test("tapping or clicking a project row opens its project page, and going Back restores the home page's scroll position within 2 px", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  // Client-side navigation starts once React hydrates.
  await hydrated(page);
  const row = page.locator(`#${sectionIds.projects} ol > li`).first();
  await page.evaluate((id) => {
    document.getElementById(id).scrollIntoView({ behavior: "instant" });
  }, sectionIds.projects);
  const scrollY = () => page.evaluate(() => window.scrollY);
  const before = await scrollY();
  expect(before).toBeGreaterThan(0);

  if (isMobile) await row.tap();
  else await row.click();
  await expect(page).toHaveURL(new RegExp(`/projects/${projects[0].slug}$`));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(projects[0].title);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(async () => Math.abs((await scrollY()) - before)).toBeLessThanOrEqual(2);
});

test("after View Projects, opening a project and going Back shows the home page again", async ({
  page,
}) => {
  await page.goto("/");
  // The router records the in-page jump once React hydrates.
  await hydrated(page);
  await page.locator(`#${sectionIds.hero}`).getByRole("link", { name: "View Projects" }).click();
  await expect(page).toHaveURL(new RegExp(`/#${sectionIds.projects}$`));

  await page.locator(`#${sectionIds.projects} ol > li`).first().getByRole("link").click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(projects[0].title);

  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`/#${sectionIds.projects}$`));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(identity.name);
});

test("the next-project links run Zev, then OpenStay, then BiteSnake, then NIDS, which ends with All projects and the contact call to action", async ({
  page,
}) => {
  const titles = projects.map((p) => p.title);
  expect(titles).toEqual(["Zev", "OpenStay", "BiteSnake", "NIDS"]);

  await page.goto(`/projects/${projects[0].slug}`);
  for (const title of titles.slice(1)) {
    await nextProject(page).getByRole("link").click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  }

  await expect(nextProject(page)).toHaveCount(0);
  await expect(main(page).getByRole("link", { name: "All projects" })).toHaveCount(2);
  await expect(main(page).locator('a[href^="mailto:"]')).toBeVisible();
});

for (const { slug, title } of projects) {
  for (const width of [320, 1280]) {
    test(`/projects/${slug}: axe finds no violations at ${width} px${width === 320 ? ", and the page does not scroll sideways" : ""}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/projects/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);

      await expectNoAxeViolations(page);
      if (width === 320) await expectNoSidewaysScroll(page);
    });
  }
}
