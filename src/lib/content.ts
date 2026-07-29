/* ============================================================
   همه‌ی محتوای قابل‌ترجمه‌ی سایت اینجاست.
   نسخه‌ی رونیک به‌صورت خودکار از نسخه‌ی انگلیسی ساخته می‌شود.
   ============================================================ */

export interface StatItem { label: string; value: number; suffix: string }
export interface FactItem { label: string; value: string }
export interface TimelineItem { year: string; title: string; place: string; desc: string }
export interface SkillItem { name: string; pct: number }
export interface SkillGroup { title: string; icon: "frontend" | "backend" | "tools"; accent: "turq" | "gold"; items: SkillItem[] }
export interface ProjectItem {
  num: string; productName: string; en: string; desc: string; tech: string[]; year: string;
  stars: string; repo: string; demo: string; demoLabel: string; accent: "turq" | "gold";
}
export interface SocialItem { name: string; handle: string; href: string; icon: "github" | "telegram" | "mail" | "linkedin" | "x" }
export type TermLine = { kind: "in" | "out" | "sys" | "ok" | "err"; text: string };

export interface Content {
  meta: { title: string; description: string };
  nav: { about: string; skills: string; projects: string; terminal: string; contact: string; eggs: string };
  person: {
    name: string; role: string; location: string; email: string; github: string;
    version: string; statusNote: string; phrases: string[]; heroBio: string; buildingLabel: string; building: string;
    bigLetter: string; handle: string;
  };
  hero: {
    viewProjects: string; githubProfile: string; terminalTitle: string; terminalLines: string[];
    terminalReady: string; tzLabel: string;
  };
  marquee: string[];
  about: {
    num: string; title: string; en: string; commitLabel: string; commitValue: string;
    quickFacts: FactItem[]; paragraphs: string[]; stats: StatItem[]; timelineHeading: string;
    timeline: TimelineItem[]; fuelLabel: string; fuelNote: string;
  };
  skills: {
    num: string; title: string; en: string; groups: SkillGroup[]; learningLabel: string;
    learningItems: string[]; learningFooter: string; contribHeading: string; contribSub: string;
    less: string; more: string; contribFooterPrefix: string; contribFooterSuffix: string; contribUnit: string;
  };
  projects: {
    num: string; title: string; en: string; intro: string; items: ProjectItem[];
    starsLabel: string; repoLabel: string;
  };
  terminal: {
    num: string; title: string; en: string; desc: string; quickButtons: string[];
    welcome: TermLine[]; helpTitle: string; help: string[]; whoami: TermLine[]; skillsOut: string[];
    projectsFooter: string; contactOut: string[]; coffee: string; secrets: string; sudo: string;
    notFound: string; placeholder: string; ariaLabel: string; windowTitle: string;
  };
  eggs: {
    num: string; title: string; en: string; intro: string; terminalOnlyNote: string;
    progressLabel: string; searchPlaceholder: string; noResults: string;
    categoryTheme: string; categoryQuote: string; foundLabel: string; lockedLabel: string;
    filterAll: string; filterFound: string; filterLocked: string;
  };
  contact: {
    num: string; title: string; en: string; intro: string; socials: SocialItem[];
    supportTitle: string; supportBody: string; supportReymit: string; supportUsdt: string;
    formTitle: string; nameLabel: string; namePlaceholder: string; emailLabel: string;
    messageLabel: string; messagePlaceholder: string; send: string; sentTitle: string;
    sentBody: (name: string) => string; sendAnother: string;
  };
  footer: { tagline: string; hosted: string; goodbye: string; copyright: string };
  preloader: { lines: string[]; skip: string };
  statusbar: { branch: string; build: string; encodingLine: string; backToTop: string };
  cursor: { link: string; media: string; text: string };
  chrome: { menuLabel: string; langLabel: string };
}

/* ================= فارسی ================= */
export const CONTENT_FA: Content = {
  meta: {
    title: "EPODONIOS | سازنده‌ی ابزارهای دور زدن فیلترینگ",
    description: "EPODONIOS — توسعه‌دهنده‌ی مستقل؛ سازنده‌ی MEMENTO و ابزارهای V2Ray/Xray، اتوماسیون تلگرام و شبکه‌ی آزاد.",
  },
  nav: { about: "درباره من", skills: "مهارت‌ها", projects: "پروژه‌ها", terminal: "ترمینال", contact: "ارتباط", eggs: "ایستر اگ‌ها" },
  person: {
    name: "EPODONIOS",
    role: "توسعه‌دهنده‌ی مستقل — ابزارهای دور زدن فیلترینگ",
    location: "ایران",
    email: "Epodonios@gmail.com",
    github: "https://github.com/Epodonios",
    version: "v3.0",
    statusNote: "در حال ساخت MEMENTO",
    phrases: [
      "سازنده‌ی ابزارهای V2Ray / Xray",
      "عاشق شبکه‌ی آزاد و بدون سانسور",
      "توسعه‌دهنده‌ی Rust، Python و React",
      "اتوماسیون‌ساز تلگرام",
    ],
    heroBio:
      "از پشت یک اتصال فیلترشده می‌سازم؛ همان چیزی که هر روز به آن نیاز دارم. از اسکریپت‌های پایتون برای جمع‌آوری کانفیگ تا یک اپ دسکتاپ کامل با Rust و React — اینجا کارها، ابزارها و راه‌های ارتباطی من است.",
    buildingLabel: "الان در حال ساخت:",
    building: "MEMENTO",
    bigLetter: "ا",
    handle: "epodonios",
  },
  hero: {
    viewProjects: "دیدن پروژه‌ها",
    githubProfile: "پروفایل گیت‌هاب",
    terminalTitle: "epodonios@iran: ~",
    terminalLines: [
      "$ git clone epodonios/memento",
      "Cloning into 'memento'…",
      "remote: ۳٫۱k⭐ روی v2ray-configs ✓",
      "$ cat freedom.txt",
      "«اینترنت باید برای همه آزاد باشد»",
    ],
    terminalReady: "آماده",
    tzLabel: "IRST",
  },
  marquee: [
    "V2Ray", "Xray-core", "Tauri", "Rust", "React", "TypeScript",
    "Python", "Telethon", "SQLite", "Docker", "Linux", "Git", "دور زدن فیلترینگ",
  ],
  about: {
    num: "01",
    title: "درباره من",
    en: "ABOUT ME",
    commitLabel: "git log:",
    commitValue: "چند صد کامیت",
    quickFacts: [
      { label: "موقعیت", value: "ایران" },
      { label: "تمرکز", value: "V2Ray / Xray" },
      { label: "پروژه‌ی فعلی", value: "MEMENTO" },
      { label: "وضعیت", value: "در حال ساخت" },
    ],
    paragraphs: [
      "این‌جا از دلِ یک اتصال فیلترشده نوشته می‌شود — همان جایی که هر روز باید با محدودیت دست‌وپنجه نرم کرد. همین تجربه‌ی روزمره بود که مرا به سمت ساختن ابزارهایی برد که این کار را برای بقیه هم راحت‌تر کند.",
      "کار از یک اسکریپت پایتونی ساده برای جمع‌آوری کانفیگ‌های V2Ray شروع شد؛ چیزی که حالا هزاران کانفیگ رایگان را هر پنج دقیقه یک‌بار به‌روزرسانی می‌کند. بعد از آن نوبت MEMENTO رسید — از یک صفحه‌ی HTML تک‌فایلی تا یک اپلیکیشن دسکتاپ کامل با Tauri، Rust و React.",
      "این روزها بین ساخت رابط کاربری MEMENTO، نوشتن ربات‌های تلگرامی و کندوکاو در تکنیک‌های عبور از فیلترینگ (SNI Tunneling، Domain Fronting، Psiphon) در رفت‌وآمدم. اگر دنبال راهی برای عبور از یک محدودیت هستید، احتمالاً من همین الان دارم رویش کار می‌کنم.",
    ],
    stats: [
      { label: "ستاره‌ی گیت‌هاب", value: 3100, suffix: "+" },
      { label: "دنبال‌کننده", value: 436, suffix: "" },
      { label: "پروژه‌ی عمومی", value: 4, suffix: "+" },
      { label: "فنجان قهوه", value: 0, suffix: "∞" },
    ],
    timelineHeading: "مسیر تا اینجا",
    timeline: [
      {
        year: "شروع",
        title: "جمع‌آوری کانفیگ",
        place: "اسکریپت‌های پایتون",
        desc: "یک اسکریپت ساده برای اسکرپ‌کردن کانفیگ‌های V2Ray از کانال‌های تلگرام و دسته‌بندی‌شان بر اساس کشور.",
      },
      {
        year: "رشد",
        title: "بروزرسانی هر ۵ دقیقه",
        place: "v2ray-configs",
        desc: "تبدیل آن اسکریپت به یک مخزن کامل با هزاران کانفیگ رایگان، چند فرمت خروجی و بروزرسانی خودکار.",
      },
      {
        year: "ساخت",
        title: "از HTML تا دسکتاپ",
        place: "MEMENTO",
        desc: "شروع با یک صفحه‌ی HTML تک‌فایلی برای مدیریت کانفیگ، سپس بازسازی کامل با Tauri، Rust و Xray-core.",
      },
      {
        year: "امروز",
        title: "اتوماسیون و دور زدن فیلتر",
        place: "پروژه‌های جاری",
        desc: "ساخت ربات‌های تلگرامی، پژوهش روی WinDivert و SNI Tunneling، و بهبود مداوم MEMENTO.",
      },
    ],
    fuelLabel: "سوخت اصلی:",
    fuelNote: "قهوه‌ی دمی، یک اتصال پایدار (بالاخره) و باگ‌هایی که ساعت ۲ نصفه‌شب حل می‌شوند.",
  },
  skills: {
    num: "02",
    title: "مهارت‌ها و ابزارها",
    en: "SKILL STACK",
    groups: [
      {
        title: "پروتکل و دور زدن فیلترینگ",
        icon: "tools",
        accent: "turq",
        items: [
          { name: "V2Ray / Xray-core", pct: 95 },
          { name: "Shadowsocks / Trojan", pct: 88 },
          { name: "SNI Tunneling / Domain Fronting", pct: 74 },
          { name: "WinDivert / Psiphon (تحقیقاتی)", pct: 58 },
        ],
      },
      {
        title: "دسکتاپ و فرانت‌اند",
        icon: "frontend",
        accent: "gold",
        items: [
          { name: "React / TypeScript", pct: 88 },
          { name: "Tauri / Rust", pct: 78 },
          { name: "Tailwind CSS", pct: 85 },
          { name: "طراحی رابط کاربری", pct: 80 },
        ],
      },
      {
        title: "اتوماسیون و بک‌اند",
        icon: "backend",
        accent: "turq",
        items: [
          { name: "Python", pct: 92 },
          { name: "Telethon / python-telegram-bot", pct: 90 },
          { name: "SQLite", pct: 75 },
          { name: "Git و لینوکس", pct: 85 },
        ],
      },
    ],
    learningLabel: "در حال یادگیری:",
    learningItems: ["Reality / VLESS", "eBPF", "دستیارهای هوش مصنوعی"],
    learningFooter: "یادگیری هیچ‌وقت تمام نمی‌شود ✦",
    contribHeading: "یک سال در مربع‌ها",
    contribSub: "contribution graph",
    less: "کمتر",
    more: "بیشتر",
    contribFooterPrefix: "مجموع مشارکت در ۵۲ هفته‌ی گذشته:",
    contribFooterSuffix: "و این تازه اول راه است.",
    contribUnit: "مشارکت",
  },
  projects: {
    num: "03",
    title: "پروژه‌های منتخب",
    en: "SELECTED WORK",
    intro: "هر پروژه از یک نیاز واقعیِ روزمره شروع شده — عبور از یک محدودیت، یا خودکارسازیِ یک کارِ تکراری. اسکرول کنید و ببینید.",
    starsLabel: "ستاره‌ها",
    repoLabel: "کد پروژه",
    items: [
      {
        num: "01",
        productName: "MEMENTO",
        en: "V2Ray / Xray Desktop Manager",
        desc: "اپلیکیشن دسکتاپ مدیریت کانفیگ V2Ray/Xray با Tauri و Rust. حالت ایران برای دور زدن فیلترینگ مبتنی بر SNI با Domain Fronting، پینگ TCP فوق‌سریع، سوییچ خودکار در قطعی، و رابط کاربری شیشه‌ای (Glassmorphism).",
        tech: ["Tauri 2", "Rust", "React 19", "Xray-core", "Zustand"],
        year: "۱۴۰۴",
        stars: "جدید",
        repo: "https://github.com/Epodonios/MEMENTO",
        demo: "https://github.com/Epodonios/MEMENTO/releases",
        demoLabel: "دانلود",
        accent: "turq",
      },
      {
        num: "02",
        productName: "v2ray-configs",
        en: "Auto-Updating Config Aggregator",
        desc: "مخزنِ خودکار هزاران کانفیگ رایگان V2Ray/Xray (VMess، VLess، Trojan، Shadowsocks، Hysteria2، TUIC) با بروزرسانی هر پنج دقیقه و خروجی در قالب‌های Base64، Clash، Sing-Box و بیشتر.",
        tech: ["Python", "Requests", "GitHub Actions"],
        year: "۱۴۰۳",
        stars: "۳٫۱k",
        repo: "https://github.com/Epodonios/v2ray-configs",
        demo: "https://github.com/Epodonios/v2ray-configs/raw/main/All_Configs_Sub.txt",
        demoLabel: "لینک اشتراک",
        accent: "gold",
      },
      {
        num: "03",
        productName: "bulk-xray-configs",
        en: "Region-Split Config Scraper",
        desc: "اسکریپت پایتونی که کانفیگ‌های V2Ray را از ده‌ها کانال تلگرام اسکرپ می‌کند، بر اساس کشور دسته‌بندی می‌کند و در پوشه‌های جدا ذخیره می‌سازد.",
        tech: ["Python", "BeautifulSoup", "Telegram"],
        year: "۱۴۰۳",
        stars: "۳۳۴",
        repo: "https://github.com/Epodonios/bulk-xray-v2ray-vless-vmess-...-configs",
        demo: "https://t.me/+NqWGD5-OGv1jOGU8",
        demoLabel: "کانال تلگرام",
        accent: "turq",
      },
      {
        num: "04",
        productName: "اتوماسیون تلگرام",
        en: "Telegram Bot Suite",
        desc: "مجموعه‌ای از ربات‌ها: یک یوزربات با Telethon برای گرفتن و فرمت‌کردن خودکار متن آهنگ‌ها روی پست‌های یک کانال موزیک، و یک ربات رله‌ی ناشناس با صف اولویت‌دار و پشتیبانی سه‌زبانه.",
        tech: ["Python", "Telethon", "python-telegram-bot", "SQLite"],
        year: "۱۴۰۴",
        stars: "شخصی",
        repo: "https://github.com/Epodonios",
        demo: "https://t.me/Epodonios",
        demoLabel: "تلگرام",
        accent: "gold",
      },
    ],
  },
  terminal: {
    num: "04",
    title: "با من حرف بزن — تایپی!",
    en: "LIVE TERMINAL",
    desc: "اسکرول‌کردن که دیگر قدیمی شده! این یک ترمینال واقعاً زنده است — تایپ کنید، Enter بزنید و جواب بگیرید. با Tab تکمیل می‌شود و با کلیدهای جهت‌نما در تاریخچه جابه‌جا شوید.",
    quickButtons: ["help", "whoami", "projects", "date", "coffee"],
    welcome: [
      { kind: "sys", text: "ترمینال شخصی EPODONIOS — نسخه ۳٫۰ · خوش آمدید" },
      { kind: "out", text: "اینجا واقعاً می‌شود تایپ کرد. فرمان help را بزنید." },
    ],
    helpTitle: "فرمان‌های موجود:",
    help: [
      "  whoami    → درباره‌ی من",
      "  skills    → مهارت‌ها",
      "  projects  → لیست پروژه‌ها",
      "  contact   → راه‌های ارتباطی",
      "  date      → تاریخ و ساعت",
      "  coffee    → یک فنجان قهوه",
      "  clear     → پاک‌کردن صفحه",
    ],
    whoami: [
      { kind: "ok", text: "EPODONIOS — سازنده‌ی ابزارهای دور زدن فیلترینگ" },
      { kind: "out", text: "ایران · عاشق شبکه‌ی آزاد، V2Ray و اتوماسیون تلگرام" },
    ],
    skillsOut: [
      "پروتکل‌ها: V2Ray · Xray-core · Shadowsocks · Trojan",
      "دسکتاپ: Tauri · Rust · React · TypeScript",
      "اتوماسیون: Python · Telethon · SQLite · Git",
    ],
    projectsFooter: "جزئیات کامل را در بخش پروژه‌ها ببینید ↑",
    contactOut: [
      "ایمیل: Epodonios@gmail.com",
      "گیت‌هاب: github.com/Epodonios",
      "تلگرام: t.me/Epodonios",
    ],
    coffee: "☕ یک قهوه‌ی تازه دم شد. حالا می‌توانیم ادامه بدهیم!",
    secrets: "دسترسی ممنوع! بعضی چیزها باید geheim بمانند 😉",
    sudo: "اینجا همه برابرند؛ sudo لازم نیست.",
    notFound: "فرمان یافت نشد — help را ببینید",
    placeholder: "help",
    ariaLabel: "ورودی ترمینال",
    windowTitle: "interactive — epodonios@iran",
  },
  eggs: {
    num: "05",
    title: "ایستر اگ‌های مخفی",
    en: "EASTER EGGS",
    intro: "این صفحه پر از ایستر اگ است — نقل‌قول‌ها، افکت‌ها و تم‌های کامل که با تایپ‌کردن پاسخ درست باز می‌شوند. معماها را بخوانید و حدس بزنید.",
    terminalOnlyNote: "⚠️ فقط با تایپ‌کردن در ترمینال بالا پیدا می‌شوند — جای دیگری از صفحه کار نمی‌کند.",
    progressLabel: "کشف‌شده",
    searchPlaceholder: "جستجو در معماها...",
    noResults: "معمایی با این عبارت پیدا نشد.",
    categoryTheme: "تم کامل",
    categoryQuote: "نقل‌قول",
    foundLabel: "پیدا شد",
    lockedLabel: "قفل",
    filterAll: "همه",
    filterFound: "پیداشده‌ها",
    filterLocked: "قفل‌ها",
  },
  contact: {
    num: "06",
    title: "بیایید با هم بسازیم",
    en: "GET IN TOUCH",
    intro: "ایده‌ای برای دور زدن یک محدودیت دارید؟ باگی در MEMENTO پیدا کرده‌اید؟ یا فقط می‌خواهید سلام بدهید؟ درِ این ترمینال همیشه باز است.",
    socials: [
      { name: "گیت‌هاب", handle: "github.com/Epodonios", href: "https://github.com/Epodonios", icon: "github" },
      { name: "تلگرام", handle: "@Epodonios", href: "https://t.me/Epodonios", icon: "telegram" },
      { name: "کانال تلگرام", handle: "کانال کانفیگ‌ها", href: "https://t.me/+NqWGD5-OGv1jOGU8", icon: "telegram" },
      { name: "ایمیل", handle: "Epodonios@gmail.com", href: "mailto:Epodonios@gmail.com", icon: "mail" },
    ],
    supportTitle: "حمایت از پروژه",
    supportBody: "اگر MEMENTO یا هر کدام از ابزارها به دردتان خورد، می‌توانید با یک حمایت کوچک کمک کنید تا امکانات بیشتری اضافه شود.",
    supportReymit: "حمایت با ریمیت (ایران)",
    supportUsdt: "USDT · TRC20",
    formTitle: "فرستادن پیام",
    nameLabel: "نام شما",
    namePlaceholder: "مثلاً: علی محمدی",
    emailLabel: "ایمیل",
    messageLabel: "پیام",
    messagePlaceholder: "از ایده‌تان بگویید؛ حتی اگر هنوز خام است…",
    send: "ارسال پیام",
    sentTitle: "پیام رسید!",
    sentBody: (name: string) => `ممنون ${name}! به‌زودی جواب می‌دهم. (این نسخه‌ی نمایشی است — فعلاً ایمیل مستقیم سریع‌تر است.)`,
    sendAnother: "ارسال پیام دیگر",
  },
  footer: {
    tagline: "طراحی و توسعه با ♥ برای شبکه‌ای آزادتر",
    hosted: "میزبانی روی",
    goodbye: "تا درودی دیگر ✦",
    copyright: "ساخته‌شده با react + vite + tailwind",
  },
  preloader: {
    lines: [
      "$ whoami",
      "epodonios — circumvention tools builder",
      "$ cat ~/.status",
      "در حال برقراری اتصال…",
      "$ npm run freedom",
      "✓ آماده",
    ],
    skip: "برای رد شدن کلیک کنید",
  },
  statusbar: {
    branch: "main",
    build: "build: passing",
    encodingLine: "UTF-8 · FA · LF",
    backToTop: "بازگشت به بالا",
  },
  cursor: { link: "باز کن", media: "نگاه", text: "تایپ" },
  chrome: { menuLabel: "منو", langLabel: "زبان" },
};

/* ================= English ================= */
export const CONTENT_EN: Content = {
  meta: {
    title: "EPODONIOS | Circumvention Tools Builder",
    description: "EPODONIOS — independent developer building MEMENTO, V2Ray/Xray tooling, Telegram automation, and a freer internet.",
  },
  nav: { about: "About", skills: "Skills", projects: "Projects", terminal: "Terminal", contact: "Contact", eggs: "Easter Eggs" },
  person: {
    name: "EPODONIOS",
    role: "Independent Developer — Circumvention Tooling",
    location: "Iran",
    email: "Epodonios@gmail.com",
    github: "https://github.com/Epodonios",
    version: "v3.0",
    statusNote: "Currently building MEMENTO",
    phrases: [
      "Building V2Ray / Xray tooling",
      "In love with a free, uncensored net",
      "Rust, Python & React developer",
      "Telegram automation tinkerer",
    ],
    heroBio:
      "I build from behind a filtered connection — which means I build exactly what I need every day. From Python scripts scraping configs to a full Rust + React desktop app: this is my work, my tools, and how to reach me.",
    buildingLabel: "Currently building:",
    building: "MEMENTO",
    bigLetter: "I",
    handle: "epodonios",
  },
  hero: {
    viewProjects: "View projects",
    githubProfile: "GitHub profile",
    terminalTitle: "epodonios@iran: ~",
    terminalLines: [
      "$ git clone epodonios/memento",
      "Cloning into 'memento'…",
      "remote: 3.1k⭐ on v2ray-configs ✓",
      "$ cat freedom.txt",
      "\"The internet should be free for everyone\"",
    ],
    terminalReady: "ready",
    tzLabel: "IRST",
  },
  marquee: [
    "V2Ray", "Xray-core", "Tauri", "Rust", "React", "TypeScript",
    "Python", "Telethon", "SQLite", "Docker", "Linux", "Git", "Open Internet",
  ],
  about: {
    num: "01",
    title: "About Me",
    en: "ABOUT ME",
    commitLabel: "git log:",
    commitValue: "hundreds of commits",
    quickFacts: [
      { label: "Location", value: "Iran" },
      { label: "Focus", value: "V2Ray / Xray" },
      { label: "Current build", value: "MEMENTO" },
      { label: "Status", value: "Actively building" },
    ],
    paragraphs: [
      "This is written from behind a filtered connection — the kind you have to work around every single day. That daily friction is exactly what pushed me toward building tools that make it easier for everyone else too.",
      "It started with a small Python script scraping V2Ray configs; that script now updates thousands of free configs every five minutes. Then came MEMENTO — starting as a single-file HTML page and growing into a full desktop app built with Tauri, Rust, and React.",
      "These days I split my time between polishing MEMENTO's interface, writing Telegram bots, and digging into circumvention techniques — SNI tunneling, domain fronting, Psiphon. If you're looking for a way around a block, there's a decent chance I'm already working on it.",
    ],
    stats: [
      { label: "GitHub stars", value: 3100, suffix: "+" },
      { label: "Followers", value: 436, suffix: "" },
      { label: "Public projects", value: 4, suffix: "+" },
      { label: "Cups of coffee", value: 0, suffix: "∞" },
    ],
    timelineHeading: "The road so far",
    timeline: [
      {
        year: "Start",
        title: "Config scraping",
        place: "Python scripts",
        desc: "A simple script scraping V2Ray configs from Telegram channels and sorting them by country.",
      },
      {
        year: "Growth",
        title: "Updating every 5 min",
        place: "v2ray-configs",
        desc: "That script grew into a full repo with thousands of free configs, multiple export formats, and automatic updates.",
      },
      {
        year: "Building",
        title: "From HTML to desktop",
        place: "MEMENTO",
        desc: "Started as a single-file HTML config manager, then fully rebuilt with Tauri, Rust, and Xray-core.",
      },
      {
        year: "Today",
        title: "Automation & bypass",
        place: "Current work",
        desc: "Building Telegram bots, researching WinDivert and SNI tunneling, and continuously improving MEMENTO.",
      },
    ],
    fuelLabel: "Runs on:",
    fuelNote: "Fresh coffee, a stable connection (finally), and bugs that get solved at 2am.",
  },
  skills: {
    num: "02",
    title: "Skills & Tools",
    en: "SKILL STACK",
    groups: [
      {
        title: "Protocols & Circumvention",
        icon: "tools",
        accent: "turq",
        items: [
          { name: "V2Ray / Xray-core", pct: 95 },
          { name: "Shadowsocks / Trojan", pct: 88 },
          { name: "SNI Tunneling / Domain Fronting", pct: 74 },
          { name: "WinDivert / Psiphon (research)", pct: 58 },
        ],
      },
      {
        title: "Desktop & Frontend",
        icon: "frontend",
        accent: "gold",
        items: [
          { name: "React / TypeScript", pct: 88 },
          { name: "Tauri / Rust", pct: 78 },
          { name: "Tailwind CSS", pct: 85 },
          { name: "UI/UX design", pct: 80 },
        ],
      },
      {
        title: "Automation & Backend",
        icon: "backend",
        accent: "turq",
        items: [
          { name: "Python", pct: 92 },
          { name: "Telethon / python-telegram-bot", pct: 90 },
          { name: "SQLite", pct: 75 },
          { name: "Git & Linux", pct: 85 },
        ],
      },
    ],
    learningLabel: "Currently learning:",
    learningItems: ["Reality / VLESS", "eBPF", "AI agents"],
    learningFooter: "Learning never really stops ✦",
    contribHeading: "A year in squares",
    contribSub: "contribution graph",
    less: "Less",
    more: "More",
    contribFooterPrefix: "Total contributions over the past 52 weeks:",
    contribFooterSuffix: "and this is just the beginning.",
    contribUnit: "contributions",
  },
  projects: {
    num: "03",
    title: "Selected Work",
    en: "SELECTED WORK",
    intro: "Every project started as a real, everyday need — getting around a block, or automating something repetitive. Scroll through and take a look.",
    starsLabel: "Stars",
    repoLabel: "Source",
    items: [
      {
        num: "01",
        productName: "MEMENTO",
        en: "V2Ray / Xray Desktop Manager",
        desc: "A Tauri + Rust desktop app for managing V2Ray/Xray configs. Iran Mode bypasses SNI-based filtering via domain fronting, with native TCP ping, auto-failover, and a glassmorphism UI.",
        tech: ["Tauri 2", "Rust", "React 19", "Xray-core", "Zustand"],
        year: "2025",
        stars: "New",
        repo: "https://github.com/Epodonios/MEMENTO",
        demo: "https://github.com/Epodonios/MEMENTO/releases",
        demoLabel: "Download",
        accent: "turq",
      },
      {
        num: "02",
        productName: "v2ray-configs",
        en: "Auto-Updating Config Aggregator",
        desc: "An automated repo of thousands of free V2Ray/Xray configs (VMess, VLess, Trojan, Shadowsocks, Hysteria2, TUIC), refreshed every five minutes with Base64, Clash, and Sing-Box exports.",
        tech: ["Python", "Requests", "GitHub Actions"],
        year: "2024",
        stars: "3.1k",
        repo: "https://github.com/Epodonios/v2ray-configs",
        demo: "https://github.com/Epodonios/v2ray-configs/raw/main/All_Configs_Sub.txt",
        demoLabel: "Sub link",
        accent: "gold",
      },
      {
        num: "03",
        productName: "bulk-xray-configs",
        en: "Region-Split Config Scraper",
        desc: "A Python scraper that pulls V2Ray configs from dozens of Telegram channels, sorts them by country, and saves each into its own folder.",
        tech: ["Python", "BeautifulSoup", "Telegram"],
        year: "2024",
        stars: "334",
        repo: "https://github.com/Epodonios/bulk-xray-v2ray-vless-vmess-...-configs",
        demo: "https://t.me/+NqWGD5-OGv1jOGU8",
        demoLabel: "Telegram channel",
        accent: "turq",
      },
      {
        num: "04",
        productName: "Telegram Automation",
        en: "Telegram Bot Suite",
        desc: "A pair of bots: a Telethon userbot that auto-fetches and formats lyrics as captions for a music channel, and an anonymous relay bot with a priority queue and three-language support.",
        tech: ["Python", "Telethon", "python-telegram-bot", "SQLite"],
        year: "2025",
        stars: "Personal",
        repo: "https://github.com/Epodonios",
        demo: "https://t.me/Epodonios",
        demoLabel: "Telegram",
        accent: "gold",
      },
    ],
  },
  terminal: {
    num: "04",
    title: "Talk to me — by typing!",
    en: "LIVE TERMINAL",
    desc: "Scrolling is so last year. This is an actually-live terminal — type a command, hit Enter, get an answer. Tab autocompletes, and arrow keys walk through history.",
    quickButtons: ["help", "whoami", "projects", "date", "coffee"],
    welcome: [
      { kind: "sys", text: "EPODONIOS personal terminal — v3.0 · welcome" },
      { kind: "out", text: "You can actually type here. Try the help command." },
    ],
    helpTitle: "Available commands:",
    help: [
      "  whoami    → about me",
      "  skills    → my skills",
      "  projects  → list of projects",
      "  contact   → ways to reach me",
      "  date      → current date & time",
      "  coffee    → a cup of coffee",
      "  clear     → clear the screen",
    ],
    whoami: [
      { kind: "ok", text: "EPODONIOS — circumvention tools builder" },
      { kind: "out", text: "Iran · loves a free internet, V2Ray, and Telegram automation" },
    ],
    skillsOut: [
      "Protocols: V2Ray · Xray-core · Shadowsocks · Trojan",
      "Desktop: Tauri · Rust · React · TypeScript",
      "Automation: Python · Telethon · SQLite · Git",
    ],
    projectsFooter: "See the full details in the projects section ↑",
    contactOut: [
      "Email: Epodonios@gmail.com",
      "GitHub: github.com/Epodonios",
      "Telegram: t.me/Epodonios",
    ],
    coffee: "☕ Fresh coffee brewed. Let's keep going!",
    secrets: "Access denied! Some things must stay geheim 😉",
    sudo: "Everyone's equal here — no sudo needed.",
    notFound: "command not found — try help",
    placeholder: "help",
    ariaLabel: "Terminal input",
    windowTitle: "interactive — epodonios@iran",
  },
  eggs: {
    num: "05",
    title: "Hidden Easter Eggs",
    en: "EASTER EGGS",
    intro: "This page is full of easter eggs — quotes, effects, and full theme takeovers that unlock when you type the right answer. Read the riddles and take a guess.",
    terminalOnlyNote: "⚠️ Only discoverable by typing in the terminal above — nowhere else on the page works.",
    progressLabel: "Discovered",
    searchPlaceholder: "Search riddles...",
    noResults: "No riddles match that search.",
    categoryTheme: "Full theme",
    categoryQuote: "Quote",
    foundLabel: "Found",
    lockedLabel: "Locked",
    filterAll: "All",
    filterFound: "Found",
    filterLocked: "Locked",
  },
  contact: {
    num: "06",
    title: "Let's build something",
    en: "GET IN TOUCH",
    intro: "Got an idea for getting around a block? Found a bug in MEMENTO? Or just want to say hi? This terminal's door is always open.",
    socials: [
      { name: "GitHub", handle: "github.com/Epodonios", href: "https://github.com/Epodonios", icon: "github" },
      { name: "Telegram", handle: "@Epodonios", href: "https://t.me/Epodonios", icon: "telegram" },
      { name: "Telegram Channel", handle: "configs channel", href: "https://t.me/+NqWGD5-OGv1jOGU8", icon: "telegram" },
      { name: "Email", handle: "Epodonios@gmail.com", href: "mailto:Epodonios@gmail.com", icon: "mail" },
    ],
    supportTitle: "Support the work",
    supportBody: "If MEMENTO or any of these tools made your life easier, a small bit of support helps add more features.",
    supportReymit: "Support via Reymit (Iran)",
    supportUsdt: "USDT · TRC20",
    formTitle: "Send a message",
    nameLabel: "Your name",
    namePlaceholder: "e.g. Alex Doe",
    emailLabel: "Email",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your idea, even if it's still rough…",
    send: "Send message",
    sentTitle: "Message received!",
    sentBody: (name: string) => `Thanks, ${name}! I'll get back to you soon. (This is a demo form — direct email is faster for now.)`,
    sendAnother: "Send another message",
  },
  footer: {
    tagline: "Designed & built with ♥ for a freer internet",
    hosted: "Hosted on",
    goodbye: "Until next time ✦",
    copyright: "built with react + vite + tailwind",
  },
  preloader: {
    lines: [
      "$ whoami",
      "epodonios — circumvention tools builder",
      "$ cat ~/.status",
      "Establishing connection…",
      "$ npm run freedom",
      "✓ ready",
    ],
    skip: "Click to skip",
  },
  statusbar: {
    branch: "main",
    build: "build: passing",
    encodingLine: "UTF-8 · EN · LF",
    backToTop: "Back to top",
  },
  cursor: { link: "Open", media: "View", text: "Type" },
  chrome: { menuLabel: "Menu", langLabel: "Language" },
};

/* ================= Türkçe ================= */
export const CONTENT_TR: Content = {
  meta: {
    title: "EPODONIOS | Sansür Aşma Araçları Geliştiricisi",
    description: "EPODONIOS — MEMENTO'yu, V2Ray/Xray araçlarını, Telegram otomasyonunu ve daha özgür bir interneti inşa eden bağımsız geliştirici.",
  },
  nav: { about: "Hakkımda", skills: "Yetenekler", projects: "Projeler", terminal: "Terminal", contact: "İletişim", eggs: "Gizli Sürprizler" },
  person: {
    name: "EPODONIOS",
    role: "Bağımsız Geliştirici — Sansür Aşma Araçları",
    location: "İran",
    email: "Epodonios@gmail.com",
    github: "https://github.com/Epodonios",
    version: "v3.0",
    statusNote: "Şu anda MEMENTO'yu geliştiriyorum",
    phrases: [
      "V2Ray / Xray araçları geliştiriyorum",
      "Özgür, sansürsüz internete âşığım",
      "Rust, Python ve React geliştiricisi",
      "Telegram otomasyonuyla uğraşıyorum",
    ],
    heroBio:
      "Filtrelenmiş bir bağlantının arkasından geliştiriyorum — yani her gün tam olarak ihtiyacım olanı inşa ediyorum. Konfigürasyon toplayan Python betiklerinden Rust + React ile yazılmış tam bir masaüstü uygulamasına kadar: işte işlerim, araçlarım ve bana ulaşma yolları.",
    buildingLabel: "Şu anda üzerinde çalışılan:",
    building: "MEMENTO",
    bigLetter: "F",
    handle: "epodonios",
  },
  hero: {
    viewProjects: "Projeleri gör",
    githubProfile: "GitHub profili",
    terminalTitle: "epodonios@iran: ~",
    terminalLines: [
      "$ git clone epodonios/memento",
      "Cloning into 'memento'…",
      "remote: v2ray-configs'te 3.1k⭐ ✓",
      "$ cat freedom.txt",
      "\"İnternet herkes için özgür olmalı\"",
    ],
    terminalReady: "hazır",
    tzLabel: "IRST",
  },
  marquee: [
    "V2Ray", "Xray-core", "Tauri", "Rust", "React", "TypeScript",
    "Python", "Telethon", "SQLite", "Docker", "Linux", "Git", "Özgür İnternet",
  ],
  about: {
    num: "01",
    title: "Hakkımda",
    en: "ABOUT ME",
    commitLabel: "git log:",
    commitValue: "yüzlerce commit",
    quickFacts: [
      { label: "Konum", value: "İran" },
      { label: "Odak", value: "V2Ray / Xray" },
      { label: "Güncel proje", value: "MEMENTO" },
      { label: "Durum", value: "Aktif geliştiriliyor" },
    ],
    paragraphs: [
      "Bu satırlar filtrelenmiş bir bağlantının arkasından yazılıyor — her gün etrafından dolaşmak zorunda kaldığınız türden bir engel. Tam olarak bu günlük sürtünme, başkalarının işini de kolaylaştıracak araçlar geliştirmeye itti beni.",
      "Her şey V2Ray konfigürasyonlarını toplayan küçük bir Python betiğiyle başladı; o betik artık her beş dakikada binlerce ücretsiz konfigürasyonu güncelliyor. Ardından MEMENTO geldi — tek dosyalık bir HTML sayfası olarak başlayıp Tauri, Rust ve React ile tam bir masaüstü uygulamasına dönüştü.",
      "Bugünlerde zamanımı MEMENTO'nun arayüzünü cilalamak, Telegram botları yazmak ve sansür aşma tekniklerini (SNI tünelleme, domain fronting, Psiphon) araştırmak arasında paylaştırıyorum. Bir engeli aşmanın bir yolunu arıyorsanız, büyük ihtimalle üzerinde çalışıyorumdur.",
    ],
    stats: [
      { label: "GitHub yıldızı", value: 3100, suffix: "+" },
      { label: "Takipçi", value: 436, suffix: "" },
      { label: "Genel proje", value: 4, suffix: "+" },
      { label: "Fincan kahve", value: 0, suffix: "∞" },
    ],
    timelineHeading: "Buraya kadar gelen yol",
    timeline: [
      {
        year: "Başlangıç",
        title: "Konfigürasyon toplama",
        place: "Python betikleri",
        desc: "Telegram kanallarından V2Ray konfigürasyonlarını toplayıp ülkeye göre sıralayan basit bir betik.",
      },
      {
        year: "Büyüme",
        title: "5 dakikada bir güncelleme",
        place: "v2ray-configs",
        desc: "O betik, binlerce ücretsiz konfigürasyon, birden fazla dışa aktarma formatı ve otomatik güncellemelerle tam bir depoya dönüştü.",
      },
      {
        year: "İnşa",
        title: "HTML'den masaüstüne",
        place: "MEMENTO",
        desc: "Tek dosyalık bir HTML konfigürasyon yöneticisi olarak başladı, ardından Tauri, Rust ve Xray-core ile tamamen yeniden inşa edildi.",
      },
      {
        year: "Bugün",
        title: "Otomasyon ve aşma",
        place: "Güncel çalışmalar",
        desc: "Telegram botları geliştirmek, WinDivert ve SNI tünellemeyi araştırmak ve MEMENTO'yu sürekli iyileştirmek.",
      },
    ],
    fuelLabel: "Yakıtı:",
    fuelNote: "Taze kahve, (sonunda) kararlı bir bağlantı ve gece 2'de çözülen bug'lar.",
  },
  skills: {
    num: "02",
    title: "Yetenekler ve Araçlar",
    en: "SKILL STACK",
    groups: [
      {
        title: "Protokoller ve Sansür Aşma",
        icon: "tools",
        accent: "turq",
        items: [
          { name: "V2Ray / Xray-core", pct: 95 },
          { name: "Shadowsocks / Trojan", pct: 88 },
          { name: "SNI Tünelleme / Domain Fronting", pct: 74 },
          { name: "WinDivert / Psiphon (araştırma)", pct: 58 },
        ],
      },
      {
        title: "Masaüstü ve Frontend",
        icon: "frontend",
        accent: "gold",
        items: [
          { name: "React / TypeScript", pct: 88 },
          { name: "Tauri / Rust", pct: 78 },
          { name: "Tailwind CSS", pct: 85 },
          { name: "UI/UX tasarımı", pct: 80 },
        ],
      },
      {
        title: "Otomasyon ve Backend",
        icon: "backend",
        accent: "turq",
        items: [
          { name: "Python", pct: 92 },
          { name: "Telethon / python-telegram-bot", pct: 90 },
          { name: "SQLite", pct: 75 },
          { name: "Git ve Linux", pct: 85 },
        ],
      },
    ],
    learningLabel: "Şu anda öğreniliyor:",
    learningItems: ["Reality / VLESS", "eBPF", "Yapay zekâ ajanları"],
    learningFooter: "Öğrenmek asla bitmiyor ✦",
    contribHeading: "Karelerde bir yıl",
    contribSub: "contribution graph",
    less: "Az",
    more: "Çok",
    contribFooterPrefix: "Son 52 haftadaki toplam katkı:",
    contribFooterSuffix: "ve bu daha başlangıç.",
    contribUnit: "katkı",
  },
  projects: {
    num: "03",
    title: "Seçilmiş Çalışmalar",
    en: "SELECTED WORK",
    intro: "Her proje gerçek, gündelik bir ihtiyaçla başladı — bir engeli aşmak ya da tekrar eden bir işi otomatikleştirmek. Kaydırarak göz atın.",
    starsLabel: "Yıldız",
    repoLabel: "Kaynak kodu",
    items: [
      {
        num: "01",
        productName: "MEMENTO",
        en: "V2Ray / Xray Masaüstü Yöneticisi",
        desc: "V2Ray/Xray konfigürasyonlarını yönetmek için Tauri + Rust masaüstü uygulaması. İran Modu, domain fronting ile SNI tabanlı filtrelemeyi aşar; native TCP ping, otomatik yedekleme ve glassmorphism arayüz içerir.",
        tech: ["Tauri 2", "Rust", "React 19", "Xray-core", "Zustand"],
        year: "2025",
        stars: "Yeni",
        repo: "https://github.com/Epodonios/MEMENTO",
        demo: "https://github.com/Epodonios/MEMENTO/releases",
        demoLabel: "İndir",
        accent: "turq",
      },
      {
        num: "02",
        productName: "v2ray-configs",
        en: "Otomatik Güncellenen Konfigürasyon Deposu",
        desc: "Binlerce ücretsiz V2Ray/Xray konfigürasyonundan (VMess, VLess, Trojan, Shadowsocks, Hysteria2, TUIC) oluşan, her beş dakikada güncellenen ve Base64, Clash, Sing-Box formatlarında dışa aktarılan otomatik bir depo.",
        tech: ["Python", "Requests", "GitHub Actions"],
        year: "2024",
        stars: "3.1k",
        repo: "https://github.com/Epodonios/v2ray-configs",
        demo: "https://github.com/Epodonios/v2ray-configs/raw/main/All_Configs_Sub.txt",
        demoLabel: "Abonelik linki",
        accent: "gold",
      },
      {
        num: "03",
        productName: "bulk-xray-configs",
        en: "Bölgeye Göre Ayrılmış Toplayıcı",
        desc: "Onlarca Telegram kanalından V2Ray konfigürasyonları çeken, ülkeye göre sıralayan ve her birini kendi klasörüne kaydeden bir Python betiği.",
        tech: ["Python", "BeautifulSoup", "Telegram"],
        year: "2024",
        stars: "334",
        repo: "https://github.com/Epodonios/bulk-xray-v2ray-vless-vmess-...-configs",
        demo: "https://t.me/+NqWGD5-OGv1jOGU8",
        demoLabel: "Telegram kanalı",
        accent: "turq",
      },
      {
        num: "04",
        productName: "Telegram Otomasyonu",
        en: "Telegram Bot Paketi",
        desc: "İki bot: bir müzik kanalındaki gönderilere şarkı sözlerini otomatik alıp altyazı olarak ekleyen bir Telethon userbot'u ve öncelik kuyruklu, üç dilli anonim bir aktarma botu.",
        tech: ["Python", "Telethon", "python-telegram-bot", "SQLite"],
        year: "2025",
        stars: "Kişisel",
        repo: "https://github.com/Epodonios",
        demo: "https://t.me/Epodonios",
        demoLabel: "Telegram",
        accent: "gold",
      },
    ],
  },
  terminal: {
    num: "04",
    title: "Benimle konuş — yazarak!",
    en: "LIVE TERMINAL",
    desc: "Kaydırmak eski moda oldu artık. Bu gerçekten canlı bir terminal — bir komut yazın, Enter'a basın, cevap alın. Tab ile tamamlanır, ok tuşlarıyla geçmişte gezinirsiniz.",
    quickButtons: ["help", "whoami", "projects", "date", "coffee"],
    welcome: [
      { kind: "sys", text: "EPODONIOS kişisel terminali — v3.0 · hoş geldiniz" },
      { kind: "out", text: "Burada gerçekten yazabilirsiniz. help komutunu deneyin." },
    ],
    helpTitle: "Kullanılabilir komutlar:",
    help: [
      "  whoami    → hakkımda",
      "  skills    → yeteneklerim",
      "  projects  → proje listesi",
      "  contact   → iletişim yolları",
      "  date      → tarih ve saat",
      "  coffee    → bir fincan kahve",
      "  clear     → ekranı temizle",
    ],
    whoami: [
      { kind: "ok", text: "EPODONIOS — sansür aşma araçları geliştiricisi" },
      { kind: "out", text: "İran · özgür internet, V2Ray ve Telegram otomasyonunu seviyor" },
    ],
    skillsOut: [
      "Protokoller: V2Ray · Xray-core · Shadowsocks · Trojan",
      "Masaüstü: Tauri · Rust · React · TypeScript",
      "Otomasyon: Python · Telethon · SQLite · Git",
    ],
    projectsFooter: "Tüm detaylar için projeler bölümüne bakın ↑",
    contactOut: [
      "E-posta: Epodonios@gmail.com",
      "GitHub: github.com/Epodonios",
      "Telegram: t.me/Epodonios",
    ],
    coffee: "☕ Taze kahve demlendi. Devam edelim!",
    secrets: "Erişim reddedildi! Bazı şeyler geheim kalmalı 😉",
    sudo: "Burada herkes eşit; sudo'ya gerek yok.",
    notFound: "komut bulunamadı — help yazın",
    placeholder: "help",
    ariaLabel: "Terminal girişi",
    windowTitle: "interactive — epodonios@iran",
  },
  eggs: {
    num: "05",
    title: "Gizli Sürprizler",
    en: "EASTER EGGS",
    intro: "Bu sayfa easter egg'lerle dolu — doğru cevabı yazınca açılan alıntılar, efektler ve tam tema değişimleri. Bilmeceleri okuyun ve tahmin edin.",
    terminalOnlyNote: "⚠️ Sadece yukarıdaki terminale yazarak bulunabilirler — sayfanın başka hiçbir yerinde çalışmaz.",
    progressLabel: "Bulundu",
    searchPlaceholder: "Bilmecelerde ara...",
    noResults: "Bu aramayla eşleşen bilmece yok.",
    categoryTheme: "Tam tema",
    categoryQuote: "Alıntı",
    foundLabel: "Bulundu",
    lockedLabel: "Kilitli",
    filterAll: "Tümü",
    filterFound: "Bulunanlar",
    filterLocked: "Kilitliler",
  },
  contact: {
    num: "06",
    title: "Birlikte bir şeyler yapalım",
    en: "GET IN TOUCH",
    intro: "Bir engeli aşmak için bir fikriniz mi var? MEMENTO'da bir hata mı buldunuz? Ya da sadece merhaba mı demek istiyorsunuz? Bu terminalin kapısı her zaman açık.",
    socials: [
      { name: "GitHub", handle: "github.com/Epodonios", href: "https://github.com/Epodonios", icon: "github" },
      { name: "Telegram", handle: "@Epodonios", href: "https://t.me/Epodonios", icon: "telegram" },
      { name: "Telegram Kanalı", handle: "konfigürasyon kanalı", href: "https://t.me/+NqWGD5-OGv1jOGU8", icon: "telegram" },
      { name: "E-posta", handle: "Epodonios@gmail.com", href: "mailto:Epodonios@gmail.com", icon: "mail" },
    ],
    supportTitle: "Çalışmayı destekle",
    supportBody: "MEMENTO ya da bu araçlardan biri işinize yaradıysa, küçük bir destek daha fazla özellik eklemeye yardımcı olur.",
    supportReymit: "Reymit ile destekle (İran)",
    supportUsdt: "USDT · TRC20",
    formTitle: "Mesaj gönder",
    nameLabel: "Adınız",
    namePlaceholder: "örn. Ahmet Yılmaz",
    emailLabel: "E-posta",
    messageLabel: "Mesaj",
    messagePlaceholder: "Fikrinizi anlatın, henüz taslak olsa bile…",
    send: "Mesajı gönder",
    sentTitle: "Mesaj alındı!",
    sentBody: (name: string) => `Teşekkürler, ${name}! Yakında dönüş yapacağım. (Bu bir demo formdur — şimdilik doğrudan e-posta daha hızlı.)`,
    sendAnother: "Başka bir mesaj gönder",
  },
  footer: {
    tagline: "Daha özgür bir internet için ♥ ile tasarlandı",
    hosted: "Barındırılıyor:",
    goodbye: "Bir dahaki sefere kadar ✦",
    copyright: "react + vite + tailwind ile inşa edildi",
  },
  preloader: {
    lines: [
      "$ whoami",
      "epodonios — circumvention tools builder",
      "$ cat ~/.status",
      "Bağlantı kuruluyor…",
      "$ npm run freedom",
      "✓ hazır",
    ],
    skip: "Atlamak için tıklayın",
  },
  statusbar: {
    branch: "main",
    build: "build: passing",
    encodingLine: "UTF-8 · TR · LF",
    backToTop: "Başa dön",
  },
  cursor: { link: "Aç", media: "Bak", text: "Yaz" },
  chrome: { menuLabel: "Menü", langLabel: "Dil" },
};
