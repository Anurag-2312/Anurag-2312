import Chips from "@/components/Chips";
import SectionHeading, { Section } from "@/components/SectionHeading";
import { education, experience, sectionIds } from "@/lib/profile";

// `start` is a year-month string, so a string comparison orders by date.
const newestFirst = (entries) => entries.toSorted((a, b) => b.start.localeCompare(a.start));

// Dots and markers sit on the timeline line, 2rem from each block's edge.
const dot = "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-large";
const marker = "absolute top-[0.3rem] size-2.5 bg-text-strong";
const pointRight = "[clip-path:polygon(0_0,100%_50%,0_100%)]";
// Written out in full: Tailwind only sees class names that appear literally.
const pointLeftFromMd = "md:[clip-path:polygon(100%_0,0_50%,100%_100%)]";

const groupLabel = "relative text-lg font-bold tracking-[0.06em] text-accent-text uppercase";
const entryTitle = "text-[0.9375rem] font-semibold tracking-[0.06em] text-text-strong uppercase";

export default function Experience() {
  return (
    <Section id={sectionIds.experience}>
      <SectionHeading section="experience" />

      <div className="relative mt-12">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-1.5 w-px -translate-x-1/2 bg-tint-line md:left-1/2"
        />

        <div className="pl-8 md:pl-[calc(50%+2rem)]">
          <h3 className={groupLabel}>
            <span aria-hidden="true" className={`${dot} -left-[1.625rem] md:-left-8`} />
            Work experience
          </h3>
          <ol>
            {newestFirst(experience).map((job) => (
              <li key={`${job.organization}-${job.start}`} className="relative mt-6">
                <span
                  aria-hidden="true"
                  className={`${marker} ${pointRight} -left-[1.125rem] md:-left-6`}
                />
                <h4 className={entryTitle}>{job.role}</h4>
                <p className="mt-1.5 text-sm text-text-body">{job.organization}</p>
                <p className="mt-0.5 text-[0.8125rem] text-text-muted">{job.period}</p>
                <ul className="mt-3 max-w-md list-[square] space-y-2 pl-4 text-sm leading-relaxed tracking-[0.02em] text-text-body marker:text-accent-large">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 pl-8 md:pr-[calc(50%+2rem)] md:pl-0 md:text-right">
          <h3 className={groupLabel}>
            <span
              aria-hidden="true"
              className={`${dot} -left-[1.625rem] md:right-[-2rem] md:left-auto md:translate-x-1/2`}
            />
            Education
          </h3>
          <ol>
            {newestFirst(education).map((school) => (
              <li key={`${school.organization}-${school.start}`} className="relative mt-6">
                <span
                  aria-hidden="true"
                  className={`${marker} ${pointRight} ${pointLeftFromMd} -left-[1.125rem] md:right-[-1.5rem] md:left-auto`}
                />
                <h4 className={entryTitle}>{school.credential}</h4>
                <p className="mt-1.5 text-sm text-text-body">{school.organization}</p>
                <p className="mt-0.5 text-[0.8125rem] text-text-muted">
                  {school.period} · {school.location}
                </p>
                <p className="mt-2 text-sm font-semibold tracking-[0.04em] text-accent-text">
                  {school.grade}
                </p>
                <p className="mt-3 text-xs font-semibold tracking-[0.14em] text-text-muted uppercase">
                  Coursework
                </p>
                <Chips chips={school.coursework} className="mt-2 md:justify-end" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
