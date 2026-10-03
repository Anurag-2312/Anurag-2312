import Image from "next/image";
import Link from "next/link";
import Chips from "@/components/Chips";
import Icon from "@/components/Icon";

// The preview only shows as the desktop popup, at most 400px wide.
const PREVIEW_SIZES = "400px";

// Accent colour while the row is hovered or its link has keyboard focus.
export const lit = "group-hover:text-accent-text group-has-focus-visible:text-accent-text";

// The title's link stretches over the whole row, so the row is one link.
export default function ProjectRow({ project, number }) {
  return (
    <li className="project-row group relative border border-card p-4 hover:border-tint-line has-focus-visible:border-tint-line has-focus-visible:focus-ring sm:p-5 popup:pr-(--row-reserve) popup:pl-7">
      <div className="flex items-center gap-2.5 sm:gap-4">
        <Image src={project.preview} alt="" sizes={PREVIEW_SIZES} className="project-preview" />
        <h3
          className={`min-w-0 flex-1 text-base leading-snug font-semibold tracking-[0.06em] text-text-strong uppercase sm:text-lg popup:text-[1.375rem] ${lit}`}
        >
          <span aria-hidden="true">{number}: </span>
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        {/* Above the stretched link once positioned, so it lets clicks through. */}
        <span
          className={`pointer-events-none grid size-9 shrink-0 place-items-center rounded-full bg-card text-text-muted sm:size-10 popup:absolute popup:top-1/2 popup:right-7 popup:size-11 popup:-translate-y-1/2 ${lit}`}
        >
          <Icon name="arrow-right" className="size-4" />
        </span>
      </div>

      <p className="mt-2.5 text-sm leading-relaxed tracking-[0.02em] text-text-body">
        {project.description}
      </p>

      <Chips chips={project.chips} className="mt-3.5" />
    </li>
  );
}
