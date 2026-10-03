import Icon from "@/components/Icon";
import SectionHeading, { Section } from "@/components/SectionHeading";
import { about, sectionIds, skills } from "@/lib/profile";

const icons = { frontend: "monitor-code", backend: "terminal", cloud: "database" };
const skillsById = Object.fromEntries(skills.map((group) => [group.id, group.items]));

// The bio comes first in the markup so the h2 leads; the grid puts the cards on the left.
export default function About() {
  return (
    <Section id={sectionIds.about}>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-12 lg:pt-[calc(var(--wm-size)*0.85)]">
        <div className="lg:col-start-2 lg:row-start-1">
          <SectionHeading section="about" align="start" className="lg:pt-10" />
          <div className="mt-6 space-y-4 text-[0.9375rem] leading-[1.75] tracking-[0.02em] text-text-body">
            {about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ol className="card-numbers grid gap-3 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2 sm:gap-4 lg:col-start-1 lg:row-start-1">
          {about.cards.map((card, i) => (
            <li
              key={card.id}
              className={`relative flex flex-col border border-card p-4 sm:p-6 ${i === 2 ? "sm:row-span-2 sm:justify-center" : ""}`}
            >
              <div className="flex items-center gap-3 pr-12 sm:block sm:pr-0">
                <Icon
                  name={icons[card.id]}
                  strokeWidth={1.5}
                  className="size-8 shrink-0 text-accent-large sm:size-10"
                />
                <h3 className="text-[1.0625rem] font-semibold tracking-[0.02em] text-accent-text sm:mt-5">
                  {card.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed tracking-[0.02em] text-text-strong">
                {skillsById[card.id].join(", ")}
              </p>
              <p className="mt-2 text-sm leading-relaxed tracking-[0.02em] text-text-body">
                {card.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
