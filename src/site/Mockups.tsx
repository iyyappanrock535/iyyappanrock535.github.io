import { useEffect, useRef, useState } from 'react';

/*
 * Illustrative product views drawn in HTML, with small working
 * interactions. They stand in for real screenshots until images are
 * added to a project's `screens` list. All names and figures are sample data.
 */

const Bar = ({ url }: { url: string }) => (
  <div className="frag-bar">
    <div className="frag-dots" aria-hidden="true"><i /><i /><i /></div>
    <span>{url}</span>
  </div>
);

/* ───────── Hero fragments (static) ───────── */
export const ClubRegistrations = ({ className = '' }: { className?: string }) => (
  <div className={`frag ${className}`}>
    <Bar url="club.communiti.app/programs/u12-spring-soccer" />
    <div className="frag-body">
      <div className="frag-title">U12 Spring Soccer registrations <span>Sat 9:00 AM · 18 of 24 spots</span></div>
      <table className="ftable">
        <thead>
          <tr><th>Athlete</th><th>Guardian</th><th>Order</th><th className="num">Status</th></tr>
        </thead>
        <tbody>
          <tr><td>Maya R.</td><td>Priya R.</td><td>#4821</td><td className="num"><span className="pill pill-paid">Paid</span></td></tr>
          <tr><td>Liam T.</td><td>Sarah T.</td><td>#4819</td><td className="num"><span className="pill pill-paid">Paid</span></td></tr>
          <tr><td>Noah K.</td><td>Daniel K.</td><td>#4816</td><td className="num"><span className="pill pill-due">Pending</span></td></tr>
          <tr><td>Ava M.</td><td>Chloe M.</td><td>#4812</td><td className="num"><span className="pill pill-info">Waitlist</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const LoanLedger = ({ className = '' }: { className?: string }) => (
  <div className={`frag ${className}`}>
    <Bar url="Loan LN-20418 · Ledger" />
    <div className="frag-body">
      <div className="frag-title">Working capital loan <span>eNACH mandate active</span></div>
      <table className="ftable">
        <thead>
          <tr><th>Due date</th><th className="num">EMI (₹)</th><th className="num">Status</th></tr>
        </thead>
        <tbody>
          <tr><td>05 Aug</td><td className="num">9,450</td><td className="num"><span className="pill pill-paid">Collected</span></td></tr>
          <tr><td>05 Sep</td><td className="num">9,450</td><td className="num"><span className="pill pill-paid">Collected</span></td></tr>
          <tr><td>05 Oct</td><td className="num">9,450</td><td className="num"><span className="pill pill-due">Due</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ───────── Club App: weekly schedule with program filter ───────── */
type Program = 'Skating' | 'Swim' | 'Soccer' | 'Camps' | 'Private';
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const sessions: { day: number; start: number; len: number; name: string; program: Program; tone: string; filled: number; cap: number }[] = [
  { day: 0, start: 0, len: 2, name: 'U10 Skating', program: 'Skating', tone: 'a', filled: 14, cap: 16 },
  { day: 1, start: 1, len: 2, name: 'Learn to Swim', program: 'Swim', tone: 'b', filled: 9, cap: 10 },
  { day: 2, start: 0, len: 1, name: 'Private lesson', program: 'Private', tone: 'c', filled: 1, cap: 1 },
  { day: 2, start: 2, len: 2, name: 'U12 Soccer', program: 'Soccer', tone: 'd', filled: 18, cap: 24 },
  { day: 3, start: 1, len: 2, name: 'U10 Skating', program: 'Skating', tone: 'a', filled: 15, cap: 16 },
  { day: 4, start: 0, len: 2, name: 'Learn to Swim', program: 'Swim', tone: 'b', filled: 10, cap: 10 },
  { day: 5, start: 0, len: 3, name: 'Summer camp', program: 'Camps', tone: 'e', filled: 42, cap: 50 },
  { day: 5, start: 3, len: 1, name: 'Private lesson', program: 'Private', tone: 'c', filled: 1, cap: 1 },
];
const programs: ('All' | Program)[] = ['All', 'Skating', 'Swim', 'Soccer', 'Camps', 'Private'];

export const ClubSchedule = () => {
  const [filter, setFilter] = useState<'All' | Program>('All');
  const shown = sessions.filter((s) => filter === 'All' || s.program === filter);
  const regs = shown.reduce((n, s) => n + s.filled, 0);
  return (
    <div className="frag">
      <Bar url="club.communiti.app/schedule" />
      <div className="frag-body">
        <div className="frag-title">Week of 9 Nov <span aria-live="polite">{shown.length} sessions · {regs} registrations</span></div>
        <div className="chipbar" role="group" aria-label="Filter by program">
          {programs.map((p) => (
            <button key={p} type="button" className={`fchip ${filter === p ? 'on' : ''}`} aria-pressed={filter === p} onClick={() => setFilter(p)}>{p}</button>
          ))}
        </div>
        <div className="sched">
          <div className="sched-times"><span />{['4 PM', '5 PM', '6 PM', '7 PM'].map((t) => <span key={t}>{t}</span>)}</div>
          {days.map((d, di) => (
            <div className="sched-col" key={d}>
              <div className="sched-day">{d}</div>
              <div className="sched-track">
                {sessions.filter((s) => s.day === di).map((s) => {
                  const dim = filter !== 'All' && s.program !== filter;
                  const full = s.filled >= s.cap;
                  return (
                    <div key={s.name + s.start} className={`sess sess-${s.tone} ${dim ? 'dim' : ''}`} style={{ gridRow: `${s.start + 1} / span ${s.len}` }}>
                      <b>{s.name}</b><small>{full ? 'Full' : `${s.filled}/${s.cap}`}</small>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ───────── Athlete App: book and pay ───────── */
const slots = [
  { t: '4:00 PM', booked: true },
  { t: '4:45 PM', booked: false },
  { t: '5:30 PM', booked: false },
  { t: '6:15 PM', booked: false },
];

export const AthleteBooking = () => {
  const [pick, setPick] = useState(1);
  const [step, setStep] = useState<'pick' | 'paying' | 'done'>('pick');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const pay = () => {
    setStep('paying');
    timer.current = setTimeout(() => setStep('done'), 900);
  };

  return (
    <div className="phone" aria-label="Athlete booking demo">
      <div className="phone-top">
        <div className="ph-title">Private skating lesson</div>
        <div className="ph-sub">Coach Emma · 45 min · $45.00</div>
      </div>
      {step !== 'done' ? (
        <div className="phone-body">
          <div className="ph-sub">Thursday, 12 Nov</div>
          {slots.map((s, i) => (
            <button
              key={s.t}
              type="button"
              className={`slot ${pick === i ? 'on' : ''}`}
              disabled={s.booked || step === 'paying'}
              aria-pressed={pick === i}
              onClick={() => setPick(i)}
            >
              <span>{s.t}</span>
              <span className="slot-state">{s.booked ? 'Booked' : pick === i ? 'Selected' : 'Open'}</span>
            </button>
          ))}
          <button type="button" className="paybtn" onClick={pay} disabled={step === 'paying'}>
            {step === 'paying' ? 'Processing payment…' : `Book ${slots[pick].t} and pay $45.00`}
          </button>
        </div>
      ) : (
        <div className="phone-body ph-done" aria-live="polite">
          <div className="ph-check" aria-hidden="true">✓</div>
          <div className="ph-title">You're booked</div>
          <div className="ph-sub">Thursday, 12 Nov at {slots[pick].t}. A receipt is on its way to your email.</div>
          <button type="button" className="slot" onClick={() => { setStep('pick'); }}>Book another session</button>
        </div>
      )}
    </div>
  );
};

/* ───────── Thangam: loan journey and EMI collection ───────── */
const journey: [string, string][] = [
  ['Applicant', 'Loan officer records the applicant with KYC documents.'],
  ['Co-applicant', 'A family member is added as co-applicant and verified.'],
  ['Application', 'Product, amount and tenure are chosen and sent for approval.'],
  ['Customer', 'On approval, the applicant becomes a customer with a ledger.'],
  ['Disbursed', 'The loan is disbursed and the repayment schedule is created.'],
  ['eNACH', 'The e-mandate is registered, so each EMI is auto-debited.'],
];
const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const TOTAL = 24;

export const LoanJourney = () => {
  const [active, setActive] = useState(5);
  const [paid, setPaid] = useState(9);
  const closed = paid >= TOTAL;
  const next = months[(paid - 9) % months.length];

  return (
    <div className="loancard" aria-label="Loan journey demo">
      <div className="lc-top">
        <div>
          <div className="lc-label">Sakthi entrepreneurship loan</div>
          <div className="lc-amt">₹1,50,000</div>
          <div className="lc-sub">S. Lakshmi · 24 months · Loan officer R. Kumar</div>
        </div>
        <span className={`pill ${closed ? 'pill-info' : 'pill-paid'}`}>{closed ? 'Loan closed' : 'eNACH active'}</span>
      </div>
      <div>
        <ol className="journey">
          {journey.map(([j], i) => (
            <li key={j}>
              <button type="button" className={active === i ? 'on' : ''} aria-pressed={active === i} onClick={() => setActive(i)}>
                <i />{j}
              </button>
            </li>
          ))}
        </ol>
        <p className="lc-step" aria-live="polite">{journey[active][1]}</p>
      </div>
      <div className="lc-repay">
        <div className="lc-row"><span>Repaid</span><span>{paid} of {TOTAL} EMIs</span></div>
        <div className="lc-bar"><span style={{ width: `${(paid / TOTAL) * 100}%` }} /></div>
        <div className="lc-row lc-next">
          <span>{closed ? 'All EMIs collected' : 'Next EMI ₹8,450'}</span>
          <span>{closed ? 'Closure letter ready' : `Auto-debit on 05 ${next}`}</span>
        </div>
        <div className="lc-actions">
          <button type="button" className="lc-btn" onClick={() => setPaid((p) => Math.min(TOTAL, p + 1))} disabled={closed}>Run eNACH auto-debit</button>
          <button type="button" className="lc-link" onClick={() => setPaid(9)}>Reset</button>
        </div>
      </div>
    </div>
  );
};

/* ───────── AI video: storyboard with playback ───────── */
const scenes = [
  { cls: 'sc-dawn', t: 'Scene 1', d: 'Village at dawn' },
  { cls: 'sc-kite', t: 'Scene 2', d: 'The kite breaks free' },
  { cls: 'sc-race', t: 'Scene 3', d: 'Race, lap 2' },
  { cls: 'sc-night', t: 'Scene 4', d: 'Home by moonlight' },
];
const DURATION = 8000;

export const Storyboard = () => {
  const [pos, setPos] = useState(0.62);
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number>();
  const startRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const from = pos >= 0.999 ? 0 : pos;
    startRef.current = performance.now() - from * DURATION;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startRef.current) / DURATION);
      setPos(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const scene = Math.min(3, Math.floor(pos * 4));

  return (
    <div className="board" aria-label="Episode storyboard demo">
      <div className="board-head">
        <span>Episode 14 · The lost kite</span>
        <span className="board-live" aria-live="polite">{playing ? `Previewing scene ${scene + 1} of 4` : pos >= 1 ? 'Ready for approval' : 'Paused'}</span>
      </div>
      <div className="frames">
        {scenes.map((s, i) => (
          <figure key={s.t} className={`frame ${s.cls} ${i === scene ? 'cur' : ''}`}>
            <div className="frame-art" />
            <figcaption><b>{s.t}</b>{s.d}</figcaption>
          </figure>
        ))}
      </div>
      <div className="tracks">
        <div className="track"><span>Video</span><div className="clips">{scenes.map((s, i) => <i key={s.t} className={i === scene ? 'cur' : ''} />)}</div></div>
        <div className="track"><span>Voice</span><div className="wave" /></div>
        <div className="playhead" style={{ left: `calc(48px + (100% - 48px) * ${pos})` }} />
      </div>
      <div className="board-ctl">
        <button type="button" className="play" onClick={() => setPlaying((p) => !p)}>
          {playing ? 'Pause preview' : pos >= 1 ? 'Replay preview' : 'Play preview'}
        </button>
      </div>
    </div>
  );
};
