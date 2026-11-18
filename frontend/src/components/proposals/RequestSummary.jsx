import ProposalIcon from './ProposalIcon'

function RequestSummary({ acceptedProposal, requestClosed, onFeedback, onToggleClosed }) {
  return (
    <section className="request-summary">
      <div className="request-summary-content">
        <div className="request-badges">
          <span className="request-status"><i />{requestClosed ? 'Demande clôturée' : acceptedProposal ? 'Devis sélectionné' : '3 devis reçus - En attente de votre choix'}</span>
          <span className="urgent-status"><ProposalIcon>bolt</ProposalIcon>Prestation urgente</span>
          <span className="secure-status"><ProposalIcon>verified_user</ProposalIcon>Paiement sécurisé OpenMarket</span>
        </div>
        <h1>Réparation fuite sous évier et remplacement mitigeur cuisine</h1>
        <div className="request-details">
          <strong>Réf. #OM-2026-0841</strong><i />
          <span><ProposalIcon>schedule</ProposalIcon>Publiée il y a 3 heures</span><i />
          <span><ProposalIcon>location_on</ProposalIcon>Casablanca - Gauthier</span><i />
          <button type="button" onClick={() => onFeedback('Les 2 photos jointes à la demande sont prêtes à être consultées.')}><ProposalIcon>photo_library</ProposalIcon>2 photos jointes</button>
        </div>
      </div>
      <div className="request-controls">
        <button type="button" onClick={() => onFeedback('La modification de cette demande sera bientôt disponible.')}><ProposalIcon>edit</ProposalIcon>Modifier la demande</button>
        <button className="close-request-button" type="button" onClick={onToggleClosed}>
          <ProposalIcon>cancel</ProposalIcon>{requestClosed ? 'Rouvrir la demande' : 'Clôturer la demande'}
        </button>
      </div>
    </section>
  )
}

export default RequestSummary
