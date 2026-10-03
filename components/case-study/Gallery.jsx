import Image from "next/image";

// Each frame's rendered width: the page column (max 68rem), halved from 48rem.
const SIZES = "(min-width: 72rem) 33.5rem, (min-width: 48rem) calc(50vw - 2.5rem), calc(100vw - 2rem)";

export default function Gallery({ screenshots }) {
  return (
    <ul className="grid gap-x-4 gap-y-8 md:grid-cols-2">
      {screenshots.map((shot) => (
        <li key={shot.src.src}>
          <figure>
            <a
              href={shot.src.src}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-card hover:border-tint-line focus-visible:focus-ring"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                sizes={SIZES}
                placeholder="blur"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </a>
            <figcaption className="mt-3 text-sm leading-relaxed tracking-[0.02em] text-text-muted">
              {shot.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
