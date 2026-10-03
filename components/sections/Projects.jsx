import SectionHeading, { Section } from "@/components/SectionHeading";
import ProjectRow from "@/components/sections/ProjectRow";
import { sectionIds } from "@/lib/profile";
import { projects } from "@/lib/projects";

// Stacks above the next section so the last row's preview isn't painted over.
export default function Projects() {
  return (
    <Section id={sectionIds.projects} className="relative z-10">
      <SectionHeading section="projects" />
      <ol className="mt-8 grid grid-cols-1 gap-3">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} number={i + 1} />
        ))}
      </ol>
    </Section>
  );
}
