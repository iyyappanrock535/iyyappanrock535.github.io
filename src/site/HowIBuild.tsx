import { useRef, useState } from 'react';

/*
 * "How I build": the patterns I use across projects, shown with sample
 * names. No client code, schema or infrastructure is reproduced here.
 */

type Node = { t: string; d: string; hl?: boolean };
type Tab = {
  id: string;
  label: string;
  title: string;
  intro: string;
  flow: Node[];
  side?: { label: string; items: string[] };
  points: string[];
  codeLabel: string;
  code: string;
};

const tabs: Tab[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    title: 'React behind a secure Node.js layer',
    intro:
      'The React app (Vite, Redux, Redux Thunk) never talks to the API directly. It is served through an Express middleware layer that keeps the user session in Redis, so tokens stay on the server and never reach the browser.',
    flow: [
      { t: 'Browser', d: 'React + Vite bundle' },
      { t: 'Redux store', d: 'slices + thunks' },
      { t: 'Express middleware', d: 'session cookie, auth checks', hl: true },
      { t: 'Redis', d: 'session store' },
      { t: 'API', d: 'Sails.js' },
    ],
    points: [
      'Thunks handle async calls, loading and error states in one place per feature.',
      'The browser only holds an httpOnly session cookie; the Express layer attaches credentials to API calls.',
      'Sessions in Redis can be revoked instantly and survive server restarts.',
      'Code splitting and lazy-loaded routes keep the first load small.',
    ],
    codeLabel: 'Feature folder and a thunk',
    code: `src/
  app/store.js
  features/
    registrations/
      registrationsSlice.js
      registrationsThunks.js
      RegistrationList.jsx
  api/client.js          // calls go through the Express layer

// registrationsThunks.js
export const fetchRegistrations = createAsyncThunk(
  'registrations/fetch',
  async (programId) => {
    const res = await client.get(\`/registrations?program=\${programId}\`);
    return res.data;
  }
);`,
  },
  {
    id: 'backend',
    label: 'Backend',
    title: 'Sails.js APIs with policies and integrations',
    intro:
      'Every request passes through Sails policies before it reaches an action. Authentication uses Passport with OAuth. Payments, SMS and email go through Stripe, Twilio and SendGrid, wrapped in helpers so actions stay small.',
    flow: [
      { t: 'Route', d: 'config/routes.js' },
      { t: 'Policies', d: 'is-logged-in, has-role', hl: true },
      { t: 'Action', d: 'validates inputs' },
      { t: 'Helpers', d: 'business logic' },
      { t: 'PostgreSQL', d: 'via Waterline models' },
    ],
    side: { label: 'Integrations', items: ['Passport + OAuth sign-in', 'Stripe payments and webhooks', 'Twilio SMS', 'SendGrid email', 'Cron jobs for scheduled work'] },
    points: [
      'Role checks live in policies, so no action can skip them by accident.',
      'Stripe webhooks are verified by signature before any order changes.',
      'Notifications are sent from helpers, so the same message logic is reused across features.',
      'Recurring work such as reminders and clean-up runs as scheduled cron jobs.',
    ],
    codeLabel: 'Sails project layout and a policy',
    code: `api/
  controllers/registrations/create.js
  helpers/payments/charge-order.js
  helpers/notify/send-sms.js
  models/Registration.js
  policies/is-logged-in.js
  policies/has-role.js
config/
  routes.js
  policies.js

// config/policies.js
module.exports.policies = {
  '*': 'is-logged-in',
  'registrations/create': ['is-logged-in', 'has-role'],
};`,
  },
  {
    id: 'database',
    label: 'Database',
    title: 'Relational design in PostgreSQL',
    intro:
      'I model the business first, then the tables. Foreign keys keep the data consistent, indexes follow the real queries, and I check slow queries with EXPLAIN ANALYZE before changing anything.',
    flow: [
      { t: 'Organization', d: 'one club or lender' },
      { t: 'Program', d: 'belongs to organization' },
      { t: 'Session', d: 'belongs to program' },
      { t: 'Registration', d: 'athlete + session', hl: true },
      { t: 'Order', d: 'one per checkout' },
      { t: 'Payment', d: 'linked to order' },
    ],
    points: [
      'Every child row has a foreign key, so orphaned records cannot exist.',
      'Unique constraints stop double registrations at the database level, not only in code.',
      'Indexes match the filters screens actually use, such as organization and date.',
    ],
    codeLabel: 'Sample tables',
    code: `CREATE TABLE registration (
  id          bigserial PRIMARY KEY,
  session_id  bigint NOT NULL REFERENCES session(id),
  athlete_id  bigint NOT NULL REFERENCES athlete(id),
  status      text   NOT NULL DEFAULT 'pending',
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, athlete_id)
);

CREATE INDEX registration_session_status_idx
  ON registration (session_id, status);`,
  },
  {
    id: 'deployment',
    label: 'Deployment',
    title: 'GitHub Actions to EC2 with PM2',
    intro:
      'A push to the main branch runs the GitHub Actions pipeline. It tests and builds the app, deploys to EC2, and PM2 reloads the Node processes one at a time. PostgreSQL runs on Amazon RDS and files are stored in S3.',
    flow: [
      { t: 'Push to main', d: 'GitHub' },
      { t: 'GitHub Actions', d: 'install, test, build', hl: true },
      { t: 'Deploy', d: 'to EC2' },
      { t: 'PM2', d: 'reload Node processes' },
      { t: 'Running app', d: 'RDS PostgreSQL, S3, Redis' },
    ],
    points: [
      'Tests must pass before anything is deployed.',
      'PM2 runs the app in cluster mode and reloads workers one by one.',
      'Secrets live in GitHub and server environment settings, never in the repository.',
    ],
    codeLabel: 'Pipeline and PM2 config',
    code: `# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test && npm run build
      - run: ./scripts/deploy.sh   # copy build to EC2, pm2 reload

// ecosystem.config.js
module.exports = {
  apps: [{ name: 'api', script: 'app.js', instances: 'max', exec_mode: 'cluster' }],
};`,
  },
];

const HowIBuild = () => {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section id="how" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h-section">How I build</h2>
          <p className="lede">The patterns I use across projects, from the browser to the server. Shown with sample names; client code and data stay private.</p>
        </div>

        <div className="hib-tabs" role="tablist" aria-label="Parts of the stack" onKeyDown={onKey}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              id={`hib-tab-${t.id}`}
              aria-selected={active === i}
              aria-controls={`hib-panel-${t.id}`}
              tabIndex={active === i ? 0 : -1}
              className={`hib-tab ${active === i ? 'on' : ''}`}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="hib-panel" role="tabpanel" id={`hib-panel-${tab.id}`} aria-labelledby={`hib-tab-${tab.id}`}>
          <div className="hib-text">
            <h3>{tab.title}</h3>
            <p>{tab.intro}</p>
          </div>

          <div className="hib-diagram" aria-label={`${tab.label} flow`}>
            <ol className={`flow ${tab.id === 'database' ? 'flow-db' : ''}`}>
              {tab.flow.map((n) => (
                <li key={n.t} className={n.hl ? 'hl' : ''}><b>{n.t}</b><span>{n.d}</span></li>
              ))}
            </ol>
            {tab.side && (
              <div className="flow-side">
                <span>{tab.side.label}</span>
                <ul>{tab.side.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            )}
          </div>

          <div className="hib-cols">
            <ul className="hib-points">{tab.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <figure className="hib-code">
              <figcaption>{tab.codeLabel}</figcaption>
              <pre><code>{tab.code}</code></pre>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIBuild;
