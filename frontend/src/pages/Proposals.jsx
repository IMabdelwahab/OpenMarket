import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ComparisonToolbar from '../components/proposals/ComparisonToolbar'
import ProposalBreadcrumb from '../components/proposals/ProposalBreadcrumb'
import ProposalCard from '../components/proposals/ProposalCard'
import ProposalComparison from '../components/proposals/ProposalComparison'
import ProposalFeedback from '../components/proposals/ProposalFeedback'
import ProposalSecurityNote from '../components/proposals/ProposalSecurityNote'
import RequestSummary from '../components/proposals/RequestSummary'
import proposals from '../components/proposals/proposalsData'
import './proposals.css'

function Proposals() {
  const [comparedIds, setComparedIds] = useState(proposals.map(({ id }) => id))
  const [comparisonEnabled, setComparisonEnabled] = useState(true)
  const [feedback, setFeedback] = useState('')
  const [acceptedProposal, setAcceptedProposal] = useState(null)
  const [requestClosed, setRequestClosed] = useState(false)
  const comparedProposals = proposals.filter(({ id }) => comparedIds.includes(id))

  const toggleComparison = (id) => {
    setComparedIds((current) => current.includes(id)
      ? current.filter((proposalId) => proposalId !== id)
      : [...current, id])
  }

  const selectProposal = (proposal) => {
    setAcceptedProposal(proposal)
    setFeedback(`Vous avez choisi le devis de ${proposal.name} (${proposal.price} DH).`)
  }

  const toggleRequestClosed = () => {
    const nextClosed = !requestClosed
    setRequestClosed(nextClosed)
    setFeedback(nextClosed ? 'Votre demande a été clôturée.' : 'Votre demande est de nouveau ouverte.')
  }

  const messageArtisan = (artisan) => {
    setFeedback(`La messagerie avec ${artisan.name} sera bientôt disponible.`)
  }

  return (
    <div className="proposals-page">
      <a className="proposals-skip-link" href="#proposals-main">Aller aux devis reçus</a>
      <Navbar />
      <main className="proposals-main" id="proposals-main">
        <ProposalBreadcrumb />
        <RequestSummary
          acceptedProposal={acceptedProposal}
          requestClosed={requestClosed}
          onFeedback={setFeedback}
          onToggleClosed={toggleRequestClosed}
        />
        <ComparisonToolbar
          enabled={comparisonEnabled}
          onToggle={() => setComparisonEnabled((enabled) => !enabled)}
        />
        <ProposalFeedback
          message={feedback}
          success={Boolean(acceptedProposal)}
          onDismiss={() => setFeedback('')}
        />

        <section className="proposal-grid" aria-label="Devis reçus">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              selected={comparedIds.includes(proposal.id)}
              onCompare={toggleComparison}
              onAccept={selectProposal}
              onMessage={messageArtisan}
            />
          ))}
        </section>

        {comparisonEnabled && (
          <ProposalComparison proposals={comparedProposals} onSelect={selectProposal} />
        )}
        <ProposalSecurityNote />
      </main>
      <Footer />
    </div>
  )
}

export default Proposals
