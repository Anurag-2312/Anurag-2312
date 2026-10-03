import { expect, test } from "@playwright/test";
import { hydrated } from "./support.js";

const RESUME_PATH = "/Anurag-Kumar-Resume.pdf";

const phoneMenu = (page) => page.getByRole("banner").locator("details");

test("on the Pixel profile, choosing a menu link closes the menu, and Escape closes the open menu", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "Pixel", "Runs on the Pixel profile only.");

  await page.goto("/");
  // MobileMenuCloser listens only after hydration.
  await hydrated(page);

  const menu = phoneMenu(page);
  const toggle = menu.locator("summary");

  await toggle.click();
  await expect(menu).toHaveAttribute("open", "");
  await menu.getByRole("link", { name: "About" }).click();
  await expect(menu).not.toHaveAttribute("open");

  await toggle.click();
  await expect(menu).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open");
});

test.describe("with JavaScript disabled", () => {
  test.use({ javaScriptEnabled: false });

  test("the phone menu opens and its links navigate", async ({ page, isMobile }) => {
    test.skip(!isMobile, "The phone menu shows only at phone widths.");

    // Start away from the home page, so following a link is a real navigation.
    await page.goto("/missing");
    const menu = phoneMenu(page);

    await menu.locator("summary").click();
    await expect(menu).toHaveAttribute("open", "");
    await menu.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/#projects$/);
  });
});

test("every resume control opens the PDF in a new tab instead of downloading it", async ({ page }) => {
  await page.goto("/");
  const resumeLinks = page.getByRole("link", { name: /resume/i });

  await expect(resumeLinks).toHaveCount(2);
  for (const link of await resumeLinks.all()) {
    await expect(link).toHaveAttribute("href", RESUME_PATH);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).not.toHaveAttribute("download");
  }
});

test("a HEAD request for the resume PDF returns 200, application/pdf and x-robots-tag noindex, nofollow", async ({
  request,
}) => {
  const response = await request.head(RESUME_PATH);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toMatch(/^application\/pdf/);
  expect(response.headers()["x-robots-tag"]).toBe("noindex, nofollow");
});

test("/projects answers 307 with a redirect to /#projects", async ({ request }) => {
  const response = await request.get("/projects", { maxRedirects: 0 });

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe("/#projects");
});

test("/missing returns 404 with the dark page, the header and a noindex robots meta", async ({
  page,
}) => {
  // Next's built-in 404 turns the page white in light mode unless our body rule wins.
  await page.emulateMedia({ colorScheme: "light" });
  const response = await page.goto("/missing");

  expect(response.status()).toBe(404);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(18, 18, 18)");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("the skip link moves focus to main", async ({ page, browserName }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to content" });

  // WebKit leaves links out of the Tab order, so focus it directly there.
  if (browserName === "webkit") await skipLink.focus();
  else await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});
