import { useState } from 'react'
import { Link , useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

function Icon({ name, className = '' }) {
  const paths = {
    shield: <path d="M12 3 5 6v5c0 4.7 2.9 8.6 7 10 4.1-1.4 7-5.3 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    eyeOff: <><path d="m3 3 18 18M10.6 6.1A10.3 10.3 0 0 1 12 6c6 0 9.5 6 9.5 6a17.4 17.4 0 0 1-2.1 2.8M6.4 6.5C3.9 8.2 2.5 12 2.5 12s3.5 6 9.5 6a9.7 9.7 0 0 0 3-.5M10.2 10.2a2.5 2.5 0 0 0 3.6 3.6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M18 19h-2v-7h4v5a2 2 0 0 1-2 2ZM6 19H4a2 2 0 0 1-2-2v-5h4v7Z" /><path d="M18 19c0 1.1-.9 2-2 2h-3" /></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  }

  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[name]}</svg>
}

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState()
  const [password, setPassword] = useState()
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const navigate = useNavigate()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(`phone_number : ${phoneNumber}\npassword : ${password}`);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/',
        {
          'phone_number' : phoneNumber,
          'password' : password
        }
      )
      setAccessToken(response.data['access'])
      setRefreshToken(response.data['refresh'])
      // console.log(`access : ${accessToken}\nrefresh : ${refreshToken}`)
      const response2 = await axios.get(`http://127.0.0.1:8000/api/getUserRole/${phoneNumber}`,
        {
          'phone_number' : phoneNumber
        }
      )
      const role = response2.data['role']
      role === "Client" ?  navigate("/") : navigate("/zen")

    } catch (error) {
      console.log(error.message);
      
    }
    // setSubmitted(true)
  }

  return (
    <div className="login-page">
      <Navbar variant="guest" />

      <main className="login-main">
        <div className="login-breadcrumb">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true"></span>
          <strong>Connexion sécurisée</strong>
          {/* <span className="secure-chip"><Icon name="shield" /> Connexion protégée SSL</span> */}
        </div>

        <div className="login-layout">
          <aside className="login-trust-panel">
            <div className="trust-decoration trust-decoration-one" />
            <div className="trust-decoration trust-decoration-two" />
            <div className="trust-content">
              <span className="trust-kicker"><i /> VOTRE SÉCURITÉ, NOTRE PRIORITÉ</span>
              <h1>Retrouvez vos projets en toute <em>tranquillité.</em></h1>
              <p className="trust-intro">Connectez-vous à votre espace personnel pour suivre vos demandes, échanger avec vos artisans et gérer vos interventions.</p>

              <div className="trust-list">
                <br />
                <article>
                  <span className="trust-icon"><Icon name="shield" /></span>
                  <div><h2>Artisans vérifiés et certifiés</h2><p>Chaque professionnel est contrôlé avant sa première intervention.</p></div>
                </article>
                <br />
                {/* <article>
                  <span className="trust-icon coral"><Icon name="lock" /></span>
                  <div><h2>Paiements totalement sécurisés</h2><p>Vos transactions et données personnelles restent protégées.</p></div>
                </article> */}
                <article>
                  <span className="trust-icon mint"><Icon name="headset" /></span>
                  <div><h2>Une équipe disponible 7j/7</h2><p>Notre support vous accompagne avant, pendant et après vos travaux.</p></div>
                </article>
              </div>
            </div>
          </aside>

          <section className="login-card" aria-labelledby="login-title">
            {submitted ? (
              <div className="login-success" role="status">
                <span><Icon name="check" /></span>
                <h2>Connexion prête</h2>
                <p>Le formulaire fonctionne côté interface. Il pourra être relié à votre service d’authentification lorsque le backend sera prêt.</p>
                <button type="button" onClick={() => setSubmitted(false)}>Retour au formulaire</button>
              </div>
            ) : (
              <>
                <div className="login-heading">
                  <span>HEUREUX DE VOUS REVOIR</span>
                  <h2 id="login-title">Connectez-vous à votre espace</h2>
                  <p>Suivez vos projets et retrouvez vos artisans de confiance.</p>
                </div>


                <div className="login-divider">
                  {/* <span>ou avec vos identifiants</span> */}
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                  <label htmlFor="identifier">numéro de téléphone <b>*</b></label>
                  <div className="login-input">
                    <Icon name="user" />
                    <input onChange={(event)=>{setPhoneNumber(event.target.value)}} id="identifier" name="identifier" type="number" autoComplete="phone number" placeholder="exemple 0612..." required />
                  </div>

                  <div className="password-label">
                    <label htmlFor="login-password">Mot de passe <b>*</b></label>
                    <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
                  </div>
                  <div className="login-input">
                    <Icon name="lock" />
                    <input onChange={(event)=>{setPassword(document.querySelector('#login-password').value)}} id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Saisissez votre mot de passe" minLength="8" required />
                    <button className="password-toggle" type="button" aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      <Icon name={showPassword ? 'eyeOff' : 'eye'} />
                    </button>
                  </div>

                  <label className="remember-me"><input type="checkbox" name="remember" /> <span>Se souvenir de moi sur cet appareil</span></label>

                  <button className="login-submit" type="submit"><Icon name="lock" /> Se connecter <Icon name="arrow" /></button>
                </form>

                {/* <p className="privacy-note"><Icon name="shield" /> Vos données sont chiffrées et restent strictement confidentielles.</p> */}
                <p className="signup-prompt">Vous n'avez pas encore de compte ? <Link to="/signUp">Créer un compte gratuitement</Link></p>
              </>
            )}
          </section>
        </div>

        {/* <section className="login-help">
          <Icon name="headset" />
          <div><strong>Besoin d'aide pour vous connecter ?</strong><span>Notre équipe est disponible 7j/7, de 8h à 20h</span></div>
          <a href="tel:+212522000000">+212 5 22 00 00 00</a>
          <button type="button">Nous contacter</button>
        </section> */}
      </main>

      <Footer />
    </div>
  )
}

export default Login
