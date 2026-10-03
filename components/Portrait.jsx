import Image from "next/image";

// alt is empty because the h1 beside it already names the person.
export default function Portrait({ src, sizes, className = "" }) {
  return (
    <div className={`relative aspect-[4/5] ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        placeholder="blur"
        loading="eager"
        className="object-cover object-top mask-x-from-80% mask-b-from-65%"
      />
    </div>
  );
}
