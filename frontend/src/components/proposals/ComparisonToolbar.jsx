import ProposalIcon from './ProposalIcon'

function ComparisonToolbar({ enabled, onToggle }) {
  return (
    <section className="comparison-toolbar" aria-label="Options de comparaison">
      <div className="comparison-intro">
        <span className="comparison-icon"><ProposalIcon>compare_arrows</ProposalIcon></span>
        <div><h2>Comparateur d’artisans certifiés</h2><p>Comparez les profils, les prix garantis et les disponibilités en temps réel.</p></div>
      </div>
      <label className="comparison-switch-label">
        <span>Mode comparateur côte à côte</span>
        <button className={`comparison-switch${enabled ? ' is-on' : ''}`} type="button" role="switch" aria-checked={enabled} aria-label="Afficher le tableau comparatif" onClick={onToggle}><span /></button>
      </label>
    </section>
  )
}

export default ComparisonToolbar
