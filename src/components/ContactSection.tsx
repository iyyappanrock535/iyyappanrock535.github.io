import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Github, ArrowRight, Clock, CheckCircle, AlertCircle, Loader2, Briefcase } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { btnPrimary, btnSmall } from '@/lib/motion';

/* ─── real social links ──────────────────────────────────────── */
const socials = [
  {
    href: 'mailto:iyyappanrock535@gmail.com',
    icon: <Mail className="w-4 h-4" />,
    label: 'Email',
    target: undefined,
  },
  {
    href: 'https://www.linkedin.com/in/iyyappan-sivakumar-624242168/',
    icon: <Linkedin className="w-4 h-4" />,
    label: 'LinkedIn',
    target: '_blank',
  },
  {
    href: 'https://github.com/iyyappanrock535',
    icon: <Github className="w-4 h-4" />,
    label: 'GitHub',
    target: '_blank',
  },
  {
    href: 'https://wa.me/917010053680',
    icon: (
      /* WhatsApp SVG — not in lucide-react */
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: 'WhatsApp',
    target: '_blank',
  },
  {
    href: 'https://www.freelancer.in/u/iyyappanrock0',
    icon: <Briefcase className="w-4 h-4" />,
    label: 'Freelancer',
    target: '_blank',
  },
];

const engagements = [
  'Senior Engineering roles at product companies (₹25L+)',
  'Greenfield product builds — mobile + web, end to end',
  'High-stakes freelance in FinTech, Healthcare, E-commerce',
  'Fractional Lead Engineer for early-stage startups',
];

/* ─── EmailJS env vars (set in .env.local) ───────────────────── */
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;
const EJS_READY    = EJS_SERVICE && EJS_TEMPLATE && EJS_KEY &&
                     !EJS_SERVICE.startsWith('your_');

type Status = 'idle' | 'sending' | 'success' | 'error';

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: leftRef,   inView: leftIn   } = useInView();
  const { ref: rightRef,  inView: rightIn  } = useInView();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* Basic client-side validation */
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    /* If EmailJS isn't configured yet, open Gmail compose in browser */
    if (!EJS_READY) {
      const body = encodeURIComponent(
        `Hi Iyyappan,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      const subject = encodeURIComponent(form.subject || 'Portfolio enquiry');
      window.open(
        `https://mail.google.com/mail/?view=cm&to=iyyappanrock535@gmail.com&su=${subject}&body=${body}`,
        '_blank'
      );
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject || 'Portfolio enquiry',
          message:    form.message,
          reply_to:   form.email,
        },
        EJS_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      /* Reset back to idle after 5 s */
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <p className={`text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`}>
            Contact
          </p>
          <h2
            className={`text-4xl md:text-5xl font-bold text-white mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`}
            style={{ animationDelay: '80ms' }}
          >
            Let's work together
          </h2>
          <div
            className={`w-16 h-1 bg-blue-600 rounded-full ${headerIn ? 'anim-scale' : 'reveal'}`}
            style={{ animationDelay: '160ms' }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── Left ──────────────────────────────────────────── */}
          <div ref={leftRef}>
            <p className={`text-lg text-slate-300 leading-relaxed mb-4 ${leftIn ? 'anim-fade-left' : 'reveal'}`}>
              I take on a limited number of projects at a time — so the ones I do take, I deliver well.
            </p>
            <p
              className={`text-lg text-slate-300 leading-relaxed mb-10 ${leftIn ? 'anim-fade-left' : 'reveal'}`}
              style={{ animationDelay: '80ms' }}
            >
              If you're building something that needs to work at scale, handle real users, and ship on
              time — let's talk.
            </p>

            {/* Engagement list */}
            <div className={`mb-10 ${leftIn ? 'anim-fade-left' : 'reveal'}`} style={{ animationDelay: '160ms' }}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
                What I'm open to
              </h3>
              <ul className="space-y-3">
                {engagements.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 text-slate-300 ${leftIn ? 'anim-fade-left' : 'reveal'}`}
                    style={{ animationDelay: `${200 + i * 60}ms` }}
                  >
                    <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div
              className={`flex items-center gap-3 p-4 rounded-xl bg-slate-800 border border-slate-700 mb-8 ${leftIn ? 'anim-fade-left' : 'reveal'}`}
              style={{ animationDelay: '460ms' }}
            >
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <p className="text-slate-300 text-sm">
                Serious inquiries get a response within{' '}
                <span className="text-white font-medium">1 business day.</span>
              </p>
            </div>

            {/* Social links */}
            <div
              className={`flex flex-wrap gap-3 ${leftIn ? 'anim-fade-left' : 'reveal'}`}
              style={{ animationDelay: '520ms' }}
            >
              {socials.map(({ href, icon, label, target }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={target}
                  rel={target ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors duration-200 text-sm font-medium"
                  variants={btnSmall}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  animate="rest"
                >
                  {icon}
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Right — contact form ───────────────────────────── */}
          <div
            ref={rightRef}
            className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 ${rightIn ? 'anim-fade-right' : 'reveal'}`}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                    Name <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text" id="name" value={form.name} onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm disabled:opacity-60"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                    Email <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="email" id="email" value={form.email} onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm disabled:opacity-60"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                <input
                  type="text" id="subject" value={form.subject} onChange={handleChange}
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm disabled:opacity-60"
                  placeholder="Senior role / Freelance project / Consulting"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                  Message <span className="text-blue-500">*</span>
                </label>
                <textarea
                  id="message" rows={5} value={form.message} onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm resize-none disabled:opacity-60"
                  placeholder="Tell me about the project — what you're building, scale, timeline, and what you need from a senior engineer."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 px-6 rounded-lg font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                variants={btnPrimary}
                initial="rest"
                whileHover={status === 'idle' ? 'hover' : 'rest'}
                whileTap={status === 'idle' ? 'tap' : 'rest'}
                animate="rest"
              >
                {status === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'sending' ? 'Sending…' : 'Send message'}
                {status === 'idle' && <ArrowRight className="w-4 h-4" />}
              </motion.button>

              {/* Success / error feedback */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Message sent! I'll get back to you within 1 business day.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please email me directly at{' '}
                    <a
                      href="mailto:iyyappanrock535@gmail.com"
                      className="underline underline-offset-2 hover:text-red-300"
                    >
                      iyyappanrock535@gmail.com
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
