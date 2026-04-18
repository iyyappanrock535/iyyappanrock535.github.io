import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Smartphone, Globe, X, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { cardHover, btnPrimary } from '@/lib/motion';

type Project = {
  id: number;
  title: string;
  type: string;
  category: string;
  categoryColor: string;
  tagline: string;
  impact: string;
  role: string;
  technologies: string[];
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'NOQ Self-Checkout Store',
    type: 'Mobile App',
    category: 'E-commerce',
    categoryColor: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
    tagline: 'Replaced cashier queues with a scan-and-pay mobile experience.',
    impact:
      'Integrated Stripe, Razorpay, and Paytm into a single unified payment routing layer with fallback handling. Converted Figma designs to pixel-perfect React Native UI. Built the full API integration layer with retry logic and robust error handling.',
    role: 'Full-stack mobile developer — UI, API integration, payment gateway routing.',
    technologies: ['React Native', 'Redux', 'Stripe', 'Razorpay', 'Paytm', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'GoldPe',
    type: 'Mobile App',
    category: 'FinTech',
    categoryColor: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    tagline: 'A FinTech platform where users accumulate digital gold savings and convert to cash or physical gold on demand.',
    impact:
      'Built real-time gold price feed integration, secure wallet and transaction flows, and instant withdrawal pipeline. Every feature had compliance implications — handled with care.',
    role: 'Led mobile development. Owned payment flows, real-time pricing, and secure transaction processing.',
    technologies: ['React Native', 'Real-time APIs', 'Payment Integration', 'Secure Storage'],
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    title: 'SurfConnect',
    type: 'Mobile App',
    category: 'Sports Tech',
    categoryColor: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
    tagline: 'Real-time surf condition monitoring — assess sea conditions without being on the beach.',
    impact:
      'Built live HD camera streaming integration across multiple beach locations with wave/wind forecasting. Implemented geolocation-based beach discovery and multi-sport compatibility.',
    role: 'Mobile developer — streaming, geolocation, weather API integration.',
    technologies: ['React Native', 'Real-time Streaming', 'Weather APIs', 'Geolocation', 'Camera Integration'],
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=500&fit=crop',
  },
  {
    id: 4,
    title: 'Adhiban Nidhi',
    type: 'Web & Mobile',
    category: 'FinTech',
    categoryColor: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    tagline: 'Full-stack financial services platform — loans, NRI investments, chit funds, and corporate services.',
    impact:
      'Built both the web platform and mobile app. Implemented project finance application flows, NRI investment modules, and a chit fund management system with real-time account tracking.',
    role: 'Full-stack — React.js web, React Native mobile, Node.js backend, DB design.',
    technologies: ['React.js', 'React Native', 'Node.js', 'PostgreSQL', 'Financial APIs'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=500&fit=crop',
  },
  {
    id: 5,
    title: 'Sixty Plus',
    type: 'Mobile App',
    category: 'Healthcare',
    categoryColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    tagline: 'Elder care platform connecting aging parents in Tamil Nadu with verified in-home caregivers.',
    impact:
      'Built caregiver matching system, family monitoring dashboard, emergency response flow, and health report generation. A domain where reliability isn\'t optional.',
    role: 'Mobile developer — caregiver matching, emergency systems, health tracking.',
    technologies: ['React Native', 'Healthcare APIs', 'Location Services', 'Emergency Systems', 'Push Notifications'],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=500&fit=crop',
  },
  {
    id: 6,
    title: 'Raha Store',
    type: 'Mobile App',
    category: 'E-commerce',
    categoryColor: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
    tagline: 'Grocery and essentials e-commerce app with live inventory, order tracking, and home delivery.',
    impact:
      'Implemented full product catalogue, cart and checkout flow, order tracking, and location-based delivery management. Focused on performance for low-end Android devices.',
    role: 'Mobile developer — product catalogue, checkout, order management, delivery tracking.',
    technologies: ['React Native', 'E-commerce APIs', 'Payment Gateway', 'Location Services'],
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=500&fit=crop',
  },
  {
    id: 7,
    title: 'Yaadien',
    type: 'Mobile App',
    category: 'Social',
    categoryColor: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
    tagline: 'Social dating app with advanced matching algorithms, real-time messaging, and location-based discovery.',
    impact:
      'Implemented matching engine, real-time chat with WebSocket, profile management, and privacy controls. Optimised for performance with large user datasets.',
    role: 'Mobile developer — matching algorithms, real-time chat, geolocation, push notifications.',
    technologies: ['React Native', 'WebSocket', 'Geolocation', 'Push Notifications', 'Real-time Chat'],
    image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=800&h=500&fit=crop',
  },
  {
    id: 8,
    title: 'Lucky 7 Royale Poker',
    type: 'Mobile Game',
    category: 'Gaming',
    categoryColor: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    tagline: 'Multiplayer poker game with real-time gameplay, leaderboards, and social features.',
    impact:
      'Built real-time multiplayer game state synchronisation, interactive card animations, score tracking, and a leaderboard system. Handled latency-sensitive real-time events.',
    role: 'Mobile developer — game logic, real-time multiplayer, animation, leaderboard systems.',
    technologies: ['React Native', 'WebSocket', 'Game State Management', 'Animation Libraries'],
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=500&fit=crop',
  },
];

const ProjectsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: gridRef,   inView: gridIn   } = useInView(0.05);

  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <p className={`text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`}>Work</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold text-white mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`} style={{ animationDelay: '80ms' }}>Selected projects</h2>
              <div className={`w-16 h-1 bg-blue-600 rounded-full ${headerIn ? 'anim-scale' : 'reveal'}`} style={{ animationDelay: '160ms' }} />
            </div>
            <p className={`text-slate-400 text-sm max-w-xs ${headerIn ? 'anim-fade' : 'reveal'}`} style={{ animationDelay: '200ms' }}>
              8 of 28 delivered projects — click any card for details.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              onClick={() => setSelected(project)}
              className={`group text-left bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-colors duration-200 ${gridIn ? 'anim-fade-up' : 'reveal'}`}
              style={{ animationDelay: `${i * 70}ms` }}
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate="rest"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-3 left-4 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${project.categoryColor}`}>
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
                    {project.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-400 border border-slate-700">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-500 border border-slate-700">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-blue-500 text-sm font-medium">
                  View details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center ${gridIn ? 'anim-fade-up' : 'reveal'}`} style={{ animationDelay: `${projects.length * 70}ms` }}>
          <h3 className="text-xl font-bold text-white mb-3">28 projects total. These are 8.</h3>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            If you're building something in FinTech, Healthcare, or E-commerce — let's talk about
            whether I'm the right fit.
          </p>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
            variants={btnPrimary}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate="rest"
          >
            Start a conversation
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-56 object-cover rounded-t-2xl brightness-75"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-5 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${selected.categoryColor}`}>
                  {selected.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
                  {selected.type}
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selected.title}</h2>
                <p className="text-slate-300 leading-relaxed">{selected.tagline}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">What I built</h3>
                <p className="text-slate-300 leading-relaxed">{selected.impact}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">My role</h3>
                <p className="text-slate-300 leading-relaxed">{selected.role}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Tech stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg text-sm font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
