import BrandIcon from "@/components/BrandIcon";
import Icon from "@/components/Icon";
import SectionHeading, { Section } from "@/components/SectionHeading";
import { achievements, sectionIds } from "@/lib/profile";

// The spaces between the spans keep each link's accessible name readable.
export default function Achievements() {
  return (
    <Section id={sectionIds.achievements}>
      <SectionHeading section="achievements" />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {achievements.map((item) => (
          <li key={item.id}>
            <a
              href={item.url}
              className="group relative flex h-full flex-col border border-card p-4 hover:border-tint-line focus-visible:focus-ring sm:p-6"
            >
              <span className="flex flex-col items-start gap-2 text-[0.6875rem] font-semibold tracking-[0.08em] text-accent-text uppercase sm:flex-row sm:items-center sm:pr-6 sm:text-xs sm:tracking-[0.16em]">
                <BrandIcon name={item.platform.toLowerCase()} className="size-4 shrink-0" />
                {item.platform}
              </span>{" "}
              <span className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-bold text-text-strong">
                {item.value}
              </span>{" "}
              <span className="mt-1.5 text-sm leading-snug tracking-[0.02em] text-text-body">
                {item.label}
              </span>
              <Icon
                name="arrow-up-right"
                className="absolute top-4 right-4 size-4 text-text-muted group-hover:text-accent-text sm:top-6 sm:right-6"
              />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
