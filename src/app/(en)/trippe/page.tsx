import type { Metadata } from "next";
import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_EN } from "@/data/content.en";
import { TRIPPE_EN } from "@/data/case.trippe.en";
import { TRIPPE_AR } from "@/data/case.trippe.ar";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(TRIPPE_EN, TRIPPE_AR);

export const metadata: Metadata = {
  title: { absolute: TRIPPE_EN.meta.title },
  description: TRIPPE_EN.meta.description,
  alternates: {
    canonical: "/trippe/",
    languages: { en: "/trippe/", ar: "/ar/trippe/", "x-default": "/trippe/" },
  },
};

export default function TrippeCaseStudy() {
  return (
    <CaseStudyView
      copy={TRIPPE_EN}
      nav={HOME_EN.nav}
      footer={HOME_EN.footer}
      locale="en"
      homeHref="/"
      altHref="/ar/trippe/"
    />
  );
}
