import { expect, test } from "@playwright/test";
import { hydrated, landingGap } from "./support.js";

const { nav, sectionIds } = await import("../../lib/profile.js");
const { projects } = await import("../../lib/projects.js");

const ACCENT_TEXT = "rgb(52, 211, 153)"; // --accent-text, #34D399
const FOCUS_RING = "rgb(110, 231, 183)"; // --focus-ring, #6EE7B7

const POPUP_ONLY = "The preview pops up only for a mouse or trackpad.";

const rows = (page) => page.locator(`#${sectionIds.projects} ol > li`);

test("four rows appear in the order Zev, OpenStay, BiteSnake, NIDS, each one link to /projects/<slug>", async ({
  page,
}) => {
  await page.goto("/");

  const expected = [
    ["Zev", "zev"],
    ["OpenStay", "openstay"],
    ["BiteSnake", "bitesnake"],
    ["NIDS", "nids"],
  ];
  await expect(rows(page)).toHaveCount(expected.length);
  for (const [i, [title, slug]] of expected.entries()) {
    const link = rows(page).nth(i).getByRole("link");
    await expect(link).toHaveCount(1);
    await expect(link).toHaveText(title);
    await expect(link).toHaveAttribute("href", `/projects/${slug}`);
  }
});

for (const width of [1280, 390]) {
  test(`at ${width} px each header link from / lands its section with its top at the header's bottom edge`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    // The phone menu closes on a link choice once React hydrates.
    await hydrated(page);
    const header = page.getByRole("banner");
    const menu = header.locator("details");

    for (const { label, id } of nav) {
      if (await menu.isVisible()) await menu.locator("summary").click();
      await header.getByRole("link", { name: label, exact: true }).click();
      await expect.poll(() => landingGap(page, id), { message: label }).toBeLessThanOrEqual(4);
    }
  });
}

test("on the Pixel profile, choosing Projects in the menu lands the projects section", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "Pixel", "Runs on the Pixel profile only.");

  await page.goto("/");
  // The phone menu closes on a link choice once React hydrates.
  await hydrated(page);
  const menu = page.getByRole("banner").locator("details");

  await menu.locator("summary").tap();
  await menu.getByRole("link", { name: "Projects", exact: true }).tap();
  await expect.poll(() => landingGap(page, sectionIds.projects)).toBeLessThanOrEqual(4);
});

test("at 1440 px, hovering the OpenStay row shows its preview and turns its title to accent-text; moving away hides it", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, POPUP_ONLY);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const row = rows(page).nth(1);
  const preview = row.locator("img");
  await row.scrollIntoViewIfNeeded();
  await expect(preview).toHaveCSS("opacity", "0");

  await row.hover();
  await expect(preview).toHaveCSS("opacity", "1");
  await expect(row.getByRole("link")).toHaveCSS("color", ACCENT_TEXT);

  await page.mouse.move(0, 0);
  await expect(preview).toHaveCSS("opacity", "0");
});

test("tabbing onto a row shows its preview and a 2 px ring around the whole row; tabbing on hides it", async ({
  page,
  browserName,
  isMobile,
}) => {
  await page.goto("/");
  const [first, second] = [rows(page).nth(0), rows(page).nth(1)];
  // Park the mouse on the sticky header, so no row is hovered.
  await page.mouse.move(0, 0);

  // WebKit leaves links out of the Tab order, so focus them directly there.
  const tabOnto = async (row) => {
    const link = row.getByRole("link");
    if (browserName === "webkit") return link.focus();
    for (let i = 0; i < 40 && !(await link.evaluate((a) => a === document.activeElement)); i++) {
      await page.keyboard.press("Tab");
    }
  };

  await tabOnto(first);
  await expect(first.getByRole("link")).toBeFocused();
  await expect(first).toHaveCSS("outline-style", "solid");
  await expect(first).toHaveCSS("outline-width", "2px");
  await expect(first).toHaveCSS("outline-color", FOCUS_RING);
  if (!isMobile) await expect(first.locator("img")).toHaveCSS("opacity", "1");

  await tabOnto(second);
  await expect(second.getByRole("link")).toBeFocused();
  await expect(first).toHaveCSS("outline-style", "none");
  if (!isMobile) {
    await expect(first.locator("img")).toHaveCSS("opacity", "0");
    await expect(second.locator("img")).toHaveCSS("opacity", "1");
  }
});

test("on the Pixel and iPhone profiles no row shows a screenshot, even under a resting pointer", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Runs on the touch profiles, Pixel and iPhone.");

  await page.goto("/");
  await expect(rows(page)).toHaveCount(projects.length);
  for (const row of await rows(page).all()) {
    await row.hover();
    await expect(row.locator("img")).toBeHidden();
  }
});

test("with reduced motion, the preview transition changes only opacity", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, POPUP_ONLY);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const row = rows(page).nth(1);
  const preview = row.locator("img");
  await row.scrollIntoViewIfNeeded();
  const motion = () =>
    preview.evaluate((img) => {
      const { transform, translate, rotate, scale } = getComputedStyle(img);
      return { transform, translate, rotate, scale };
    });

  const atRest = await motion();
  await row.hover();
  await expect(preview).toHaveCSS("opacity", "1");
  expect(await motion()).toEqual(atRest);
});

test("preview images are requested before the first hover", async ({ page, isMobile }) => {
  test.skip(isMobile, POPUP_ONLY);

  const requested = new Set();
  page.on("request", (request) => requested.add(request.url()));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  // Scroll the list into view without hovering: previews load before any hover.
  await page.locator(`#${sectionIds.projects} ol`).scrollIntoViewIfNeeded();
  await expect(rows(page).locator("img")).toHaveCount(projects.length);
  for (const preview of await rows(page).locator("img").all()) {
    await expect
      .poll(async () => requested.has(await preview.evaluate((img) => img.currentSrc)))
      .toBe(true);
    await expect(preview).toHaveCSS("opacity", "0");
  }
});

async function expectDescriptions(page) {
  await page.goto("/");
  await expect(rows(page)).toHaveCount(projects.length);
  for (const [i, { description }] of projects.entries()) {
    await expect(rows(page).nth(i).getByText(description, { exact: true })).toBeVisible();
  }
}

test("each row shows its project's short description from lib/projects.js", async ({ page }) => {
  await expectDescriptions(page);
});

test.describe("with JavaScript disabled", () => {
  test.use({ javaScriptEnabled: false });

  test("each row shows its project's short description from lib/projects.js", async ({ page }) => {
    await expectDescriptions(page);
  });
});

test("at 1440 px no preview's box overlaps any row's title or description box", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, POPUP_ONLY);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(rows(page)).toHaveCount(projects.length);

  for (const row of await rows(page).all()) {
    const preview = row.locator("img");
    await row.hover();
    await expect(preview).toHaveCSS("opacity", "1");

    const covered = await preview.evaluate((img) => {
      const box = img.getBoundingClientRect();
      const overlaps = (other) =>
        box.left < other.right &&
        other.left < box.right &&
        box.top < other.bottom &&
        other.top < box.bottom;
      return [...img.closest("ol").children].flatMap((li, i) =>
        [
          ["title", li.querySelector("h3")],
          ["description", li.querySelector("p")],
        ]
          .filter(([, el]) => overlaps(el.getBoundingClientRect()))
          .map(([part]) => `row ${i + 1} ${part}`),
      );
    });
    expect(covered).toEqual([]);
  }
});

for (const { width, height, limit } of [
  { width: 1440, height: 900, limit: 3.5 },
  { width: 390, height: 844, limit: 5 },
]) {
  test(`at ${width}x${height} the fourth row's top is within ${limit} viewport heights`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const top = await rows(page)
      .nth(3)
      .evaluate((li) => li.getBoundingClientRect().top + window.scrollY);
    expect(top).toBeLessThanOrEqual(limit * height);
  });
}
