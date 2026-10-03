import { solidButton } from "@/components/buttons";
import Icon from "@/components/Icon";
import { cta, links } from "@/lib/profile";

export default function CtaBanner() {
  return (
    <section className="px-4 py-[clamp(1rem,3vw,2rem)] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[68rem] flex-col items-start gap-8 bg-card px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-14">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight font-bold tracking-[0.04em] text-balance text-text-strong uppercase">
            {cta.heading}
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-[1.75] tracking-[0.02em] text-text-body">
            {cta.text}
          </p>
        </div>
        <a href={links.email.href} className={`${solidButton} shrink-0 px-6`}>
          {cta.action}
          <Icon name="mail" className="size-4" />
        </a>
      </div>
    </section>
  );
}
