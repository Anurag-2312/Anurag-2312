import BrandIcon from "@/components/BrandIcon";
import { outlineButton, solidButton } from "@/components/buttons";
import Chips from "@/components/Chips";
import Icon from "@/components/Icon";
import { watermarkSize } from "@/components/SectionHeading";

const NOTE_ID = "live-note";

// The live note is tied to the Live link with aria-describedby.
export default function CaseStudyHeader({ project, number, total }) {
  const { title, tagline, chips, live, liveFallback, github } = project;

  return (
    <div
      data-wm={title}
      data-align="start"
      style={{ "--wm-size": watermarkSize(title) }}
      className="section-heading relative isolate pt-[calc(var(--wm-size)*0.5)]"
    >
      <p className="text-[0.8125rem] font-semibold tracking-[0.2em] text-accent-text uppercase">
        Project {number} of {total}
      </p>
      <h1 className="mt-3 text-[clamp(2.5rem,7vw,4.5rem)] leading-none font-bold tracking-[0.02em] text-text-strong uppercase">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed tracking-[0.02em] text-balance text-text-strong sm:text-xl">
        {tagline}
      </p>

      <Chips chips={chips} className="mt-5" />

      <div className="mt-8 flex flex-wrap gap-3">
        {live && (
          <a
            href={live.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby={live.note ? NOTE_ID : undefined}
            className={`${solidButton} px-5`}
          >
            Live demo
            <Icon name="arrow-up-right" className="size-4" />
          </a>
        )}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${outlineButton} px-5`}
        >
          <BrandIcon name="github" className="size-4" />
          GitHub
        </a>
      </div>

      {live?.note && (
        <div
          id={NOTE_ID}
          className="mt-5 max-w-2xl space-y-1 border-l-2 border-accent-large pl-4 text-sm leading-relaxed tracking-[0.02em] text-text-body"
        >
          <p className="text-text-strong">{live.note}</p>
          {liveFallback && <p>{liveFallback}</p>}
        </div>
      )}
    </div>
  );
}
