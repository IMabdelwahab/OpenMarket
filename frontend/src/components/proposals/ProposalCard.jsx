import ProposalIcon from './ProposalIcon'

function ProposalCard({ proposal, selected, onCompare, onAccept, onMessage }) {
  const ribbonClass = proposal.id === 'karim' ? ' best-price' : proposal.id === 'hassan' ? ' top-artisan' : ''
  const ribbonIcon = proposal.id === 'karim' ? 'payments' : proposal.id === 'hassan' ? 'military_tech' : 'star'

  return (
    <article className={`proposal-card${proposal.featured ? ' is-featured' : ''}`}>
      <div className={`proposal-ribbon${ribbonClass}`}>
        <span><ProposalIcon>{ribbonIcon}</ProposalIcon>{proposal.badge}</span>
        <span className="distance"><ProposalIcon>pin_drop</ProposalIcon>À {proposal.distance}</span>
      </div>

      <div className="proposal-card-content">
        <div className="artisan-heading">
          <div className="artisan-avatar">
            <img src={proposal.image} alt="" />
            <span className="verified-mark" title="Artisan vérifié"><ProposalIcon>verified</ProposalIcon></span>
          </div>
          <div className="artisan-summary">
            <h2>{proposal.name}</h2>
            <p>{proposal.title}</p>
            <div className="artisan-stats">
              <strong>★ {proposal.rating}</strong>
              <span>({proposal.reviews} avis)</span>
              <span aria-hidden="true">·</span>
              <b>{proposal.experience} ans exp.</b>
            </div>
          </div>
        </div>

        <div className="proposal-trust-badges">
          <span><ProposalIcon>badge</ProposalIcon>CIN vérifiée</span>
          <span><ProposalIcon>security</ProposalIcon>{proposal.insurance.includes('Pro') ? 'Assurance AXA Pro' : 'Assurance standard'}</span>
        </div>

        <div className="proposal-price-panel">
          <div className="proposal-price">
            <span>Tarif forfaitaire proposé</span>
            <strong>{proposal.price} <small>DH</small></strong>
            <small className="tax-note">TVA incluse</small>
          </div>
          <p><strong>Inclus :</strong> {proposal.inclusions}</p>
          <div className="availability"><ProposalIcon>event_available</ProposalIcon><span>Disponibilité : <strong>{proposal.availability}</strong></span></div>
        </div>

        <blockquote>{proposal.message}</blockquote>

        <div className="proposal-card-meta">
          <label>
            <input type="checkbox" checked={selected} onChange={() => onCompare(proposal.id)} />
            Sélectionner pour comparer
          </label>
          <span><ProposalIcon>verified</ProposalIcon>Garantie {proposal.warranty}</span>
        </div>

        <div className="proposal-actions">
          <button className={proposal.featured ? 'accept-button featured-button' : 'accept-button'} type="button" onClick={() => onAccept(proposal)}>
            <ProposalIcon>check_circle</ProposalIcon>Accepter ce devis
          </button>
          <button className="chat-button" type="button" onClick={() => onMessage(proposal)}>
            <ProposalIcon>chat</ProposalIcon>Discuter par chat
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProposalCard
