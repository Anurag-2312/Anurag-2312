import portrait from "@/assets/portrait.jpg";

// Facts come from the master resume; the phone number stays in the PDF only.

export const sectionIds = Object.freeze({
  hero: "top",
  about: "about",
  techStack: "tech-stack",
  projects: "projects",
  experience: "experience",
  achievements: "achievements",
  contact: "contact",
});

export const nav = [
  { label: "About", id: sectionIds.about },
  { label: "Projects", id: sectionIds.projects },
  { label: "Experience", id: sectionIds.experience },
  { label: "Achievements", id: sectionIds.achievements },
  { label: "Contact", id: sectionIds.contact },
];

export const identity = {
  name: "Anurag Kumar",
  role: "Full Stack Developer",
  monogram: "AK",
};

export const links = {
  email: {
    label: "Email",
    href: "mailto:anurag.official2312@gmail.com",
    text: "anurag.official2312@gmail.com",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anurag-2312-/",
    text: "linkedin.com/in/anurag-2312-",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/Anurag-2312",
    text: "github.com/Anurag-2312",
  },
};

export const resume = {
  href: "/Anurag-Kumar-Resume.pdf",
  label: "Resume",
};

export const hero = {
  eyebrow: "Building on both sides of the API.",
  // Two lines; segments marked `accent` render in the accent colour.
  headline: [
    [{ text: "Full-Stack Apps " }, { text: "Built", accent: true }],
    [{ text: "and " }, { text: "Shipped", accent: true }, { text: " End to End." }],
  ],
  intro:
    "Hi, I'm Anurag Kumar, a Full Stack Developer. I build React and Next.js front ends, Python and Node.js back ends, and the databases behind them.",
  proof: "B.Tech CSE at KIIT, and Software Developer Intern at AntBox",
  actions: { projects: "View Projects", resume: "View Resume" },
  tech: ["React", "Next.js", "Node.js", "FastAPI", "PostgreSQL", "MongoDB"],
  // Overwriting assets/portrait.jpg swaps the photo with no code change.
  portrait,
};

export const sections = {
  about: { watermark: "About", eyebrow: "About me", heading: "Who am I?" },
  techStack: { watermark: "Tech Stack", eyebrow: "Skills", heading: "Tech stack & tools" },
  projects: { watermark: "Projects", eyebrow: "Selected work", heading: "Featured projects" },
  experience: { watermark: "Experience", eyebrow: "Timeline", heading: "Experience & education" },
  achievements: {
    watermark: "Achievements",
    eyebrow: "Competitive programming",
    heading: "Achievements & certification",
  },
  contact: { watermark: "Contact", eyebrow: "Get in touch", heading: "Connect with me" },
};

export const about = {
  // Each card lists the `skills` group with the same id.
  cards: [
    {
      id: "frontend",
      title: "Frontend",
      detail: "Responsive, customer-facing pages for AntBox's marketing website.",
    },
    {
      id: "backend",
      title: "Backend and APIs",
      detail:
        "Product features such as a geocoded delivery-radius gate, one-click unsubscribe and in-app account deletion.",
    },
    {
      id: "cloud",
      title: "Cloud, databases and tools",
      detail:
        "Google Cloud services such as Cloud Run, BigQuery and Cloud Storage, backed by the Google Cloud Fundamentals: Core Infrastructure certificate.",
    },
  ],
  bio: [
    "I'm a Computer Science student at KIIT and a Software Developer Intern at AntBox. I build web apps across the stack: React and Next.js on the front end, Python and Node.js services behind them, and SQL or MongoDB for the data.",
    "At AntBox I build backend features in FastAPI and PostgreSQL, add error tracking and tracing with Sentry and OpenTelemetry, and ship marketing pages in Next.js and TypeScript. I deploy services with Docker and CI/CD pipelines that run automated security scans, and I hold the Google Cloud Fundamentals: Core Infrastructure certificate.",
  ],
};

export const skills = [
  {
    id: "languages",
    title: "Languages",
    items: ["C", "C++", "Java", "Python", "SQL", "JavaScript", "TypeScript"],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Material UI"],
  },
  {
    id: "backend",
    title: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Prisma"],
  },
  {
    id: "cloud",
    title: "Cloud, databases & tools",
    items: [
      "Google Cloud Run",
      "BigQuery",
      "Cloud Storage",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Neon",
      "Docker",
      "GitHub Actions",
      "Git",
      "GitHub",
      "Vercel",
      "Firebase",
      "Supabase",
      "Groq SDK",
      "VS Code",
    ],
  },
];

// `start` (year-month) orders the timeline newest first.
export const experience = [
  {
    organization: "AntBox",
    role: "Software Developer Intern",
    period: "February 2026 – Present",
    start: "2026-02",
    points: [
      "Built backend features in Python, FastAPI and PostgreSQL: a geocoded delivery-radius service-area gate, one-click email unsubscribe, an order-link escalation flow and in-app account deletion.",
      "Set up end-to-end observability with Sentry error tracking, OpenTelemetry distributed tracing and PostHog analytics.",
      "Built and shipped responsive, customer-facing pages for the company's marketing website in Next.js, TypeScript and Tailwind CSS.",
    ],
  },
];

export const education = [
  {
    organization: "Kalinga Institute of Industrial Technology (KIIT)",
    credential: "B.Tech, Computer Science",
    grade: "CGPA 8.73 / 10",
    period: "July 2023 – July 2027",
    start: "2023-07",
    location: "Bhubaneswar, Odisha",
    coursework: [
      "Data Structures and Algorithms",
      "Object Oriented Programming",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "Machine Learning",
      "Cloud Computing",
    ],
  },
];

export const achievements = [
  {
    id: "leetcode-solved",
    platform: "LeetCode",
    value: "425+",
    label: "Problems solved",
    url: "https://leetcode.com/u/Anurag_2312/",
  },
  {
    id: "leetcode-rating",
    platform: "LeetCode",
    value: "1552",
    label: "Contest rating",
    url: "https://leetcode.com/u/Anurag_2312/",
  },
  {
    id: "gfg-solved",
    platform: "GeeksforGeeks",
    value: "150+",
    label: "Problems solved",
    url: "https://www.geeksforgeeks.org/user/sanu2312/",
  },
  {
    id: "codeforces",
    platform: "Codeforces",
    value: "1249",
    label: "Max rating, Pupil rank",
    url: "https://codeforces.com/profile/Anurag_2312",
  },
  {
    id: "codechef",
    platform: "CodeChef",
    value: "1429",
    label: "Rating",
    url: "https://www.codechef.com/users/anurag_23_12",
  },
  {
    id: "gcp-certificate",
    platform: "Coursera",
    value: "Google Cloud",
    label: "Fundamentals: Core Infrastructure certificate",
    url: "https://coursera.org/share/7c8746932b27d18a798d0bb67d4dd2b0",
  },
];

export const cta = {
  heading: "Let's build something together",
  text: "Hiring for a full-stack role, or want to talk through one of these projects? My inbox is open.",
  action: "Email me",
};

export const contact = {
  text: "Reach me by email, or find me on LinkedIn and GitHub.",
};
