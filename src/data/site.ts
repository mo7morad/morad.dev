import type { SiteMetadata } from "./types";

/* Shared by both layouts. Lives in one place so a URL can never be right in one
   language and stale in the other. */
export const SITE_METADATA: SiteMetadata = {
  url: "https://morad.dev",
  name: "Mohamed Morad",
  role: "Backend engineer",
  email: "momurad.business@gmail.com",
  github: "https://github.com/mo7morad",
  linkedin: "https://www.linkedin.com/in/momorad/",
  keywords: [
    "backend engineer",
    "Cloudflare Workers",
    "TypeScript",
    "Supabase",
    "Postgres",
    "SwiftUI",
    "iOS",
    "C#",
    "SQL Server",
    "Apple Developer Academy",
  ],
} as const;
