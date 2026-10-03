import Image from "next/image";
import Link from "next/link";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import Gallery from "@/components/case-study/Gallery";
import NextProject from "@/components/case-study/NextProject";
import NidsResults from "@/components/case-study/NidsResults";
import Icon from "@/components/Icon";
import CtaBanner from "@/components/sections/CtaBanner";
import { identity, sectionIds } from "@/lib/profile";
import { keyNumberKinds, projects } from "@/lib/projects";
import { sharedOpenGraph } from "@/lib/site";

// Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

// openGraph replaces the parent's whole object, so repeat the shared fields and keep its images.
export async function generateMetadata({ params }, parent) {
  const { slug } = await params;
  const { title, tagline } = projects.find((project) => project.slug === slug);
  return {
    title,
    description: tagline,
    openGraph: {
      ...sharedOpenGraph,
      title: `${title} | ${identity.name}`,
      description: tagline,
      url: `/projects/${slug}`,
      images: (await parent).openGraph?.images,
    },
  };
}

const prose = "text-[0.9375rem] leading-[1.75] tracking-[0.02em] text-text-body sm:text-base";

function AllProjects() {
  return (
    <Link
      href={`/#${sectionIds.projects}`}
      className="inline-flex min-h-10 items-center gap-2 text-[0.8125rem] font-semibold tracking-wider text-text-body uppercase hover:text-accent-text focus-visible:focus-ring"
    >
      <Icon name="arrow-right" className="size-4 rotate-180" />
      All projects
    </Link>
  );
}

function PageSection({ title, children }) {
  const id = title.toLowerCase().replaceAll(" ", "-");
  return (
    <section aria-labelledby={id} className="border-t border-card py-[clamp(2.5rem,5vw,3.5rem)]">
      <h2
        id={id}
        className="text-[clamp(1.25rem,2.4vw,1.625rem)] leading-tight font-bold tracking-[0.04em] text-text-strong uppercase"
      >
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Bullets({ items }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 ${prose}`}>
          <span aria-hidden="true" className="mt-[0.67em] size-1.5 shrink-0 bg-accent-large" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// NIDS shows its diagram and results instead of screenshots and ends with the call to action.
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  const next = projects[index + 1];
  const { diagram } = project;

  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex-1 overflow-x-clip pb-[clamp(2.5rem,6vw,4.5rem)] focus:outline-none"
    >
      <div className="mx-auto box-content max-w-[68rem] px-4 pt-6 sm:px-6 lg:px-8">
        <AllProjects />
        <div className="pt-6 pb-[clamp(2.5rem,5vw,3.5rem)]">
          <CaseStudyHeader project={project} number={index + 1} total={projects.length} />
        </div>

        <PageSection title="About the project">
          <p className={`max-w-3xl ${prose}`}>{project.overview}</p>
          <p className="mt-8 text-xs font-semibold tracking-[0.14em] text-text-muted uppercase">
            Built with
          </p>
          <ul className="bar-list mt-2 flex max-w-3xl flex-wrap text-[0.8125rem] leading-relaxed font-medium tracking-[0.08em] text-text-strong uppercase">
            {project.stack.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </PageSection>

        <PageSection title="Key features">
          <Bullets items={project.features} />
        </PageSection>

        <PageSection title="How it works">
          <div className={diagram ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14" : ""}>
            <ol className="max-w-3xl space-y-5">
              {project.howItWorks.map((step, i) => (
                <li key={step} className={`flex gap-4 ${prose}`}>
                  <span aria-hidden="true" className="w-6 shrink-0 font-bold text-accent-text tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {/* The caption doubles as the diagram's text alternative. */}
            {diagram && (
              <figure className="max-w-80">
                <Image src={diagram.src} alt={diagram.alt} unoptimized className="w-full" />
                <figcaption className="mt-3 text-sm leading-relaxed tracking-[0.02em] text-text-muted">
                  {diagram.caption}
                </figcaption>
              </figure>
            )}
          </div>
        </PageSection>

        <PageSection title="Key numbers">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-3 sm:gap-4">
            {project.keyNumbers.map(({ value, label, kind }) => (
              <li key={label} className="flex flex-col border border-card p-4 sm:p-6">
                <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-accent-text uppercase">
                  {keyNumberKinds[kind]}
                </span>{" "}
                <span className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none font-bold text-text-strong">
                  {value}
                </span>{" "}
                <span className="mt-2.5 text-sm leading-snug tracking-[0.02em] text-text-body">
                  {label}
                </span>
              </li>
            ))}
          </ul>
          {project.classF1 && <NidsResults classF1={project.classF1} />}
        </PageSection>

        {project.screenshots.length > 0 && (
          <PageSection title="Screenshots">
            <Gallery screenshots={project.screenshots} />
          </PageSection>
        )}

        {next ? (
          <PageSection title="Next project">
            <NextProject project={next} number={index + 2} />
          </PageSection>
        ) : (
          <div className="border-t border-card pt-8">
            <AllProjects />
          </div>
        )}
      </div>

      {!next && <CtaBanner />}
    </main>
  );
}
