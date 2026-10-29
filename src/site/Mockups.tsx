/*
 * Illustrative product views drawn in HTML. They stand in for real
 * screenshots until images are added to a project's `screens` list.
 * All names and figures are sample data.
 */

const Bar = ({ url }: { url: string }) => (
  <div className="frag-bar">
    <div className="frag-dots" aria-hidden="true"><i /><i /><i /></div>
    <span>{url}</span>
  </div>
);

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

export const AthleteBooking = () => (
  <div className="phone" role="img" aria-label="Illustrative view of the athlete booking flow">
    <div className="phone-top">
      <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 14 }}>Private skating lesson</div>
      <div style={{ color: 'var(--slate)' }}>Coach Emma · 45 min</div>
    </div>
    <div className="phone-body">
      <div style={{ color: 'var(--slate)', fontSize: 12 }}>Thursday, 12 Nov</div>
      <div className="slot"><span>4:00 PM</span><span style={{ color: 'var(--slate)' }}>Booked</span></div>
      <div className="slot on"><span>4:45 PM</span><span style={{ color: 'var(--signal-ink)', fontWeight: 600 }}>Selected</span></div>
      <div className="slot"><span>5:30 PM</span><span style={{ color: 'var(--slate)' }}>Open</span></div>
      <div className="paybtn">Book and pay $45.00</div>
    </div>
  </div>
);

export const ApplicantFlow = () => (
  <div className="frag">
    <Bar url="New application · Step 3 of 4" />
    <div className="frag-body">
      <div className="frag-title">Applicant and co-applicant <span>Loan officer: R. Kumar</span></div>
      <table className="ftable">
        <tbody>
          <tr><td>Applicant</td><td>S. Lakshmi</td><td className="num"><span className="pill pill-paid">KYC verified</span></td></tr>
          <tr><td>Co-applicant</td><td>S. Murugan</td><td className="num"><span className="pill pill-paid">KYC verified</span></td></tr>
          <tr><td>Product</td><td>Sakthi entrepreneurship</td><td className="num">₹1,50,000</td></tr>
          <tr><td>Repayment</td><td>eNACH e-mandate</td><td className="num"><span className="pill pill-info">Registering</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const steps: [string, string, 'paid' | 'info' | 'due'][] = [
  ['Script', 'Ollama', 'paid'],
  ['Scene plan', 'Gemini', 'paid'],
  ['Visuals', 'FLUX.2', 'paid'],
  ['Animation', 'LTX-2.3', 'info'],
  ['Narration', 'Multilingual', 'due'],
  ['Quality check', 'Automated', 'due'],
  ['Publish', 'Waits for approval', 'due'],
];
const label = { paid: 'Done', info: 'Rendering', due: 'Queued' };

export const VideoPipeline = () => (
  <div className="frag">
    <Bar url="Episode 14 · Render queue" />
    <div className="frag-body">
      <div className="frag-title">The lost kite, episode 14 <span>Scheduled Sat 6:00 PM</span></div>
      <table className="ftable">
        <tbody>
          {steps.map(([step, tool, st], i) => (
            <tr key={step}>
              <td style={{ color: 'var(--slate)', width: 22 }}>{i + 1}</td>
              <td>{step}</td>
              <td style={{ color: 'var(--slate)' }}>{tool}</td>
              <td className="num"><span className={`pill pill-${st}`}>{label[st]}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ───────── Club App: weekly schedule ───────── */
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const sessions: { day: number; start: number; len: number; name: string; tone: string; count: string }[] = [
  { day: 0, start: 0, len: 2, name: 'U10 Skating', tone: 'a', count: '14/16' },
  { day: 1, start: 1, len: 2, name: 'Learn to Swim', tone: 'b', count: '9/10' },
  { day: 2, start: 0, len: 1, name: 'Private lesson', tone: 'c', count: '1/1' },
  { day: 2, start: 2, len: 2, name: 'U12 Soccer', tone: 'd', count: '18/24' },
  { day: 3, start: 1, len: 2, name: 'U10 Skating', tone: 'a', count: '15/16' },
  { day: 4, start: 0, len: 2, name: 'Learn to Swim', tone: 'b', count: '10/10' },
  { day: 5, start: 0, len: 3, name: 'Summer camp', tone: 'e', count: '42/50' },
  { day: 5, start: 3, len: 1, name: 'Private lesson', tone: 'c', count: '1/1' },
];
export const ClubSchedule = () => (
  <div className="frag" role="img" aria-label="Illustrative weekly schedule in the Club App">
    <Bar url="club.communiti.app/schedule" />
    <div className="frag-body">
      <div className="frag-title">Week of 9 Nov <span>8 sessions · 110 registrations</span></div>
      <div className="sched">
        <div className="sched-times"><span />{['4 PM', '5 PM', '6 PM', '7 PM'].map((t) => <span key={t}>{t}</span>)}</div>
        {days.map((d, di) => (
          <div className="sched-col" key={d}>
            <div className="sched-day">{d}</div>
            <div className="sched-track">
              {sessions.filter((s) => s.day === di).map((s) => (
                <div key={s.name + s.start} className={`sess sess-${s.tone}`} style={{ gridRow: `${s.start + 1} / span ${s.len}` }}>
                  <b>{s.name}</b><small>{s.count}</small>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ───────── Thangam: loan journey ───────── */
const journey = ['Applicant', 'Co-applicant', 'Application', 'Customer', 'Disbursed', 'eNACH'];
export const LoanJourney = () => (
  <div className="loancard" role="img" aria-label="Illustrative loan journey in the Thangam loan system">
    <div className="lc-top">
      <div>
        <div className="lc-label">Sakthi entrepreneurship loan</div>
        <div className="lc-amt">₹1,50,000</div>
        <div className="lc-sub">S. Lakshmi · 24 months · Loan officer R. Kumar</div>
      </div>
      <span className="pill pill-paid">eNACH active</span>
    </div>
    <ol className="journey">
      {journey.map((j, i) => <li key={j} className={i < 6 ? 'done' : ''}><i />{j}</li>)}
    </ol>
    <div className="lc-repay">
      <div className="lc-row"><span>Repaid</span><span>9 of 24 EMIs</span></div>
      <div className="lc-bar"><span style={{ width: '37.5%' }} /></div>
      <div className="lc-row lc-next"><span>Next EMI ₹8,450</span><span>Auto-debit on 05 Dec</span></div>
    </div>
  </div>
);

/* ───────── AI video: storyboard ───────── */
const scenes = [
  { cls: 'sc-dawn', t: 'Scene 1', d: 'Village at dawn' },
  { cls: 'sc-kite', t: 'Scene 2', d: 'The kite breaks free' },
  { cls: 'sc-race', t: 'Scene 3', d: 'Race, lap 2' },
  { cls: 'sc-night', t: 'Scene 4', d: 'Home by moonlight' },
];
export const Storyboard = () => (
  <div className="board" role="img" aria-label="Illustrative storyboard and timeline from the AI video platform">
    <div className="board-head"><span>Episode 14 · The lost kite</span><span className="board-live">Rendering 3 of 4</span></div>
    <div className="frames">
      {scenes.map((s) => (
        <figure key={s.t} className={`frame ${s.cls}`}>
          <div className="frame-art" />
          <figcaption><b>{s.t}</b>{s.d}</figcaption>
        </figure>
      ))}
    </div>
    <div className="tracks">
      <div className="track"><span>Video</span><div className="clips"><i style={{ flex: 3 }} /><i style={{ flex: 2 }} /><i style={{ flex: 3 }} className="cur" /><i style={{ flex: 2 }} className="todo" /></div></div>
      <div className="track"><span>Voice</span><div className="wave" /></div>
      <div className="playhead" />
    </div>
  </div>
);
