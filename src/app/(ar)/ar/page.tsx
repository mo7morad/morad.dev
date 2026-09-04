import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";
import { HOME_AR } from "@/data/content.ar";

export const metadata: Metadata = {
  title: { absolute: HOME_AR.meta.title },
  description: HOME_AR.meta.description,
  alternates: {
    canonical: "/ar/",
    languages: { en: "/", ar: "/ar/", "x-default": "/" },
  },
};

export default function ArabicHomePage() {
  return <HomeView copy={HOME_AR} homeHref="/ar/" altHref="/" currentPath="/ar/" />;
}
