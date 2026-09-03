import type { HomeCopy } from "./types";

/* Transcreated, not translated. The register is Egyptian spoken Arabic, which
   is how he actually talks — a Modern Standard rendering of "I lost the code"
   reads like a press release and loses the person the English side is at pains
   to keep.
 *
 * Two mechanical rules hold throughout:
 *   - Latin runs (product names, "App Store", figures) are carried as `ltr`
 *     segments or rendered inside <bdi>, never dropped raw into Arabic prose.
 *   - Nothing here restates a URL or an email address. Destinations are named
 *     by key and resolved from `site.ts`, so a link cannot rot in one language
 *     while staying correct in the other. */

export const HOME_AR: HomeCopy = {
  locale: "ar",

  nav: {
    homeLabel: "محمد مراد",
    links: [
      { label: "الشغل", href: "/ar/#work" },
      { label: "عني", href: "/ar/about/" },
    ],
    switchLabel: "English",
    switchAriaLabel: "التبديل إلى الإنجليزية",
    skipToContent: "تخطَّ إلى المحتوى",
  },

  hero: {
    eyebrow: "مهندس باك-إند · أكاديمية آبل للمطوّرين، بالي",
    sentence: [
      { text: "قضيت " },
      { text: "واحد وعشرين شهر في الأساسيات", mark: true },
      { text: " قبل ما أنزّل أي حاجة. وبعدين بنيت " },
      { text: "تطبيق سفر مش هيخترع لك سعر", mark: true },
      { text: " — لأن رقم مش قادر توصل لمصدره أوحش من إنه ما يبقاش موجود أصلًا." },
    ],
    rail: [
      { label: "الرودماب · كوميتس", derived: { repo: "roadmap", field: "commitCount" } },
      { label: "الرودماب · المدة", derived: { repo: "roadmap", field: "dateRange" } },
      { label: "مسائل محلولة", value: "1,329" },
      { label: "تريبيه · آب ستور", value: "شغّال، سبتمبر 2026" },
    ],
  },

  timeline: {
    heading: "الطريق لحد هنا",
    entries: [
      {
        when: "2023",
        what: "القاهرة",
        detail:
          "كورس CS50، وبعده برنامج تحميل مكتوب بـ Python بواجهة Tkinter. أول حاجة عملتها في حياتي. وضيّعت الكود.",
      },
      {
        when: "أغسطس 2023",
        what: "إندونيسيا",
        detail: "سافرت من مصر بمنحة. بدرس Informatics في جامعة UII بالإنجليزي.",
      },
      {
        when: "2024 – 2026",
        what: "الرودماب",
        detail:
          "واحد وعشرين شهر في C++ وهياكل البيانات والخوارزميات وSQL وC# وSOLID والاختبارات. خمسة وعشرين كورس، تمنتاشر مشروع، خلّصتهم قبل الأكاديمية بشهر.",
      },
      {
        when: "مارس 2026",
        what: "أكاديمية آبل للمطوّرين، بالي",
        detail: "أول مصري في دفعة بالي — 220 مكان من أكتر من 5,000 متقدّم.",
      },
      {
        when: "سبتمبر 2026",
        what: "تريبيه على الآب ستور",
        detail: "بدأته بعد شهر من الأكاديمية. كتبته لوحدي.",
      },
      {
        when: "ديسمبر 2026",
        what: "الأكاديمية بتخلص",
        detail: "وشهادة UII في أغسطس 2027. مستعد للريموت أو الانتقال لأي مكان.",
        ahead: true,
      },
    ],
  },

  work: {
    heading: "الشغل",
    cards: [
      {
        slug: "trippe",
        tech: "Cloudflare Workers · Supabase · SwiftUI",
        title: "Trippé",
        line: "تطبيق بيرشّح وجهات سفر ويحسب تكلفة كل واحدة من بيانات مجمّعة، وبيمتنع عن أي رقم مش قادر يوصّله لمصدر.",
        role: "الباك-إند والـ iOS ومحرّك التكلفة. شغّال على الآب ستور.",
      },
      {
        slug: "ecodyssey",
        tech: "SwiftUI · Vision · Core ML · Private Cloud Compute",
        title: "ECOdyssey",
        line: "كشك لفرز المخلفات عملناه خمس أفراد، وأهم شغل فيه كان إننا نقيس الموديل بتاعنا بأمانة كفاية لدرجة إننا نبطّل نثق فيه.",
        role: "محرّك الترجيح، والقاضي السحابي، والمقارنة اللي حكمت بينهم.",
      },
      {
        slug: "roadmap",
        tech: "C++ · C# · SQL Server",
        title: "الرودماب",
        line: "واحد وعشرين شهر أساسيات قبل كل اللي فوق — الجزء اللي بيفسّر باقي الحكاية.",
        role: "خمسة وعشرين كورس، 1,329 مسألة، تمنتاشر مشروع.",
      },
      {
        slug: "dvld",
        tech: "C# · WinForms · SQL Server",
        title: "DVLD",
        line: "نظام لإدارة رخص القيادة بمعمارية تلات طبقات صارمة. خاتمة الرودماب، وأكبر حاجة كنت بنيتها وقتها.",
        role: "أكتر من 30 شاشة و50 stored procedure، وشرح معماري سجّلته بنفسي.",
      },
    ],
  },

  contact: {
    heading: "تواصل معايا",
    body: "بدوّر على شغل باك-إند، ريموت أو على الأرض. الأكاديمية بتخلص ديسمبر 2026 والشهادة في أغسطس 2027.",
    links: [
      { label: "GitHub", to: "github" },
      { label: "LinkedIn", to: "linkedin" },
    ],
  },

  footer: {
    legal: [
      /* One segment, not five. The whole line is Latin, so it is one isolated
         run — split into pieces, an RTL paragraph reorders them and the full
         stop ends up at the far end of the line. The year is baked at build
         time, like every other figure here. */
      [{ text: `© ${new Date().getFullYear()} Mohamed Morad.`, ltr: true }],
      [
        "الأرقام اللي في الموقع ده متولّدة من الريبوهات اللي بتوصفها، مش مكتوبة بالإيد.",
      ],
    ],
  },

  meta: {
    title: "محمد مراد — مهندس باك-إند",
    description:
      "مهندس باك-إند. واحد وعشرين شهر في الأساسيات قبل ما أنزّل أي حاجة، وبعدها تطبيق شغّال على الآب ستور، الباك-إند بتاعه مبيخترعش سعر.",
  },
};
