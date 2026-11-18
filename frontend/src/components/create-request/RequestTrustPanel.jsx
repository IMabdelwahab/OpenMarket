import RequestIcon from './RequestIcon'

const guarantees = [
  {
    icon: 'badge',
    title: 'Identité & CIN vérifiées',
    description: 'Les artisans sont contrôlés avant leur première intervention.',
  },
  {
    icon: 'security',
    title: 'Assurance responsabilité civile',
    description: 'Vos biens et les interventions sont protégés.',
  },
  {
    icon: 'price_check',
    title: 'Tarification transparente',
    description: 'Un devis validé avant toute manipulation, sans frais cachés.',
  },
  {
    icon: 'workspace_premium',
    title: 'Garantie travaux',
    description: 'Une assistance est disponible en cas de problème après intervention.',
  },
]

function RequestTrustPanel() {
  return (
    <aside className="request-trust-sidebar" aria-label="Garanties et confiance">
      <section className="request-guarantees-card">
        <header>
          <span><RequestIcon>verified_user</RequestIcon></span>
          <div><h2>Garanties OpenMarket</h2><p>Protection du client à chaque étape</p></div>
        </header>
        <ul>
          {guarantees.map((guarantee) => (
            <li key={guarantee.title}>
              <span><RequestIcon>{guarantee.icon}</RequestIcon></span>
              <div><strong>{guarantee.title}</strong><p>{guarantee.description}</p></div>
            </li>
          ))}
        </ul>
        <div className="request-support-line">
          <span><RequestIcon>support_agent</RequestIcon></span>
          <div><strong>Besoin d’aide ?</strong><a href="mailto:contact@openmarket.ma">Écrivez à notre assistance</a></div>
        </div>
      </section>

      <section className="request-testimonial">
        <div className="testimonial-stars" aria-label="Note de 4,9 sur 5">
          {Array.from({ length: 5 }, (_, index) => <RequestIcon key={index}>star</RequestIcon>)}
          <strong>4,9 / 5</strong>
        </div>
        <blockquote>« J’avais une fuite d’eau un dimanche soir à Gauthier. L’artisan est arrivé rapidement avec les pièces nécessaires. Un service impeccable et rassurant ! »</blockquote>
        <div className="testimonial-author"><span>SB</span><div><strong>Salma B.</strong><small>Cliente à Casablanca</small></div></div>
      </section>
    </aside>
  )
}

export default RequestTrustPanel
