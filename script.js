/* ==========================================================================
   Real Tech (ريل تك) — script.js
   - Bilingual AR/EN switch (data-i18n / data-i18n-aria + translations object)
   - WhatsApp links with a prefilled message in the active language
   - Mobile menu, FAQ accordion, scroll reveal, header shadow, active nav link
   No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Settings ---------- */
  var WA_NUMBER = '8801621445454';
  var STORAGE_KEY = 'realtech-lang';
  var DEFAULT_LANG = 'ar';

  /* ---------- Translations ----------
     Arabic text is also written in index.html (for no-JS visitors and SEO).
     If you edit Arabic copy, update it in both places. */
  var translations = {
    ar: {
      'meta.title': 'ريل تك | تصميم وتطوير المواقع الإلكترونية للشركات',
      'meta.description': 'ريل تك: تصميم وتطوير مواقع إلكترونية احترافية باللغتين العربية والإنجليزية، إصلاح أخطاء المواقع، ودعم فني مستمر للشركات والعيادات والمكاتب في السعودية والخليج.',
      'meta.ogDescription': 'مواقع احترافية سريعة باللغتين العربية والإنجليزية، إصلاح أخطاء المواقع، ودعم فني مستمر. تواصل معنا عبر واتساب.',
      'meta.locale': 'ar_AR',

      'wa.general': 'السلام عليكم، أرغب في الاستفسار عن خدمات تصميم المواقع.',
      'wa.service': 'السلام عليكم، أرغب في طلب خدمة: {service}.',

      'skip': 'تخطَّ إلى المحتوى',
      'aria.home': 'ريل تك - الصفحة الرئيسية',
      'aria.nav': 'القائمة الرئيسية',
      'aria.lang': 'اختيار اللغة',
      'aria.menuOpen': 'فتح القائمة',
      'aria.menuClose': 'إغلاق القائمة',
      'aria.waFloat': 'تواصل معنا عبر واتساب',

      'nav.home': 'الرئيسية',
      'nav.services': 'خدماتنا',
      'nav.why': 'لماذا نحن',
      'nav.how': 'آلية العمل',
      'nav.work': 'نماذج أعمال',
      'nav.contact': 'تواصل معنا',
      'header.wa': 'واتساب',

      'hero.badge': 'تصميم • تطوير • دعم فني',
      'hero.title': 'نبني لك موقعاً إلكترونياً احترافياً يجلب لك عملاء أكثر',
      'hero.sub': 'تصميم وتطوير المواقع، إصلاح الأخطاء، ودعم فني مستمر — بسرعة وجودة وبأسعار مناسبة.',
      'hero.cta1': 'تواصل معنا عبر واتساب',
      'hero.cta2': 'شاهد خدماتنا',
      'hero.p1': 'عربي وإنجليزي',
      'hero.p2': 'متوافق مع الجوال',
      'hero.p3': 'تواصل مباشر',

      'mock.title': 'موقعك الاحترافي',
      'mock.btn': 'احجز الآن',
      'mock.btn2': 'اتصل بنا',
      'mock.welcome': 'مرحباً بك',

      'services.eyebrow': 'خدماتنا',
      'services.title': 'كل ما يحتاجه موقعك في مكان واحد',
      'services.sub': 'خدمات واضحة تساعد نشاطك التجاري على الظهور بشكل احترافي على الإنترنت.',
      's1.title': 'تصميم وتطوير المواقع',
      's1.desc': 'مواقع سريعة ومتوافقة مع الجوال باللغتين العربية والإنجليزية للشركات والعيادات والمكاتب.',
      's1.b1': 'تصميم مخصص لهوية نشاطك',
      's1.b2': 'سرعة تحميل عالية',
      's1.b3': 'تهيئة أساسية لمحركات البحث (SEO)',
      's2.title': 'إصلاح أخطاء المواقع',
      's2.desc': 'نكتشف المشكلة ونصلحها: بطء الموقع، أعطال، أخطاء النماذج، ومشاكل العرض على الجوال.',
      's2.b1': 'تشخيص واضح للمشكلة قبل البدء',
      's2.b2': 'تحسين سرعة الموقع',
      's2.b3': 'إصلاح مشاكل العرض على الجوال',
      's3.title': 'الدعم الفني للمواقع',
      's3.desc': 'صيانة وتحديثات ونسخ احتياطية ومتابعة شهرية ليبقى موقعك يعمل بكفاءة.',
      's3.b1': 'تحديث المحتوى والإضافات',
      's3.b2': 'نسخ احتياطية منتظمة',
      's3.b3': 'متابعة شهرية للموقع',
      'btn.request': 'اطلب الخدمة',

      'why.eyebrow': 'لماذا ريل تك؟',
      'why.title': 'شريك تقني يفهم احتياجك',
      'w1.title': 'تصميم عربي أولاً',
      'w1.desc': 'اتجاه من اليمين لليسار مضبوط بعناية، وخطوط عربية واضحة، ونسخة إنجليزية عند الحاجة.',
      'w2.title': 'سريع ومتوافق مع الجوال',
      'w2.desc': 'مواقع خفيفة تعمل بسلاسة على الجوال، حيث يتصفح أغلب عملائك.',
      'w3.title': 'تواصل مباشر عبر واتساب',
      'w3.desc': 'تتحدث مباشرة مع من ينفّذ عملك، دون وسطاء أو تأخير.',
      'w4.title': 'الموقع والنطاق ملكك',
      'w4.desc': 'يُسجَّل النطاق باسمك، وتحصل على ملفات موقعك وصلاحيات الدخول كاملة.',

      'how.eyebrow': 'آلية العمل',
      'how.title': 'أربع خطوات بسيطة لإطلاق موقعك',
      'h1.title': 'تواصل معنا عبر واتساب',
      'h1.desc': 'أخبرنا عن نشاطك وما تحتاجه من موقعك.',
      'h2.title': 'نرسل لك تصوراً مبدئياً',
      'h2.desc': 'نشاركك فكرة أو نموذجاً أولياً للتصميم قبل البدء في التنفيذ.',
      'h3.title': 'ننفّذ ونراجع معك',
      'h3.desc': 'نبني الموقع ونعدّله حسب ملاحظاتك حتى يصبح جاهزاً.',
      'h4.title': 'الإطلاق والدعم المستمر',
      'h4.desc': 'نطلق موقعك ونبقى معك للدعم والتحديثات.',

      'work.eyebrow': 'نماذج أعمال',
      'work.title': 'أمثلة على ما يمكن أن نصممه لك',
      'work.note': 'هذه نماذج تصميم توضيحية وليست مواقع لعملاء حقيقيين.',
      'work.label': 'نموذج تصميم',
      'm.call': 'اتصل بنا',
      'm1.brand': 'عيادة الأسنان',
      'm1.h': 'ابتسامة صحية تبدأ هنا',
      'm1.btn': 'احجز موعداً',
      'm2.brand': 'وسيط عقاري',
      'm2.h': 'اعثر على منزلك القادم',
      'm2.btn': 'تصفح العقارات',
      'm3.brand': 'مقاولات وصيانة',
      'm3.h': 'نبني ونصون بجودة',
      'm3.btn': 'اطلب عرض سعر',
      'p1.title': 'موقع عيادة أسنان',
      'p1.desc': 'حجز مواعيد سهل، عرض الخدمات، وموقع العيادة على الخريطة.',
      'p2.title': 'ملف أعمال وسيط عقاري',
      'p2.desc': 'عرض العقارات بالصور والتفاصيل مع زر تواصل مباشر.',
      'p3.title': 'شركة مقاولات وصيانة',
      'p3.desc': 'عرض المشاريع والخدمات وطلب عرض سعر بسهولة.',

      'faq.eyebrow': 'الأسئلة الشائعة',
      'faq.title': 'إجابات على أكثر الأسئلة تكراراً',
      'faq.q1': 'كم يستغرق إنشاء الموقع؟',
      'faq.a1': 'يعتمد ذلك على حجم الموقع وعدد الصفحات. نوضّح لك المدة المتوقعة بعد فهم احتياجك وقبل البدء.',
      'faq.q2': 'هل تصممون مواقع باللغتين العربية والإنجليزية؟',
      'faq.a2': 'نعم، نصمم مواقع عربية بالكامل أو ثنائية اللغة، مع ضبط اتجاه النص لكل لغة بشكل صحيح.',
      'faq.q3': 'من يملك النطاق (الدومين) والموقع؟',
      'faq.a3': 'أنت المالك. يُسجَّل النطاق باسمك، وتحصل على ملفات الموقع وصلاحيات الدخول.',
      'faq.q4': 'هل تقدمون دعماً فنياً شهرياً؟',
      'faq.a4': 'نعم، نقدم دعماً شهرياً يشمل الصيانة والتحديثات والنسخ الاحتياطية، ونحدد التفاصيل حسب احتياج موقعك.',
      'faq.q5': 'كيف أبدأ؟',
      'faq.a5': 'أرسل لنا رسالة على واتساب واذكر نشاطك وما تحتاجه، وسنرد عليك لمناقشة التفاصيل.',
      'faq.q6': 'أين يقع مكتبكم؟',
      'faq.a6': 'مكتبنا في دكا، بنغلاديش. نعمل مع عملائنا في المملكة العربية السعودية ودول الخليج عن بُعد، ونتواصل معهم مباشرة عبر واتساب في كل مراحل المشروع.',
      'addr.label': 'عنوان مكتبنا',

      'cta.title': 'ابدأ مشروعك اليوم',
      'cta.sub': 'أرسل لنا رسالة على واتساب وسنرد عليك في أقرب وقت لمناقشة احتياجك.',
      'cta.btn': 'راسلنا على واتساب',
      'cta.numLabel': 'رقم الواتساب:',

      'footer.desc': 'تصميم وتطوير المواقع، إصلاح الأخطاء، والدعم الفني للشركات والعيادات والمكاتب.',
      'footer.links': 'روابط سريعة',
      'footer.contact': 'تواصل',
      'footer.serve': 'نخدم العملاء في المملكة العربية السعودية ودول الخليج عن بُعد',
      'footer.rights': 'جميع الحقوق محفوظة'
    },

    en: {
      'meta.title': 'Real Tech | Professional Website Design & Development',
      'meta.description': 'Real Tech builds fast, mobile-friendly websites in Arabic and English, fixes website bugs and provides ongoing support for companies, clinics and offices in Saudi Arabia and the Gulf.',
      'meta.ogDescription': 'Fast, professional websites in Arabic and English, website bug fixing and ongoing support. Contact us on WhatsApp.',
      'meta.locale': 'en_US',

      'wa.general': 'Hello, I\'d like to ask about your website services.',
      'wa.service': 'Hello, I\'d like to request your {service} service.',

      'skip': 'Skip to content',
      'aria.home': 'Real Tech - Home',
      'aria.nav': 'Main navigation',
      'aria.lang': 'Choose language',
      'aria.menuOpen': 'Open menu',
      'aria.menuClose': 'Close menu',
      'aria.waFloat': 'Chat with us on WhatsApp',

      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.why': 'Why Us',
      'nav.how': 'How We Work',
      'nav.work': 'Sample Work',
      'nav.contact': 'Contact',
      'header.wa': 'WhatsApp',

      'hero.badge': 'Design • Development • Support',
      'hero.title': 'We build you a professional website that brings you more customers',
      'hero.sub': 'Website design and development, bug fixing and ongoing technical support — fast, high quality and fairly priced.',
      'hero.cta1': 'Contact us on WhatsApp',
      'hero.cta2': 'View our services',
      'hero.p1': 'Arabic & English',
      'hero.p2': 'Mobile-friendly',
      'hero.p3': 'Direct contact',

      'mock.title': 'Your new website',
      'mock.btn': 'Book now',
      'mock.btn2': 'Call us',
      'mock.welcome': 'Welcome',

      'services.eyebrow': 'Our Services',
      'services.title': 'Everything your website needs, in one place',
      'services.sub': 'Clear, practical services that help your business look professional online.',
      's1.title': 'Website Building',
      's1.desc': 'Fast, mobile-friendly websites in Arabic and English for companies, clinics and offices.',
      's1.b1': 'Custom design for your brand',
      's1.b2': 'Fast loading',
      's1.b3': 'Basic search engine (SEO) setup',
      's2.title': 'Website Bug Fixing',
      's2.desc': 'We find the problem and fix it: slow pages, crashes, broken forms and mobile display issues.',
      's2.b1': 'Clear diagnosis before we start',
      's2.b2': 'Website speed improvements',
      's2.b3': 'Mobile display fixes',
      's3.title': 'Website Support',
      's3.desc': 'Maintenance, updates, backups and monthly follow-up to keep your website running smoothly.',
      's3.b1': 'Content and plugin updates',
      's3.b2': 'Regular backups',
      's3.b3': 'Monthly website check-ups',
      'btn.request': 'Request service',

      'why.eyebrow': 'Why Real Tech?',
      'why.title': 'A tech partner who understands your needs',
      'w1.title': 'Arabic-first design',
      'w1.desc': 'Right-to-left layout done properly, clear Arabic typography, plus an English version when you need it.',
      'w2.title': 'Fast and mobile-friendly',
      'w2.desc': 'Lightweight websites that run smoothly on phones, where most of your customers browse.',
      'w3.title': 'Direct WhatsApp communication',
      'w3.desc': 'You talk directly to the people doing the work, with no middlemen and no delays.',
      'w4.title': 'You own your domain and website',
      'w4.desc': 'Your domain is registered in your name, and you get your website files and full access.',

      'how.eyebrow': 'How We Work',
      'how.title': 'Four simple steps to launch your website',
      'h1.title': 'Contact us on WhatsApp',
      'h1.desc': 'Tell us about your business and what you need from your website.',
      'h2.title': 'We send you a preview',
      'h2.desc': 'We share a concept or first design preview before we start building.',
      'h3.title': 'We build and review with you',
      'h3.desc': 'We build the website and refine it based on your feedback until it is ready.',
      'h4.title': 'Launch and ongoing support',
      'h4.desc': 'We launch your website and stay with you for support and updates.',

      'work.eyebrow': 'Sample Work',
      'work.title': 'Examples of what we can design for you',
      'work.note': 'These are illustrative design concepts, not real client websites.',
      'work.label': 'Sample concept',
      'm.call': 'Call us',
      'm1.brand': 'Dental Clinic',
      'm1.h': 'A healthy smile starts here',
      'm1.btn': 'Book a visit',
      'm2.brand': 'Real Estate Agent',
      'm2.h': 'Find your next home',
      'm2.btn': 'View listings',
      'm3.brand': 'Contracting & Maintenance',
      'm3.h': 'Built and maintained with quality',
      'm3.btn': 'Get a quote',
      'p1.title': 'Dental clinic website',
      'p1.desc': 'Easy appointment booking, a clear list of services and the clinic location on a map.',
      'p2.title': 'Real estate agent portfolio',
      'p2.desc': 'Property listings with photos and details, plus a direct contact button.',
      'p3.title': 'Contracting & maintenance company',
      'p3.desc': 'Projects, services and an easy quote request.',

      'faq.eyebrow': 'FAQ',
      'faq.title': 'Answers to common questions',
      'faq.q1': 'How long does a website take?',
      'faq.a1': 'It depends on the size of the website and the number of pages. We give you an expected timeline once we understand your needs, before we start.',
      'faq.q2': 'Do you build websites in Arabic and English?',
      'faq.a2': 'Yes. We build fully Arabic or bilingual websites, with the text direction set correctly for each language.',
      'faq.q3': 'Who owns the domain and the website?',
      'faq.a3': 'You do. The domain is registered in your name, and you receive the website files and access.',
      'faq.q4': 'Do you offer monthly support?',
      'faq.a4': 'Yes. We offer monthly support covering maintenance, updates and backups, tailored to what your website needs.',
      'faq.q5': 'How do I get started?',
      'faq.a5': 'Send us a WhatsApp message about your business and what you need, and we will get back to you to discuss the details.',
      'faq.q6': 'Where is your office?',
      'faq.a6': 'Our office is in Dhaka, Bangladesh. We work with clients in Saudi Arabia and the Gulf remotely and stay in direct contact with them on WhatsApp at every stage of the project.',
      'addr.label': 'Our office address',

      'cta.title': 'Start your project today',
      'cta.sub': 'Send us a WhatsApp message and we will get back to you as soon as possible to discuss your needs.',
      'cta.btn': 'Message us on WhatsApp',
      'cta.numLabel': 'WhatsApp number:',

      'footer.desc': 'Website design and development, bug fixing and technical support for companies, clinics and offices.',
      'footer.links': 'Quick links',
      'footer.contact': 'Contact',
      'footer.serve': 'Serving clients in Saudi Arabia and the Gulf remotely',
      'footer.rights': 'All rights reserved'
    }
  };

  var root = document.documentElement;
  var currentLang = DEFAULT_LANG;

  /* ---------- Helpers ---------- */
  function $all(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function storageGet() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function storageSet(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* private mode etc. */ }
  }

  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el && value) el.setAttribute('content', value);
  }

  function waUrl(message) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ---------- Language ---------- */
  function applyLanguage(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    var t = translations[lang];
    currentLang = lang;

    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // <head> metadata
    document.title = t['meta.title'];
    setMeta('meta[name="description"]', t['meta.description']);
    setMeta('meta[property="og:title"]', t['meta.title']);
    setMeta('meta[property="og:description"]', t['meta.ogDescription']);
    setMeta('meta[name="twitter:title"]', t['meta.title']);
    setMeta('meta[name="twitter:description"]', t['meta.ogDescription']);
    setMeta('meta[property="og:locale"]', t['meta.locale']);
    setMeta('meta[property="og:locale:alternate"]', lang === 'ar' ? 'en_US' : 'ar_AR');

    // Visible text
    $all('[data-i18n]').forEach(function (el) {
      var value = t[el.getAttribute('data-i18n')];
      if (value !== undefined) el.textContent = value;
    });

    // Accessible names
    $all('[data-i18n-aria]').forEach(function (el) {
      var value = t[el.getAttribute('data-i18n-aria')];
      if (value !== undefined) el.setAttribute('aria-label', value);
    });

    // WhatsApp links: "general" or a service key (s1, s2, s3)
    $all('[data-wa]').forEach(function (el) {
      var key = el.getAttribute('data-wa');
      var message = key === 'general'
        ? t['wa.general']
        : t['wa.service'].replace('{service}', t[key + '.title'] || '');
      el.setAttribute('href', waUrl(message));
    });

    // Toggle state
    $all('.lang-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    updateMenuLabel();
  }

  $all('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      if (lang === currentLang) return;
      applyLanguage(lang);
      storageSet(lang);
    });
  });

  /* ---------- Mobile menu ---------- */
  var header = document.getElementById('site-header');
  var nav = document.getElementById('site-nav');
  var menuBtn = document.querySelector('.menu-toggle');

  function isMenuOpen() {
    return menuBtn && menuBtn.getAttribute('aria-expanded') === 'true';
  }

  function updateMenuLabel() {
    if (!menuBtn) return;
    var t = translations[currentLang];
    menuBtn.setAttribute('aria-label', isMenuOpen() ? t['aria.menuClose'] : t['aria.menuOpen']);
  }

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    updateMenuLabel();
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () { setMenu(!isMenuOpen()); });

    // Close after choosing a link
    $all('a', nav).forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    // Escape closes and returns focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen()) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    // Click outside the header closes the menu
    document.addEventListener('click', function (e) {
      if (isMenuOpen() && header && !header.contains(e.target)) setMenu(false);
    });

    // Switching to desktop layout resets the menu
    if (window.matchMedia) {
      var desktop = window.matchMedia('(min-width: 1080px)');
      var onChange = function (e) { if (e.matches) setMenu(false); };
      if (desktop.addEventListener) desktop.addEventListener('change', onChange);
      else if (desktop.addListener) desktop.addListener(onChange);
    }
  }

  /* ---------- Header shadow on scroll ---------- */
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- FAQ accordion ---------- */
  $all('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  /* ---------- Scroll reveal + active nav link ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = $all('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  if ('IntersectionObserver' in window) {
    var navLinks = $all('.nav-list a');
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) sectionObserver.observe(target);
    });
  }

  /* ---------- Init ---------- */
  applyLanguage(storageGet() || DEFAULT_LANG);
})();
