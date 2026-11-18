import { Link } from 'react-router'
import ProposalIcon from './ProposalIcon'

function ProposalBreadcrumb() {
  return (
    <nav className="proposals-breadcrumb" aria-label="Fil d’Ariane">
      <Link to="/clientProfile"><ProposalIcon>arrow_back</ProposalIcon>Mes demandes en cours</Link>
      <span>/</span><span>Demande #OM-2026-0841</span><span>/</span><strong>Devis reçus (3)</strong>
    </nav>
  )
}

export default ProposalBreadcrumb
