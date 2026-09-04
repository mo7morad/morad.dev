import type { Metadata } from "next";
import { CvView } from "@/components/CvView";
import { CV } from "@/data/cv";
import { HOME_EN } from "@/data/content.en";

/* The CV exists only in English and has no Arabic counterpart. Declaring a
   languages alternate block would invent an alternate that does not exist,
   which is a lie to crawlers. */
export const metadata: Metadata = {
  title: { absolute: CV.meta.title },
  description: CV.meta.description,
  alternates: {
    canonical: "/cv/",
  },
};

export default function CvPage() {
  return <CvView copy={CV} nav={HOME_EN.nav} footer={HOME_EN.footer} currentPath="/cv/" />;
}
