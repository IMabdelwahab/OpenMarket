import { Link } from 'react-router'
import RequestIcon from './RequestIcon'

function RequestPublished({ requestId, onCreateAnother }) {
  return (
    <section className="request-published-card" role="status">
      <span className="request-published-icon"><RequestIcon>task_alt</RequestIcon></span>
      <p className="request-published-kicker">DEMANDE N° OM-{requestId}</p>
      <h2>Votre demande a bien été publiée</h2>
      <p>Les artisans vérifiés de votre secteur peuvent maintenant vous transmettre leurs devis. Vous serez informé dès qu’une proposition sera reçue.</p>
      <div>
        <Link className="request-view-profile" to="/clientProfile"><RequestIcon>person</RequestIcon>Voir mes demandes</Link>
        <button type="button" onClick={onCreateAnother}>Publier une autre demande</button>
      </div>
    </section>
  )
}

export default RequestPublished
