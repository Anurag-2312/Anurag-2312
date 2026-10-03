import { expect, test } from "@playwright/test";

test("/ responds 200 as an English document with a dark color scheme", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response.status()).toBe(200);

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
    "content",
    "dark",
  );
});

test("Saira reaches the page text through the next/font variable class", async ({
  page,
}) => {
  await page.goto("/");

  // next/font puts a class on <html> that defines --font-saira.
  const html = page.locator("html");
  await expect(html).toHaveClass(/variable/);
  const sairaStack = await html.evaluate((el) =>
    getComputedStyle(el).getPropertyValue("--font-saira"),
  );
  expect(sairaStack).toContain("Saira");

  // Tailwind's --font-sans mapping carries it down to the body text.
  const bodyFont = await page
    .locator("body")
    .evaluate((el) => getComputedStyle(el).fontFamily);
  expect(bodyFont).toContain("Saira");
});
