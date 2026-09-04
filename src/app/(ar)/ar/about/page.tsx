import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_AR } from "@/data/content.ar";
import { ABOUT_EN } from "@/data/about.en";
import { ABOUT_AR } from "@/data/about.ar";
import { articleMetadata } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(ABOUT_EN, ABOUT_AR);

export const metadata = articleMetadata(
  ABOUT_AR,
  "/about/",
  "/ar/about/",
  "ar",
);

export default function AboutPageArabic() {
  return (
    <CaseStudyView
      copy={ABOUT_AR}
      nav={HOME_AR.nav}
      footer={HOME_AR.footer}
      locale="ar"
      homeHref="/ar/"
      altHref="/about/"
      currentPath="/ar/about/"
    />
  );
}
