import { useState, useContext } from 'react'
import { Link , useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import authContext from '../contexts/authContext'
import userInfos from '../contexts/userInfosContext'
import { X, Shield,Lock, User, Eye, EyeOff, Check, Headset, ArrowRightIcon } from 'lucide-react'

function Login() {

  const {setIsAuthenticated, setAccessToken, setRefreshToken, setRole, phoneNumber, setPhoneNumber} = useContext(authContext)
  const [password, setPassword] = useState()
  const {firstName, setFirstName, lastName, setLastName} = useContext(userInfos)

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const navigate = useNavigate()
  
  const makeAuthentification = async () => {
    setPhoneNumber(phoneNumber)
    const response2 = await axios.get(`http://127.0.0.1:8000/api/getUserRole/${phoneNumber}`,
      {
        'phone_number' : phoneNumber
      }
    )
    const userRole = response2.data['role']
    setRole(userRole)
    setIsAuthenticated(true)
    navigate('/profile')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/',
        {
          'phone_number' : phoneNumber,
          'password' : password
        }
      )
      setAccessToken(response.data['access'])
      setRefreshToken(response.data['refresh'])
      makeAuthentification()
    } 
    catch (error) {
      setErrorMessage(true)
      console.log(error.message);
    }
  }

  return (
    <div className="login-page">
      <Navbar variant="guest" />
      {
        errorMessage && 
        <div className='w-fit mx-auto mt-5 bg-white p-5 rounded-xl text-xl text-red-700 flex'>
          <div className='max-w-100'>Informations incorrectes , réessayez !</div>
          <X className='ml-5 text-red-700' onClick={()=> setErrorMessage(false)}/>
        </div>
      }
      <main className="login-main">
        <div className="login-breadcrumb">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true"></span>
          <strong>Connexion sécurisée</strong>
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
                  <Shield />
                  <div><h2>Artisans vérifiés et certifiés</h2><p>Chaque professionnel est contrôlé avant sa première intervention.</p></div>
                </article>
                <br />
                <article>
                  <Headset />
                  <div><h2>Une équipe disponible 7j/7</h2><p>Notre support vous accompagne avant, pendant et après vos travaux.</p></div>
                </article>
              </div>
            </div>
          </aside>

          <section className="login-card" aria-labelledby="login-title">    
              <>
                  
                <div className="login-heading">
                  <span>HEUREUX DE VOUS REVOIR</span>
                  <h2 id="login-title">Connectez-vous à votre espace</h2>
                  <p>Suivez vos projets et retrouvez vos artisans de confiance.</p>
                </div>
                <div className="login-divider">
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                  
                  <label htmlFor="identifier">numéro de téléphone <b>*</b></label>
                  <div className="login-input">
                    <User name="user" />
                    <input onChange={(event)=>{setPhoneNumber(event.target.value)}} id="identifier" name="identifier" type="number" autoComplete="phone number" placeholder="exemple 0612..." required />
                  </div>
                  <div className="password-label">
                    <label htmlFor="login-password">Mot de passe <b>*</b></label>
                    <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
                  </div>
                  <div className="login-input">
                    <Lock  />
                    <input onChange={(event)=>{setPassword(document.querySelector('#login-password').value)}} id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Saisissez votre mot de passe" minLength="8" required />
                    <button className="password-toggle" type="button" aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  <label className="remember-me"><input type="checkbox" name="remember" /> <span>Se souvenir de moi sur cet appareil</span></label>

                  <button className="login-submit" type="submit"><Lock /> Se connecter <ArrowRightIcon /></button>
                </form>

                <p className="privacy-note"><Shield /> Vos données sont chiffrées et restent strictement confidentielles.</p>
                <p className="signup-prompt">Vous n'avez pas encore de compte ? <Link to="/signUp">Créer un compte gratuitement</Link></p>
              </>
            
          </section>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default Login
