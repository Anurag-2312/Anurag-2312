import { identity } from "@/lib/profile";
import ContactLinks from "./ContactLinks";
import Icon from "./Icon";

// Every page is static, so this is the year of the build.
const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="border-t border-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <p className="text-sm text-text-muted md:justify-self-start">
          © {year} {identity.name}
        </p>

        <ContactLinks />

        {/* Pages without a #top element scroll to the very top. */}
        <a
          href="#top"
          className="inline-flex min-h-10 items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-wider text-text-body hover:text-accent-text focus-visible:focus-ring md:justify-self-end"
        >
          Back to top
          <Icon name="arrow-up" className="size-4" />
        </a>
      </div>
    </footer>
  );
}
