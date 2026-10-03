import Link from "next/link";
import { identity, nav } from "@/lib/profile";
import Icon from "./Icon";
import MobileMenuCloser from "./MobileMenuCloser";
import ResumeLink from "./ResumeLink";

const MENU_ID = "site-menu";

// Section links point at /#<id>, so they work from any page.
const sectionLinks = nav.map((item) => ({ ...item, href: `/#${item.id}` }));

// Its height is --header-height, which scroll-padding-top also reads.
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-(--header-height) border-b border-card bg-background">
      <div className="mx-auto flex h-full max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 focus-visible:focus-ring">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center border-2 border-accent-large text-sm font-bold tracking-tight text-accent-text"
          >
            {identity.monogram}
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-text-strong max-sm:sr-only">
            {identity.name}
          </span>
        </Link>

        <nav aria-label="Sections" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-6">
            {sectionLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center px-1 text-[0.8125rem] font-medium uppercase tracking-wider text-text-strong hover:text-accent-text focus-visible:focus-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <ResumeLink />

          <details id={MENU_ID} className="group lg:hidden">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center border border-tint-line text-text-strong hover:bg-tint focus-visible:focus-ring [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Menu</span>
              <Icon name="menu" className="size-5 group-open:hidden" />
              <Icon name="close" className="hidden size-5 group-open:block" />
            </summary>

            <nav
              aria-label="Sections"
              className="absolute inset-x-0 top-full border-y border-t-card border-b-tint-line bg-background shadow-xl shadow-black/60"
            >
              <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
                {sectionLinks.map((item) => (
                  <li key={item.id} className="border-b border-card last:border-b-0">
                    <Link
                      href={item.href}
                      className="flex min-h-12 items-center text-sm font-medium uppercase tracking-[0.14em] text-text-strong hover:text-accent-text focus-visible:focus-ring"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
          <MobileMenuCloser menuId={MENU_ID} />
        </div>
      </div>
    </header>
  );
}
