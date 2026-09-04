import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_AR } from "@/data/content.ar";
import { DVLD_EN } from "@/data/case.dvld.en";
import { DVLD_AR } from "@/data/case.dvld.ar";
import { caseMetadata, casePath } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(DVLD_EN, DVLD_AR);

export const metadata = caseMetadata(DVLD_AR, "ar");

export default function DvldCaseStudyArabic() {
  return (
    <CaseStudyView
      copy={DVLD_AR}
      nav={HOME_AR.nav}
      footer={HOME_AR.footer}
      locale="ar"
      homeHref="/ar/"
      altHref={casePath("dvld", "en")}
      currentPath="/ar/dvld/"
    />
  );
}
