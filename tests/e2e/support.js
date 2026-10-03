import { registerHooks } from "node:module";
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

// Stub image imports so specs can load lib/profile.js and lib/projects.js in Node.
registerHooks({
  load(url, context, nextLoad) {
    if (/\.(?:jpe?g|png|svg|webp|avif)$/.test(url)) {
      return { format: "module", source: "export default {};", shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});

// Next adds its route announcer in the same effects pass as the page's client components.
export const hydrated = (page) => page.locator("next-route-announcer").waitFor({ state: "attached" });

// Gap between a section's top and the header; at the page end a section below the header counts as landed.
export const landingGap = (page, id) =>
  page.evaluate((id) => {
    const headerBottom = document.querySelector("header").getBoundingClientRect().bottom;
    const top = document.getElementById(id).getBoundingClientRect().top;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const atEnd = scrollTop + clientHeight >= scrollHeight - 1;
    return atEnd && top > headerBottom ? 0 : Math.abs(top - headerBottom);
  }, id);

export async function expectNoAxeViolations(page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const found = violations.map(
    (v) => `${v.id}: ${v.nodes.map((node) => node.target.join(" ")).join(", ")}`,
  );
  expect(found).toEqual([]);
}

export async function expectNoSidewaysScroll(page, message) {
  // clientWidth leaves out a classic scrollbar, so it is the stricter bound.
  const { scrollWidth, innerWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth, message).toBeLessThanOrEqual(Math.min(innerWidth, clientWidth));
}
