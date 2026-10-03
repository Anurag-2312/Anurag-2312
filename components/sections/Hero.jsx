import { solidButton } from "@/components/buttons";
import Icon from "@/components/Icon";
import Portrait from "@/components/Portrait";
import ResumeLink from "@/components/ResumeLink";
import { hero, identity, sectionIds } from "@/lib/profile";

// On phones the portrait follows the buttons, so they stay in the first screen.
export default function Hero() {
  return (
    <section id={sectionIds.hero} className="overflow-x-clip px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[68rem] gap-8 pt-[clamp(1.5rem,4vw,2.5rem)] pb-[clamp(2rem,5vw,3.5rem)] sm:gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold tracking-[0.2em] uppercase">
            <h1 className="text-text-strong">{identity.name}</h1>
            <span aria-hidden="true" className="text-text-muted max-sm:hidden">
              /
            </span>
            <p className="text-accent-text max-sm:basis-full">{identity.role}</p>
          </div>

          <p className="mt-6 text-[0.9375rem] tracking-[0.02em] text-text-strong">
            {hero.eyebrow}
          </p>

          <p className="mt-3 text-[clamp(1.875rem,7vw,2.75rem)] leading-[1.25] font-bold tracking-[0.01em] text-balance text-text-strong lg:text-[clamp(2.5rem,4.2vw,3.125rem)]">
            {hero.headline.map((line, i) => (
              <span key={i} className="block">
                {line.map((segment, j) => (
                  <span key={j} className={segment.accent ? "text-accent-large" : undefined}>
                    {segment.text}
                  </span>
                ))}
              </span>
            ))}
          </p>

          <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.75] tracking-[0.02em] text-text-body sm:text-base">
            {hero.intro}
          </p>
          <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed tracking-[0.02em] text-text-strong">
            <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 bg-accent-large" />
            {hero.proof}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`#${sectionIds.projects}`} className={`${solidButton} px-5`}>
              {hero.actions.projects}
              <Icon name="grid" className="size-4" />
            </a>
            <ResumeLink variant="outline" label={hero.actions.resume} />
          </div>

          <ul className="bar-list mt-6 flex flex-wrap text-[0.8125rem] leading-relaxed font-medium tracking-[0.08em] text-text-strong uppercase">
            {hero.tech.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <Portrait
          src={hero.portrait}
          sizes="(min-width: 64rem) 24rem, (min-width: 40rem) 18rem, 15rem"
          className="mx-auto w-full max-w-[15rem] sm:max-w-[18rem] lg:mx-0 lg:max-w-none"
        />
      </div>
    </section>
  );
}
