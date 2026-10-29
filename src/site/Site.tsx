import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Download, Mail, ArrowUpRight, Moon, Sun, ArrowRight } from 'lucide-react';
import {
  profile, featured, personal, moreProjects, experience, skills, certifications, courses,
  show, freelancerProfile, type Featured,
} from '@/data/profile';
import { ClubRegistrations, LoanLedger, AthleteBooking, ClubSchedule, LoanJourney, Storyboard } from './Mockups';
import TestimonialsSection from '@/components/TestimonialsSection';
import Remote from './Remote';
import CaseStudy from './CaseStudy';

/* ───────── Nav ───────── */
const links = [
  ['#work', 'Work'],
  ['#experience', 'Experience'],
  ['#remote', 'Time zones'],
  ['#skills', 'Skills'],
  ['#certifications', 'Certifications'],
  ['#contact', 'Contact'],
];

/* ───────── Theme: follows the system until the visitor picks one ───────── */
type Theme = 'light' | 'dark';
const systemTheme = (): Theme =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const set = document.documentElement.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* storage unavailable */ }
    return systemTheme();
  });
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
  };
  return { theme, toggle };
};

const Nav = ({ solidAlways = false }: { solidAlways?: boolean }) => {
  const { theme, toggle } = useTheme();
  const [solid, setSolid] = useState(solidAlways);
  useEffect(() => {
    const on = () => setSolid(solidAlways || window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [solidAlways]);
  return (
    <header className={`nav ${solid ? 'solid' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-name">{profile.name}</a>
        <nav className="nav-links" aria-label="Sections">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="nav-right">
          <button type="button" className="theme-btn" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <a href={profile.resume} download className={`btn ${solid ? 'btn-solid' : 'btn-ghost-dark'}`} style={{ padding: '10px 14px', fontSize: 14 }}>
            <Download size={16} aria-hidden="true" /> Resume
          </a>
        </div>
      </div>
    </header>
  );
};

/* ───────── Hero ───────── */
const Hero = () => (
  <section id="top" className="hero">
    <div className="wrap hero-grid">
      <div>
        <p className="hero-name">{profile.title} at Communiti</p>
        <h1 className="h-display">{profile.headline}</h1>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-cta">
          <a href={profile.resume} download className="btn btn-solid"><Download size={18} aria-hidden="true" /> Download resume</a>
          <a href={`mailto:${profile.email}`} className="btn btn-ghost-dark"><Mail size={18} aria-hidden="true" /> Email me</a>
        </div>
        <div className="hero-meta">
          <span><strong>7+ years</strong> in production</span>
          <span><strong>Remote</strong> with a Canadian team since 2022</span>
          <span><strong>React · React Native · Node.js</strong></span>
        </div>
      </div>
      <div className="frags" aria-label="Illustrative views of products I build">
        <ClubRegistrations className="frag-a" />
        <LoanLedger className="frag-b" />
        <span className="frag-caption">Illustrative views with sample data</span>
      </div>
    </div>
  </section>
);

/* ───────── Featured work ───────── */
const Visual = ({ p }: { p: Featured }) => {
  if (p.screens.length) {
    return (
      <div className="work-visual shots">
        {p.screens.map((src, i) => (
          <img key={src} src={src} alt={`${p.name} screen ${i + 1}`} loading="lazy" />
        ))}
      </div>
    );
  }
  return (
    <div className={`work-visual v-${p.id}`}>
      {p.id === 'club' && <ClubSchedule />}
      {p.id === 'athlete' && <AthleteBooking />}
      {p.id === 'thangam' && <LoanJourney />}
      {p.id === 'video' && <Storyboard />}
      <p className="note">{p.id === 'video' ? 'Interactive illustration of the episode pipeline. Press play.' : 'Interactive illustration with sample data. Try it; customer data is private.'}</p>
    </div>
  );
};

const Work = () => (
  <section id="work" className="sec">
    <div className="wrap">
      <div className="sec-head">
        <h2 className="h-section">Products I build and run</h2>
        <p className="lede">Three production systems I work on end to end, from the database schema to the screens people use every day, and one AI platform I built on my own.</p>
      </div>
      <div className="work-list">
        {[...featured, personal].map((p, i) => (
          <article key={p.id} className={`work ${i % 2 ? 'flip' : ''}`}>
            <div>
              {!p.name.startsWith(p.company) && <p className="work-company">{p.company}</p>}
              <h3>{p.name}</h3>
              {p.url && (
                <a className="work-link" href={p.url} target="_blank" rel="noreferrer">
                  {p.urlLabel} <ArrowUpRight size={15} style={{ display: 'inline', verticalAlign: '-2px' }} aria-hidden="true" />
                </a>
              )}
              <p className="sum">{p.summary}</p>
              <ul className="work-built" aria-label="What I built">
                {p.built.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div className="chips">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              {p.caseStudy && (
                <a className="btn btn-ghost case-link" href={p.caseStudy}>Read the case study <ArrowRight size={16} aria-hidden="true" /></a>
              )}
            </div>
            <Visual p={p} />
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ───────── More projects ───────── */
const More = () => (
  <section id="more" className="sec">
    <div className="wrap">
      <div className="sec-head">
        <h2 className="h-section">Earlier projects</h2>
        <p className="lede">Mobile and web apps across fintech, healthcare, retail and real-time products.</p>
      </div>
      <div className="more">
        {moreProjects.map((m) => (
          <div className="more-item" key={m.name}>
            <h4>{m.name} <span>{m.domain}</span></h4>
            <p>{m.line}</p>
            <small>{m.stack}</small>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────── Experience ───────── */
const Experience = () => (
  <section id="experience" className="sec">
    <div className="wrap">
      <div className="sec-head">
        <h2 className="h-section">Experience</h2>
        <p className="lede">Promoted to Senior at Communiti in 2025 after three years on the team.</p>
      </div>
      <ol className="tl" style={{ listStyle: 'none' }}>
        {experience.map((e) => (
          <li className="tl-item" key={e.role + e.when}>
            <div className="tl-when">{e.when}</div>
            <div>
              <div className="tl-role">{e.role}</div>
              <div className="tl-org">{e.company} <span>· {e.where}</span></div>
              <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ───────── Skills ───────── */
const Skills = () => (
  <section id="skills" className="sec">
    <div className="wrap">
      <div className="sec-head"><h2 className="h-section">Skills</h2></div>
      <dl className="skills">
        {skills.map(([k, v]) => (
          <div className="skill-row" key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </div>
  </section>
);

/* ───────── Certifications ───────── */
const Certs = () => (
  <section id="certifications" className="sec">
    <div className="wrap">
      <div className="sec-head"><h2 className="h-section">Certifications</h2></div>
      <div className="certs">
        {certifications.map((c) => (
          <article className="cert" key={c.verify}>
            <div className="cert-top"><span>{c.issuer}</span><span>{c.date}</span></div>
            <h3>{c.name}</h3>
            <p style={{ color: 'var(--ink)' }}>{c.kind}</p>
            <p>{c.covers}</p>
            <a href={c.verify} target="_blank" rel="noreferrer">Verify on Coursera</a>
          </article>
        ))}
      </div>
      <h3 className="courses-head">Courses</h3>
      <ul className="courses">
        {courses.map((c) => (
          <li key={c.verify}>
            <span className="c-name">{c.name}</span>
            <span className="c-meta">{c.issuer}, {c.date}</span>
            <a href={c.verify} target="_blank" rel="noreferrer">View credential</a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ───────── Contact ───────── */
const EJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const EJS_READY = Boolean(EJS_SERVICE && EJS_TEMPLATE && EJS_KEY && !EJS_SERVICE.startsWith('your_'));

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EJS_READY) {
      const body = encodeURIComponent(`Hi Iyyappan,\n\n${form.message}\n\n${form.name}\n${form.email}`);
      window.open(`mailto:${profile.email}?subject=${encodeURIComponent('Role enquiry')}&body=${body}`, '_self');
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        from_name: form.name, from_email: form.email, reply_to: form.email,
        subject: 'Role enquiry', message: form.message,
      }, EJS_KEY);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactLinks: [string, string, string][] = [
    ['Email', profile.email, `mailto:${profile.email}`],
    ['LinkedIn', 'iyyappan-sivakumar', profile.linkedin],
    ['GitHub', 'iyyappanrock535', profile.github],
    ['WhatsApp', '+91 70100 53680', profile.whatsapp],
  ];
  if (show.freelancerLink) contactLinks.push(['Freelancer', 'iyyappanrock0', freelancerProfile]);

  return (
    <section id="contact" className="sec contact">
      <div className="wrap contact-grid">
        <div>
          <h2 className="h-section">Let's talk about your team</h2>
          <p className="lede" style={{ marginTop: 16 }}>{profile.availability}</p>
          <div className="contact-links">
            {contactLinks.map(([label, value, href]) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <strong>{label}</strong><span>{value}</span>
              </a>
            ))}
          </div>
        </div>
        <form className="form" onSubmit={submit}>
          <label>Your name
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
          </label>
          <label>Work email
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
          </label>
          <label>About the role
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          <div>
            <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </div>
          <p className="form-msg" aria-live="polite">
            {status === 'sent' && <span className="ok">Message sent. I'll reply within one working day.</span>}
            {status === 'error' && <span className="err">The message didn't send. Email me directly at {profile.email}.</span>}
          </p>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="foot">
    <div className="wrap">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>{'  ·  '}
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>{'  ·  '}
        <a href={profile.resume} download>Resume</a>
        {show.freelancerLink && <>{'  ·  '}<a href={freelancerProfile} target="_blank" rel="noreferrer">Freelancer</a></>}
      </span>
    </div>
  </footer>
);

const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
};

const Site = () => {
  const hash = useHash();
  const caseOpen = hash === '#case-ai-video';

  /* When leaving the case study for a section link, scroll to that section. */
  useEffect(() => {
    if (caseOpen || !hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, [hash, caseOpen]);

  return (
    <div className="site">
      <a href="#work" className="sr-only focus:not-sr-only">Skip to work</a>
      <Nav solidAlways={caseOpen} />
      {caseOpen ? (
        <CaseStudy />
      ) : (
        <main>
          <Hero />
          <Work />
          <Experience />
          <Remote />
          {show.moreProjects && <More />}
          <Skills />
          <Certs />
          {show.testimonials && <TestimonialsSection />}
          <Contact />
        </main>
      )}
      {caseOpen && <Contact />}
      <Footer />
    </div>
  );
};

export default Site;
