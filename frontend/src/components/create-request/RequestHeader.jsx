import { Link } from 'react-router'
import RequestIcon from './RequestIcon'

function RequestHeader({ submitted = false }) {
  return (
    <>
      <div className="request-progress">
        <div className="request-progress-top">
          <nav aria-label="Fil d’Ariane">
            <Link to="/">Accueil</Link>
            <RequestIcon>chevron_right</RequestIcon>
            <Link to="/clientProfile">Mes demandes</Link>
            <RequestIcon>chevron_right</RequestIcon>
            <strong>{submitted ? 'Demande publiée' : 'Nouvelle demande'}</strong>
          </nav>
          <span className="request-step">
            <i />
            Étape {submitted ? '2' : '1'} sur 2 : {submitted ? 'Demande publiée' : 'Description du besoin'}
          </span>
        </div>
        <div className="request-progress-track"><span className={submitted ? 'is-complete' : ''} /></div>
      </div>

      <header className="request-page-intro">
        <span><RequestIcon>verified_user</RequestIcon>Dépannage certifié &amp; devis transparents</span>
        <h1>{submitted ? 'Votre demande est publiée' : 'Publier une demande de prestation'}</h1>
        <p>
          {submitted
            ? 'Les artisans vérifiés près de chez vous peuvent maintenant vous envoyer leurs devis.'
            : "Décrivez votre besoin pour recevoir des devis gratuits d'artisans vérifiés près de chez vous."}
        </p>
      </header>
    </>
  )
}

export default RequestHeader
