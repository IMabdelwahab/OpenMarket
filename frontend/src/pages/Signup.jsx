import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

function Icon({ name }) {
  const paths = {
    shield: <path d="M12 3 5 6v5c0 4.7 2.9 8.6 7 10 4.1-1.4 7-5.3 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    eyeOff: <><path d="m3 3 18 18M10.6 6.1A10.3 10.3 0 0 1 12 6c6 0 9.5 6 9.5 6a17.4 17.4 0 0 1-2.1 2.8M6.4 6.5C3.9 8.2 2.5 12 2.5 12s3.5 6 9.5 6a9.7 9.7 0 0 0 3-.5M10.2 10.2a2.5 2.5 0 0 0 3.6 3.6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
    phone: <path d="M8.6 3H5.8A2.8 2.8 0 0 0 3 5.8C3 14.2 9.8 21 18.2 21a2.8 2.8 0 0 0 2.8-2.8v-2.8l-4.3-1-1.1 2.7a14.6 14.6 0 0 1-8.7-8.7l2.7-1.1-1-4.3Z" />,
    badge: <><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="12" cy="10" r="2.5" /><path d="M8 17c.7-2 2-3 4-3s3.3 1 4 3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M18 19h-2v-7h4v5a2 2 0 0 1-2 2ZM6 19H4a2 2 0 0 1-2-2v-5h4v7Z" /></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    tools: <><path d="m14 7 3-3 3 3-3 3M14 10l-9 9" /><path d="m5 14 5 5M4 4l16 16" /></>,
  }

  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[name]}</svg>
}

function Signup() {
  const [accountType, setAccountType] = useState('client')

  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])

  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("Casablanca")
  const [neighborhood, setNeighborhood] = useState("")
  const [categorie, setCategorie] = useState()
  const [CIN, setCIN] = useState("")

  useEffect (()=>{
    const fetchCatgeories = async () =>{
      try{
        const response = await axios.get("http://127.0.0.1:8000/api/getCategories/")
        setCategories(response.data)
        const response2 = await axios.get("http://127.0.0.1:8000/api/getCities/")
        setCities(response2.data)
      }
      catch(error){
        console.log(error.message)
      }
    }
    fetchCatgeories()
  },[])

  const strength = useMemo(() => {
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score
  }, [password])

  const strengthLabel = ['À définir', 'Faible', 'Moyen', 'Bon', 'Excellent'][strength]

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (accountType === 'client') {
      const resp = await axios.post('http://127.0.0.1:8000/api/addClient/', {
        first_name : firstName,
        last_name : lastName,
        phone_number : "0"+phoneNumber,
        email : email,
        cityId : city,
        neighborhood : neighborhood,
        password : password
      })
    }
    else {
      try {
        const resp2 = await axios.post('http://127.0.0.1:8000/api/addArtisan/', {
            first_name : firstName,
            last_name : lastName,
            phone_number : "0"+phoneNumber,
            email : email,
            cityId : city,
            neighborhood : neighborhood,
            password : password,
            categorieId : categorie,
            specialities : "",
            cin : CIN
            
        }) 
      }
      catch (error){
        console.log(error +"\n\n"+ error.message);
      }
    }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  

  return (
    <div className="login-page signup-page">
      <Navbar variant="signup" />

      <main className="login-main signup-main">
        <div className="login-breadcrumb">
          <Link to="/">Accueil</Link><span aria-hidden="true">›</span><strong>Création de compte sécurisée</strong>
        </div>

        <div className="login-layout signup-layout">
          <aside className="login-trust-panel signup-trust-panel">
            <div className="trust-decoration trust-decoration-one" />
            <div className="trust-decoration trust-decoration-two" />
            <div className="trust-content signup-trust-content">
              <span className="trust-kicker"><i /> LA CONFIANCE AVANT TOUT</span>
              <h1>Rejoignez une communauté qui travaille en toute <em>sérénité.</em></h1>
              <p className="trust-intro">Un compte suffit pour accéder à des professionnels vérifiés, des tarifs transparents et un accompagnement à chaque étape.</p>

              <div className="trust-list">
                <br />
                <article><span className="trust-icon"><Icon name="badge" /></span><div><h2>Profils et identités vérifiés</h2><p>Contrôle des informations avant toute mise en relation.</p></div></article>
                <br />
                <article><span className="trust-icon mint"><Icon name="headset" /></span><div><h2>Support local 7j/7</h2><p>Une équipe disponible en français et en darija.</p></div></article>
              </div>

      
            </div>
          </aside>

          <section className="login-card signup-card" aria-labelledby="signup-title">
            {submitted ? (
              <div className="login-success" role="status">
                <span><Icon name="check" /></span>
                <h2>Votre compte est prêt à être créé</h2>
                <p>Le parcours d'inscription est finalisé côté interface. L'envoi réel des données pourra être connecté au backend ultérieurement.</p>
                <Link className="success-login-link" to="/login">Accéder à la connexion</Link>
                <button type="button" onClick={() => setSubmitted(false)}>Modifier mes informations</button>
              </div>
            ) : (
              <>
                <div className="account-tabs" role="tablist" aria-label="Type de compte">
                  <button className={accountType === 'client' ? 'active' : ''} type="button" role="tab" aria-selected={accountType === 'client'} onClick={() => setAccountType('client')}><Icon name="user" /><span>Je suis un particulier<small>Je cherche un artisan</small></span></button>
                  <button className={accountType === 'artisan' ? 'active' : ''} type="button" role="tab" aria-selected={accountType === 'artisan'} onClick={() => setAccountType('artisan')}><Icon name="tools" /><span>Je suis un artisan<small>Je propose mes services</small></span></button>
                </div>

                <div className="login-heading signup-heading">
                  <span>INSCRIPTION RAPIDE &amp; GRATUITE</span>
                  <h2 id="signup-title">{accountType === 'client' ? 'Créez votre compte en 1 minute' : 'Rejoignez notre réseau d’artisans'}</h2>
                  <p>{accountType === 'client' ? 'Trouvez les meilleurs professionnels vérifiés près de chez vous.' : 'Développez votre activité et recevez de nouveaux chantiers qualifiés.'}</p>
                </div>

                
                <div className="login-divider"></div>

                <form className="signup-form" onSubmit={handleSubmit}>
                  <div className="signup-grid">
                    <div className="signup-field ">
                      <label htmlFor="last-name">Nom<b>*</b></label>
                      <div className="login-input">
                        <Icon name="badge" /><input onChange={(event)=>{setLastName(event.target.value)}} id="last-name" name="fullName" type="text" autoComplete="name" placeholder="Ex. El Amrani" required />
                      </div>
                    </div>
                    <div className="signup-field">
                      <label htmlFor="first-name">Prénom <b>*</b></label>
                      <div className="login-input">
                        <Icon name="badge" /><input onChange={(event)=>{setFirstName(event.target.value)}} id="first-name" name="fullName" type="text" autoComplete="name" placeholder="Ex. Youssef " required />
                      </div>
                    </div>
                    <div className="signup-field"><label htmlFor="email">Adresse e-mail</label><div className="login-input"><Icon name="user" /><input onChange={(event)=>{setEmail(event.target.value)}} id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.com"/></div></div>
                    <div className="signup-field"><label htmlFor="phone">Téléphone <b>*</b></label><div className="login-input phone-input"><span>+212</span><Icon name="phone" /><input onChange={(event)=>{setPhoneNumber(event.target.value)}} id="phone" name="phone" type="tel" autoComplete="tel" pattern="[5-7][0-9]{8}" placeholder="6 XX XX XX XX" required /></div></div>
                    <div className="signup-field"><label htmlFor="city">Ville principale <b>*</b></label>
                      <select onChange={(event)=>{setCity(event.target.value)}} id="city" name="city" required>
                        <option>Selectionnez votre ville</option>
                        {cities.map((item) => {
                          return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                      </select>
                    </div>
                    <div className="signup-field"><label htmlFor="district">Quartier</label><input onChange={(event)=>{setNeighborhood(event.target.value)}} className="signup-plain-input" id="district" name="district" type="text" placeholder="Ex. Maârif, Hay Riad..." /></div>
                  </div>

                  {accountType === 'artisan' && (
                    <div className="artisan-fields">
                      <div><Icon name="tools" /><span><strong>Votre activité professionnelle</strong><small>Ces informations seront vérifiées à l'étape suivante.</small></span></div>
                      <div className="signup-grid">
                        <div className="signup-field">
                          <label htmlFor="trade">Métier principal <b>*</b></label>
                          <select onChange={(event)=>{setCategorie(event.target.value)}} id="trade" name="trade" required>
                            <option value={0}>Selectionnez une catégorie</option>
                            {categories.map((item) => { 
                              // console.log(item.id);
                              return <option key={item.id} value={item.id}>{item.nom}</option>
                            })}
                            </select> 
                        </div>
                        <div className="signup-field"><label htmlFor="cin">N° CIN <b>*</b></label><input onChange={(event)=>{setCIN(event.target.value)}} className="signup-plain-input" id="cin" name="cin" placeholder="Ex. BK 123456" required /></div>
                      </div>
                    </div>
                  )}

                  <div className="signup-field password-field">
                    <label htmlFor="signup-password">Créer un mot de passe <b>*</b></label>
                    <div className="login-input"><Icon name="lock" /><input id="signup-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength="8" placeholder="8 caractères minimum" value={password} onChange={(event) => setPassword(event.target.value)} required /><button className="password-toggle" type="button" aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} onClick={() => setShowPassword((visible) => !visible)}><Icon name={showPassword ? 'eyeOff' : 'eye'} /></button></div>
                    <div className={`strength-meter strength-${strength}`}><div>{[1, 2, 3, 4].map((step) => <span className={strength >= step ? 'filled' : ''} key={step} />)}</div><small>Complexité : <b>{strengthLabel}</b><em>8 caractères, 1 majuscule, 1 chiffre et 1 symbole</em></small></div>
                  </div>

                  <label className="signup-check"><input type="checkbox" required /><span>J'accepte les <a href="#cgu">Conditions Générales d'Utilisation</a> et la <a href="#privacy">Politique de confidentialité</a>.</span></label>
                  <label className="signup-check optional"><input type="checkbox" defaultChecked /><span>Recevoir les conseils et offres utiles d'OpenMarket (facultatif).</span></label>

                  <button className="login-submit signup-submit" type="submit"><Icon name="lock" /> Créer mon compte gratuitement <Icon name="arrow" /></button>
                </form>

                <p className="privacy-note"><Icon name="shield" /> Vos données sont chiffrées et strictement confidentielles.</p>
                <p className="signup-prompt">Vous avez déjà un compte ? <Link to="/login">Se connecter à mon espace</Link></p>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Signup
