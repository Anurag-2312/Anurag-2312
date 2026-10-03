// Decorative line icons on a 24x24 grid; nearby text carries the meaning.

const shapes = {
  mail: (
    <>
      <path d="M3 5h18v14H3z" />
      <path d="m3 5 9 8 9-8" />
    </>
  ),
  grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
  "arrow-up-right": <path d="M7 17 17 7M9 7h8v8" />,
  "arrow-right": <path d="M4 12h16M14 6l6 6-6 6" />,
  "arrow-up": <path d="M12 20V5M6 11l6-6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "monitor-code": (
    <>
      <path d="M3 4h18v12H3zM8 20h8M12 16v4" />
      <path d="m10 7.5-2.5 2.5 2.5 2.5M14 7.5l2.5 2.5-2.5 2.5" />
    </>
  ),
  terminal: (
    <>
      <path d="M3 4h18v16H3z" />
      <path d="m7 9.5 2.5 2.5L7 14.5M12 15h5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="2.5" />
      <path d="M4 5.5v13c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-13" />
      <path d="M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  layout: <path d="M3 4h18v16H3zM3 9h18M9 9v11" />,
  server: (
    <>
      <path d="M3 4h18v7H3zM3 13h18v7H3z" />
      <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
    </>
  ),
  cloud: <path d="M7 19h10.5a4.5 4.5 0 0 0 .6-8.96A6.5 6.5 0 0 0 5.6 10.2 4.5 4.5 0 0 0 7 19Z" />,
};

export default function Icon({ name, className = "size-5", strokeWidth = 2 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {shapes[name]}
    </svg>
  );
}
