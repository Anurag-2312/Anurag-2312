import Link from "next/link";
import Icon from "@/components/Icon";
import { lit } from "@/components/sections/ProjectRow";

// Drawn like a home-page row; the title's link covers the whole card.
export default function NextProject({ project, number }) {
  return (
    <div className="group relative flex items-center gap-4 border border-card p-5 hover:border-tint-line has-focus-visible:border-tint-line has-focus-visible:focus-ring sm:p-6">
      <div className="min-w-0 flex-1">
        <p
          className={`text-lg leading-snug font-semibold tracking-[0.06em] text-text-strong uppercase sm:text-[1.375rem] ${lit}`}
        >
          <span aria-hidden="true">{number}: </span>
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </p>
        <p className="mt-2 text-sm leading-relaxed tracking-[0.02em] text-text-body">
          {project.tagline}
        </p>
      </div>
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-full bg-card text-text-muted sm:size-11 ${lit}`}
      >
        <Icon name="arrow-right" className="size-4" />
      </span>
    </div>
  );
}
