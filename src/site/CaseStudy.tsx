import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { personal } from '@/data/profile';
import { Storyboard } from './Mockups';

/*
 * Case study: AI video generation and automation platform.
 * Edit the text below to match your own decisions and results.
 */

const pipeline: [string, string][] = [
  ['Plan the episode', 'A scheduled job picks the next episode. The planner reads the series memory (characters, places, what happened last time) so the story continues.'],
  ['Write the script', 'A local LLM through Ollama drafts the script and scene list. Gemini handles the heavier scene planning.'],
  ['Generate visuals', 'FLUX.2 creates the key frame for each scene from the scene description and the series style.'],
  ['Animate', 'LTX-2.3 turns key frames into short animated clips. Racing episodes use the Three.js renderer instead.'],
  ['Narrate', 'Narration is generated in more than one language and timed to the scenes.'],
  ['Assemble', 'FFmpeg joins clips, narration and music into the final video.'],
  ['Check quality', 'Automated checks validate each scene and the finished file before it can move on.'],
  ['Approve and publish', 'Nothing goes to YouTube until I approve it. Then the upload, title and description are handled automatically.'],
];

const decisions: [string, string][] = [
  ['A job queue between every step', 'Generation steps are slow and GPU-bound, and some fail. Running each step as a Redis-backed job means a failed scene can be retried on its own instead of restarting the whole episode, and the GPU never runs two heavy jobs at once.'],
  ['Persistent episode memory', 'An episodic story falls apart if each episode is generated from scratch. The series memory is stored in PostgreSQL and fed into planning, so characters and plot stay consistent from one episode to the next.'],
  ['Local models first', 'Running LLMs through Ollama keeps the cost of each episode low and lets the pipeline run unattended. A hosted model (Gemini) is used only where it clearly improves the result.'],
  ['A human approval gate', 'Generated content can be wrong in ways automated checks miss. Automated quality validation catches broken files and scenes; a person approves before anything is published.'],
  ['Verified 3D renders', 'For racing videos, the Three.js renderer drives the cars from scripted actions and moves the camera cinematically. Automated scene verification confirms each shot rendered as planned before it is assembled.'],
];

const Box = ({ title, items, tone = '' }: { title: string; items: string[]; tone?: string }) => (
  <div className={`arch-box ${tone}`}>
    <b>{title}</b>
    <span>{items.join(' · ')}</span>
  </div>
);

const CaseStudy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="case">
      <div className="wrap case-wrap">
        <a className="case-back" href="#work"><ArrowLeft size={16} aria-hidden="true" /> Back to portfolio</a>

        <header className="case-head">
          <p className="work-company">Case study · Personal project</p>
          <h1 className="h-display case-title">Generating an animated series with an AI pipeline</h1>
          <p className="lede">{personal.summary}</p>
          <dl className="case-meta">
            <div><dt>Role</dt><dd>Sole designer and engineer</dd></div>
            <div><dt>Output</dt><dd>Episodic animated stories and 3D racing videos</dd></div>
            <div><dt>Publishing</dt><dd>YouTube, after manual approval</dd></div>
          </dl>
        </header>

        <div className="case-visual"><Storyboard /></div>

        <section className="case-sec">
          <h2 className="case-h2">The problem</h2>
          <p>
            Making an animated episode by hand takes many separate jobs: writing, storyboarding, drawing, animating,
            voicing, editing and uploading. Doing that on a regular schedule is not realistic for one person.
            I wanted a system that runs the whole chain on its own, keeps the story consistent across episodes,
            and still lets me decide what gets published.
          </p>
        </section>

        <section className="case-sec">
          <h2 className="case-h2">How an episode is made</h2>
          <ol className="steps">
            {pipeline.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
          </ol>
        </section>

        <section className="case-sec">
          <h2 className="case-h2">Architecture</h2>
          <div className="arch" aria-label="Architecture diagram">
            <div className="arch-col">
              <span className="arch-label">Control</span>
              <Box title="Dashboard" items={['React', 'TypeScript']} />
              <Box title="API and scheduler" items={['Node.js', 'cron']} />
              <Box title="Data" items={['PostgreSQL', 'episode memory']} />
            </div>
            <div className="arch-arrow" aria-hidden="true" />
            <div className="arch-col">
              <span className="arch-label">Work</span>
              <Box title="Job queue" items={['Redis', 'retries']} tone="hl" />
              <Box title="AI workers" items={['Python', 'FastAPI']} />
              <Box title="Models" items={['Ollama', 'Gemini', 'FLUX.2', 'LTX-2.3']} />
              <Box title="3D renderer" items={['Three.js', 'GPU']} />
            </div>
            <div className="arch-arrow" aria-hidden="true" />
            <div className="arch-col">
              <span className="arch-label">Delivery</span>
              <Box title="Assembly" items={['FFmpeg']} />
              <Box title="Quality checks" items={['automated validation']} />
              <Box title="Approval" items={['manual review']} tone="hl" />
              <Box title="Publishing" items={['YouTube']} />
            </div>
          </div>
          <p className="case-note">Everything runs in Docker containers.</p>
        </section>

        <section className="case-sec">
          <h2 className="case-h2">Design decisions</h2>
          <div className="decisions">
            {decisions.map(([t, d]) => (
              <article key={t}><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
        </section>

        <section className="case-sec">
          <h2 className="case-h2">Tech stack</h2>
          <div className="chips">{personal.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
        </section>

        <a className="btn btn-solid case-cta" href="#contact">Talk to me about this project</a>
      </div>
    </main>
  );
};

export default CaseStudy;
