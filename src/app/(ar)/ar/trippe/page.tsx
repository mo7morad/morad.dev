import type { Metadata } from "next";
import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_AR } from "@/data/content.ar";
import { TRIPPE_AR } from "@/data/case.trippe.ar";
import { TRIPPE_EN } from "@/data/case.trippe.en";
import { assertParity } from "@/lib/parity";

assertParity(TRIPPE_EN, TRIPPE_AR);

export const metadata: Metadata = {
  title: { absolute: TRIPPE_AR.meta.title },
  description: TRIPPE_AR.meta.description,
  alternates: {
    canonical: "/ar/trippe/",
    languages: { en: "/trippe/", ar: "/ar/trippe/", "x-default": "/trippe/" },
  },
};

export default function TrippeCaseStudyArabic() {
  return (
    <CaseStudyView
      copy={TRIPPE_AR}
      nav={HOME_AR.nav}
      footer={HOME_AR.footer}
      locale="ar"
      homeHref="/ar/"
      altHref="/trippe/"
    />
  );
}
