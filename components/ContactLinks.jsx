import BrandIcon from "@/components/BrandIcon";
import Icon from "@/components/Icon";
import { links } from "@/lib/profile";

const contacts = [
  { ...links.email, icon: <Icon name="mail" /> },
  { ...links.linkedin, icon: <BrandIcon name="linkedin" /> },
  { ...links.github, icon: <BrandIcon name="github" /> },
];

export default function ContactLinks({ className = "" }) {
  return (
    <ul className={`flex gap-3 ${className}`}>
      {contacts.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            className="flex size-10 items-center justify-center border border-tint-line text-text-body hover:bg-tint hover:text-text-strong focus-visible:focus-ring"
          >
            {icon}
            <span className="sr-only">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
