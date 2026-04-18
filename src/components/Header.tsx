import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { btnPrimary } from '@/lib/motion';

const navLinks = [
  { label: 'About',    id: 'about'    },
  { label: 'Skills',   id: 'skills'   },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact',  id: 'contact'  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]     = useState(false);
  const [activeId,   setActiveId]     = useState('');

  /* Track scroll for glass-morphism header + active section */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Determine which section is closest to viewport top
      const ids = ['hero', ...navLinks.map(l => l.id)];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(ids[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on resize past md breakpoint */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl shadow-black/20 border-b border-slate-800/80'
          : 'bg-slate-950/50 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">

          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="text-white font-bold text-base sm:text-lg tracking-tight hover:text-blue-400 transition-colors duration-200"
          >
            Iyyappan<span className="text-blue-500">.</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-underline text-sm font-medium transition-colors duration-200 pb-0.5 ${
                  activeId === link.id ? 'text-white active' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <motion.button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
              variants={btnPrimary}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate="rest"
            >
              Hire me
            </motion.button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen
              ? <X size={20} className="transition-transform duration-200 rotate-90" />
              : <Menu size={20} className="transition-transform duration-200" />
            }
          </button>
        </div>
      </div>

      {/* Mobile nav — slide down with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-950/98 backdrop-blur-md border-t border-slate-800/60">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 anim-slide-up ${
                  activeId === link.id
                    ? 'text-white bg-slate-800 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-1 mb-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all duration-200 anim-slide-up active:scale-95"
              style={{ animationDelay: `${navLinks.length * 50}ms` }}
            >
              Hire me
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
