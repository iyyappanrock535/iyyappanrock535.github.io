import { useState } from 'react';
import { Layers, Smartphone, Cloud, Database } from 'lucide-react';
import { useInView, useCounter } from '@/hooks/use-in-view';

const highlights = [
  {
    icon: <Layers className="w-5 h-5 text-blue-400" />,
    title: 'Full-stack ownership',
    desc: 'I own the full delivery lifecycle — database schema, API design, React/React Native UI, cloud deployment, and CI/CD pipelines.',
    accent: 'blue',
  },
  {
    icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
    title: 'Cross-platform mobile',
    desc: 'Shipped iOS and Android apps to production stores. Built with React Native CLI — not Expo workarounds.',
    accent: 'indigo',
  },
  {
    icon: <Cloud className="w-5 h-5 text-sky-400" />,
    title: 'Cloud infrastructure',
    desc: 'Provisioned and maintained AWS environments. Built CI/CD pipelines teams actually use day-to-day.',
    accent: 'sky',
  },
  {
    icon: <Database className="w-5 h-5 text-violet-400" />,
    title: 'Backend systems',
    desc: 'Designed relational schemas from scratch. Built Node.js APIs that handle real financial transactions at scale.',
    accent: 'violet',
  },
];

const accentBorder: Record<string, string> = {
  blue:   'hover:border-blue-500/40',
  indigo: 'hover:border-indigo-500/40',
  sky:    'hover:border-sky-500/40',
  violet: 'hover:border-violet-500/40',
};

/** Card with 3D tilt on hover */
const TiltCard = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: cy * -8, y: cx * 8 });
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out, border-color 0.2s',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {children}
    </div>
  );
};

/** Animated stat card — counts up when visible */
const StatCard = ({
  value,
  numeric,
  label,
  sub,
  delay,
  active,
}: {
  value: string;
  numeric?: number;
  label: string;
  sub: string;
  delay: number;
  active: boolean;
}) => {
  const count = useCounter(numeric ?? 0, 1000, active && numeric !== undefined);
  const display = numeric !== undefined ? (value.endsWith('+') ? `${count}+` : `${count}`) : value;

  return (
    <TiltCard
      className="p-5 sm:p-6 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between hover:border-blue-500/40 anim-fade-up cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-3 tabular-nums">{display}</div>
      <div>
        <div className="text-white font-semibold mb-1 text-sm sm:text-base">{label}</div>
        <div className="text-slate-400 text-xs sm:text-sm">{sub}</div>
      </div>
    </TiltCard>
  );
};

const AboutSection = () => {
  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: copyRef,   inView: copyIn   } = useInView();
  const { ref: statsRef,  inView: statsIn  } = useInView();

  return (
    <section id="about" className="py-20 sm:py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <p className={`text-blue-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`}>
            About
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 ${headerIn ? 'anim-fade-up' : 'reveal'}`}
            style={{ animationDelay: '80ms' }}
          >
            What I actually do
          </h2>
          <div
            className={`w-16 h-1 bg-blue-600 rounded-full ${headerIn ? 'anim-scale' : 'reveal'}`}
            style={{ animationDelay: '160ms' }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — copy + highlight cards */}
          <div ref={copyRef}>
            <p className={`text-base sm:text-lg text-slate-300 leading-relaxed mb-5 ${copyIn ? 'anim-fade-left' : 'reveal'}`}>
              I'm a Senior Full Stack Engineer with 6 years of production experience across mobile and web.
              I specialise in <span className="text-white font-medium">React, React Native, and Node.js</span> —
              but what sets me apart is owning the full delivery lifecycle.
            </p>
            <p
              className={`text-base sm:text-lg text-slate-300 leading-relaxed mb-5 ${copyIn ? 'anim-fade-left' : 'reveal'}`}
              style={{ animationDelay: '80ms' }}
            >
              I've architected systems handling real financial transactions (GoldPe, Adhiban Nidhi),
              built cross-platform apps live on the App Store and Play Store, and set up
              <span className="text-white font-medium"> AWS infrastructure with CI/CD pipelines</span> that
              teams actually maintain.
            </p>
            <p
              className={`text-base sm:text-lg text-slate-300 leading-relaxed mb-10 ${copyIn ? 'anim-fade-left' : 'reveal'}`}
              style={{ animationDelay: '160ms' }}
            >
              I work best on complex problems: tight timelines, greenfield builds, and products that
              need to scale past the MVP.
            </p>

            {/* Highlight cards — with 3D tilt */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {highlights.map((h, i) => (
                <TiltCard
                  key={h.title}
                  className={`p-4 sm:p-5 rounded-xl bg-slate-800 border border-slate-700 ${accentBorder[h.accent]} cursor-default ${copyIn ? 'anim-scale' : 'reveal'}`}
                  style={{ animationDelay: `${240 + i * 80}ms` }}
                >
                  <div className="mb-3">{h.icon}</div>
                  <h4 className="text-white font-semibold mb-1.5 text-sm sm:text-base">{h.title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{h.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Right — stats grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4 sm:gap-5">
            <StatCard value="6+"  numeric={6}  label="Years in Production"  sub="End-to-end ownership"               delay={0}   active={statsIn} />
            <StatCard value="28"  numeric={28} label="Projects Delivered"   sub="Web & mobile"                       delay={80}  active={statsIn} />
            <StatCard value="5"   numeric={5}  label="Industry Domains"     sub="FinTech · Healthcare · E-commerce"  delay={160} active={statsIn} />
            <StatCard value="AWS"             label="Cloud & CI/CD"         sub="Infrastructure I've owned"          delay={240} active={statsIn} />

            {/* CTA card — animated gradient border */}
            <div
              className={`col-span-2 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-600/15 to-indigo-600/15 border border-blue-500/20 hover:border-blue-500/50 transition-colors duration-300 ${statsIn ? 'anim-fade-up' : 'reveal'}`}
              style={{ animationDelay: '320ms' }}
            >
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Currently open to{' '}
                <span className="text-white font-medium">Senior Engineering roles (₹25L+)</span> and
                high-stakes freelance engagements in FinTech, Healthcare, and E-commerce.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-200 underline underline-offset-4"
              >
                Let's discuss your project
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
