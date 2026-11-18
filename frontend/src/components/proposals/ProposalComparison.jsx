import ProposalIcon from './ProposalIcon'

function ProposalComparison({ proposals, onSelect }) {
  if (!proposals.length) {
    return (
      <section className="comparison-table-section">
        <ComparisonHeading />
        <p className="comparison-empty">Sélectionnez au moins un devis pour comparer les offres.</p>
      </section>
    )
  }

  const lowestPrice = Math.min(...proposals.map(({ price }) => price))

  return (
    <section className="comparison-table-section">
      <ComparisonHeading />
      <div className="comparison-table-scroll">
        <table>
          <thead>
            <tr>
              <th>Critères de comparaison</th>
              {proposals.map((proposal) => (
                <th className={proposal.featured ? 'featured-column' : ''} key={proposal.id}>
                  {proposal.name}{proposal.featured && <span>Conseillé</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><ProposalIcon>sell</ProposalIcon>Prix proposé</th>
              {proposals.map((proposal) => (
                <td className={proposal.featured ? 'featured-column' : ''} key={proposal.id}>
                  <strong>{proposal.price} DH</strong>{proposal.price === lowestPrice && <small> (Plus bas)</small>}
                </td>
              ))}
            </tr>
            <tr>
              <th><ProposalIcon>schedule</ProposalIcon>Délai d’intervention</th>
              {proposals.map((proposal) => <td className={proposal.featured ? 'featured-column' : ''} key={proposal.id}>{proposal.arrival}</td>)}
            </tr>
            <tr>
              <th><ProposalIcon>star</ProposalIcon>Évaluation clients</th>
              {proposals.map((proposal) => (
                <td className={proposal.featured ? 'featured-column' : ''} key={proposal.id}>
                  <strong className="rating-value">★ {proposal.rating}</strong> ({proposal.reviews} avis)
                </td>
              ))}
            </tr>
            <tr>
              <th><ProposalIcon>work_history</ProposalIcon>Expérience métier</th>
              {proposals.map((proposal) => <td className={proposal.featured ? 'featured-column' : ''} key={proposal.id}>{proposal.experience} années de métier</td>)}
            </tr>
            <tr>
              <th><ProposalIcon>verified_user</ProposalIcon>Assurance</th>
              {proposals.map((proposal) => (
                <td className={proposal.featured ? 'featured-column' : ''} key={proposal.id}>
                  <ProposalIcon>check_circle</ProposalIcon>{proposal.insurance}
                </td>
              ))}
            </tr>
            <tr>
              <th><ProposalIcon>health_and_safety</ProposalIcon>Garantie travaux</th>
              {proposals.map((proposal) => (
                <td className={proposal.featured ? 'featured-column' : ''} key={proposal.id}>
                  {proposal.warranty}{proposal.warranty === '1 an' ? ' complète' : ' (main d’œuvre)'}
                </td>
              ))}
            </tr>
            <tr>
              <th>Action directe</th>
              {proposals.map((proposal) => (
                <td className={proposal.featured ? 'featured-column' : ''} key={proposal.id}>
                  <button type="button" onClick={() => onSelect(proposal)}>Choisir {proposal.name.split(' ')[0]}</button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ComparisonHeading() {
  return (
    <div className="comparison-table-heading">
      <div>
        <h2><ProposalIcon>table_chart</ProposalIcon>Synthèse comparative des offres</h2>
        <p>Vision consolidée pour faire votre choix en toute sérénité.</p>
      </div>
      <span><i />Tous les prix sont fermes et sans surprise</span>
    </div>
  )
}

export default ProposalComparison
