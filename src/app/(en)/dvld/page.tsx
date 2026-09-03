import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_EN } from "@/data/content.en";
import { DVLD_EN } from "@/data/case.dvld.en";
import { DVLD_AR } from "@/data/case.dvld.ar";
import { caseMetadata, casePath } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(DVLD_EN, DVLD_AR);

export const metadata = caseMetadata(DVLD_EN, "en");

export default function DvldCaseStudy() {
  return (
    <CaseStudyView
      copy={DVLD_EN}
      nav={HOME_EN.nav}
      footer={HOME_EN.footer}
      locale="en"
      homeHref="/"
      altHref={casePath("dvld", "ar")}
    />
  );
}
