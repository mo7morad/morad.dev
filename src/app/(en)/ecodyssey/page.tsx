import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_EN } from "@/data/content.en";
import { ECODYSSEY_EN } from "@/data/case.ecodyssey.en";
import { ECODYSSEY_AR } from "@/data/case.ecodyssey.ar";
import { caseMetadata, casePath } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(ECODYSSEY_EN, ECODYSSEY_AR);

export const metadata = caseMetadata(ECODYSSEY_EN, "en");

export default function EcodysseyCaseStudy() {
  return (
    <CaseStudyView
      copy={ECODYSSEY_EN}
      nav={HOME_EN.nav}
      footer={HOME_EN.footer}
      locale="en"
      homeHref="/"
      altHref={casePath("ecodyssey", "ar")}
    />
  );
}
