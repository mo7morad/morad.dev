import { CaseStudyView } from "@/components/CaseStudyView";
import { HOME_EN } from "@/data/content.en";
import { ABOUT_EN } from "@/data/about.en";
import { ABOUT_AR } from "@/data/about.ar";
import { articleMetadata } from "@/lib/casePage";
import { assertParity } from "@/lib/parity";

/* Runs at build time. A section or a measurement present in one language and
   missing from the other fails the build rather than shipping. */
assertParity(ABOUT_EN, ABOUT_AR);

export const metadata = articleMetadata(
  ABOUT_EN,
  "/about/",
  "/ar/about/",
  "en",
);

export default function AboutPage() {
  return (
    <CaseStudyView
      copy={ABOUT_EN}
      nav={HOME_EN.nav}
      footer={HOME_EN.footer}
      locale="en"
      homeHref="/"
      altHref="/ar/about/"
      currentPath="/about/"
    />
  );
}
