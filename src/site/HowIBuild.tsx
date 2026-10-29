import { useState } from 'react';
import {
  Lock, ShieldCheck, Settings, Route, Boxes, Shield, Cog, Clock, Users, CreditCard,
  Database, Bell, CircleCheck, Code2, Star, GitBranch, Workflow, Server,
  Cpu, Network, Globe, Mail, MessageSquare, HardDrive, Zap, Layers, Atom, Wind, KeyRound,
} from 'lucide-react';

/*
 * "How I build": a user request traced through each layer, from the
 * React frontend to AWS. Shown with sample names; client code stays private.
 */

type Part = 'client' | 'middleware' | 'api' | 'pg' | 'redis' | 'stripe' | 'sendgrid' | 'twilio' | 's3' | 'jobs';

const steps: { t: string; d: string; icon: JSX.Element; parts: Part[] }[] = [
  { t: 'User makes a request', icon: <Users size={18} />, parts: ['client'],
    d: 'A parent selects a session and clicks "Book and pay" in the React (Vite) frontend. The frontend validates the inputs and sends the request to the middleware.' },
  { t: 'Middleware handles the request', icon: <Lock size={18} />, parts: ['middleware', 'redis'],
    d: 'The Node.js and Express middleware checks the session in Redis, validates the user and forwards the request to the Sails.js API.' },
  { t: 'API processes the booking', icon: <Settings size={18} />, parts: ['api', 'pg'],
    d: 'Sails.js checks permissions, availability, pricing and business rules. If everything is valid, it creates a pending booking in PostgreSQL.' },
  { t: 'Payment processing', icon: <CreditCard size={18} />, parts: ['stripe', 'pg'],
    d: 'Stripe handles the payment. Webhooks confirm the payment and update the booking status securely.' },
  { t: 'Data and background tasks', icon: <Database size={18} />, parts: ['pg', 'redis', 'jobs'],
    d: 'Booking details, transactions and logs are stored in PostgreSQL. Redis manages sessions and caching, and background jobs send emails and SMS.' },
  { t: 'Notify the family', icon: <Bell size={18} />, parts: ['sendgrid', 'twilio'],
    d: 'SendGrid and Twilio send the confirmation email and SMS with the booking details.' },
  { t: 'Update the screen', icon: <CircleCheck size={18} />, parts: ['client'],
    d: 'Redux fetches the latest data and the frontend shows a success screen with the booking details and next actions such as reschedule or cancel.' },
];

const services: { id: Part; t: string; d: string; icon: JSX.Element }[] = [
  { id: 'pg', t: 'PostgreSQL', d: 'Core data', icon: <Database size={20} /> },
  { id: 'redis', t: 'Redis', d: 'Session store', icon: <Zap size={20} /> },
  { id: 'stripe', t: 'Stripe', d: 'Payments', icon: <CreditCard size={20} /> },
  { id: 'sendgrid', t: 'SendGrid', d: 'Emails', icon: <Mail size={20} /> },
  { id: 'twilio', t: 'Twilio', d: 'SMS', icon: <MessageSquare size={20} /> },
  { id: 's3', t: 'S3', d: 'File storage', icon: <HardDrive size={20} /> },
];

const ship: { t: string; d?: string; icon: JSX.Element }[] = [
  { t: 'Push to GitHub', icon: <GitBranch size={20} /> },
  { t: 'GitHub Actions', d: 'Test and build', icon: <Workflow size={20} /> },
  { t: 'Deploy to EC2', d: 'Frontend + API', icon: <Server size={20} /> },
  { t: 'PM2', d: 'Process manager', icon: <Cpu size={20} /> },
  { t: 'Nginx', d: 'Reverse proxy', icon: <Network size={20} /> },
  { t: 'Live app', d: 'HTTPS', icon: <Globe size={20} /> },
];

const stack = ['React', 'Vite', 'Redux', 'Tailwind CSS', 'Node.js', 'Express', 'Sails.js', 'PostgreSQL', 'Redis', 'Stripe', 'SendGrid', 'Twilio', 'AWS', 'Docker', 'PM2'];

const gives = [
  'Secure and scalable architecture',
  'Clear separation between frontend, middleware and API',
  'Reliable payments and notifications',
  'Production-ready deployment on AWS',
];

const Num = ({ n }: { n: number }) => <span className="hb-num" aria-hidden="true">{n}</span>;

const Row = ({ icon, t }: { icon: JSX.Element; t: string }) => (
  <li className="hb-row"><span className="hb-ico" aria-hidden="true">{icon}</span>{t}</li>
);

const HowIBuild = () => {
  const [open, setOpen] = useState<number | null>(0);
  const lit = new Set<Part>(open === null ? [] : steps[open].parts);
  const on = (p: Part) => (lit.has(p) ? 'lit' : '');

  return (
    <section id="how" className="hb">
      <div className="wrap">
        <header className="hb-head">
          <p className="hb-eyebrow">How I build</p>
          <h2 className="hb-title">From frontend to production</h2>
          <p className="hb-intro">
            I build end-to-end web applications, connecting responsive React interfaces with secure Node.js middleware,
            scalable Sails.js backend APIs, PostgreSQL databases and external integrations.
          </p>
          <p className="hb-intro">
            Select a step to see how a user request travels through each layer: frontend interactions and authentication,
            backend processing, data, third-party services and AWS deployment.
          </p>
          <p className="hb-approach">
            <b>My approach:</b> clean architecture, reliable business logic, secure API communication, maintainable code and production-ready deployment.
          </p>
        </header>

        <div className={`hb-grid ${open !== null ? 'tracing' : ''}`}>
          <div className="hb-diagram" aria-label="System diagram">
            {/* 1 Client */}
            <div className={`hb-panel p-client ${on('client')}`}>
              <div className="hb-ph"><Num n={1} /><div><b>Client (frontend)</b><span>React + Vite</span></div></div>
              <div className="hb-device" aria-hidden="true">
                <div className="laptop"><div className="screen"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
                <div className="mini-phone"><i /><i /><i /><i /></div>
              </div>
              <ul className="hb-list">
                <Row icon={<Atom size={16} />} t="React (TypeScript)" />
                <Row icon={<Zap size={16} />} t="Vite" />
                <Row icon={<Layers size={16} />} t="Redux Toolkit" />
                <Row icon={<Wind size={16} />} t="Tailwind CSS" />
              </ul>
            </div>

            <div className="hb-link l-https" aria-hidden="true"><span>HTTPS</span></div>

            {/* 2 Middleware */}
            <div className={`hb-panel p-mid ${on('middleware')}`}>
              <div className="hb-ph"><Num n={2} /><div><b>Middleware server</b><span>Node.js + Express</span></div></div>
              <ul className="hb-list">
                <Row icon={<KeyRound size={16} />} t="Auth and session" />
                <Row icon={<ShieldCheck size={16} />} t="Request validation" />
                <Row icon={<Cog size={16} />} t="Business logic" />
                <Row icon={<Route size={16} />} t="API routing" />
              </ul>
            </div>

            <div className="hb-link l-api" aria-hidden="true" />

            {/* 3 API */}
            <div className={`hb-panel p-api ${on('api')}`}>
              <div className="hb-ph"><Num n={3} /><div><b>API backend</b><span>Sails.js</span></div></div>
              <ul className="hb-list">
                <Row icon={<Boxes size={16} />} t="Models and controllers" />
                <Row icon={<Shield size={16} />} t="Policies (auth)" />
                <Row icon={<Settings size={16} />} t="Services" />
                <li className={`hb-row ${on('jobs')}`}><span className="hb-ico" aria-hidden="true"><Clock size={16} /></span>Jobs / cron</li>
              </ul>
            </div>

            {/* 4 Database & services */}
            <div className="hb-panel p-data">
              <div className="hb-ph"><Num n={4} /><div><b>Database and services</b></div></div>
              <ul className="hb-services">
                {services.map((s) => (
                  <li key={s.id} className={on(s.id)}>
                    <span className="hb-sico" aria-hidden="true">{s.icon}</span>
                    <b>{s.t}</b><span>{s.d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5 Deployment */}
            <div className="hb-panel p-ship">
              <div className="hb-ph"><Num n={5} /><div><b>Deployment (AWS)</b></div></div>
              <ol className="hb-ship">
                {ship.map((s) => (
                  <li key={s.t}>
                    <span className="hb-sico" aria-hidden="true">{s.icon}</span>
                    <b>{s.t}</b>{s.d && <span>{s.d}</span>}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Request flow */}
          <div className="hb-flow">
            <h3>Request flow, step by step</h3>
            <ol>
              {steps.map((s, i) => (
                <li key={s.t} className={open === i ? 'open' : ''}>
                  <button type="button" aria-pressed={open === i} onClick={() => setOpen(open === i ? null : i)}>
                    <span className="hb-step-n">{i + 1}</span>
                    <span className="hb-step-ico" aria-hidden="true">{s.icon}</span>
                    <span className="hb-step-t">{s.t}</span>
                  </button>
                  <p className="hb-step-d">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Bottom */}
          <div className="hb-panel hb-stack">
            <div className="hb-ph"><span className="hb-ico" aria-hidden="true"><Code2 size={18} /></span><div><b>Tech stack I use</b></div></div>
            <ul>{stack.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="hb-panel hb-gives">
            <div className="hb-ph"><span className="hb-ico star" aria-hidden="true"><Star size={18} /></span><div><b>What this gives</b></div></div>
            <ul>{gives.map((g) => <li key={g}><CircleCheck size={17} aria-hidden="true" />{g}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIBuild;
