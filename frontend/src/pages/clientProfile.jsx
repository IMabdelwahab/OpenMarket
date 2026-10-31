import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfileIcon from '../components/ProfileIcon'
import ProfileSummary from '../components/ProfileSummary'
import ProfileTabs from '../components/ProfileTabs'
import ProfileSectionHeading from '../components/ProfileSectionHeading'
import ProfileRequestCard from '../components/ProfileRequestCard'
import ProfileReviewCard from '../components/ProfileReviewCard'
import ProfileSupport from '../components/ProfileSupport'
import './profile.css'

const requests = [
  {
    id: 'OM-2026-0841',
    title: 'Réparation fuite sous évier',
    category: 'Plomberie',
    artisan: 'Mohamed Bennani',
    date: "Aujourd'hui, 15:00 - 17:00",
    location: 'Casablanca, Gauthier',
    price: '280 DH',
    status: 'En cours',
    statusIcon: 'schedule',
    description: 'Remplacement du joint et vérification de la robinetterie.',
  },
  {
    id: 'OM-2026-0712',
    title: 'Installation d’un lustre au salon',
    category: 'Électricité',
    artisan: 'Tariq Mansouri',
    date: '12 février 2026',
    location: 'Casablanca, Maarif',
    price: '450 DH',
    status: 'Terminée',
    statusIcon: 'check_circle',
    description: 'Installation réalisée et testée. Votre avis a été publié.',
  },
  {
    id: 'OM-2025-0982',
    title: 'Peinture de la chambre',
    category: 'Peinture',
    artisan: 'Adil Berrada',
    date: '28 novembre 2025',
    location: 'Bouskoura',
    price: '1 200 DH',
    status: 'Terminée',
    statusIcon: 'check_circle',
    description: 'Peinture acrylique satinée, chantier nettoyé après intervention.',
  },
]

const reviews = [
  {
    artisan: 'Tariq Mansouri',
    trade: 'Électricité générale',
    date: 'Février 2026',
    rating: 5,
    text: 'Très bon artisan, ponctuel et soigneux. Le lustre a été posé parfaitement et le chantier rendu propre.',
  },
  {
    artisan: 'Adil Berrada',
    trade: 'Peinture & finition',
    date: 'Novembre 2025',
    rating: 4,
    text: 'Excellent rendu pour la chambre. Protection soignée du parquet et travail très propre.',
  },
]

const tabs = [
  { id: 'requests', label: 'Mes demandes', icon: 'engineering', count: 8 },
  { id: 'reviews', label: 'Mes avis', icon: 'rate_review', count: 6 },
  { id: 'personal', label: 'Informations personnelles', icon: 'person' },
  { id: 'security', label: 'Sécurité & adresses', icon: 'lock' },
]

function ClientProfile() {
  const [activeTab, setActiveTab] = useState('requests')
  const [requestFilter, setRequestFilter] = useState('Toutes')
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Youssef Alami',
    phone: '6 61 23 45 67',
    email: 'youssef.alami@gmail.com',
  })
  const [saveMessage, setSaveMessage] = useState('')

  const filteredRequests = requests.filter((request) =>
    requestFilter === 'Toutes' || request.status === requestFilter,
  )

  function updateProfile(event) {
    event.preventDefault()
    setEditing(false)
    setSaveMessage('Aperçu mis à jour. Ces informations ne sont pas envoyées au serveur.')
  }

  return (
    <div className="profile-page">
      <Navbar />
      <main className="profile-main">
        <div className="profile-page-heading">
          <div>
            <p className="profile-eyebrow">MON ESPACE OPENMARKET</p>
            <h1>Bonjour, {profile.name.split(' ')[0]} <span aria-hidden="true">👋</span></h1>
            <p>Retrouvez vos demandes, vos avis et les informations de votre compte.</p>
          </div>
          <a className="profile-new-request" href="/artisans">
            <ProfileIcon>add</ProfileIcon>
            Trouver un artisan
          </a>
        </div>

        <ProfileSummary
          name={profile.name}
          memberLabel="Client depuis 2023"
          badges={[
            { icon: 'verified_user', label: 'Téléphone & e-mail vérifiés' },
            { icon: 'location_on', label: 'Casablanca, Maarif' },
          ]}
          stats={[
            { value: '8', label: 'Interventions' },
            { value: '4,9', icon: 'star', label: 'Satisfaction moyenne' },
            { value: '0', label: 'Litige déclaré' },
          ]}
        />

        <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="profile-tab-panel" role="tabpanel" aria-labelledby={`profile-tab-${activeTab}`}>
          {activeTab === 'requests' && (
            <section aria-labelledby="requests-title">
              <ProfileSectionHeading
                eyebrow="SUIVI DE VOS TRAVAUX"
                title="Mes demandes & interventions"
                titleId="requests-title"
                actions={
                  <div className="request-filters" aria-label="Filtrer les demandes">
                    {['Toutes', 'En cours', 'Terminées'].map((filter) => (
                      <button
                        className={requestFilter === filter ? 'is-active' : ''}
                        key={filter}
                        onClick={() => setRequestFilter(filter)}
                        type="button"
                      >
                        {filter}
                        <span>{filter === 'Toutes' ? requests.length : requests.filter((item) => item.status === filter).length}</span>
                      </button>
                    ))}
                  </div>
                }
              />
              <div className="profile-request-list">
                {filteredRequests.map((request) => <ProfileRequestCard key={request.id} request={request} />)}
              </div>
              <p className="profile-demo-note">Aperçu de vos demandes récentes. Le contenu affiché est une démonstration frontend.</p>
            </section>
          )}

          {activeTab === 'reviews' && (
            <section aria-labelledby="reviews-title">
              <ProfileSectionHeading
                eyebrow="VOTRE RETOUR COMPTE"
                title="Mes avis récents"
                titleId="reviews-title"
                actions={<span className="reviews-summary"><ProfileIcon>star</ProfileIcon>4,9 / 5 de moyenne</span>}
              />
              <div className="profile-review-list">
                {reviews.map((review) => <ProfileReviewCard key={review.artisan} review={review} />)}
              </div>
              <p className="profile-demo-note">Vous avez laissé 6 avis au total. Les avis affichés sont des exemples de démonstration.</p>
            </section>
          )}

          {activeTab === 'personal' && (
            <section aria-labelledby="personal-title">
              <ProfileSectionHeading
                eyebrow="VOTRE COMPTE"
                title="Informations personnelles"
                titleId="personal-title"
                description="Gérez les coordonnées associées à votre espace client."
                actions={!editing && <button className="profile-button profile-button-primary" onClick={() => { setEditing(true); setSaveMessage('') }} type="button"><ProfileIcon>edit</ProfileIcon>Modifier mes données</button>}
              />
              <form className="profile-personal-card" onSubmit={updateProfile}>
                <label>
                  <span>Nom complet</span>
                  <input disabled={!editing} onChange={(event) => setProfile({ ...profile, name: event.target.value })} value={profile.name} />
                </label>
                <label>
                  <span>Téléphone mobile</span>
                  <div className="profile-phone-input"><span>🇲🇦 +212</span><input disabled={!editing} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} type="tel" value={profile.phone} /></div>
                </label>
                <label>
                  <span>Adresse e-mail</span>
                  <input disabled={!editing} onChange={(event) => setProfile({ ...profile, email: event.target.value })} type="email" value={profile.email} />
                </label>
                <label>
                  <span>Langue préférée</span>
                  <select disabled={!editing} defaultValue="fr"><option value="fr">Français</option><option value="darija">Darija (الدارجة)</option></select>
                </label>
                {editing && <div className="profile-form-actions">
                  <button className="profile-button profile-button-secondary" onClick={() => { setEditing(false); setSaveMessage('') }} type="button">Annuler</button>
                  <button className="profile-button profile-button-primary" type="submit"><ProfileIcon>check</ProfileIcon>Enregistrer l’aperçu</button>
                </div>}
                {saveMessage && <p className="profile-save-message" role="status">{saveMessage}</p>}
              </form>
            </section>
          )}

          {activeTab === 'security' && (
            <section aria-labelledby="security-title">
              <ProfileSectionHeading
                eyebrow="PROTECTION DU COMPTE"
                title="Sécurité & adresses enregistrées"
                titleId="security-title"
                description="Vérifiez vos accès et choisissez l’adresse de vos prochaines interventions."
              />
              <div className="profile-security-grid">
                <article className="profile-security-card">
                  <div className="security-icon"><ProfileIcon>shield_lock</ProfileIcon></div>
                  <div><h3>Mot de passe</h3><p>Votre mot de passe protège l’accès à votre compte.</p><span className="security-hint"><ProfileIcon>check_circle</ProfileIcon>Compte protégé</span></div>
                  <button className="profile-button profile-button-secondary" type="button">Modifier</button>
                </article>
                <article className="profile-security-card">
                  <div className="security-icon"><ProfileIcon>mark_email_read</ProfileIcon></div>
                  <div><h3>Coordonnées vérifiées</h3><p>{profile.email}<br />+212 {profile.phone}</p><span className="security-hint"><ProfileIcon>verified</ProfileIcon>E-mail et téléphone vérifiés</span></div>
                </article>
              </div>
              <div className="profile-address-heading"><div><h3>Adresses d’intervention</h3><p>Choisissez une adresse enregistrée pour vos demandes.</p></div><button className="profile-button profile-button-secondary" type="button"><ProfileIcon>add_location_alt</ProfileIcon>Ajouter une adresse</button></div>
              <div className="profile-address-grid">
                <article className="profile-address-card is-default"><div><ProfileIcon>home</ProfileIcon><h4>Domicile principal</h4><span>Par défaut</span></div><p>24 Rue Jean Jaurès, Maarif</p><small>Casablanca 20100 · Sonnette « Alami »</small></article>
                <article className="profile-address-card"><div><ProfileIcon>cottage</ProfileIcon><h4>Maison secondaire</h4></div><p>Résidence Bouskoura Golf City</p><small>Bouskoura, Grand Casablanca</small></article>
              </div>
              <p className="profile-demo-note">Les commandes de sécurité et d’adresse sont des éléments d’interface uniquement.</p>
            </section>
          )}
        </div>

        <ProfileSupport />
      </main>
      <Footer />
    </div>
  )
}

export default ClientProfile
