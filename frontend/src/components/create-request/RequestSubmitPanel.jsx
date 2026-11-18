import { Link } from 'react-router'
import RequestIcon from './RequestIcon'

function RequestSubmitPanel({ acceptedTerms, onTermsChange, submitting, error }) {
  return (
    <section className="request-submit-panel">
      <div className="request-free-banner">
        <span>0 DH</span>
        <div><strong>Aucun paiement exigé maintenant</strong><small>Devis gratuits, sans engagement et sans frais de dossier.</small></div>
        <b>100% Gratuit</b>
      </div>
      <label className="request-consent">
        <input type="checkbox" checked={acceptedTerms} onChange={(event) => onTermsChange(event.target.checked)} required />
        <span>J’accepte la <Link to="/#garanties">Charte Qualité &amp; Sécurité OpenMarket</Link> et j’autorise la mise en relation avec des artisans vérifiés.</span>
      </label>
      {error && <div className="request-submit-error" role="alert"><RequestIcon>error</RequestIcon><span>{error} {error.includes('Connectez-vous') && <Link to="/login">Se connecter</Link>}</span></div>}
      <button className="request-publish-button" type="submit" disabled={submitting}>
        <RequestIcon>{submitting ? 'progress_activity' : 'send'}</RequestIcon>
        {submitting ? 'Publication en cours…' : 'Valider et publier ma demande'}
      </button>
      <p className="request-submit-note"><RequestIcon>lock</RequestIcon>Vos informations sont transmises de façon sécurisée.</p>
    </section>
  )
}

export default RequestSubmitPanel
