import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";
import { HOME_EN } from "@/data/content.en";

/* `absolute` because the layout's template would otherwise append the name a
   second time to a title that already carries it. */
export const metadata: Metadata = {
  title: { absolute: HOME_EN.meta.title },
  description: HOME_EN.meta.description,
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar/", "x-default": "/" },
  },
};

export default function HomePage() {
  return <HomeView copy={HOME_EN} homeHref="/" altHref="/ar/" currentPath="/" />;
}
