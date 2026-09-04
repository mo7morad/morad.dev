import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_AR } from "@/data/content.ar";
import { ECODYSSEY_EN } from "@/data/case.ecodyssey.en";
import { ECODYSSEY_AR } from "@/data/case.ecodyssey.ar";
import { caseMetadata, casePath } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(ECODYSSEY_EN, ECODYSSEY_AR);

export const metadata = caseMetadata(ECODYSSEY_AR, "ar");

export default function EcodysseyCaseStudyArabic() {
  return (
    <CaseStudyView
      copy={ECODYSSEY_AR}
      nav={HOME_AR.nav}
      footer={HOME_AR.footer}
      locale="ar"
      homeHref="/ar/"
      altHref={casePath("ecodyssey", "en")}
    />
  );
}
