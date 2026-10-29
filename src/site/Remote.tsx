import { useEffect, useState } from 'react';
import { remote } from '@/data/profile';

/* Minutes east of UTC for a time zone at a given moment (handles DST). */
function offsetMinutes(tz: string, at: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUTC = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return Math.round((asUTC - at.getTime()) / 60000);
}

const IST = 330;
const WORK_START = 9;
const WORK_END = 18;

const fmtHour = (h: number) => {
  const n = ((h % 24) + 24) % 24;
  const hh = Math.floor(n);
  const mm = Math.round((n - hh) * 60);
  const ap = hh < 12 ? 'AM' : 'PM';
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return mm ? `${h12}:${String(mm).padStart(2, '0')} ${ap}` : `${h12} ${ap}`;
};

/* Overlap of my IST window with a city's 9–6 workday, in that city's local hours. */
function overlap(cityOffset: number) {
  const shift = (cityOffset - IST) / 60; // hours to add to IST to get city time
  const mine = [remote.hoursIST.start + shift, remote.hoursIST.end + shift];
  let best: [number, number] | null = null;
  for (const day of [-24, 0, 24]) {
    const a = Math.max(mine[0] + day, WORK_START);
    const b = Math.min(mine[1] + day, WORK_END);
    if (b > a && (!best || b - a > best[1] - best[0])) best = [a, b];
  }
  return { mine, best };
}

const Remote = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const rows = remote.cities.map((c) => {
    const off = offsetMinutes(c.tz, now);
    const { best } = overlap(off);
    const local = new Intl.DateTimeFormat('en-US', { timeZone: c.tz, hour: 'numeric', minute: '2-digit' }).format(now);
    return { ...c, local, best, hours: best ? best[1] - best[0] : 0 };
  });
  const myNow = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' }).format(now);

  return (
    <section id="remote" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h-section">Working across time zones</h2>
          <p className="lede">
            I'm available {fmtHour(remote.hoursIST.start)} to {fmtHour(remote.hoursIST.end)} IST. It's {myNow} in Chennai right now.
            Here is how that lines up with a 9 to 6 workday in each city.
          </p>
        </div>

        <div className="tz" role="table" aria-label="Working-hour overlap by city">
          <div className="tz-scale" role="row" aria-hidden="true">
            <span />
            <div className="tz-ticks">{[0, 6, 12, 18, 24].map((h) => <i key={h} style={{ left: `${(h / 24) * 100}%` }}>{h === 24 ? '' : fmtHour(h)}</i>)}</div>
            <span />
          </div>
          {rows.map((r) => (
            <div className="tz-row" role="row" key={r.tz}>
              <div className="tz-city" role="rowheader"><b>{r.city}</b><span>{r.local} now</span></div>
              <div className="tz-bar" role="cell" aria-label={r.best ? `Overlap ${fmtHour(r.best[0])} to ${fmtHour(r.best[1])} local time` : 'No overlap'}>
                <span className="tz-work" style={{ left: `${(WORK_START / 24) * 100}%`, width: `${((WORK_END - WORK_START) / 24) * 100}%` }} />
                {r.best && <span className="tz-over" style={{ left: `${(r.best[0] / 24) * 100}%`, width: `${((r.best[1] - r.best[0]) / 24) * 100}%` }} />}
              </div>
              <div className="tz-hours" role="cell">
                <b>{r.hours ? `${r.hours % 1 ? r.hours.toFixed(1) : r.hours} h` : 'On request'}</b>
                <span>{r.best ? `${fmtHour(r.best[0])} – ${fmtHour(r.best[1])}` : 'Async handover'}</span>
              </div>
            </div>
          ))}
          <div className="tz-key" aria-hidden="true"><span><i className="k-work" />Their workday</span><span><i className="k-over" />Overlap with me</span></div>
        </div>

        <dl className="facts">
          {remote.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          {remote.noticePeriod && <div><dt>Notice period</dt><dd>{remote.noticePeriod}</dd></div>}
        </dl>
      </div>
    </section>
  );
};

export default Remote;
