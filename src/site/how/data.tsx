import type { ReactNode } from 'react';
import {
  Monitor, Server, Settings, Database, Cloud, Atom, Zap, Layers, Wind, Hexagon, Route,
  KeyRound, ShieldCheck, Shield, Cog, Clock, Boxes, MemoryStick, CreditCard, Mail,
  MessageSquare, HardDrive, Workflow, Cpu, Network, User, Save, Bell, CircleCheck,
} from 'lucide-react';

/*
 * Configuration for the "How I build" section. All examples are
 * illustrative and anonymized: no client endpoints, schemas or data.
 */

export type LayerId = 'frontend' | 'middleware' | 'backend' | 'data' | 'deploy';
export type ServiceId = 'pg' | 'redis' | 'stripe' | 'sendgrid' | 'twilio' | 's3';
/* Connectors between the four request-processing layers (0: FE-MW, 1: MW-API, 2: API-Data) */
export type Hop = 'req0' | 'req1' | 'req2' | 'res0' | 'res1' | 'res2';

export type Tech = { name: string; icon: ReactNode; service?: ServiceId };

export type Layer = {
  id: LayerId;
  title: string;
  sub: string;
  icon: ReactNode;
  items: Tech[];
  role: string;
};

const i = (Icon: typeof Atom) => <Icon size={17} strokeWidth={2} aria-hidden="true" />;

export const layers: Layer[] = [
  {
    id: 'frontend', title: 'Frontend', sub: 'React + Vite', icon: <Monitor size={20} aria-hidden="true" />,
    items: [
      { name: 'React', icon: i(Atom) },
      { name: 'Vite', icon: i(Zap) },
      { name: 'Redux Toolkit', icon: i(Layers) },
      { name: 'Tailwind CSS', icon: i(Wind) },
    ],
    role: 'UI, state management and user interaction',
  },
  {
    id: 'middleware', title: 'Middleware', sub: 'Node.js + Express', icon: <Server size={20} aria-hidden="true" />,
    items: [
      { name: 'Node.js', icon: i(Hexagon) },
      { name: 'Express', icon: i(Route) },
      { name: 'Auth and session', icon: i(KeyRound) },
      { name: 'Validation and security', icon: i(ShieldCheck) },
      { name: 'API routing and proxy', icon: i(Network) },
    ],
    role: 'Request handling, authentication and proxy',
  },
  {
    id: 'backend', title: 'Backend API', sub: 'Sails.js', icon: <Settings size={20} aria-hidden="true" />,
    items: [
      { name: 'Controllers', icon: i(Boxes) },
      { name: 'Policies (auth)', icon: i(Shield) },
      { name: 'Services', icon: i(Cog) },
      { name: 'Business logic', icon: i(Settings) },
      { name: 'Jobs / cron', icon: i(Clock) },
    ],
    role: 'Application logic, rules and data processing',
  },
  {
    id: 'data', title: 'Database & integrations', sub: 'Data and services', icon: <Database size={20} aria-hidden="true" />,
    items: [
      { name: 'PostgreSQL', icon: i(Database), service: 'pg' },
      { name: 'Redis', icon: i(MemoryStick), service: 'redis' },
      { name: 'Stripe', icon: i(CreditCard), service: 'stripe' },
      { name: 'SendGrid', icon: i(Mail), service: 'sendgrid' },
      { name: 'Twilio', icon: i(MessageSquare), service: 'twilio' },
      { name: 'AWS S3', icon: i(HardDrive), service: 's3' },
    ],
    role: 'Data, sessions, payments, messages and files',
  },
  {
    id: 'deploy', title: 'Deployment', sub: 'AWS', icon: <Cloud size={20} aria-hidden="true" />,
    items: [
      { name: 'GitHub Actions', icon: i(Workflow) },
      { name: 'AWS EC2', icon: i(Server) },
      { name: 'PM2', icon: i(Cpu) },
      { name: 'Nginx', icon: i(Network) },
    ],
    role: 'CI/CD, hosting, processes and reverse proxy',
  },
];

export type Step = {
  title: string;
  badge: string;
  text: string;
  icon: ReactNode;
  layers: LayerId[];
  services: ServiceId[];
  hops: Hop[];
};

export const steps: Step[] = [
  {
    title: 'Start the booking', badge: 'React + Vite + Redux', icon: <User size={20} aria-hidden="true" />,
    text: 'The user picks a session and clicks "Book and pay". The frontend validates the input and sends the request.',
    layers: ['frontend'], services: [], hops: ['req0'],
  },
  {
    title: 'Authenticate request', badge: 'Node.js + Express', icon: <ShieldCheck size={20} aria-hidden="true" />,
    text: 'Express reads the session from Redis, checks authentication and forwards the request to the Sails.js API.',
    layers: ['middleware'], services: ['redis'], hops: ['req0', 'req1'],
  },
  {
    title: 'Validate and process', badge: 'Sails.js', icon: <Settings size={20} aria-hidden="true" />,
    text: 'Policies confirm the user may book. Services check availability, pricing and business rules.',
    layers: ['backend'], services: [], hops: ['req1'],
  },
  {
    title: 'Save to database', badge: 'PostgreSQL + Redis', icon: <Save size={20} aria-hidden="true" />,
    text: 'The booking is written to PostgreSQL inside a transaction, so a booking and its order are saved together or not at all.',
    layers: ['backend', 'data'], services: ['pg'], hops: ['req2'],
  },
  {
    title: 'Process payment', badge: 'Stripe + webhooks', icon: <CreditCard size={20} aria-hidden="true" />,
    text: 'A Stripe payment intent is created. Success is confirmed on the server through a signed webhook, processed once even if it arrives twice.',
    layers: ['backend', 'data'], services: ['stripe', 'pg'], hops: ['req2', 'res2'],
  },
  {
    title: 'Send notifications', badge: 'SendGrid + Twilio', icon: <Bell size={20} aria-hidden="true" />,
    text: 'Background jobs send the confirmation email and SMS, and retry if a provider fails.',
    layers: ['backend', 'data'], services: ['sendgrid', 'twilio'], hops: ['req2'],
  },
  {
    title: 'Update the screen', badge: 'React + Redux', icon: <CircleCheck size={20} aria-hidden="true" />,
    text: 'Once the booking is confirmed, Redux updates the state and the user sees the booking details or a clear error.',
    layers: ['frontend'], services: [], hops: ['res0', 'res1', 'res2'],
  },
];

export const values = ['Clean architecture', 'Reliable business logic', 'Secure communication', 'Maintainable code', 'Production-ready'];

export const focus = [
  'Secure and scalable architecture',
  'Clear separation of frontend, middleware and API',
  'Reliable payments and notifications',
  'Production-ready deployment on AWS',
];
