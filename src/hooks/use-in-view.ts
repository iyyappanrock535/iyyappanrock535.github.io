import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a boolean `inView` that becomes true (once) when the
 * referenced element crosses the viewport threshold.
 */
export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * Animates a number from 0 → target once `active` becomes true.
 */
export function useCounter(target: number, duration = 900, active = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out-quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

/**
 * Cycles through an array of words with a typewriter effect.
 * Each word types in, pauses, then deletes before moving to the next.
 *
 * Uses refs for all mutable state so the effect only mounts once —
 * no stale closure bugs, no leaked inner timeouts.
 */
export function useTypewriter(words: string[], speed = 75, pause = 1800) {
  const [display, setDisplay] = useState('');

  // Mutable refs — changes never cause effect re-runs
  const wordIdxRef  = useRef(0);
  const charIdxRef  = useRef(0);
  const deletingRef = useRef(false);
  const timerRef    = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const tick = () => {
      const word = words[wordIdxRef.current % words.length];

      if (!deletingRef.current) {
        /* ── Typing phase ── */
        charIdxRef.current += 1;
        setDisplay(word.slice(0, charIdxRef.current));

        if (charIdxRef.current >= word.length) {
          // Word fully typed → pause, then switch to deleting
          deletingRef.current = true;
          timerRef.current = setTimeout(tick, pause);
        } else {
          timerRef.current = setTimeout(tick, speed);
        }
      } else {
        /* ── Deleting phase ── */
        charIdxRef.current -= 1;
        setDisplay(word.slice(0, charIdxRef.current));

        if (charIdxRef.current <= 0) {
          // Word fully deleted → next word, back to typing
          charIdxRef.current  = 0;
          deletingRef.current = false;
          wordIdxRef.current  += 1;
          timerRef.current = setTimeout(tick, speed);
        } else {
          timerRef.current = setTimeout(tick, speed / 2);
        }
      }
    };

    timerRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — tick closes over refs, not state

  return display;
}
