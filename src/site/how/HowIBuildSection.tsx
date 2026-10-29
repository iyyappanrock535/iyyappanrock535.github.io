import { useState } from 'react';
import { Lightbulb, ShieldCheck } from 'lucide-react';
import { steps, values, type Hop, type LayerId, type ServiceId } from './data';
import ArchitectureDiagram from './ArchitectureDiagram';
import RequestJourney from './RequestJourney';
import { ApiRequestCard, DatabaseSchemaCard, DeploymentWorkflowCard, IntegrationCard } from './TechCards';

const SectionHeader = () => (
  <header className="hw-head">
    <div className="hw-head-main">
      <p className="hw-eyebrow">How I build</p>
      <h2 id="hw-title" className="hw-title">From frontend to production</h2>
      <p className="hw-intro">
        I build end-to-end web applications, connecting responsive React interfaces with secure Node.js middleware,
        scalable Sails.js backend APIs, PostgreSQL databases and external integrations. Every layer works together
        to deliver a fast, secure and reliable experience, from the first click to production.
      </p>
      <ul className="hw-values">
        <li className="hw-values-ico" aria-hidden="true"><ShieldCheck size={18} /></li>
        {values.map((v) => <li key={v}>{v}</li>)}
      </ul>
    </div>
    <aside className="hw-note">
      <span aria-hidden="true"><Lightbulb size={20} /></span>
      <div>
        <b>Real project stack</b>
        <p>The technologies I use in my work. Examples are illustrative and anonymized.</p>
      </div>
    </aside>
  </header>
);

/* One shared selection drives both the timeline and the diagram */
const HowIBuildSection = () => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = steps[active];

  const activeLayers = new Set<LayerId>(step.layers);
  const activeServices = new Set<ServiceId>(step.services);
  const activeHops = new Set<Hop>(step.hops);

  return (
    <section id="how" className="hw" aria-labelledby="hw-title">
      <div className="hw-wrap">
        <SectionHeader />
        <div className="hw-main">
          <div className="hw-left">
            <ArchitectureDiagram activeLayers={activeLayers} activeServices={activeServices} activeHops={activeHops} tracing />
            <div className="hw-cards">
              <ApiRequestCard />
              <DatabaseSchemaCard />
              <DeploymentWorkflowCard />
              <IntegrationCard />
            </div>
          </div>
          <RequestJourney active={active} setActive={setActive} playing={playing} setPlaying={setPlaying} />
        </div>
      </div>
    </section>
  );
};

export default HowIBuildSection;
