import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Globe,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';

type Language = 'ar' | 'en';

const copy = {
  ar: {
    navHome: 'الرئيسية',
    navAbout: 'من نحن',
    navCollection: 'مجالات العمل',
    navContact: 'تواصل معنا',
    language: 'English',
    heroEyebrow: 'مجموعة الشمس للتجارة العامة',
    heroTitle: 'تطور آفاق\nالأعمال.',
    heroDescription: 'نبني حلولاً تجارية متكاملة تجمع بين الثقة، الخبرة، والنمو المستدام في العراق.',
    heroAction: 'اكتشف المجموعة',
    heroNote: 'شراكات موثقة. طموح مستمر.',
    aboutEyebrow: '01 / من نحن',
    aboutTitle: 'نصنع أثراً\nيتجاوز التوقعات.',
    aboutLead: 'مجموعة الشمس هي شريككم التجاري الموثوق. منذ عام 2019، نطوّر منظومة أعمال متكاملة تستجيب لحاجات السوق وتفتح مساحات جديدة للنمو.',
    aboutText: 'بدأت رحلتنا من تجارة الهواتف وملحقاتها، ثم توسعنا بخطوات مدروسة إلى قطاعات السيارات، التقنية، الاتصالات، والخدمات اللوجستية. اليوم نعمل بعقلية واحدة: جودة واضحة، علاقات طويلة الأمد، وتنفيذ يترك أثراً.',
    established: 'سنة التأسيس',
    sectors: 'قطاعات الأعمال',
    branches: 'فروع داخل بغداد',
    galleryAlt: 'من عمليات مجموعة الشمس',
    collectionEyebrow: '02 / مجالات العمل',
    collectionTitle: 'مجالات\nتتحرك معاً.',
    collectionDescription: 'خبرات متنوعة، منظومة واحدة. استكشف القطاعات التي تشكل مجموعة الشمس.',
    previous: 'السابق',
    next: 'التالي',
    visionEyebrow: '03 / رؤيتنا',
    visionTitle: 'نحو مستقبل\nأكثر اتساعاً.',
    visionText: 'أن نصبح واحدة من الشركات الرائدة في التجارة العامة والخدمات داخل العراق والمنطقة، عبر منظومة تجمع الجودة والاحترافية والتطور المستمر.',
    missionLabel: 'رسالتنا',
    missionText: 'توفير منتجات وخدمات موثوقة، وبناء علاقات طويلة الأمد مع عملائنا وشركائنا من خلال المصداقية والكفاءة والتميز.',
    contactEyebrow: '04 / تواصل معنا',
    contactTitle: 'لنبنِ شيئاً\nمؤثراً معاً.',
    contactText: 'يسعدنا أن نسمع عن مشروعك القادم أو فرص الشراكة الجديدة.',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    message: 'كيف يمكننا مساعدتك؟',
    send: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال...',
    success: 'تم استلام رسالتك. سنتواصل معك قريباً.',
    error: 'تعذر إرسال الرسالة حالياً. حاول مرة أخرى.',
    phone: 'الهاتف',
    address: 'العنوان',
    addressValue: 'بغداد، العراق',
    footerLine: 'حلول تجارية متكاملة.',
    rights: 'جميع الحقوق محفوظة © 2026 مجموعة الشمس',
  },
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navCollection: 'Collection',
    navContact: 'Contact',
    language: 'العربية',
    heroEyebrow: 'Al Shams General Trading Group',
    heroTitle: 'Developing\nBusiness Horizons.',
    heroDescription: 'Building integrated commercial solutions through trust, expertise, and sustainable growth in Iraq.',
    heroAction: 'Discover the group',
    heroNote: 'Trusted partnerships. Constant ambition.',
    aboutEyebrow: '01 / About us',
    aboutTitle: 'Making an impact\nbeyond expectation.',
    aboutLead: 'Al Shams Group is your trusted commercial partner. Since 2019, we have built an integrated business ecosystem that responds to the market and creates room for growth.',
    aboutText: 'Our journey began in mobile phones and accessories, then expanded through considered steps into automotive, technology, connectivity, and logistics. Today, we work with one mindset: clear quality, lasting relationships, and execution that leaves an impact.',
    established: 'Established',
    sectors: 'Business sectors',
    branches: 'Branches in Baghdad',
    galleryAlt: 'Al Shams Group operations',
    collectionEyebrow: '02 / Business areas',
    collectionTitle: 'Many fields.\nOne direction.',
    collectionDescription: 'Different expertise, one ecosystem. Explore the sectors that shape Al Shams Group.',
    previous: 'Previous',
    next: 'Next',
    visionEyebrow: '03 / Our vision',
    visionTitle: 'Toward a wider\nfuture.',
    visionText: 'To become one of the leading companies in general trading and services in Iraq and the region, combining quality, professionalism, and continuous development.',
    missionLabel: 'Our mission',
    missionText: 'Providing reliable products and services while building long-term relationships through credibility, efficiency, and excellence.',
    contactEyebrow: '04 / Contact',
    contactTitle: 'Let’s build something\nmeaningful together.',
    contactText: 'Tell us about your next project or a new partnership opportunity.',
    name: 'Full name',
    email: 'Email address',
    message: 'How can we help?',
    send: 'Send message',
    sending: 'Sending...',
    success: 'Your message was received. We will be in touch soon.',
    error: 'The message could not be sent right now. Please try again.',
    phone: 'Phone',
    address: 'Address',
    addressValue: 'Baghdad, Iraq',
    footerLine: 'Integrated commercial solutions.',
    rights: 'All rights reserved © 2026 Al Shams Group',
  },
} as const;

const workAreas = [
  { ar: 'تجارة واستيراد الأجهزة', en: 'Devices trade & import', company: 'Al Ostoura Computers', url: 'https://alostora.pages.dev', image: '/images/area-1.jpg' },
  { ar: 'استيراد وتجارة السيارات', en: 'Automotive import & trade', company: 'Al Shams Auto Trade', url: '#contact', image: '/images/area-2.jpg' },
  { ar: 'قطع غيار السيارات', en: 'Automotive spare parts', company: 'Korean Spare Parts', url: '#contact', image: '/images/area-3.jpg' },
  { ar: 'حلول الإنترنت والاتصال', en: 'Connectivity solutions', company: 'Al Shams Telecom', url: '#contact', image: '/images/area-4.jpg' },
  { ar: 'الصيانة والخدمات الفنية', en: 'Maintenance services', company: 'Al Shams Services', url: '#contact', image: '/images/area-5.jpg' },
  { ar: 'الخدمات اللوجستية', en: 'Logistics services', company: 'Al Shams Logistics', url: '#contact', image: '/images/area-6.jpg' },
];

const socials = ['IG', 'TW', 'IN'];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArea, setActiveArea] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const t = copy[lang];
  const isArabic = lang === 'ar';
  const prevArea = (activeArea + workAreas.length - 1) % workAreas.length;
  const nextArea = (activeArea + 1) % workAreas.length;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic, lang]);

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  const moveArea = (direction: number) => {
    setActiveArea((current) => (current + direction + workAreas.length) % workAreas.length);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSending(true);
    setSubmitted(false);
    setSubmitError(false);
    fetch(import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        language: lang,
      }),
    }).then((response) => {
      if (!response.ok) throw new Error('Contact request failed');
      form.reset();
      setSubmitted(true);
    }).catch(() => setSubmitError(true)).finally(() => setSending(false));
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); navigate('home'); }}>
          <img src="/logo.png" alt="Al Shams Group" />
          <span>AL SHAMS<small>GROUP</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => navigate('home')}>{t.navHome}</button>
          <button onClick={() => navigate('about')}>{t.navAbout}</button>
          <button onClick={() => navigate('collection')}>{t.navCollection}</button>
          <button onClick={() => navigate('contact')}>{t.navContact}</button>
        </nav>
        <div className="header-tools">
          <button className="language-button" onClick={() => setLang(isArabic ? 'en' : 'ar')}><Globe size={14} />{t.language}</button>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
          <button onClick={() => navigate('home')}>{t.navHome}</button>
          <button onClick={() => navigate('about')}>{t.navAbout}</button>
          <button onClick={() => navigate('collection')}>{t.navCollection}</button>
          <button onClick={() => navigate('contact')}>{t.navContact}</button>
        </motion.nav>}
      </AnimatePresence>

      <main>
        <motion.section id="home" className="hero-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="stack-card-wrapper hero-inner">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: .12, delayChildren: .25 } } }}>
              <motion.p className="eyebrow" variants={fadeUp}>{t.heroEyebrow}</motion.p>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 35, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}>{t.heroTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</motion.h1>
              <motion.p className="hero-tagline" variants={fadeUp}>{t.heroNote}</motion.p>
              <motion.p className="hero-description" variants={fadeUp}>{t.heroDescription}</motion.p>
              <motion.div className="hero-actions" variants={fadeUp}>
                <button className="hero-cta" onClick={() => navigate('about')}>{t.heroAction}<ArrowDown size={16} /></button>
                <button className="hero-ghost" onClick={() => navigate('contact')}>{t.navContact}</button>
              </motion.div>
            </motion.div>
            <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="hero-stats">
                <div><strong>2019</strong><span>{t.established}</span></div>
                <div><strong>06</strong><span>{t.sectors}</span></div>
                <div><strong>02</strong><span>{t.branches}</span></div>
              </div>
              <div className="social-list">{socials.map((social) => <a href="#contact" key={social} aria-label={`${social} social link`} onClick={(event) => { event.preventDefault(); navigate('contact'); }}>{social}</a>)}</div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="about" className="about-section section-padding" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={{ hidden: { opacity: 0, y: 45 }, visible: { opacity: 1, y: 0, transition: { duration: .9, ease: [0.16, 1, 0.3, 1], staggerChildren: .12 } } }}>
          <div className="stack-card-wrapper">
            <motion.div className="section-head" variants={fadeUp}>
              <p className="eyebrow">{t.aboutEyebrow}</p>
              <h2>{t.aboutTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
            </motion.div>
            <motion.div className="about-columns" variants={fadeUp}>
              <p className="lead-text">{t.aboutLead}</p>
              <p className="body-text">{t.aboutText}</p>
            </motion.div>
            <motion.div className="stats-row" variants={fadeUp}>
              <div><strong>2019</strong><span>{t.established}</span></div>
              <div><strong>06</strong><span>{t.sectors}</span></div>
              <div><strong>02</strong><span>{t.branches}</span></div>
            </motion.div>
            <motion.div className="image-strip" variants={fadeUp}>
              <img src="/images/about-1.jpg" alt={t.galleryAlt} />
              <img src="/images/about-2.jpg" alt={t.galleryAlt} />
              <img src="/images/about-3.jpg" alt={t.galleryAlt} />
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="collection" className="collection-section section-padding" initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>
          <div className="stack-card-wrapper">
            <div className="section-head collection-head">
              <p className="eyebrow">{t.collectionEyebrow}</p>
              <h2>{t.collectionTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
              <p className="collection-note">{t.collectionDescription}</p>
            </div>
            <div className="collection-stage">
              <button className="collection-panel" onClick={() => moveArea(-1)} aria-label={t.previous}>
                <img src={workAreas[prevArea].image} alt="" />
                <span className="panel-label"><ArrowLeft size={15} className="flip-rtl" />{t.previous}</span>
              </button>
              <div className="collection-main">
                <AnimatePresence mode="wait">
                  <motion.div className="collection-image" key={activeArea} initial={{ opacity: 0, scale: 1.04, x: isArabic ? 25 : -25 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: .98, x: isArabic ? -25 : 25 }} transition={{ duration: .6, ease: [0.16, 1, 0.3, 1] }}>
                    <img src={workAreas[activeArea].image} alt={isArabic ? workAreas[activeArea].ar : workAreas[activeArea].en} />
                    <div className="image-shade" />
                    <div className="collection-label">
                      <span>{String(activeArea + 1).padStart(2, '0')} / 06</span>
                      <h3>{isArabic ? workAreas[activeArea].ar : workAreas[activeArea].en}</h3>
                      {workAreas[activeArea].company && <a className="company-link" href={workAreas[activeArea].url} onClick={(event) => workAreas[activeArea].url === '#contact' && (event.preventDefault(), navigate('contact'))}>{workAreas[activeArea].company}<ArrowRight size={14} className="flip-rtl" /></a>}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <button className="collection-panel" onClick={() => moveArea(1)} aria-label={t.next}>
                <img src={workAreas[nextArea].image} alt="" />
                <span className="panel-label">{t.next}<ArrowRight size={15} className="flip-rtl" /></span>
              </button>
            </div>
            <div className="collection-footer">
              <div className="collection-pagination">
                {workAreas.map((area, index) => (
                  <button key={area.en} className={index === activeArea ? 'active' : ''} onClick={() => setActiveArea(index)} aria-label={`${index + 1}`}>
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="vision" className="vision-section section-padding" initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>
          <div className="stack-card-wrapper vision-wrapper">
            <div className="section-head">
              <p className="eyebrow">{t.visionEyebrow}</p>
              <h2>{t.visionTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
            </div>
            <p className="vision-statement">{t.visionText}</p>
            <div className="mission-note">
              <span>{t.missionLabel}</span>
              <p>{t.missionText}</p>
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="contact-section section-padding" initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>
          <div className="stack-card-wrapper contact-wrapper">
            <div className="contact-heading">
              <p className="eyebrow">{t.contactEyebrow}</p>
              <h2>{t.contactTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
              <p>{t.contactText}</p>
              <div className="contact-details">
                <span><Phone size={15} />07718194628</span>
                <span><Mail size={15} />Info@alshams-group.com</span>
                <span><MapPin size={15} />{t.addressValue}</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitForm}>
              <label>{t.name}<input required name="name" type="text" /></label>
              <label>{t.email}<input required name="email" type="email" /></label>
              <label>{t.message}<textarea required name="message" rows={4} /></label>
              {submitted && <p className="form-success"><Check size={15} />{t.success}</p>}
              {submitError && <p className="form-error">{t.error}</p>}
              <button type="submit" disabled={sending}>{sending ? t.sending : t.send}<ArrowRight size={16} className="flip-rtl" /></button>
            </form>
          </div>
        </motion.section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); navigate('home'); }}>
          <img src="/logo.png" alt="Al Shams Group" />
          <span>AL SHAMS<small>GROUP</small></span>
        </a>
        <p>{t.footerLine}</p>
        <div>
          <p>{t.rights}</p>
          <div className="social-list">{socials.map((social) => <a href="#contact" key={social} aria-label={`${social} social link`} onClick={(event) => { event.preventDefault(); navigate('contact'); }}>{social}</a>)}</div>
        </div>
      </footer>
    </div>
  );
}
