import Icon from "@/components/Icon";
import SectionHeading, { Section } from "@/components/SectionHeading";
import { sectionIds, skills } from "@/lib/profile";

const icons = { languages: "code", frontend: "layout", backend: "server", cloud: "cloud" };

export default function TechStack() {
  return (
    <Section id={sectionIds.techStack}>
      <SectionHeading section="techStack" />
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {skills.map((group) => (
          <li key={group.id} className="border border-card p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:block">
              <Icon
                name={icons[group.id]}
                strokeWidth={1.5}
                className="size-8 shrink-0 text-accent-large sm:size-10"
              />
              <h3 className="text-[0.8125rem] font-semibold tracking-[0.08em] text-text-strong uppercase sm:mt-4 sm:text-sm">
                {group.title}
              </h3>
            </div>
            <ul className="bar-list mt-2 flex flex-wrap text-xs leading-relaxed tracking-[0.02em] text-text-body sm:text-[0.8125rem]">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
