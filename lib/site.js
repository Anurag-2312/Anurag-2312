import { identity } from "@/lib/profile";

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL without the protocol.
export const siteUrl = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
);

// A page's own openGraph replaces the parent's, so pages spread these in.
export const sharedOpenGraph = {
  siteName: identity.name,
  type: "website",
  locale: "en_US",
};
