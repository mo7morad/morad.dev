import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_EN } from "@/data/content.en";
import { ROADMAP_EN } from "@/data/case.roadmap.en";
import { ROADMAP_AR } from "@/data/case.roadmap.ar";
import { caseMetadata, casePath } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(ROADMAP_EN, ROADMAP_AR);

export const metadata = caseMetadata(ROADMAP_EN, "en");

export default function RoadmapCaseStudy() {
  return (
    <CaseStudyView
      copy={ROADMAP_EN}
      nav={HOME_EN.nav}
      footer={HOME_EN.footer}
      locale="en"
      homeHref="/"
      altHref={casePath("roadmap", "ar")}
      currentPath="/roadmap/"
    />
  );
}
