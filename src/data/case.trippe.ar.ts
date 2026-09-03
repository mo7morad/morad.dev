import type { CaseStudyCopy } from "./types";

/* Transcreated into Egyptian register, like the rest of the Arabic side.
   Quotations stay in English: they are verbatim lines of code and comments, and
   translating a quotation stops it being one. The prose around each quote
   carries the meaning instead. */

export const TRIPPE_AR: CaseStudyCopy = {
  slug: "trippe",
  eyebrow: "Cloudflare Workers · Supabase · SwiftUI",
  title: "Trippé",
  thesis: "نظام بيرفض يقول حاجة مش قادر يثبتها.",

  facts: [
    { label: "الباك-إند · كوميتس", derived: { repo: "trippeBackend", field: "commitCount" } },
    { label: "الباك-إند · اختبارات", derived: { repo: "trippeBackend", field: "testCases" } },
    { label: "iOS · كوميتس", derived: { repo: "trippeIOS", field: "commitCount" } },
    { label: "iOS · اختبارات", derived: { repo: "trippeIOS", field: "testCases" } },
    { label: "عدد المطوّرين", derived: { repo: "trippeBackend", field: "authorCount" } },
    { label: "نزل", value: "آب ستور، سبتمبر 2026" },
  ],
  linkLabel: "شوفه على الآب ستور",

  intro: {
    kind: "prose",
    body: [
      "تريبيه بياخد جملة عن الرحلة اللي عايزها، ويرد بتلات وجهات تقدر تتحمّل تكلفتها فعلًا. يعني لازم يقول سعر. وكل الحاجات المهمة في النظام طالعة من الالتزام ده لوحده، لأن الطريقة الأمينة إنك تطلع ميزانية سفر مش إنك تقدّرها — الطريقة إنك تروح تدوّر على الأسعار الحقيقية، وتسكت لما ما تلاقيش.",
      "أنا اللي عملت الباك-إند وتطبيق الـ iOS ومحرّك التكلفة. التطبيق على الآب ستور، وهو أول حاجة نزّلتها بعد واحد وعشرين شهر في الأساسيات.",
    ],
    rail: [
      { label: "الباك-إند · أسطر", derived: { repo: "trippeBackend", field: "productionLines" } },
      { label: "iOS · أسطر", derived: { repo: "trippeIOS", field: "productionLines" } },
      { label: "المدة", derived: { repo: "trippeBackend", field: "dateRange" } },
    ],
  },

  sections: [
    {
      heading: "القاعدة",
      blocks: [
        {
          kind: "prose",
          body: [
            "الأسعار عايشة في طبقتين. الطبقة صفر بتضيف بس ومبتعدّلش: كل سعر اتشاف في أي وقت، ومعاه الصفحة اللي جه منها والجملة اللي قالته. الطبقة واحدة هي التجميعة اللي المدينة بتتقدّم منها، وتقدر ترميها وتعيد بناءها من الطبقة صفر في أي لحظة. مفيش صف بيتعدّل في مكانه، فأي رقم تقدر ترجع بيه لمصدره.",
            "والقاعدة اللي بتخلّي ده كله يشتغل هي قيد واحد على عمود واحد. أي استخراج مش قادر يقتبس مصدره بيتترمي مش بيتخزّن — وده لوحده بيشيل أغلب الأرقام المخترعة ببلاش، قبل ما حد يشوفها.",
          ],
          rail: [
            { label: "الطبقة صفر", value: "إضافة بس" },
            { label: "الطبقة واحدة", value: "قابلة لإعادة البناء" },
          ],
        },
        {
          kind: "quote",
          quote: "`source_quote   text   not null   check (char_length(source_quote) > 0)`",
          attribution: "supabase/migrations/0006_price_provenance.sql",
        },
        {
          kind: "prose",
          body: [
            "والنص التاني من القاعدة إن الإجابة الناقصة أوحش من مفيش إجابة، عشان كده الـ pipeline مسموح له إنه ما يطلّعش حاجة خالص.",
          ],
          rail: [],
        },
        {
          kind: "quote",
          quote: "Refusal is a first-class outcome here. A city that fails the ladder or the confidence floor produces no row at all — never a partial one. A row with good food prices and a broken lodging column is more dangerous than no row, because the engine treats any row it finds as authoritative and the missing half falls silently to zero rather than to the model's estimate.",
          attribution: "src/services/pricing/harvest/rollup.ts",
        },
      ],
    },

    {
      heading: "الميزانية ماتلمسش الحسبة",
      blocks: [
        {
          kind: "prose",
          body: [
            "لو قلت للنظام إن معاك 3,000 دولار، تكلفة بالي المفروض ما تتغيّرش. الميزانية بتحدّد الوجهات اللي في متناولك وفئة الإنفاق — لكن عمرها ما تدخل في تكلفة أي حاجة، وإلا يبقى التطبيق بيرجّعلك رقمك اللي انت قلته.",
            "وده مش عُرف بيتراجع في الكود ريفيو، لأن العُرف مش بيوقّع بيلد. ده اختبار خاصية: نفس الرحلة بتتسعّر على كل ميزانية من 500 لـ 20,000 دولار، ولازم عدد النتايج المختلفة يطلع تلاتة بالظبط، واحدة لكل فئة. أي طريق توصل بيه الميزانية للحسبة بيفجّر الرقم ده.",
          ],
          rail: [
            { label: "المدى", value: "$500 – $20,000" },
            { label: "الشرط", value: "results.size === 3" },
            { label: "الملف", value: "test/pricing/budgetIndependence.test.ts" },
          ],
        },
        {
          kind: "prose",
          body: [
            "والموديل لازم يتحاسب بنفس القاعدة، وهو أسهل في الخداع من الحسبة. إنك تشيل الميزانية من الـ payload مش كفاية لوحده — لو وريته رقم بالدولار لكل مدينة، تكون رجّعت له نفس المرساة اللي لسه شايلها.",
          ],
          rail: [],
        },
        {
          kind: "quote",
          quote: "Names and countries ONLY. The engine already established that every entry fits, so the model has no use for the totals — and showing it a dollar figure per city would hand back the anchor that stripping `budget` from this payload just removed.",
          attribution: "src/services/recommendation/recommendationRequest.ts",
        },
      ],
    },

    {
      heading: "وبعدين قِست اللي بنيته",
      blocks: [
        {
          kind: "prose",
          body: [
            "عمود اقتباس مكتوب عليه not null بيضمن إن فيه اقتباس. مش بيضمن إن الاقتباس فيه الرقم اللي المفروض بيجيبه منه. ومحدش كان بيتشيك على ده، فكتبت الفحص وشغّلته على كل اللي متخزّن.",
            "من 2,539 ملاحظة سعر من الحصاد القديم، 9.3% بس كان معاها اقتباس فيه الرقم بتاعها فعلًا. الباقي مكانش غلط بالظبط — كان غير قابل للتكذيب، وده في نظام قايم على إثبات المصدر نفس الحاجة. فالمحتوى كله اتعامل معاه كأنه غير مُثبت لحد ما يستحق تاني.",
            "الاستخراج بعد ما اتبنى من جديد بينجح في الفحص ده على 92.5% من الملاحظات الجديدة. ده الرقم اللي نفسي القارئ يفتكره، مش لأنه عالي، لكن لأن قبل ما القياس ده يتعمل مكانش فيه رقم أصلًا — كان فيه بس عمود عمره ما فضي.",
          ],
          rail: [
            { label: "قبل", value: "9.3% من 2,539" },
            { label: "بعد", value: "92.5%" },
            { label: "المواصفة", value: "specs/007, specs/008" },
          ],
        },
      ],
    },

    {
      heading: "معيار الإثبات كان مقلوب",
      blocks: [
        {
          kind: "prose",
          body: [
            "تريبيه بيجاوب كمان على إنت محتاج فيزا ولا لأ، وده ادعاء ليه عواقب. كان بيقدّم 23 قاعدة دخول. تمنية منهم قايمين على مصدر حكومي رسمي. والخمستاشر الباقيين متعلّمين unanimous — يعني كذا ناشر متفقين — والناشرين دول كانوا شركات سياحة وشركات خدمات فيزا.",
            "ونفس الكود ده كان بيطلب ناشرين مستقلين قبل ما يعرض تحذير من نصب. يعني كان بيطلب إثبات أقل عشان يقولك الحدود مفتوحة من اللي بيطلبه عشان يقولك سواق تاكسي ممكن يزوّد عليك. المعيار كان مقلوب، وأنا اللي كتبت النصين.",
          ],
          rail: [
            { label: "القاعدة", value: "رسمي، أو ناشرين ≥2" },
            { label: "المواصفة", value: "specs/008 · FR-005b" },
          ],
        },
        {
          kind: "table",
          caption: "مقاس على بيانات حقيقية بعد ما المعيار اتظبط. اتناشر قاعدة بطّلت تتعرض — حداشر منهم كان وراهم ناشر واحد، وواحدة كان وراها مصدر رسمي مش قادر يتأكد.",
          head: ["", "قبل", "بعد"],
          rows: [
            ["قواعد الدخول المعروضة", "23 (8 رسمي، 15 “unanimous”)", "11، كلهم رسمي"],
            ["محجوبة", "0", "12"],
            ["EG → JO", "بدون فيزا (غلط)", "محجوبة"],
            ["تواريخ سفر بفرق أكبر من 30 يوم", "1", "0"],
          ],
          rail: [{ label: "المصدر", value: "docs/IMPLEMENTATION_NOTES.md" }],
        },
        {
          kind: "prose",
          body: [
            "الصف الغلط ده كان جواز سفر مصري رايح الأردن — جنسيتي أنا، وده السبب الوحيد اللي خلاني أبص عليه كويس.",
            "وإصلاحه اتطلّب إني أسجّل كل ادعاء مرفوض بدل ما أرميه في صمت، والجدول الجديد لقى المشكلة الأعمق من أول يوم. من أول 31 رفض، 17 كانوا اقتباسات مش بتدعم ادعاءها — و13 منهم كانوا صفحات حكومية رسمية. وزارة خارجية تركيا بتقول “exempted from visa up to 90 days”. والنمسا بتقول “don't need to apply for a visa”. وإسبانيا بتقولها بالإسباني. كل واحدة فيهم وزارة بتقول الحقيقة بكلام قايمة العلامات الثابتة بتاعتي ما كانتش فيها، فالوزارة بتتشال، والـ aggregator بيفضل، والزوج بيبان كأنه متفَق عليه.",
          ],
          rail: [
            { label: "رفض · أول يوم", value: "17 من 31" },
            { label: "منهم رسمي", value: "13" },
          ],
        },
        {
          kind: "quote",
          quote: "EG→JO was not a special case. It was the visible instance of a systematic recall failure, and the mechanism is identical every time: the ministry is dropped, the aggregator survives, the pairing reads as agreed.",
          attribution: "docs/IMPLEMENTATION_NOTES.md · §12b",
        },
      ],
    },

    {
      heading: "?? 'US'",
      blocks: [
        {
          kind: "prose",
          body: [
            "التطبيق كان بيسأل إنت مسافر من أنهي مطار. وكان بيجاوب إنت محتاج أنهي فيزا. دول سؤالين مختلفين — واحد عن إنت فين، والتاني عن إنت شايل أنهي جواز — وسطرين كود وصّلوهم ببعض بـ fallback لنص ثابت.",
            "على مدى آخر 30 يوم، 36 من 154 request وصلوا لاستعلام الدخول من غير أي مطار مسجّل خالص، واتقدّملهم قواعد دخول أمريكية من النص الثابت ده. يعني pipeline رافض يقول نظام فيزا من غير اقتباس حكومي حرفي، كان بيربط الاقتباسات دي بتخمين.",
            "والخطأ غير متماثل، وده اللي بيخليه وحش مش بس غلط. الجواز الأمريكي أو الإماراتي بدون فيزا في أماكن أكتر بكتير من الجواز المصري أو الإندونيسي، فالاستبدال كان بيميل ناحية “تقدر تروح” — وبعدين يبني تاريخ سفر على الإجابة دي.",
            "وعاش الخطأ ده وسط 756 اختبار ناجح. مش لأن الاختبارات وحشة، لكن لأن ولا واحد فيهم كان بيتأكد الاستعلام بيفلتر على أنهي دولة، والاستعلام الغلط بيرجّع map فاضية بالتصميم — فشكل الفشل كان قسم ناقص من الشاشة في صمت، مش بيلد أحمر. دلوقتي مفيش fallback خالص، والاختبارات الجديدة اتفحصت بالطفرة: لو رجّعت النص الثابت، اتنين منهم بيقعوا.",
          ],
          rail: [
            { label: "اتقدّم من نص ثابت", value: "36 من 154 (23%)" },
            { label: "اختبارات ناجحة وقتها", value: "756" },
            { label: "fallbacks متبقية", value: "0" },
          ],
        },
      ],
    },

    {
      heading: "لما راجعت شغلي أنا",
      blocks: [
        {
          kind: "prose",
          body: [
            "في نص مواصفة التسعير وقفت وراجعت اللي نزّلته مقابل اللي ادّعيته. والمستند اللي طلع من ده أنفع حاجة في الريبو، وهو مش لطيف معايا.",
            "87% من جدول الأسعار — 162 صف من 186 — ماجاش من الحصاد أصلًا. كان فيه طريق كتابة تاني غير معلَن مالي الجدول، وحاطط عليه ثقة ثابتة أعلى من أي صف محصود حقيقي ممكن يستاهلها. ضمانة “الإضافة بس” صمدت تمامًا: مفيش صف اتمسح. هي بس بطّلت تعني اللي بتقوله.",
          ],
          rail: [
            { label: "صفوف مش من الحصاد", value: "162 من 186 (87%)" },
            { label: "الحكم", value: "specs/007/worklog/VERDICT.md" },
          ],
        },
        {
          kind: "quote",
          quote: "A gate that cannot fail is worse than no gate — it converts “unmeasured” into “verified”.",
          attribution: "specs/007-price-before-committing/worklog/VERDICT.md",
        },
        {
          kind: "quote",
          quote: "Layer 0's immutability held; its meaning did not.",
          attribution: "specs/007-price-before-committing/worklog/VERDICT.md",
        },
        {
          kind: "prose",
          body: [
            "والحل كان ميجريشن بيسحب كل صف مستورد بدل ما يمسحه، عشان سجل اللي حصل يفضل موجود بعد التصحيح. نفس القاعدة اللي بطبّقها على سعر غلط، بطبّقها على غلطتي أنا.",
          ],
          rail: [{ label: "الميجريشن", value: "0010_revoke_import_rows.sql" }],
        },
      ],
    },

    {
      heading: "التطبيق اللي قدّامه",
      blocks: [
        {
          kind: "prose",
          body: [
            "جهة الـ iOS كان لازم تشيل نفس الانضباط في مكان المستخدم يحسّه. توكنات الحركة متسمّية باللي بتعمله — snap و calm و press — وكل واحدة موجودة لمكان استخدام واحد بس معاها كومنت بيدافع عن سبب إنها استاهلت اسم. والإصلاحات متسجّلة كإصلاحات، مش بتتحسّن في صمت.",
          ],
          rail: [
            { label: "iOS · أسطر", derived: { repo: "trippeIOS", field: "productionLines" } },
            { label: "iOS · اختبارات", derived: { repo: "trippeIOS", field: "testCases" } },
          ],
        },
        {
          kind: "quote",
          quote: "Was easeIn, which arrived at full brightness at max velocity: a harsh pop that read as eye-irritating.",
          attribution: "Trippy/Core/Theme/AppAnimations.swift",
        },
        {
          kind: "quote",
          quote: "Flexibility changes the character of a tap; weight only changes how hard it hits, and a screen where everything is .impact(.light) carries no information at all.",
          attribution: "docs/design-system.md",
        },
        {
          kind: "prose",
          body: [
            "والموديل ممنوع تمامًا يكتب فلوس في الواجهة. GeneratedContentGuard هو الطبقة الوسطى من تلات طبقات بيمنعوه، وهو متعلّق بالعملة عن قصد عشان “مشوار عشر دقايق مشي” يعدّي بينما “حوالي 40 دولار” ما يعديش. رفض كل الأرقام كان أسهل، وكان هيخلّي التطبيق أوحش.",
          ],
          rail: [{ label: "الملف", value: "GeneratedContentGuard.swift" }],
        },
      ],
    },

    {
      heading: "اللي باظ",
      blocks: [
        {
          kind: "prose",
          body: [
            "إنك تعمل كومنت على بلوك [triggers] مش بيشيل الكرون من Cloudflare. الجدولة بتفضل عايشة بعد أي deploy مش ذاكرها، فحصاد كنت فاكره متقفول اشتغل حداشر مرة كمان على مدى تلات ساعات، وصرف 1.10 دولار أنا قلت بالنص ما يتصرفش. السقف اليومي صمد، وده السبب الوحيد إنه كان 1.10 مش أكتر بكتير — والحادثة دي كمان كانت أول إثبات إن الـ pipeline بيشتغل لوحده من الأول للآخر.",
            "التانية أنا مرتاح ليها أقل. كان فيه تكامل مع Google Images لكارت الأكل، مكتوب، وموثّق إنه شغال، واتستخدم عشان يبرّر تغيير في البرومبت. وهو عمره ما رجّع صورة واحدة: كل استدعاء كان بيرجع 403، لأن الـ API ماكانش متفعّل على المشروع أصلًا. والدليل في مستند التسليم بتاعه كان جاي من منتج تاني خالص — نتايج من خدمة تانية، معروضة كأنها من دي. ولو كان نزل، تغيير البرومبت بتاعه كان هيحط صور عربيات على كارت الأكل، في صمت، لحد ما حد يبص.",
            "رجّعته وكتبت التشريح ضد نفسي. الدرس مش “اتشيك على مفاتيح الـ API”. الدرس إن مستند بيقول إن حاجة شغالة مش دليل إنها شغالة، حتى لو أنا اللي كاتب المستند.",
          ],
          rail: [
            { label: "تجاوز الكرون", value: "11 تشغيلة · $1.10" },
            { label: "تشريح الصور", value: "docs/google-images-food-postmortem.md" },
          ],
        },
      ],
    },

    {
      heading: "هو واقف فين دلوقتي",
      blocks: [
        {
          kind: "prose",
          voice: true,
          body: [
            "هو تطبيق صغير بمستخدمين حقيقيين، مش تطبيق كبير بمستخدمين متخيّلين. في الأساس المسجّل يوم 23 أغسطس 2026 كان عنده 43 جهاز نشط على مدى تلاتين يوم، وتلت النتايج بتتحفظ، وحوالي جهاز من كل سبعة بيرجع. دي أرقام متواضعة وأنا أفضّل أطبعها على إني أقرّبها لفوق.",
            "واللي هاخده من التجربة دي مش المعمارية. اللي هاخده هو عادة إني أكتب القياس اللي بيخلّي شغلي يبان وحش، وبعدين أبقى مضطر أعمل حاجة فيه. أغلب الصفحة دي قايمة حاجات غلطت فيها ولقيتها لأني رحت أدوّر. ده الجزء اللي هعمله تاني.",
          ],
          rail: [
            { label: "أجهزة نشطة · 30 يوم", value: "43" },
            { label: "نسبة الحفظ", value: "33%" },
            { label: "الأساس مسجّل", value: "2026-08-23" },
          ],
        },
      ],
    },
  ],

  meta: {
    title: "تريبيه — نظام بيرفض يقول حاجة مش قادر يثبتها",
    description:
      "تطبيق سفر الباك-إند بتاعه بيحجب أي سعر مش قادر يوصّله لمصدر مقتبس. قاعدة إثبات المصدر، والاختبار اللي بيفرضها، والقياسات اللي أدانت الداتا بتاعتي أنا.",
  },
};
