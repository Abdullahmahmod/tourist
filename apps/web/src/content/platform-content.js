export const platformContent = {
  ar: {
    locale: "ar",
    dir: "rtl",
    siteTitle: "منصة حجز البالون بالأقصر",
    nav: [
      { label: "المنصة", href: "#platform" },
      { label: "الموديولات", href: "#modules" },
      { label: "التسعير", href: "#pricing" },
      { label: "الربط", href: "#integrations" },
    ],
    hero: {
      eyebrow: "منصة موحدة لـ 32 شركة بالون طائر",
      title: "نظام حجز وإصدار تذاكر حديث لإدارة رحلات البالون في الأقصر.",
      description:
        "واجهة موحدة تجمع الحجز المباشر، إدارة الشركات، أسعار B2B وB2C، التقارير، والمدفوعات مع قابلية ربط مستقبلية مع Amadeus وBooking.com وShopify وأنظمة التذاكر السياحية.",
      primaryCta: "استعراض البوابة",
      secondaryCta: "قراءة المعمارية",
      highlights: [
        "دعم العربية والإنجليزية من اليوم الأول",
        "هيكل متعدد الشركات Multi-tenant",
        "إصدار Voucher / Ticket تلقائي",
      ],
    },
    stats: [
      { value: "32", label: "شركة بالون مستهدفة" },
      { value: "4", label: "لوحات تشغيل رئيسية" },
      { value: "2", label: "نماذج تسعير أولية B2B / B2C" },
      { value: "24/7", label: "جاهزية للحجز أونلاين" },
    ],
    controlPanel: {
      title: "لوحة الإطلاق",
      items: [
        { label: "الحجوزات المؤكدة", value: "128" },
        { label: "الإشغال اليومي", value: "84%" },
        { label: "شركات فعالة", value: "27 / 32" },
        { label: "مدفوعات قيد المراجعة", value: "11" },
      ],
    },
    pillars: [
      {
        title: "إدارة شركات متعددة",
        description:
          "كل شركة لها لوحة مستقلة، مستخدمون وصلاحيات، سعات رحلات، وتسعير خاص مع إشراف مركزي كامل من الإدارة العامة.",
      },
      {
        title: "حجز وتذاكر في خطوة واحدة",
        description:
          "إنشاء الحجز، تحصيل الدفع، إصدار الفاوتشر، وإرسال تفاصيل الرحلة للعميل أو الوكيل من نفس المسار.",
      },
      {
        title: "منصة مفتوحة للربط",
        description:
          "تصميم الواجهة الخلفية والبيانات يسمح بإضافة بوابات الدفع وواجهات API وتطبيقات الموبايل لاحقًا بدون إعادة بناء النظام.",
      },
    ],
    modules: [
      "محرك بحث للحجوزات حسب التاريخ والشركة ونوع العميل",
      "إدارة رحلات البالون والسعة والمقاعد المتاحة",
      "إدارة أسعار B2C وB2B والوكالات والعقود",
      "سجل مدفوعات وفواتير واسترداد مبالغ",
      "إصدار Voucher / Ticket برقم مرجعي موحد",
      "تقارير تشغيل ومالية ومؤشرات أداء",
      "إدارة المستخدمين والصلاحيات ومسارات الاعتماد",
      "ربط مستقبلي مع التذاكر السياحية والأتوبيسات وعروض الصوت والضوء",
    ],
    pricing: {
      title: "تسعير مرن حسب نوع العميل",
      cards: [
        {
          name: "B2C",
          amount: "$100",
          note: "للعميل المباشر عبر الموقع أو التطبيق",
        },
        {
          name: "B2B",
          amount: "$80",
          note: "للشركات والوكالات والشركاء المعتمدين",
        },
      ],
    },
    roles: {
      title: "أنواع لوحات التحكم",
      items: [
        {
          title: "لوحة الإدارة الرئيسية",
          description:
            "إدارة الشركات، الإعدادات العامة، التقارير المالية، متابعة الأداء، والربط الخارجي.",
        },
        {
          title: "لوحة الشركة",
          description:
            "إدارة الرحلات اليومية، السعة، التسعير، الحجوزات، الفواتير، والوكلاء المرتبطين بالشركة.",
        },
        {
          title: "لوحة الوكالات والشركاء",
          description:
            "إنشاء حجوزات B2B، مراجعة الرصيد، تحميل الفاوتشرات، وتتبع حالة المدفوعات.",
        },
        {
          title: "لوحة خدمة العملاء",
          description:
            "تعديل الحجوزات، إعادة الإرسال، تسجيل الملاحظات، ومتابعة حالات الإلغاء والاسترداد.",
        },
      ],
    },
    integrations: {
      title: "جاهزية للربط الخارجي",
      items: [
        "Shopify لواجهات البيع أو الباقات التجريبية",
        "Amadeus لتوسيع الربط مع رحلات وخدمات السفر",
        "Booking.com كشريك محتمل لقنوات التوزيع",
        "بوابات الدفع الإلكتروني المحلية والدولية",
        "أنظمة تذاكر المعابد والأتوبيسات وعروض الصوت والضوء",
        "تطبيقات الموبايل عبر API موحد",
      ],
    },
    roadmap: {
      title: "مراحل التنفيذ المقترحة",
      items: [
        "Phase 1: تحليل المتطلبات، نمذجة العمليات، واعتماد سياسات التسعير والصلاحيات",
        "Phase 2: MVP للحجوزات، التذاكر، الشركات، المدفوعات، والتقارير الأساسية",
        "Phase 3: الربط الخارجي، تطبيقات الهاتف، أتمتة الإشعارات، وتحليلات متقدمة",
      ],
    },
    portalPreview: {
      title: "معاينة سريعة للبوابة",
      description:
        "صفحة تجريبية تعرض كيف يمكن تقسيم البيانات بين الإدارة العامة، الشركات، والشركاء.",
      cta: "فتح المعاينة",
    },
    footer: "أساس مشروع قابل للتطوير إلى منصة تشغيل وحجز متكاملة لرحلات البالون بالأقصر.",
  },
  en: {
    locale: "en",
    dir: "ltr",
    siteTitle: "Luxor Balloon Booking Platform",
    nav: [
      { label: "Platform", href: "#platform" },
      { label: "Modules", href: "#modules" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#integrations" },
    ],
    hero: {
      eyebrow: "A unified booking platform for 32 balloon operators",
      title: "Modern reservation and ticketing for Luxor hot air balloon operations.",
      description:
        "A single experience for direct bookings, operator management, B2B/B2C pricing, reporting, and payments, with future-ready connectors for Amadeus, Booking.com, Shopify, and tourism ticketing systems.",
      primaryCta: "View portal preview",
      secondaryCta: "Read architecture",
      highlights: [
        "Arabic and English from day one",
        "Built as a multi-tenant operator platform",
        "Automatic voucher and ticket issuance",
      ],
    },
    stats: [
      { value: "32", label: "Target balloon companies" },
      { value: "4", label: "Core operational dashboards" },
      { value: "2", label: "Initial pricing tracks: B2B / B2C" },
      { value: "24/7", label: "Online booking readiness" },
    ],
    controlPanel: {
      title: "Launch board",
      items: [
        { label: "Confirmed bookings", value: "128" },
        { label: "Daily occupancy", value: "84%" },
        { label: "Active operators", value: "27 / 32" },
        { label: "Payments in review", value: "11" },
      ],
    },
    pillars: [
      {
        title: "Multi-company operations",
        description:
          "Each operator gets an independent workspace for users, permissions, flight capacity, and pricing, while platform admins keep full central oversight.",
      },
      {
        title: "Booking to ticket in one flow",
        description:
          "Create the reservation, collect payment, issue the voucher, and send trip details to the traveler or partner from the same workflow.",
      },
      {
        title: "Open integration foundation",
        description:
          "The data and backend layout is designed to support payment gateways, APIs, and future mobile apps without rebuilding the platform.",
      },
    ],
    modules: [
      "Reservation search by date, operator, and customer segment",
      "Balloon trip inventory, capacity, and seat availability",
      "B2C, B2B, agency, and contract-based pricing controls",
      "Payments, invoices, refunds, and balance tracking",
      "Voucher and ticket generation with a shared reference ID",
      "Operational and financial reporting",
      "Users, permissions, and approval flows",
      "Future ticketing support for temples, buses, and sound-and-light shows",
    ],
    pricing: {
      title: "Flexible pricing by customer type",
      cards: [
        {
          name: "B2C",
          amount: "$100",
          note: "Direct guest bookings through web or mobile",
        },
        {
          name: "B2B",
          amount: "$80",
          note: "Approved agencies, resellers, and travel partners",
        },
      ],
    },
    roles: {
      title: "Dashboard layers",
      items: [
        {
          title: "Platform admin dashboard",
          description:
            "Operator onboarding, global settings, finance reports, performance monitoring, and external integrations.",
        },
        {
          title: "Operator dashboard",
          description:
            "Daily flights, capacity, pricing, reservations, invoices, and partner management for each company.",
        },
        {
          title: "Agency dashboard",
          description:
            "B2B bookings, balance review, voucher downloads, and payment status tracking for partners.",
        },
        {
          title: "Customer support dashboard",
          description:
            "Reservation updates, resends, notes, cancellations, and refund workflows.",
        },
      ],
    },
    integrations: {
      title: "External integration readiness",
      items: [
        "Shopify for storefront-led booking bundles",
        "Amadeus for broader travel-service connectivity",
        "Booking.com as a future distribution touchpoint",
        "Local and international payment gateways",
        "Temple, transport, and sound-and-light ticketing systems",
        "Mobile applications through a shared API layer",
      ],
    },
    roadmap: {
      title: "Suggested delivery phases",
      items: [
        "Phase 1: Discovery, workflow mapping, pricing rules, and permission design",
        "Phase 2: MVP for reservations, ticketing, operators, payments, and baseline reporting",
        "Phase 3: External integrations, mobile apps, automated notifications, and advanced analytics",
      ],
    },
    portalPreview: {
      title: "Portal snapshot",
      description:
        "A simple preview page showing how data can be split across central admins, operators, and partners.",
      cta: "Open preview",
    },
    footer:
      "A scalable starting point for a unified balloon operations and booking platform in Luxor.",
  },
};

export const portalContent = {
  ar: {
    title: "معاينة بوابة التشغيل",
    subtitle:
      "تصور أولي لتوزيع البيانات والمسؤوليات بين الإدارة العامة، شركات البالون، والشركاء التجاريين.",
    panels: [
      {
        title: "الإدارة العامة",
        metrics: [
          { label: "إجمالي الحجوزات اليوم", value: "412" },
          { label: "إيراد متوقع", value: "$34.8k" },
          { label: "شركات نشطة", value: "29" },
        ],
      },
      {
        title: "شركة بالون",
        metrics: [
          { label: "رحلات الفجر", value: "6" },
          { label: "مقاعد متاحة", value: "31" },
          { label: "حجوزات B2B", value: "47" },
        ],
      },
      {
        title: "وكالة / شريك",
        metrics: [
          { label: "طلبات جديدة", value: "18" },
          { label: "رصيد متاح", value: "$5.2k" },
          { label: "فاوتشرات جاهزة", value: "23" },
        ],
      },
    ],
    streams: [
      "تحديث السعات والمقاعد للشركات لحظيًا",
      "تثبيت السعر المناسب حسب القناة ونوع العميل",
      "إصدار الفاوتشر بعد نجاح الدفع أو الاعتماد الائتماني",
      "تجميع التقارير اليومية للإدارة المالية والتشغيلية",
    ],
    back: "العودة للرئيسية",
  },
  en: {
    title: "Operations Portal Preview",
    subtitle:
      "An early view of how data and responsibilities can be split across central admins, balloon operators, and travel partners.",
    panels: [
      {
        title: "Central admin",
        metrics: [
          { label: "Bookings today", value: "412" },
          { label: "Projected revenue", value: "$34.8k" },
          { label: "Active operators", value: "29" },
        ],
      },
      {
        title: "Balloon operator",
        metrics: [
          { label: "Sunrise departures", value: "6" },
          { label: "Available seats", value: "31" },
          { label: "B2B reservations", value: "47" },
        ],
      },
      {
        title: "Agency / partner",
        metrics: [
          { label: "New requests", value: "18" },
          { label: "Available balance", value: "$5.2k" },
          { label: "Ready vouchers", value: "23" },
        ],
      },
    ],
    streams: [
      "Live inventory updates across balloon operators",
      "Correct pricing by channel and customer segment",
      "Voucher issuance after payment success or credit approval",
      "Daily finance and operations reporting in one place",
    ],
    back: "Back to home",
  },
};
