import { Waypoints } from 'lucide-react';
import { layers, type Hop, type Layer, type LayerId, type ServiceId } from './data';

type Props = { activeLayers: Set<LayerId>; activeServices: Set<ServiceId>; activeHops: Set<Hop>; tracing: boolean };

const ArchitectureCard = ({ layer, lit, activeServices }: { layer: Layer; lit: boolean; activeServices: Set<ServiceId> }) => (
  <article className={`arch-card acc-${layer.id} ${lit ? 'lit' : ''}`} aria-label={`${layer.title}: ${layer.sub}`}>
    <header className="arch-card-h">
      <span className="arch-card-ico">{layer.icon}</span>
      <div><h4>{layer.title}</h4><p>{layer.sub}</p></div>
    </header>
    <ul className="arch-card-list">
      {layer.items.map((t) => (
        <li key={t.name} className={t.service && activeServices.has(t.service) ? 'on' : ''}>
          <span className="tech-ico">{t.icon}</span>{t.name}
        </li>
      ))}
    </ul>
    <p className="arch-card-role">{layer.role}</p>
  </article>
);

/* Request arrow on top, dashed response arrow underneath */
const ConnectionArrow = ({ index, activeHops }: { index: 0 | 1 | 2; activeHops: Set<Hop> }) => (
  <div className="arch-conn" aria-hidden="true">
    <span className={`conn-req ${activeHops.has(`req${index}` as Hop) ? 'on' : ''}`} />
    <span className={`conn-res ${activeHops.has(`res${index}` as Hop) ? 'on' : ''}`} />
  </div>
);

const ArchitectureDiagram = ({ activeLayers, activeServices, activeHops, tracing }: Props) => {
  const [fe, mw, be, data, deploy] = layers;
  const card = (l: Layer) => <ArchitectureCard layer={l} lit={activeLayers.has(l.id)} activeServices={activeServices} />;
  return (
    <section className={`sysarch ${tracing ? 'tracing' : ''}`} aria-labelledby="arch-h">
      <header className="arch-h">
        <h3 id="arch-h"><Waypoints size={20} aria-hidden="true" />System architecture</h3>
        <div className="arch-legend" aria-hidden="true">
          <span><i className="lg-req" />Request flow</span>
          <span><i className="lg-res" />Response flow</span>
        </div>
      </header>
      <div className="arch-row">
        {card(fe)}
        <ConnectionArrow index={0} activeHops={activeHops} />
        {card(mw)}
        <ConnectionArrow index={1} activeHops={activeHops} />
        {card(be)}
        <ConnectionArrow index={2} activeHops={activeHops} />
        {card(data)}
        {/* Deployment is the infrastructure everything runs on, not a request destination */}
        <div className="arch-runs" aria-hidden="true"><span>Runs on</span></div>
        {card(deploy)}
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
