import { useState, useEffect, useContext } from 'react'
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
import { UserSearchIcon } from 'lucide-react'
import axios from 'axios'
import userInfos from '../contexts/userInfosContext'
import authContext from '../contexts/authContext'


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
  { id: 'security', label: 'Sécurité', icon: 'lock' },
]

function ClientProfile() {
  const {setIsAuthenticated, phoneNumber, setPhoneNumber} = useContext(authContext)

  const [activeTab, setActiveTab] = useState('personal')
  const [requestFilter, setRequestFilter] = useState('Toutes')
  const [editing, setEditing] = useState(false)
  
  const[clientInfos, setClientInfos] = useState({})
  const [city, setCity] = useState('')
  const [cities, setCities] = useState([])

  const [saveMessage, setSaveMessage] = useState('')

  const filteredRequests = requests.filter((request) =>
    requestFilter === 'Toutes' || request.status === requestFilter,
  )

  function updateProfile(event) {
    event.preventDefault()
    setEditing(false)
    setSaveMessage('Aperçu mis à jour. Ces informations ne sont pas envoyées au serveur.')
  }

  const fetchClientInfos = async () =>  {
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/getUserInfosByPhone/${phoneNumber}/`)
      console.log(response.data);
      setCity(response.data['city'].name)
      setClientInfos(response.data)  
    }
    catch (erro){
      console.log(error.message);
    }
        
  }
  const fetchCyties = async () =>{
    try{
      const response2 = await axios.get("http://127.0.0.1:8000/api/getCities/")
      setCities(response2.data)
    }
    catch(error){
      console.log(error.message)
    }
  }
  useEffect(()=>{
    fetchClientInfos()
    fetchCyties()
  },[])

  return (
    <div className="profile-page">
      <Navbar />
      <main className="profile-main">
        <div className="profile-page-heading">
          <div>
            <p className="profile-eyebrow">MON ESPACE OPENMARKET</p>
            <h1>Bonjour, {clientInfos['first_name']} <span aria-hidden="true">👋</span></h1>
          </div>
          <a className="profile-new-request" href="/artisans">
            <UserSearchIcon/>
            Trouver un artisan
          </a>
        </div>

        <ProfileSummary
          name={`${clientInfos['first_name']} ${clientInfos['last_name']}`}
          badges={[
            { icon: 'location_on', label: `${city}, ${clientInfos['neighborhood']}` },
          ]}
          stats={[
            { value: '8', label: 'Interventions' },
            // { value: '4,9', icon: 'star', label: 'Satisfaction moyenne' },
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
            </section>
          )}

          {activeTab === 'reviews' && (
            <section aria-labelledby="reviews-title">
              <ProfileSectionHeading
                eyebrow="VOTRE RETOUR COMPTE"
                title="Mes avis récents"
                titleId="reviews-title"
              />
              <div className="profile-review-list">
                {reviews.map((review) => <ProfileReviewCard key={review.artisan} review={review} />)}
              </div>
            </section>
          )}

          {activeTab === 'personal' && (
            <section aria-labelledby="personal-title">
              <ProfileSectionHeading
                eyebrow="VOTRE COMPTE"
                title="Informations personnelles"
                titleId="personal-title"
                actions={!editing && <button className="profile-button profile-button-primary" onClick={() => { setEditing(true); setSaveMessage('') }} type="button"><ProfileIcon>edit</ProfileIcon>Modifier mes données</button>}
              />
              <form className="profile-personal-card" onSubmit={updateProfile}>
                <label>
                  <span>Nom </span>
                  <input disabled={!editing} onChange={(event) => setClientInfos({ ...userInfos, last_name: event.target.value })} value={clientInfos.last_name} />
                </label>
                <label>
                  <span>Prénom</span>
                  <input disabled={!editing} onChange={(event) => setClientInfos({ ...userInfos, last_name: event.target.value })} value={clientInfos.first_name} />
                </label>
                <label>
                  <span>Téléphone mobile</span>
                  <div className="profile-phone-input"><span>🇲🇦 +212</span><input disabled={!editing} onChange={(event) => setClientInfos({ ...clientInfos, phone: event.target.value })} type="tel" value={clientInfos.phone_number} /></div>
                </label>
                <label>
                  <span>Adresse e-mail</span>
                  <input disabled={!editing} onChange={(event) => setClientInfos({ ...clientInfos, email: event.target.value })} type="email" value={clientInfos.email} />
                </label>
                <label>
                  <span>Ville</span>
                  <select disabled={!editing} defaultValue="fr">
                    {cities.map((city)=>(
                      <option value={city.name} key={city.id}>{city.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Quartier</span>
                  <input disabled={!editing} onChange={(event) => setClientInfos({ ...clientInfos, email: event.target.value })} type="text" value={clientInfos.neighborhood} />
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
                title="Sécurité "
                titleId="security-title"
              />
              <div className="profile-security-grid">
                <article className="profile-security-card">
                  <div className="security-icon"><ProfileIcon>shield_lock</ProfileIcon></div>
                  <div><h3>Mot de passe</h3><p>Votre mot de passe protège l’accès à votre compte.</p></div>
                  <button className="profile-button profile-button-secondary" type="button">Modifier</button>
                </article>
                <article className="profile-security-card">
                  <div className="security-icon"><ProfileIcon>mark_email_read</ProfileIcon></div>
                  <div>
                    <h3>Coordonnées vérifiées</h3>
                    <p>
                      Email : {clientInfos.email}
                      <br />
                      Tel : +212 {clientInfos.phone_number}
                    </p>
                    <span className="security-hint">
                    </span>
                  </div>
                </article>
              </div>
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
