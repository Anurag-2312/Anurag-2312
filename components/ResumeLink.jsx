import { resume } from "@/lib/profile";
import { button, outlineButton } from "./buttons";
import Icon from "./Icon";

// Opens in a new tab, where the browser's PDF viewer offers download and print.
const variants = {
  bar: `${button} h-10 bg-accent-fill px-3 text-white hover:bg-accent-fill-hover sm:px-4`,
  outline: `${outlineButton} px-5`,
};

export default function ResumeLink({ label = resume.label, variant = "bar" }) {
  return (
    <a
      href={resume.href}
      target="_blank"
      rel="noopener"
      className={`shrink-0 ${variants[variant]}`}
    >
      <Icon name="arrow-up-right" className="size-4 shrink-0" />
      {label}
    </a>
  );
}
