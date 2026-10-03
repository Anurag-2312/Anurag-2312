import { sections } from "@/lib/profile";

// Shrinks long watermark words to fit the column (Saira Bold caps are about 0.68em wide).
export const watermarkSize = (word) =>
  `min(18vw, 14rem, calc(min(100vw - 4rem, 68rem) / ${(word.length * 0.68).toFixed(2)}))`;

// Clips sideways overflow so a wide watermark never scrolls the page.
export function Section({ id, className = "", children }) {
  return (
    <section
      id={id}
      className={`overflow-x-clip px-4 pt-[clamp(2rem,5vw,3.5rem)] pb-[clamp(2.5rem,6vw,4.5rem)] sm:px-6 lg:px-8 ${className}`}
    >
      <div className="relative isolate mx-auto max-w-[68rem]">{children}</div>
    </section>
  );
}

// The ::before watermark positions against <Section>'s wrapper; don't wrap this in a positioned box.
export default function SectionHeading({ section, align = "center", className = "" }) {
  const { watermark, eyebrow, heading } = sections[section];
  const centred = align === "center";

  return (
    <div
      data-wm={watermark}
      data-align={align}
      style={{ "--wm-size": watermarkSize(watermark) }}
      className={`section-heading pt-[calc(var(--wm-size)*0.5)] ${centred ? "text-center" : ""} ${className}`}
    >
      <p
        className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-accent-text"
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.1] font-bold tracking-[0.02em] text-balance text-text-strong uppercase">
        {heading}
      </h2>
    </div>
  );
}
