import { useState } from 'react';
import {
  Code2, Copy, Check, Table2, Rocket, GitBranch, Workflow, Server, Network, Globe, Link2,
  CreditCard, Mail, MessageSquare, HardDrive, CircleCheck,
} from 'lucide-react';
import { focus } from './data';

/* ───── Example API request (illustrative only) ───── */
const requestBody = `{
  "sessionId": "sess_123",
  "participantId": "user_456",
  "paymentMethod": "card",
  "amount": 5000
}`;

/* Minimal JSON highlighter: keys, strings, numbers */
const highlight = (json: string) =>
  json.split('\n').map((line, n) => {
    const m = line.match(/^(\s*)"([^"]+)":\s*(.+?)(,?)$/);
    if (!m) return <span key={n}>{line}{'\n'}</span>;
    const [, pad, key, val, comma] = m;
    const isStr = val.startsWith('"');
    return (
      <span key={n}>
        {pad}<span className="tk-key">"{key}"</span>: <span className={isStr ? 'tk-str' : 'tk-num'}>{val}</span>{comma}{'\n'}
      </span>
    );
  });

export const ApiRequestCard = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`POST /api/bookings\n${requestBody}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable: the code stays selectable */ }
  };
  return (
    <article className="tc">
      <header className="tc-h">
        <span className="tc-ico" aria-hidden="true"><Code2 size={18} /></span>
        <h4>Example API request</h4>
        <span className="tc-method">POST</span>
      </header>
      <div className="tc-endrow">
        <p className="tc-endpoint">/api/bookings</p>
        <button type="button" className="tc-copy" onClick={copy} aria-label="Copy example request">
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="tc-code">
        <pre><code>{highlight(requestBody)}</code></pre>
      </div>
      <p className="tc-resp">Response <span className="tc-201">201 Created</span></p>
      <p className="tc-note">Returns the booking and its payment status. Illustrative example.</p>
    </article>
  );
};

/* ───── Simplified schema ───── */
const columns: [string, string, string?][] = [
  ['id', 'uuid', 'PK'],
  ['session_id', 'uuid', 'FK'],
  ['user_id', 'uuid', 'FK'],
  ['status', 'varchar'],
  ['amount', 'integer'],
  ['payment_id', 'varchar'],
  ['created_at', 'timestamptz'],
];

export const DatabaseSchemaCard = () => (
  <article className="tc">
    <header className="tc-h">
      <span className="tc-ico" aria-hidden="true"><Table2 size={18} /></span>
      <h4>Database schema</h4>
    </header>
    <div className="tc-table" role="table" aria-label="bookings table, simplified example">
      <div className="tc-table-name" role="row"><span role="columnheader">bookings</span></div>
      {columns.map(([c, t, k]) => (
        <div className="tc-col" role="row" key={c}>
          <span role="cell">{c}</span>
          <span role="cell" className="tc-type">{t}</span>
          <span role="cell" className="tc-key">{k ?? ''}</span>
        </div>
      ))}
    </div>
    <p className="tc-note">Simplified example, not a production schema. PostgreSQL with transactions and indexes.</p>
  </article>
);

/* ───── Deployment workflow ───── */
const deploySteps = [
  { t: 'GitHub', d: 'Code pushed to main', icon: <GitBranch size={18} /> },
  { t: 'GitHub Actions', d: 'Install, test and build', icon: <Workflow size={18} /> },
  { t: 'AWS EC2', d: 'Runs the application', icon: <Server size={18} /> },
  { t: 'Nginx + PM2', d: 'Reverse proxy and process manager', icon: <Network size={18} /> },
  { t: 'Live app', d: 'Served over HTTPS', icon: <Globe size={18} /> },
];

export const DeploymentWorkflowCard = () => (
  <article className="tc">
    <header className="tc-h">
      <span className="tc-ico" aria-hidden="true"><Rocket size={18} /></span>
      <h4>Deployment workflow</h4>
    </header>
    <ol className="tc-deploy">
      {deploySteps.map((s) => (
        <li key={s.t}>
          <span className="tc-dico" aria-hidden="true">{s.icon}</span>
          <span><b>{s.t}</b><small>{s.d}</small></span>
        </li>
      ))}
    </ol>
  </article>
);

/* ───── Integrations and focus ───── */
const integrations = [
  { t: 'Stripe', d: 'Payments', icon: <CreditCard size={20} /> },
  { t: 'SendGrid', d: 'Email', icon: <Mail size={20} /> },
  { t: 'Twilio', d: 'SMS', icon: <MessageSquare size={20} /> },
  { t: 'S3', d: 'Files', icon: <HardDrive size={20} /> },
];

export const IntegrationCard = () => (
  <article className="tc">
    <header className="tc-h">
      <span className="tc-ico" aria-hidden="true"><Link2 size={18} /></span>
      <h4>Key integrations</h4>
    </header>
    <ul className="tc-int">
      {integrations.map((s) => (
        <li key={s.t}><span className="tc-iico" aria-hidden="true">{s.icon}</span><b>{s.t}</b><small>{s.d}</small></li>
      ))}
    </ul>
    <h5 className="tc-sub">What I focus on</h5>
    <ul className="tc-focus">
      {focus.map((f) => <li key={f}><CircleCheck size={17} aria-hidden="true" />{f}</li>)}
    </ul>
  </article>
);
