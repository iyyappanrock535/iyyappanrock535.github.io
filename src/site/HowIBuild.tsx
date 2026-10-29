import { useEffect, useRef, useState } from 'react';

/*
 * "How I build": one request traced across the whole stack.
 * Shown with sample names; no client code or infrastructure is reproduced.
 */

type NodeId = 'react' | 'redux' | 'express' | 'redis' | 'policies' | 'actions' | 'helpers' | 'pg' | 'stripe' | 'twilio' | 'sendgrid';

const layers: { name: string; note: string; nodes: { id: NodeId; t: string; d: string }[] }[] = [
  { name: 'Browser', note: 'React + Vite', nodes: [
    { id: 'react', t: 'React screens', d: 'Vite, lazy routes' },
    { id: 'redux', t: 'Redux store', d: 'slices + thunks' },
  ] },
  { name: 'Secure middleware', note: 'Node.js', nodes: [
    { id: 'express', t: 'Express', d: 'session cookie, auth' },
    { id: 'redis', t: 'Redis', d: 'session store' },
  ] },
  { name: 'API', note: 'Sails.js', nodes: [
    { id: 'policies', t: 'Policies', d: 'signed in, right role' },
    { id: 'actions', t: 'Actions', d: 'validate inputs' },
    { id: 'helpers', t: 'Helpers', d: 'business logic' },
  ] },
  { name: 'Data and services', note: '', nodes: [
    { id: 'pg', t: 'PostgreSQL', d: 'relational data' },
    { id: 'stripe', t: 'Stripe', d: 'payments, webhooks' },
    { id: 'twilio', t: 'Twilio', d: 'SMS' },
    { id: 'sendgrid', t: 'SendGrid', d: 'email' },
  ] },
];

const steps: { t: string; d: string; nodes: NodeId[] }[] = [
  { t: 'Tap "Book and pay"', d: 'A Redux thunk sends the booking and shows a loading state.', nodes: ['react', 'redux'] },
  { t: 'Check the session', d: 'Express reads the session cookie from Redis and attaches credentials. The browser never holds a token.', nodes: ['express', 'redis'] },
  { t: 'Check permissions', d: 'Sails policies confirm the parent is signed in and allowed to book.', nodes: ['policies'] },
  { t: 'Save the booking', d: 'The action validates the request and a helper writes the registration and order to PostgreSQL.', nodes: ['actions', 'helpers', 'pg'] },
  { t: 'Take payment', d: 'Stripe charges the card. A signed webhook confirms the payment before the order is marked paid.', nodes: ['stripe', 'pg'] },
  { t: 'Notify the family', d: 'Helpers send the confirmation by SMS through Twilio and by email through SendGrid.', nodes: ['helpers', 'twilio', 'sendgrid'] },
  { t: 'Update the screen', d: 'The thunk resolves, Redux updates, and the parent sees "You\'re booked".', nodes: ['redux', 'react'] },
];

const snippets: { label: string; code: string }[] = [
  {
    label: 'Redux thunk (frontend)',
    code: `export const bookSession = createAsyncThunk(
  'booking/create',
  async ({ sessionId }) => {
    const res = await client.post('/bookings', { sessionId });
    return res.data;   // request goes through the Express layer
  }
);`,
  },
  {
    label: 'Sails policies (backend)',
    code: `// config/policies.js
module.exports.policies = {
  '*': 'is-logged-in',
  'bookings/create': ['is-logged-in', 'has-role'],
};`,
  },
  {
    label: 'Sample table (PostgreSQL)',
    code: `CREATE TABLE registration (
  id          bigserial PRIMARY KEY,
  session_id  bigint NOT NULL REFERENCES session(id),
  athlete_id  bigint NOT NULL REFERENCES athlete(id),
  status      text   NOT NULL DEFAULT 'pending',
  UNIQUE (session_id, athlete_id)
);`,
  },
  {
    label: 'Deploy pipeline (GitHub Actions + PM2)',
    code: `on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test && npm run build
      - run: ./scripts/deploy.sh   # copy to EC2, pm2 reload`,
  },
];

const names = Object.fromEntries(layers.flatMap((l) => l.nodes.map((n) => [n.id, n.t]))) as Record<NodeId, string>;

const STEP_MS = 1600;

const HowIBuild = () => {
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!playing) return;
    const next = active === null ? 0 : active + 1;
    if (next >= steps.length) { setPlaying(false); return; }
    timer.current = setTimeout(() => setActive(next), active === null ? 0 : STEP_MS);
    return () => clearTimeout(timer.current);
  }, [playing, active]);

  const lit = new Set(active === null ? [] : steps[active].nodes);
  const pick = (i: number) => { setPlaying(false); setActive(active === i ? null : i); };
  const play = () => {
    if (playing) { setPlaying(false); return; }
    setActive(null);
    setPlaying(true);
  };

  return (
    <section id="how" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h-section">How I build</h2>
          <p className="lede">
            One request, traced across the stack I work in every day: a parent books and pays for a session.
            Pick a step or play the whole journey. Shown with sample names; client code stays private.
          </p>
        </div>

        <div className={`trace ${active !== null ? 'tracing' : ''}`}>
          <div className="stack" aria-label="System diagram">
            {layers.map((l) => (
              <div className="layer" key={l.name}>
                <div className="layer-name"><b>{l.name}</b>{l.note && <span>{l.note}</span>}</div>
                <div className="layer-nodes" style={{ ['--cols' as string]: l.nodes.length === 3 ? 3 : 2 } as React.CSSProperties}>
                  {l.nodes.map((n) => (
                    <div key={n.id} className={`node ${lit.has(n.id) ? 'lit' : ''}`}>
                      <b>{n.t}</b><span>{n.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="layer layer-ship">
              <div className="layer-name"><b>How it ships</b><span>AWS</span></div>
              <ol className="ship">
                <li>Push to main</li>
                <li><span>GitHub Actions: test and build</span></li>
                <li><span>Deploy to EC2</span></li>
                <li><span>PM2 reloads the app</span></li>
              </ol>
              <p className="ship-note">PostgreSQL on RDS, files on S3, sessions in Redis.</p>
            </div>
          </div>

          <div className="steps-panel">
            <button type="button" className="btn btn-solid trace-play" onClick={play}>
              {playing ? 'Pause' : active === steps.length - 1 ? 'Play again' : 'Play the request'}
            </button>
            <ol className="trace-steps">
              {steps.map((s, i) => (
                <li key={s.t}>
                  <button type="button" className={active === i ? 'on' : ''} aria-pressed={active === i} onClick={() => pick(i)}>
                    <span className="n" aria-hidden="true">{i + 1}</span>
                    <span className="st">
                      <b>{s.t}</b>
                      <span>{s.d}</span>
                      <em className="touches">Touches: {s.nodes.map((id) => names[id]).filter((v, k, arr) => arr.indexOf(v) === k).join(', ')}</em>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <details className="snips">
          <summary>See sample code</summary>
          <div className="snip-grid">
            {snippets.map((s) => (
              <figure className="hib-code" key={s.label}>
                <figcaption>{s.label}</figcaption>
                <pre><code>{s.code}</code></pre>
              </figure>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
};

export default HowIBuild;
