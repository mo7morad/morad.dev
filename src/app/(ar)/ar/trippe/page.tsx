import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_AR } from "@/data/content.ar";
import { TRIPPE_EN } from "@/data/case.trippe.en";
import { TRIPPE_AR } from "@/data/case.trippe.ar";
import { caseMetadata, casePath } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(TRIPPE_EN, TRIPPE_AR);

export const metadata = caseMetadata(TRIPPE_AR, "ar");

export default function TrippeCaseStudyArabic() {
  return (
    <CaseStudyView
      copy={TRIPPE_AR}
      nav={HOME_AR.nav}
      footer={HOME_AR.footer}
      locale="ar"
      homeHref="/ar/"
      altHref={casePath("trippe", "en")}
      currentPath="/ar/trippe/"
    />
  );
}
