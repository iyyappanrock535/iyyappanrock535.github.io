import { Mail, Linkedin, Github, Briefcase } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
    icon: <WhatsAppIcon />,
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

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="text-white font-bold text-lg mb-3">
              Iyyappan<span className="text-blue-500">.</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Senior Full Stack Engineer. React · React Native · Node.js · AWS.
              6 years shipping production-grade products.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Navigate</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Contact'].map((label) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(label.toLowerCase())}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Connect</h4>
            <div className="flex flex-wrap gap-2.5 mb-5">
              {socials.map(({ href, icon, label, target }) => (
                <a
                  key={label}
                  href={href}
                  target={target}
                  rel={target ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200"
            >
              Hire me
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-sm">© 2025 Iyyappan Sivakumar. All rights reserved.</p>
          <p className="text-slate-600 text-xs">React · Node.js · AWS · CI/CD</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
