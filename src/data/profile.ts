/*
 * All portfolio content lives here. Edit this file to update the site.
 *
 * Screenshots: put image files in /public/work/<project-id>/ and list them
 * in that project's `screens` array, e.g. ['/work/club/dashboard.png'].
 * While `screens` is empty, the site shows an illustrative view instead.
 */

export const profile = {
  name: 'Iyyappan Sivakumar',
  title: 'Senior Full Stack Engineer',
  location: 'Chennai, India (IST, UTC+5:30)',
  email: 'iyyappanrock535@gmail.com',
  linkedin: 'https://www.linkedin.com/in/iyyappan-sivakumar-624242168/',
  github: 'https://github.com/iyyappanrock535',
  whatsapp: 'https://wa.me/917010053680',
  resume: '/Iyyappan-Sivakumar-Resume.pdf',
  headline: 'I build the software sports clubs and lenders run their business on.',
  intro:
    'Communiti is a Canadian sports-management company; I have worked there remotely from Chennai since 2022. Seven years shipping web and mobile products with React, React Native and Node.js, from database design to production.',
  availability:
    'Open to remote-first roles with product teams in the US, Europe, Singapore and Dubai. Comfortable overlapping with EST, CET and SGT working hours.',
};

export type Featured = {
  id: 'club' | 'athlete' | 'thangam' | 'video';
  name: string;
  url?: string;
  urlLabel?: string;
  company: string;
  summary: string;
  built: string[];
  stack: string[];
  screens: string[];
};

export const featured: Featured[] = [
  {
    id: 'club',
    name: 'Communiti Club App',
    url: 'https://club.communiti.app/',
    urlLabel: 'club.communiti.app',
    company: 'Communiti',
    summary:
      'The admin platform sports clubs, leagues, camps and coaches use to run programs: registration, scheduling, payments, orders and member messaging in one place. Part of a platform used by hundreds of sports organizations across Canada.',
    built: [
      'Program setup, online registration forms and question sets',
      'Scheduling for programs, sessions, camps and leagues',
      'Orders, Stripe payments and customer records with role-based access',
      'Sails.js / Node.js APIs on a relational PostgreSQL schema',
      'Cron jobs for recurring background work, and production deployments',
    ],
    stack: ['React.js', 'Vite', 'Tailwind CSS', 'Sails.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    screens: [],
  },
  {
    id: 'athlete',
    name: 'Communiti Athlete App',
    url: 'https://book.communiti.app/',
    urlLabel: 'book.communiti.app',
    company: 'Communiti',
    summary:
      'The booking app athletes and parents use to find a program, register, book sessions and pay online. Built mobile-first on the same APIs and database as the Club App.',
    built: [
      'Program discovery and registration flow',
      'Session booking and online checkout',
      'Mobile-first React interface shared with the club platform APIs',
      'Builds and production releases alongside the Club App',
    ],
    stack: ['React.js', 'Vite', 'Tailwind CSS', 'Sails.js', 'Node.js', 'PostgreSQL'],
    screens: [],
  },
  {
    id: 'thangam',
    name: 'Thangam Capital loan management system',
    url: 'https://thangamcapital.com/',
    urlLabel: 'thangamcapital.com',
    company: 'Thangam Capital (NBFC)',
    summary:
      'A full-stack loan management system for an NBFC that lends to micro-enterprises, women entrepreneurs and farmers across rural Tamil Nadu. It covers a loan from first application to final repayment.',
    built: [
      'Applicant and co-applicant onboarding, and conversion of approved applicants into customers',
      'Loan creation, disbursement and repayment schedules',
      'Customer ledger and payment-due tracking',
      'eNACH e-mandate registration for automatic EMI collection, plus non-eNACH collection',
      'Loan-officer workflows with RBAC, JWT authentication and audit logs',
      'Reporting dashboards with PDF report generation',
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'REST APIs', 'AWS', 'eNACH'],
    screens: [],
  },
];

export const personal: Featured = {
  id: 'video',
  name: 'AI video generation and automation platform',
  company: 'Personal project',
  summary:
    'A platform I designed and built that produces episodic animated stories and 3D racing videos with AI, from script to a YouTube upload that waits for my approval.',
  built: [
    'Local LLMs (Ollama) and Gemini for scriptwriting and scene planning',
    'FLUX.2 for visuals and LTX-2.3 for animation, with multilingual narration',
    'Automated scheduling and persistent episode memory, so stories continue across episodes',
    'Redis-based job processing with quality validation before anything is published',
    'Approval-based YouTube publishing workflow',
    'GPU-accelerated Three.js racing renderer with action-driven animation, cinematic cameras and automated scene checks',
  ],
  stack: ['React.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Ollama', 'Gemini', 'FLUX.2', 'LTX-2.3', 'Three.js', 'FFmpeg', 'Docker'],
  screens: [],
};

export const moreProjects = [
  { name: 'NOQ Self-Checkout', domain: 'Retail', line: 'Scan-and-pay mobile checkout with routing across several payment gateways.', stack: 'React Native, Redux, REST APIs' },
  { name: 'GoldPe', domain: 'Fintech', line: 'Digital gold savings with live price feeds, wallet and withdrawal flows.', stack: 'React Native, real-time APIs' },
  { name: 'Adhiban Nidhi', domain: 'Fintech', line: 'Loans, NRI investments and chit-fund management on web and mobile.', stack: 'React.js, React Native, Node.js, PostgreSQL' },
  { name: 'Sixty Plus', domain: 'Healthcare', line: 'Elder-care app matching families with in-home caregivers, with emergency alerts.', stack: 'React Native, push notifications' },
  { name: 'SurfConnect', domain: 'Sports', line: 'Live beach camera streams with wave and wind forecasts.', stack: 'React Native, streaming, geolocation' },
  { name: 'Raha Store', domain: 'E-commerce', line: 'Grocery ordering with live inventory, checkout and delivery tracking.', stack: 'React Native, payments, location' },
  { name: 'Yaadien', domain: 'Social', line: 'Matching, real-time chat and location-based discovery.', stack: 'React Native, WebSockets' },
  { name: 'Lucky 7 Royale Poker', domain: 'Gaming', line: 'Real-time multiplayer poker with game-state sync and leaderboards.', stack: 'React Native, WebSockets' },
];

export const experience = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'Communiti',
    where: 'Canada, remote from India',
    when: 'Oct 2025 – present',
    points: [
      'Lead full-stack development of the Club App and Athlete App, from PostgreSQL data models and Sails.js APIs to React interfaces and release.',
      'Tune GraphQL and REST APIs and PostgreSQL queries for faster pages and reports.',
      'Run AWS infrastructure and GitHub Actions pipelines for automated deployments.',
      'Brought AI-driven automation testing and AI-assisted UI design into the team workflow.',
      'Lead architecture reviews and mentor junior engineers.',
    ],
  },
  {
    role: 'Full Stack Engineer',
    company: 'Communiti',
    where: 'Canada, remote from India',
    when: 'Oct 2022 – Oct 2025',
    points: [
      'Built registration, scheduling, booking and order flows for the Club and Athlete apps.',
      'Developed Sails.js and Node.js services on PostgreSQL for 10K+ daily active users.',
      'Integrated Stripe payments with role-based access and audit trails.',
      'Shipped React Native apps to the App Store and Google Play.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'StudioQ Web Solutions',
    where: 'Puducherry, India',
    when: 'May 2019 – Oct 2022',
    points: [
      'Built responsive React web apps and reusable component libraries.',
      'Improved page-load performance with lazy loading and bundle analysis.',
    ],
  },
];

export const skills: [string, string][] = [
  ['Frontend', 'React.js, Next.js, Vite, TypeScript, JavaScript, Apollo Client, Three.js, Tailwind CSS, HTML, CSS'],
  ['Mobile', 'React Native, Expo, App Store and Google Play releases, push notifications, deep linking, offline sync'],
  ['Backend and APIs', 'Node.js, Express.js, Sails.js, Python, FastAPI, Flask, GraphQL, REST, WebSockets, Redis job queues, cron jobs'],
  ['Databases', 'PostgreSQL, relational data modelling, Firebase, Redis'],
  ['Cloud and DevOps', 'AWS (EC2, S3, RDS, Lambda), Docker, GitHub Actions, Fastlane, FFmpeg, Git'],
  ['AI and automation', 'Generative AI, LLMs, Ollama, Gemini, FLUX.2, LTX-2.3, prompt engineering, RAG, LangChain, Hugging Face, AI-driven test automation, AI-assisted UI design'],
  ['Security and payments', 'OAuth 2.0, JWT, Firebase Auth, RBAC, audit logging, Stripe, eNACH'],
  ['Testing', 'Jest, React Testing Library, Detox, Postman'],
];

export const certifications = [
  {
    name: 'IBM Generative AI Engineering',
    kind: 'Professional Certificate, 16 courses',
    issuer: 'IBM on Coursera',
    date: 'Aug 2026',
    covers: 'LLMs and transformers, prompt engineering, fine-tuning, RAG with LangChain, PyTorch and Hugging Face, AI apps with Python and Flask.',
    verify: 'https://coursera.org/verify/professional-cert/385TAM6YF000',
  },
  {
    name: 'Generative AI for Mobile App Developers',
    kind: 'Specialization, 4 courses',
    issuer: 'IBM and SkillUp on Coursera',
    date: 'Dec 2025',
    covers: 'AI in software and mobile app development, prompt engineering and AI-assisted code generation.',
    verify: 'https://coursera.org/verify/specialization/QT6QWB2SEZCH',
  },
];

export const courses = [
  { name: 'Data Analysis with Python', issuer: 'IBM on Coursera', date: 'Apr 2026', verify: 'https://coursera.org/verify/UEKX69UF7MCG' },
  { name: 'Python for Data Science, AI & Development', issuer: 'IBM on Coursera', date: 'Apr 2026', verify: 'https://coursera.org/verify/8BOIDZVO37FF' },
  { name: 'The Complete React Native + Hooks Course', issuer: 'Udemy', date: 'May 2023', verify: 'https://www.udemy.com/certificate/UC-d40fd389-846a-4de8-8a5c-be2eda82fd2f/' },
  { name: 'Node with React: Fullstack Web Development', issuer: 'Udemy', date: 'May 2022', verify: 'https://www.udemy.com/certificate/UC-f01b0954-d37d-4c45-be9b-be5ff7213077/' },
];

/*
 * Visibility switches. The old sections are kept in the code, just hidden.
 * Set a value to true to show that section again.
 */
export const show = {
  testimonials: false,     // client reviews (components/TestimonialsSection.tsx)
  freelancerLink: false,   // freelancer.in profile link in contact and footer
  moreProjects: true,      // earlier projects list
};
export const freelancerProfile = 'https://www.freelancer.in/u/iyyappanrock0';
