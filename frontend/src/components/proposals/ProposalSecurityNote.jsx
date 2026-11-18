import { Link } from 'react-router'
import ProposalIcon from './ProposalIcon'

function ProposalSecurityNote() {
  return (
    <aside className="proposal-security-note">
      <span className="security-lock"><ProposalIcon>lock</ProposalIcon></span>
      <div>
        <h2>Séquestre sécurisé &amp; protection client</h2>
        <p><strong>Le montant convenu n’est débloqué à l’artisan qu’après votre validation finale des travaux effectués.</strong> Vous conservez un droit de recours auprès du support client OpenMarket en cas de litige ou d’imprévu.</p>
      </div>
      <Link to="/#garanties">En savoir plus sur nos garanties</Link>
    </aside>
  )
}

export default ProposalSecurityNote
