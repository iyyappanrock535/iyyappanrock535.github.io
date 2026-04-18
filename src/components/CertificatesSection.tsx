import { CheckCircle, GitBranch, MessageSquare, Zap, Shield, RefreshCw } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const principles = [
  {
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    title: 'Outcome over output',
    desc: 'I measure success by whether the product works for real users, not by how many lines of code were written.',
  },
  {
    icon: <GitBranch className="w-5 h-5 text-blue-400" />,
    title: 'Architecture first',
    desc: 'Before writing code, I understand the data model, API contracts, and edge cases. Refactoring a bad design costs 10× more than getting it right early.',
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-indigo-400" />,
    title: 'No communication gaps',
    desc: 'Daily updates on long projects. Immediate flags if scope or timeline is at risk. Clients should never have to chase me for status.',
  },
  {
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    title: 'Performance by default',
    desc: 'React Native apps optimised for low-end Android from day one. Web apps that load fast on slow connections, not just in Chrome DevTools.',
  },
  {
    icon: <Shield className="w-5 h-5 text-violet-400" />,
    title: 'Production-ready, not demo-ready',
    desc: 'Error handling, retry logic, auth edge cases, and input validation are part of the build — not afterthoughts.',
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-sky-400" />,
    title: "Revisions until it's right",
    desc: "I've shipped React Native builds, Node.js backends, and full-stack platforms — and I stay until every issue is resolved.",
  },
];

const certifications = [
  {
    title: 'Advanced React Development',
    issuer: 'Udemy',
    focus: 'Advanced patterns, hooks, performance optimisation',
  },
  {
    title: 'Full Stack JavaScript Development',
    issuer: 'Udemy',
    focus: 'Node.js, databases, modern JavaScript',
  },
];

const CertificatesSection = () => {
  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: gridRef,   inView: gridIn   } = useInView(0.08);
  const { ref: certRef,   inView: certIn   } = useInView();

  return (
    <section id="process" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <p className={`text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`}>
            How I work
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`} style={{ animationDelay: '80ms' }}>
            Engineering principles
          </h2>
          <div className={`w-16 h-1 bg-blue-600 rounded-full mb-4 ${headerIn ? 'anim-scale' : 'reveal'}`} style={{ animationDelay: '160ms' }} />
          <p className={`text-slate-400 max-w-xl text-sm leading-relaxed ${headerIn ? 'anim-fade-up' : 'reveal'}`} style={{ animationDelay: '200ms' }}>
            These aren't values on a wall — they're what international clients have actually said
            about working with me.
          </p>
        </div>

        {/* Principles grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className={`p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors duration-200 ${gridIn ? 'anim-scale' : 'reveal'}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="mb-3">{p.icon}</div>
              <h3 className="text-white font-semibold mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div ref={certRef} className="border-t border-slate-800 pt-12">
          <p className={`text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6 ${certIn ? 'anim-fade-up' : 'reveal'}`}>
            Certifications
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((c, i) => (
              <div
                key={c.title}
                className={`flex items-start gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors duration-200 ${certIn ? 'anim-fade-up' : 'reveal'}`}
                style={{ animationDelay: `${80 + i * 80}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-0.5">{c.title}</div>
                  <div className="text-slate-500 text-xs mb-1">{c.issuer}</div>
                  <div className="text-slate-400 text-xs">{c.focus}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
