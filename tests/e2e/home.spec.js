import { expect, test } from "@playwright/test";
import { PHONE } from "../phone.js";
import { expectNoAxeViolations, expectNoSidewaysScroll } from "./support.js";

const { achievements, cta, identity, links, sectionIds, sections } = await import(
  "../../lib/profile.js"
);

const hero = (page) => page.locator(`#${sectionIds.hero}`);

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`at ${viewport.width}x${viewport.height} the h1 is the name, and the role, View Projects and the resume control are in the first viewport`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveText(identity.name);

    const viewProjects = hero(page).getByRole("link", { name: "View Projects" });
    await expect(viewProjects).toHaveAttribute("href", `#${sectionIds.projects}`);

    for (const item of [
      h1,
      hero(page).getByText(identity.role, { exact: true }),
      viewProjects,
      hero(page).getByRole("link", { name: /resume/i }),
    ]) {
      await expect(item).toBeInViewport({ ratio: 1 });
    }
  });
}

test("the sections appear in order: hero, about, tech stack, projects, experience, achievements, call to action, contact", async ({
  page,
}) => {
  await page.goto("/");

  // The call to action has no anchor id, so it is identified by its heading.
  const order = await page
    .locator("main > section")
    .evaluateAll((els) => els.map((el) => el.id || el.querySelector("h2")?.textContent.trim()));

  expect(order).toEqual([
    sectionIds.hero,
    sectionIds.about,
    sectionIds.techStack,
    sectionIds.projects,
    sectionIds.experience,
    sectionIds.achievements,
    cta.heading,
    sectionIds.contact,
  ]);
});

test("the page never scrolls sideways from 320 to 1280 px, or at 200% zoom", async ({ page }) => {
  // 200% zoom of 1280x900 is a 640x450 CSS viewport.
  const viewports = [320, 360, 390, 412, 768, 1280]
    .map((width) => ({ width, height: 800, label: `${width} px` }))
    .concat({ width: 640, height: 450, label: "200% zoom" });

  await page.goto("/");
  for (const { label, ...size } of viewports) {
    await page.setViewportSize(size);
    await expectNoSidewaysScroll(page, label);
  }
});

test("watermark words are absent from the accessibility tree, and each section after the hero exposes exactly one h2", async ({
  page,
}) => {
  await page.goto("/");

  const headings = page.locator("[data-wm]");
  await expect(headings).toHaveCount(Object.keys(sections).length);
  for (const heading of await headings.all()) {
    // An exposed watermark would show up as a loose text node.
    const word = await heading.getAttribute("data-wm");
    const snapshot = await heading.ariaSnapshot();
    const looseText = snapshot.split("\n").filter((line) => /^\s*- text:/.test(line));
    expect(looseText, `watermark "${word}" in:\n${snapshot}`).toEqual([]);
  }

  const sectionsAfterHero = page.locator(`main > section:not(#${sectionIds.hero})`);
  await expect(sectionsAfterHero).toHaveCount(7);
  for (const section of await sectionsAfterHero.all()) {
    await expect(section.getByRole("heading", { level: 2 })).toHaveCount(1);
  }
});

test("with forced colors active, no section renders watermark text", async ({ page }) => {
  const watermarkContent = () =>
    page
      .locator("[data-wm]")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el, "::before").content));
  const rendersNothing = (content) => content === "none" || content === "normal";

  await page.goto("/");
  const normal = await watermarkContent();
  expect(normal).toHaveLength(Object.keys(sections).length);
  expect(normal.filter(rendersNothing), "watermarks render without forced colors").toEqual([]);

  await page.emulateMedia({ forcedColors: "active" });
  const forced = await watermarkContent();
  expect(forced.every(rendersNothing), forced.join(" | ")).toBe(true);
});

for (const width of [320, 1280]) {
  test(`axe finds no violations at ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expectNoAxeViolations(page);
  });
}

test("the page text contains no phone-number pattern", async ({ page }) => {
  await page.goto("/");

  expect(await page.locator("body").innerText()).not.toMatch(PHONE);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});

test.describe("with JavaScript disabled", () => {
  test.use({ javaScriptEnabled: false });

  test("the h1, every section heading, the resume link and the mailto link are present", async ({
    page,
  }) => {
    await page.goto("/");
    const main = page.locator("main");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(identity.name);
    for (const heading of [...Object.values(sections).map((s) => s.heading), cta.heading]) {
      await expect(main.getByRole("heading", { level: 2, name: heading, exact: true })).toBeVisible();
    }
    await expect(main.getByRole("link", { name: /resume/i }).first()).toBeVisible();
    await expect(main.locator(`a[href="${links.email.href}"]`).first()).toBeVisible();
  });
});

test("the achievements section shows six tiles whose links match lib/profile.js", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator(`#${sectionIds.achievements}`);

  await expect(section.getByRole("listitem")).toHaveCount(6);
  const hrefs = await section
    .getByRole("listitem")
    .evaluateAll((items) => items.map((item) => item.querySelector("a")?.getAttribute("href")));
  expect(hrefs).toEqual(achievements.map((a) => a.url));
});
