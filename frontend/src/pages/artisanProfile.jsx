import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfileIcon from '../components/ProfileIcon'
import ProfileSummary from '../components/ProfileSummary'
import ProfileTabs from '../components/ProfileTabs'
import ProfileSectionHeading from '../components/ProfileSectionHeading'
import ProfileReviewCard from '../components/ProfileReviewCard'
import ProfileSupport from '../components/ProfileSupport'
import ArtisanJobCard from '../components/ArtisanJobCard'
import ArtisanPortfolioCard from '../components/ArtisanPortfolioCard'
import './profile.css'
import './artisanProfile.css'

const tabs = [
  { id: 'missions', label: 'Missions & planning', icon: 'assignment', count: 4 },
  { id: 'portfolio', label: 'Mes réalisations', icon: 'photo_library' },
  { id: 'reviews', label: 'Avis clients', icon: 'reviews', count: 128 },
  // { id: 'documents', label: 'Documents & certifications', icon: 'policy' },
]

const jobs = [
  {
    id: 'job-1',
    time: "Aujourd'hui à 15h30",
    title: 'Réparation fuite canalisation encastrée',
    status: 'Validé · À démarrer',
    price: '450 DH',
    client: 'M. Youssef Alami',
    location: 'Casablanca Gauthier · Rue Jean Jaurès',
    icon: 'schedule',
    phone: '+212600000000',
    today: true,
  },
  {
    id: 'job-2',
    time: 'Demain matin à 09h00',
    title: 'Remplacement chauffe-eau électrique 80L',
    status: 'Séquestre AXA bloqué',
    price: '850 DH',
    client: 'Mme Kenza B.',
    location: 'Casablanca Racine · Rue Abou Hanifa',
    icon: 'event',
    today: false,
  },
]

const projects = [
  {
    title: 'Salle de bain moderne · Gauthier',
    category: 'Rénovation complète',
    description: 'Refonte de tuyauterie et robinetterie encastrée.',
    duration: '4 jours',
    price: '5 200 DH',
    icon: 'bathtub',
    visualClass: 'portfolio-bathroom',
  },
  {
    title: 'Collecteur sanitaire · Maârif',
    category: 'Soudure haute précision',
    description: 'Remplacement d’une colonne montante en cuivre.',
    duration: '1 jour',
    price: '1 800 DH',
    icon: 'plumbing',
    visualClass: 'portfolio-pipes',
  },
  {
    title: 'Système thermostatique · Anfa',
    category: 'Installation robinetterie',
    description: 'Pose d’un mitigeur encastré et test de pression.',
    duration: '3 heures',
    price: '650 DH',
    icon: 'shower',
    visualClass: 'portfolio-shower',
  },
]

const reviews = [
  {
    artisan: 'Dr. Said K.',
    trade: 'Client · Racine, Casablanca',
    date: 'Mars 2026',
    rating: 5,
    text: "Si Mohamed est un artisan d'un professionnalisme exemplaire. Arrivé à l'heure, il a diagnostiqué la fuite rapidement. Devis respecté et chantier rendu propre.",
  },
  {
    artisan: 'Kenza B.',
    trade: 'Cliente · Casablanca',
    date: 'Février 2026',
    rating: 5,
    text: 'Travail soigné et explications très claires. Je recommande vivement pour la plomberie et le chauffage.',
  },
]

function ArtisanProfile() {
  const [activeTab, setActiveTab] = useState('missions')
  const [available, setAvailable] = useState(true)
  const [urgentRequest, setUrgentRequest] = useState(true)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteAmount, setQuoteAmount] = useState('300')
  const [notice, setNotice] = useState('')
  const [finishedJobs, setFinishedJobs] = useState([])

  function submitQuote(event) {
    event.preventDefault()
    setNotice(`Devis de ${quoteAmount} DH préparé dans cet aperçu frontend.`)
    setUrgentRequest(false)
    setQuoteOpen(false)
  }

  function completeJob(jobId) {
    setFinishedJobs((current) => current.includes(jobId) ? current : [...current, jobId])
    setNotice('Intervention mise à jour dans cet aperçu frontend.')
  }

  return (
    <div className="profile-page artisan-profile-page">
      <Navbar />
      <main className="profile-main artisan-profile-main">
        <div className="artisan-dashboard-heading">
          <div>
            <h1>Bonjour, prêt pour votre journée ?</h1>   
          </div>
          <button
            aria-pressed={available}
            className={`artisan-availability${available ? ' is-available' : ''}`}
            onClick={() => setAvailable((value) => !value)}
            type="button"
          >
            
            {available ? 'Disponible pour missions' : 'Indisponible'}
          </button>
        </div>

        <ProfileSummary
          className="artisan-summary"
          name="Mohamed Bennani"
          memberLabel="Maâlem Or · 14 ans d’expérience"
          
          stats={[
            { value: '214', label: 'Chantiers réalisés' },
            { value: '4,9', icon: 'star', label: '128 avis vérifiés' },
          ]}
        />
        <div className="artisan-profile-info">
          <p><ProfileIcon>plumbing</ProfileIcon>Maître plombier chauffagiste & sanitaire</p>
          <p><ProfileIcon>location_on</ProfileIcon>Casablanca · Maârif, Gauthier, Racine, Bourgogne, Anfa, Oasis</p>
          <div>
            <button type="button" onClick={() => setNotice('La modification du profil est disponible dans cette maquette frontend.')}>
              <ProfileIcon>edit</ProfileIcon>Modifier le profil public
            </button>
            <a href="/artisans"><ProfileIcon>visibility</ProfileIcon>Voir l’annuaire artisans</a>
          </div>
        </div>

        <ProfileTabs
          activeTab={activeTab}
          ariaLabel="Rubriques de l’espace artisan"
          idPrefix="artisan"
          onTabChange={(tab) => { setActiveTab(tab); setNotice('') }}
          tabs={tabs}
        />
        <div className="profile-tab-panel artisan-tab-panel" role="tabpanel" aria-labelledby={`artisan-tab-${activeTab}`}>
          {activeTab === 'missions' && (
            <div className="artisan-dashboard-grid">
              <section className="artisan-panel artisan-missions-panel" aria-labelledby="artisan-missions-title">
                <ProfileSectionHeading
                  eyebrow="VOTRE PLANNING"
                  title="Chantiers du jour & planning actif"
                  titleId="artisan-missions-title"
                  description="Interventions confirmées et protégées par le séquestre."
                  actions={<span className="artisan-panel-count">2 interventions à venir</span>}
                />
                <div className="artisan-job-list">
                  {jobs.map((job) => (
                    <ArtisanJobCard
                      job={{ ...job, status: finishedJobs.includes(job.id) ? 'Travaux déclarés terminés' : job.status }}
                      key={job.id}
                      onComplete={completeJob}
                    />
                  ))}
                </div>
              </section>
              <aside className="artisan-side-column">
                <section className="artisan-panel artisan-next-step">
                  <span className="artisan-side-icon"><ProfileIcon>event_available</ProfileIcon></span>
                  <p className="profile-eyebrow">À NE PAS OUBLIER</p>
                  <h2>Votre planning est prêt</h2>
                  <p>Gardez vos disponibilités à jour pour recevoir des demandes adaptées à vos zones.</p>
                  <button onClick={() => setAvailable((value) => !value)} type="button"><ProfileIcon>calendar_month</ProfileIcon>{available ? 'Passer indisponible' : 'Me rendre disponible'}</button>
                </section>
                <section className="artisan-panel artisan-mini-wallet">
                  <p className="profile-eyebrow">PORTEFEUILLE PRO</p>
                  <h2>18 450 <span>DH</span></h2>
                  <p><ProfileIcon>lock_open</ProfileIcon>Solde disponible après validation client</p>
                  <button onClick={() => setActiveTab('wallet')} type="button">Voir mes revenus <ProfileIcon>arrow_forward</ProfileIcon></button>
                </section>
              </aside>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <section className="artisan-panel" aria-labelledby="artisan-portfolio-title">
              <ProfileSectionHeading
                eyebrow="VOTRE SAVOIR-FAIRE"
                title="Réalisations certifiées"
                titleId="artisan-portfolio-title"
                description="Quelques chantiers qui illustrent votre expertise."
                actions={<button className="artisan-outline-button" onClick={() => setNotice('Ajout de réalisation disponible dans cette maquette frontend.')} type="button"><ProfileIcon>add_photo_alternate</ProfileIcon>Ajouter un chantier</button>}
              />
              <div className="artisan-portfolio-grid">
                {projects.map((project) => <ArtisanPortfolioCard key={project.title} project={project} />)}
              </div>
            </section>
          )}

          {activeTab === 'reviews' && (
            <section className="artisan-panel" aria-labelledby="artisan-reviews-title">
              <ProfileSectionHeading
                eyebrow="128 AVIS VÉRIFIÉS"
                title="Derniers retours d’expérience clients"
                titleId="artisan-reviews-title"
                description="Les avis certifiés renforcent la confiance de vos futurs clients."
                actions={<span className="reviews-summary"><ProfileIcon>star</ProfileIcon>4,9 / 5</span>}
              />
              <div className="profile-review-list">
                {reviews.map((review) => <ProfileReviewCard key={review.artisan} review={review} />)}
              </div>
            </section>
          )}

          {/* {activeTab === 'documents' && (
            <section className="artisan-panel" aria-labelledby="artisan-documents-title">
              <ProfileSectionHeading
                eyebrow="DOSSIER PROFESSIONNEL"
                title="Conformité légale & certifications"
                titleId="artisan-documents-title"
                description="Vos justificatifs vérifiés vous donnent accès aux demandes prioritaires."
              />
              <div className="artisan-documents-grid">
                {[
                  { icon: 'badge', title: 'Carte nationale d’identité', detail: 'CIN marocaine vérifiée · BK••••••', status: 'Vérifié' },
                  { icon: 'health_and_safety', title: 'Assurance responsabilité civile', detail: 'Attestation AXA · N° 884-CAS-2025', status: 'Valide jusqu’au 31/12/2026' },
                  { icon: 'gavel', title: 'Casier judiciaire', detail: 'Document contrôlé par OpenMarket', status: 'Vérifié' },
                  { icon: 'workspace_premium', title: 'Agrément qualité', detail: 'Certification professionnelle MaâlemPro', status: 'Niveau A+' },
                ].map((document) => (
                  <article className="artisan-document-card" key={document.title}>
                    <span><ProfileIcon>{document.icon}</ProfileIcon></span>
                    <div><h3>{document.title}</h3><p>{document.detail}</p><small><ProfileIcon>check_circle</ProfileIcon>{document.status}</small></div>
                  </article>
                ))}
              </div>
              <button className="artisan-outline-button" onClick={() => setNotice('La mise à jour des attestations est une action de démonstration frontend.')} type="button"><ProfileIcon>upload_file</ProfileIcon>Mettre à jour mes attestations</button>
            </section>
          )} */}

        
        </div>

        <ProfileSupport
          eyebrow="ASSISTANCE PRO MAÂLEM · CASABLANCA"
          title="Besoin d’aide sur un chantier ou un devis ?"
          description="Un conseiller dédié accompagne les artisans 7j/7 pour vos interventions et votre dossier professionnel."
          contactHref="tel:+212522489000"
          contactLabel="05 22 48 90 00"
        />
      </main>
      <Footer />
    </div>
  )
}

export default ArtisanProfile
