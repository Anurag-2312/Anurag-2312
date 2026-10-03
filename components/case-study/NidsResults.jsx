import { keyNumberKinds } from "@/lib/projects";

// The bars are decorative: each score is printed beside its bar.
export default function NidsResults({ classF1 }) {
  return (
    <div className="mt-4 border border-card p-5 sm:p-6">
      <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-accent-text uppercase">
        {keyNumberKinds.result}
      </p>
      <h3 className="mt-2 text-base font-semibold tracking-[0.06em] text-text-strong uppercase">
        F1 score by class
      </h3>
      <ul className="mt-5 space-y-3.5">
        {classF1.map(({ label, f1 }) => (
          <li
            key={label}
            className="grid grid-cols-[6rem_minmax(0,1fr)_2.25rem] items-center gap-3 text-sm tracking-[0.02em] sm:grid-cols-[7.5rem_minmax(0,1fr)_2.5rem] sm:gap-4"
          >
            <span className="text-text-body">{label}</span>
            <span aria-hidden="true" className="h-2.5 bg-tint">
              <span className="block h-full bg-accent-large" style={{ width: `${f1 * 100}%` }} />
            </span>
            <span className="text-right font-semibold text-text-strong tabular-nums">
              {f1.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
