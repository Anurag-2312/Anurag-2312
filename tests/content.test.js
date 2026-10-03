import { describe, expect, it } from "vitest";
import * as profile from "@/lib/profile";
import { projects } from "@/lib/projects";
import { PHONE } from "./phone.js";

// Content rules for lib/profile.js and lib/projects.js.

// Every string inside `value`, with its path.
function strings(value, path = []) {
  if (typeof value === "string") return [{ path: path.join("."), value }];
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => strings(item, [...path, i]));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      strings(item, [...path, key]),
    );
  }
  return [];
}

const URL_KEYS = new Set(["url", "href", "github", "src", "preview"]);
const looksLikeUrl = (text) => /^(https?:|mailto:|\/|#)/.test(text);

// Strings that are links or image sources.
function urls(value) {
  return strings(value).filter(({ path, value: text }) => {
    const key = path.split(".").at(-1);
    return URL_KEYS.has(key) || looksLikeUrl(text);
  });
}

const modules = { "lib/profile.js": profile, "lib/projects.js": projects };
const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

describe("projects", () => {
  it("are zev, openstay, bitesnake and nids, in that order, lowercase and unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toEqual(["zev", "openstay", "bitesnake", "nids"]);
    for (const slug of slugs) expect(slug).toBe(slug.toLowerCase());
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(projects.map((p) => [p.slug, p]))(
    "%s has a home-page description of two or three sentences, 150 to 420 characters",
    (slug, project) => {
      const text = project.description.trim();
      expect(text, slug).toMatch(/[.!?]$/);
      const sentences = text.split(/(?<=[.!?])\s+/);
      expect(sentences.length, sentences.join(" | ")).toBeGreaterThanOrEqual(2);
      expect(sentences.length, sentences.join(" | ")).toBeLessThanOrEqual(3);
      expect(text.length).toBeGreaterThanOrEqual(150);
      expect(text.length).toBeLessThanOrEqual(420);
    },
  );

  const repos = {
    zev: "https://github.com/Anurag-2312/Zev",
    openstay: "https://github.com/Anurag-2312/OpenStay",
    bitesnake: "https://github.com/Anurag-2312/BiteSnake",
    nids: "https://github.com/Anurag-2312/NIDS-mini-project",
  };

  it.each(projects.map((p) => [p.slug, p]))(
    "%s has a title, tagline, row chips, GitHub URL, overview, features, labeled key numbers and a preview",
    (slug, project) => {
      expect(project.title.trim()).not.toBe("");
      expect(project.tagline.trim()).not.toBe("");
      expect(project.chips.length).toBeGreaterThanOrEqual(1);
      expect(project.chips.length).toBeLessThanOrEqual(4);
      expect(project.github).toBe(repos[slug]);
      expect(project.overview.trim()).not.toBe("");
      expect(project.features.length).toBeGreaterThanOrEqual(3);
      expect(project.keyNumbers.length).toBeGreaterThanOrEqual(1);
      for (const number of project.keyNumbers) {
        expect(number.value.trim()).not.toBe("");
        expect(number.label.trim()).not.toBe("");
        expect(["result", "design"]).toContain(number.kind);
      }
      expect(project.preview).toBeTruthy();
    },
  );

  it("each have screenshots, except NIDS, which has its pipeline diagram instead", () => {
    for (const project of projects.filter((p) => p.slug !== "nids")) {
      expect(project.screenshots.length, project.slug).toBeGreaterThanOrEqual(1);
      for (const shot of project.screenshots) {
        expect(shot.src, project.slug).toBeTruthy();
        expect(shot.alt.trim(), project.slug).not.toBe("");
        expect(shot.caption.trim(), project.slug).not.toBe("");
      }
    }
    expect(bySlug.nids.screenshots).toEqual([]);
    expect(bySlug.nids.diagram.src).toBeTruthy();
    expect(bySlug.nids.diagram.caption.trim()).not.toBe("");
  });

  it("have a live link except NIDS, and the Zev and OpenStay notes warn about their hurdles", () => {
    for (const project of projects) {
      if (project.slug === "nids") expect(project.live).toBeNull();
      else expect(project.live.url, project.slug).toMatch(/^https:\/\//);
    }
    expect(bySlug.zev.live.note).toMatch(/google sign-in/i);
    const openstay = bySlug.openstay.live.note;
    expect(openstay).toMatch(/wake/i);
    expect(openstay).toMatch(/minute/i);
    expect(openstay).toMatch(/listing/i);
    expect(openstay).toMatch(/free account/i);
  });
});

describe("links and strings in both modules", () => {
  it.each(Object.entries(modules))(
    "%s has no URL that is empty or #, or contains TODO, example or localhost",
    (name, content) => {
      const found = urls(content);
      expect(found.length).toBeGreaterThan(0);
      for (const { path, value } of found) {
        expect(value.trim(), path).not.toBe("");
        expect(value.trim(), path).not.toBe("#");
        expect(value, path).not.toMatch(/todo|example|localhost/i);
      }
    },
  );

  it("mention onrender.com only in the OpenStay entry", () => {
    const mentions = (content) =>
      strings(content).some(({ value }) => value.includes("onrender.com"));
    expect(mentions(profile)).toBe(false);
    for (const project of projects) {
      expect(mentions(project), project.slug).toBe(project.slug === "openstay");
    }
  });

  it("contain no string that looks like a phone number", () => {
    // The pattern must catch the usual formats, or a pass below proves nothing.
    for (const sample of [
      "+00 12345 67890",
      "000-000-0000",
      "0000000000",
      "(000) 000-0000",
      "000.000.0000",
      "+00 (00) 0000-0000",
    ]) {
      expect(sample).toMatch(PHONE);
    }
    expect("15,000 tokens a day, 2023 - 2027").not.toMatch(PHONE);

    for (const [name, content] of Object.entries(modules)) {
      for (const { path, value } of strings(content)) {
        expect(value, `${name} ${path}`).not.toMatch(PHONE);
      }
    }
  });

  it("NIDS copy has no first-person or team wording", () => {
    const banned =
      /\b(?:i|my|me|we|our|teams?|teammates?|groups?|members?|six-person)\b/i;
    for (const { path, value } of strings(bySlug.nids)) {
      expect(value, path).not.toMatch(banned);
    }
  });
});

describe("profile", () => {
  it("has six achievements, each with a label, a value and an https URL", () => {
    expect(profile.achievements).toHaveLength(6);
    for (const achievement of profile.achievements) {
      expect(achievement.label.trim()).not.toBe("");
      expect(achievement.value.trim()).not.toBe("");
      expect(achievement.url).toMatch(/^https:\/\/\S+$/);
    }
  });

  it("points every nav item at a section id it exports", () => {
    const ids = Object.values(profile.sectionIds);
    expect(profile.nav.length).toBeGreaterThan(0);
    for (const item of profile.nav) expect(ids, item.label).toContain(item.id);
  });
});
