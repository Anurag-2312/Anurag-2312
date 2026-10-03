import BrandIcon from "@/components/BrandIcon";
import Icon from "@/components/Icon";
import SectionHeading, { Section } from "@/components/SectionHeading";
import { contact, links, sectionIds } from "@/lib/profile";

const profiles = [
  { ...links.linkedin, icon: "linkedin" },
  { ...links.github, icon: "github" },
];

// No phone number here: it stays in the resume PDF only.
export default function Contact() {
  return (
    <Section id={sectionIds.contact}>
      <SectionHeading section="contact" />
      <p className="mx-auto mt-5 max-w-xl text-center text-[0.9375rem] leading-[1.75] tracking-[0.02em] text-text-body">
        {contact.text}
      </p>
      <ul className="mt-8 flex flex-col items-center gap-4 text-base tracking-[0.02em] sm:text-lg">
        <li className="flex min-h-10 items-center gap-3 text-text-strong">
          <Icon name="mail" className="size-5 shrink-0 text-accent-large" />
          {/* One tap or click selects the whole address. */}
          <span className="select-all wrap-anywhere">{links.email.text}</span>
        </li>
        {profiles.map(({ label, href, text, icon }) => (
          <li key={label}>
            <a
              href={href}
              className="flex min-h-10 items-center gap-3 text-text-strong underline-offset-4 hover:text-accent-text hover:underline focus-visible:focus-ring"
            >
              <BrandIcon name={icon} className="size-5 shrink-0 text-accent-large" />
              {text}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
