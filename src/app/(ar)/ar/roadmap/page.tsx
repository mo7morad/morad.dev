import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_AR } from "@/data/content.ar";
import { ROADMAP_EN } from "@/data/case.roadmap.en";
import { ROADMAP_AR } from "@/data/case.roadmap.ar";
import { caseMetadata, casePath } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(ROADMAP_EN, ROADMAP_AR);

export const metadata = caseMetadata(ROADMAP_AR, "ar");

export default function RoadmapCaseStudyArabic() {
  return (
    <CaseStudyView
      copy={ROADMAP_AR}
      nav={HOME_AR.nav}
      footer={HOME_AR.footer}
      locale="ar"
      homeHref="/ar/"
      altHref={casePath("roadmap", "en")}
    />
  );
}
