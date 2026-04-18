import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-in-view';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  heroContainer, fadeInUp, fadeIn,
  btnPrimary, btnGhost, tagHover,
  viewport,
} from '@/lib/motion';

const techStack = [
  'React.js', 'React Native', 'Node.js', 'TypeScript',
  'PostgreSQL', 'GraphQL', 'AWS', 'CI/CD', 'REST APIs', 'Next.js',
];

const domains = [
  'FinTech & Payment Systems',
  'Healthcare & Data Platforms',
  'E-commerce & Scalable Applications',
  'Real-Time Systems & Analytics',
  'Generative AI & Intelligent Apps',
];
const roles = [
  'Senior Full Stack Engineer',
  'Generative AI Developer',
  'Backend & System Design Engineer',
  'React Native Specialist',
 'AWS Cloud & CI/CD Architect'
];

// Particle config
const particles = [
  { top: '18%', left: '12%',  size: 3, dur: '5s',   delay: '0s'    },
  { top: '72%', left: '8%',   size: 2, dur: '6s',   delay: '1.2s'  },
  { top: '35%', left: '88%',  size: 4, dur: '7s',   delay: '0.5s'  },
  { top: '80%', left: '78%',  size: 2, dur: '8s',   delay: '2s'    },
  { top: '55%', left: '50%',  size: 3, dur: '5.5s', delay: '3s'    },
  { top: '10%', left: '62%',  size: 2, dur: '9s',   delay: '0.8s'  },
  { top: '90%', left: '40%',  size: 3, dur: '6.5s', delay: '1.8s'  },
  { top: '42%', left: '3%',   size: 2, dur: '7.5s', delay: '2.5s'  },
  { top: '25%', left: '95%',  size: 2, dur: '5.8s', delay: '1.5s'  },
  { top: '60%', left: '20%',  size: 3, dur: '7.2s', delay: '0.3s'  },
] as const;

// HIGH-SPEED Beams Config (Rockets)
const hBeams = [
  { row: 1,  delay: 0.2, duration: 2.5 },
  { row: 2,  delay: 1.5, duration: 3.0 },
  { row: 3,  delay: 0.8, duration: 2.2 },
  { row: 5,  delay: 0.0, duration: 2.8 },
  { row: 6,  delay: 2.1, duration: 3.2 },
  { row: 8,  delay: 0.5, duration: 2.0 },
  { row: 9,  delay: 1.2, duration: 2.6 },
  { row: 11, delay: 0.3, duration: 2.4 },
  { row: 12, delay: 2.5, duration: 3.5 },
  { row: 14, delay: 0.9, duration: 2.1 },
  { row: 15, delay: 1.8, duration: 2.7 },
  { row: 17, delay: 0.1, duration: 2.3 },
  { row: 18, delay: 1.4, duration: 2.9 },
  { row: 20, delay: 0.7, duration: 2.5 },
];

const vBeams = [
  { col: 1,  delay: 0.5, duration: 2.5 },
  { col: 3,  delay: 1.2, duration: 2.8 },
  { col: 5,  delay: 0.1, duration: 2.2 },
  { col: 7,  delay: 2.0, duration: 3.0 },
  { col: 8,  delay: 0.8, duration: 2.6 },
  { col: 10, delay: 1.5, duration: 2.4 },
  { col: 12, delay: 0.3, duration: 2.1 },
  { col: 14, delay: 2.2, duration: 3.2 },
  { col: 16, delay: 0.7, duration: 2.5 },
  { col: 18, delay: 1.9, duration: 2.9 },
  { col: 20, delay: 0.4, duration: 2.3 },
  { col: 22, delay: 1.1, duration: 2.7 },
  { col: 25, delay: 0.0, duration: 2.0 },
  { col: 27, delay: 1.6, duration: 3.1 },
  { col: 29, delay: 0.9, duration: 2.4 },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const typed = useTypewriter(roles, 75, 1800);

  useEffect(() => {
    if (isMobile) {
      setMouse({ x: 0, y: 0 });
      setIsHovered(false);
    }
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setMouse({ x, y });
    
    // Updates the CSS variables for the mouse mask position
    if (sectionRef.current) {
      sectionRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      sectionRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
  };

  return (
    <>
      <style>{`
        @keyframes travel-right {
          0% { transform: translateX(-350px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        @keyframes travel-down {
          0% { transform: translateY(-350px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
      
      <section
        id="hero"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="min-h-screen flex items-center justify-center bg-slate-950 pt-16 relative overflow-hidden cursor-spotlight"
      >
        {/* Your original Grid background */}
        <div className="absolute inset-0 bg-grid-animated z-0" style={{
          backgroundImage: 'linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff08 1px,transparent 1px)',
          backgroundSize: '64px 64px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)',
        }} />

        {/* Shooting "Rockets"
            Desktop: visible only inside a 300px circle around the cursor.
            Mobile:  always visible, masked to a centred ellipse matching the grid vignette.
        */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out z-0"
          style={{
            opacity: isMobile ? 1 : (isHovered ? 1 : 0),
            WebkitMaskImage: isMobile
              ? 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)'
              : `radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)`,
            maskImage: isMobile
              ? 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)'
              : `radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)`,
          }}
        >
          {/* On mobile use fewer beams to keep GPU load low */}
          {(isMobile ? hBeams.slice(0, 5) : hBeams).map((b, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0"
              style={{
                top: `calc(64px * ${b.row})`,
                width: '250px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.5), rgba(56,189,248,1))',
                boxShadow: '0 0 10px 1px rgba(56,189,248,0.6)',
                animation: `travel-right ${b.duration}s ${b.delay}s linear infinite`,
              }}
            />
          ))}
          {(isMobile ? vBeams.slice(0, 5) : vBeams).map((b, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0"
              style={{
                left: `calc(64px * ${b.col})`,
                width: '1px',
                height: '250px',
                background: 'linear-gradient(to bottom, transparent, rgba(56,189,248,0.5), rgba(56,189,248,1))',
                boxShadow: '0 0 10px 1px rgba(56,189,248,0.6)',
                animation: `travel-down ${b.duration}s ${b.delay}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Grid scan line — slow vertical sweep */}
        <div className="grid-scan-line z-0" />

        {/* Glow blobs */}
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none bg-blob-1 z-0"
          style={{ transform: `translate(${mouse.x * 0.6}px, ${mouse.y * 0.6}px)` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none bg-blob-2 z-0"
          style={{ transform: `translate(${-mouse.x * 0.4}px, ${-mouse.y * 0.4}px)` }}
        />
        <div
          className="absolute top-16 right-1/3 w-56 h-56 bg-violet-600/7 rounded-full blur-3xl pointer-events-none bg-blob-3 z-0"
          style={{ transform: `translate(${mouse.x * 0.25}px, ${mouse.y * 0.25}px)` }}
        />
        <div
          className="absolute bottom-16 left-1/3 w-48 h-48 bg-cyan-600/7 rounded-full blur-3xl pointer-events-none bg-blob-4 z-0"
          style={{ transform: `translate(${-mouse.x * 0.2}px, ${-mouse.y * 0.2}px)` }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {particles.slice(0, isMobile ? 5 : particles.length).map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400/25 anim-twinkle"
              style={{
                top: p.top, left: p.left,
                width: p.size, height: p.size,
                '--twinkle-dur': p.dur,
                '--twinkle-delay': p.delay,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10 w-full">

          {/* ── Availability badge ─────────────────────────────── */}
          <motion.div
            className="flex justify-center mb-6 sm:mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.05 }}
          >
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-medium anim-glow">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              Open to Senior Roles &amp; High-Value Freelance
            </span>
          </motion.div>

          {/* ── Name — staggered letter cascade ───────────────── */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1
              className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-tight"
              initial="hidden"
              animate="visible"
              variants={heroContainer}
            >
              {"Iyyappan Sivakumar".split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block gradient-text"
                  variants={fadeInUp}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Typewriter subtitle */}
            <motion.h2
              className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-400 mb-5 min-h-[1.75rem] sm:min-h-[2rem]"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.72 }}
            >
              {typed}
              <span className="animate-pulse text-blue-400 ml-0.5">|</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.88 }}
            >
              I build production-grade web and mobile products — from architecture to
              deployment — that scale without breaking.
            </motion.p>
          </div>

          {/* ── Domain tags ───────────────────────────────────── */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-7 sm:mb-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.95 } },
            }}
          >
            {domains.map((label) => (
              <motion.span
                key={label}
                className="px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 text-xs sm:text-sm cursor-default"
                variants={fadeInUp}
                whileHover={{
                  y: -2,
                  borderColor: 'rgba(59,130,246,0.45)',
                  boxShadow: '0 0 10px 1px rgba(59,130,246,0.16)',
                  transition: { duration: 0.18, ease: 'easeOut' },
                }}
                whileTap={{ y: 0, scale: 0.97 }}
              >
                {label}
              </motion.span>
            ))}
          </motion.div>

          {/* ── CTAs ──────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-14"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 1.05 }}
          >
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold"
              variants={btnPrimary}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate="rest"
            >
              See My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-slate-800/50 transition-colors duration-200"
              variants={btnGhost}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate="rest"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Let's Talk About Your Project
            </motion.button>
          </motion.div>

          {/* ── Tech stack marquee ────────────────────────────── */}
          <motion.div
            className="border-t border-slate-800 pt-8 sm:pt-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 1.2 }}
          >
            <p className="text-center text-slate-500 text-xs sm:text-sm font-medium mb-4 sm:mb-5 uppercase tracking-widest">
              Core Stack
            </p>
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  width: 'max-content',
                  gap: '12px',
                  animation: 'marquee 22s linear infinite',
                }}
              >
                {[...techStack, ...techStack].map((tech, i) => (
                  <span
                    key={i}
                    className="flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-800/70 border border-slate-700/60 text-slate-300 text-xs sm:text-sm font-mono hover:border-blue-500/40 hover:text-white transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Scroll hint ───────────────────────────────────── */}
          <motion.div
            className="flex justify-center mt-12 sm:mt-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 1.38 }}
          >
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-slate-600 hover:text-blue-400 transition-colors duration-200 animate-bounce"
              aria-label="Scroll down"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;