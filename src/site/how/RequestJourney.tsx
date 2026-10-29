import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, Target } from 'lucide-react';
import { steps } from './data';

type Props = {
  active: number;
  setActive: (i: number) => void;
  playing: boolean;
  setPlaying: (p: boolean) => void;
};

const STEP_MS = 2400;

const JourneyStep = ({ i, on, onPick }: { i: number; on: boolean; onPick: () => void }) => {
  const s = steps[i];
  return (
    <li className={`jr-step ${on ? 'on' : ''}`}>
      <button type="button" aria-pressed={on} onClick={onPick}>
        <span className="jr-n">{i + 1}</span>
        <span className="jr-ico">{s.icon}</span>
        <span className="jr-body">
          <b>{s.title}</b>
          <span className="jr-badge">{s.badge}</span>
          <span className="jr-text">{s.text}</span>
        </span>
      </button>
    </li>
  );
};

const RequestJourney = ({ active, setActive, playing, setPlaying }: Props) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!playing) return;
    if (active >= steps.length - 1) { setPlaying(false); return; }
    timer.current = setTimeout(() => setActive(active + 1), STEP_MS);
    return () => clearTimeout(timer.current);
  }, [playing, active, setActive, setPlaying]);

  const go = (i: number) => { setPlaying(false); setActive(Math.max(0, Math.min(steps.length - 1, i))); };
  const atEnd = active === steps.length - 1;

  return (
    <section className="jr" aria-labelledby="jr-h">
      <header className="jr-h">
        <span className="jr-h-ico" aria-hidden="true"><Target size={20} /></span>
        <div>
          <h3 id="jr-h">Request journey</h3>
          <p>A booking request from start to finish.</p>
        </div>
      </header>

      <div className="jr-ctl">
        <button type="button" className="jr-btn" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous step"><ChevronLeft size={18} /></button>
        <button
          type="button"
          className="jr-btn jr-play"
          onClick={() => {
            if (playing) { setPlaying(false); return; }
            if (atEnd) setActive(0);
            setPlaying(true);
          }}
        >
          {playing ? <><Pause size={16} aria-hidden="true" /> Pause</> : atEnd ? <><RotateCcw size={16} aria-hidden="true" /> Restart</> : <><Play size={16} aria-hidden="true" /> Play journey</>}
        </button>
        <button type="button" className="jr-btn" onClick={() => go(active + 1)} disabled={atEnd} aria-label="Next step"><ChevronRight size={18} /></button>
        <span className="jr-pos" aria-live="polite">Step {active + 1} of {steps.length}</span>
      </div>

      <ol className="jr-list">
        {steps.map((_, i) => <JourneyStep key={i} i={i} on={active === i} onPick={() => go(i)} />)}
      </ol>
    </section>
  );
};

export default RequestJourney;
