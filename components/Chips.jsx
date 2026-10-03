export default function Chips({ chips, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {chips.map((chip) => (
        <li
          key={chip}
          className="border border-tint-line px-2 py-1 text-[0.6875rem] leading-none font-medium tracking-[0.12em] text-text-body uppercase"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}
