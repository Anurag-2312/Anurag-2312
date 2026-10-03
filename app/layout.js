import { Saira } from "next/font/google";
import HashHistory from "@/components/HashHistory";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { hero, identity } from "@/lib/profile";
import { sharedOpenGraph, siteUrl } from "@/lib/site";
import "./globals.css";

// Fail the build if any route turns dynamic.
export const dynamic = "error";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

const title = `${identity.name} - ${identity.role}`;
const description = `${hero.proof}.`;

// Next derives the twitter tags from openGraph.
export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: title,
    template: `%s | ${identity.name}`,
  },
  description,
  openGraph: { ...sharedOpenGraph, title, description },
};

// themeColor is --background in app/globals.css.
export const viewport = {
  colorScheme: "dark",
  themeColor: "#121212",
};

// Every page renders <main id="main">, the skip link's target.
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${saira.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="fixed left-4 top-3 z-50 bg-accent-fill px-4 py-2 text-sm font-semibold text-white focus-visible:focus-ring not-focus:sr-only"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <HashHistory />
      </body>
    </html>
  );
}
