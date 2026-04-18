import { useInView } from '@/hooks/use-in-view';

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js',      level: 'Expert',     years: '5+ yrs', pct: '100%' },
      { name: 'React Native',  level: 'Expert',     years: '5+ yrs', pct: '100%' },
      { name: 'TypeScript',    level: 'Proficient', years: '4+ yrs', pct: '82%'  },
      { name: 'Vue.js',        level: 'Proficient', years: '3+ yrs', pct: '72%'  },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js',                     level: 'Expert',     years: '5+ yrs', pct: '100%' },
      { name: 'REST API Design',             level: 'Expert',     years: '5+ yrs', pct: '100%' },
      { name: 'Authentication & Auth flows', level: 'Proficient', years: '4+ yrs', pct: '82%'  },
      { name: 'WebSocket / Real-time',       level: 'Proficient', years: '3+ yrs', pct: '70%'  },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'Schema Design', level: 'Expert',     years: '5+ yrs', pct: '100%' },
      { name: 'MySQL',         level: 'Proficient', years: '4+ yrs', pct: '82%'  },
      { name: 'PostgreSQL',    level: 'Proficient', years: '3+ yrs', pct: '72%'  },
    ],
  },
  {
    category: 'Infrastructure & DevOps',
    skills: [
      { name: 'AWS (EC2, S3, RDS)', level: 'Proficient', years: '3+ yrs', pct: '75%' },
      { name: 'CI/CD Pipelines',    level: 'Proficient', years: '3+ yrs', pct: '75%' },
      { name: 'GitHub Actions',     level: 'Proficient', years: '3+ yrs', pct: '72%' },
      { name: 'Docker',             level: 'Familiar',   years: '2+ yrs', pct: '55%' },
    ],
  },
  {
    category: 'Tools & Workflow',
    skills: [
      { name: 'Git',          level: 'Expert',     years: '6+ yrs', pct: '100%' },
      { name: 'Figma → Code', level: 'Expert',     years: '5+ yrs', pct: '100%' },
      { name: 'Agile/Scrum',  level: 'Proficient', years: '5+ yrs', pct: '85%'  },
      { name: 'Expo CLI',     level: 'Proficient', years: '4+ yrs', pct: '80%'  },
    ],
  },
];

const levelColor: Record<string, string> = {
  Expert:     'text-blue-400',
  Proficient: 'text-indigo-400',
  Familiar:   'text-slate-400',
};

const barColor: Record<string, string> = {
  Expert:     'bg-blue-500',
  Proficient: 'bg-indigo-500',
  Familiar:   'bg-slate-500',
};

/** Single skill category card */
const SkillCard = ({
  group,
  delay,
  inView,
}: {
  group: typeof skillGroups[number];
  delay: number;
  inView: boolean;
}) => (
  <div
    className={`p-5 sm:p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors duration-200 ${inView ? 'anim-scale' : 'reveal'}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
      {group.category}
    </h3>
    <div className="space-y-5">
      {group.skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex items-center justify-between mb-1.5 gap-2">
            <span className="text-white text-sm font-medium truncate">{skill.name}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-slate-500 text-xs font-mono hidden sm:inline">{skill.years}</span>
              <span className={`text-xs font-semibold ${levelColor[skill.level]}`}>{skill.level}</span>
            </div>
          </div>
          {/* Bar: fills on scroll-in + shimmer sweep after fill */}
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${barColor[skill.level]} transition-all duration-700 ease-out ${inView ? 'shimmer-bar' : ''}`}
              style={{
                width: inView ? skill.pct : '0%',
                transitionDelay: inView ? `${delay + 200}ms` : '0ms',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = () => {
  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: gridRef,   inView: gridIn   } = useInView(0.05);

  return (
    <section id="skills" className="py-20 sm:py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-14">
          <p className={`text-blue-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`}>
            Skills
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 ${headerIn ? 'anim-fade-up' : 'reveal'}`}
            style={{ animationDelay: '80ms' }}
          >
            Technical expertise
          </h2>
          <div
            className={`w-16 h-1 bg-blue-600 rounded-full mb-4 ${headerIn ? 'anim-scale' : 'reveal'}`}
            style={{ animationDelay: '160ms' }}
          />
          <p
            className={`text-slate-400 max-w-xl text-sm sm:text-base ${headerIn ? 'anim-fade-up' : 'reveal'}`}
            style={{ animationDelay: '200ms' }}
          >
            6 years across the full stack — frontend, backend, mobile, database, and cloud.
          </p>
        </div>

        {/* Legend */}
        <div
          className={`flex flex-wrap gap-4 sm:gap-5 mb-8 sm:mb-10 ${headerIn ? 'anim-fade' : 'reveal'}`}
          style={{ animationDelay: '260ms' }}
        >
          {Object.entries(levelColor).map(([key, cls]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${barColor[key]}`} />
              <span className={`text-xs sm:text-sm font-medium ${cls}`}>{key}</span>
            </div>
          ))}
        </div>

        {/* Skill card grid — 1 col mobile, 2 col md, 3 col xl */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} delay={i * 70} inView={gridIn} />
          ))}

          {/* Numbers summary card */}
          <div
            className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300 flex flex-col justify-between ${gridIn ? 'anim-scale' : 'reveal'}`}
            style={{ animationDelay: `${skillGroups.length * 70}ms` }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
              By the numbers
            </h3>
            <div className="space-y-5">
              {[
                { n: '28',             sub: 'Production projects delivered' },
                { n: '6+',             sub: 'Years of production experience' },
                { n: '5',              sub: 'Industry domains shipped' },
                { n: 'iOS · Android · Web', sub: 'From a single codebase' },
              ].map(({ n, sub }, i) => (
                <div key={sub}>
                  <div className={`font-bold text-white mb-0.5 ${i < 3 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-2xl'}`}>
                    {n}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
