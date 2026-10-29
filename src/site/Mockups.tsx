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
