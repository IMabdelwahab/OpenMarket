import ProposalIcon from './ProposalIcon'

function ProposalFeedback({ message, success, onDismiss }) {
  if (!message) return null

  return (
    <div className="proposal-feedback" role="status">
      <ProposalIcon>{success ? 'check_circle' : 'info'}</ProposalIcon>
      <span>{message}</span>
      <button type="button" aria-label="Fermer le message" onClick={onDismiss}>×</button>
    </div>
  )
}

export default ProposalFeedback
