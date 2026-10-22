import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import axios from 'axios'

const navItems = [
  // { label: 'Trouver un artisan', href: '/artisans' },
  // { label: 'Nos Garanties', href: '/garanties' },
  // { label: 'Devenir Artisan', href: '/devenir-artisan' },
]

const homeItems = [
  { label: 'Trouver un artisan', href: '#accueil' },
  { label: 'Comment ça marche', href: '#comment-ca-marche' },
  { label: 'Devenir Artisan', href: '#devenir-artisan' },
]

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="m8.2 7.6 8.2 8.2M15.9 7.2l.9-.9.9.9-.9.9M7.6 14.7l1.7 1.7M6.8 16.8l.9.9 2.5-2.5-1.8-1.8-1.6 1.6a1.25 1.25 0 0 0 0 1.8ZM13.8 9.4l1.8-1.8" />
        <path d="m10.2 9.8-2.4-2.4-1 .2-.7-1.2.7-.7 1.2.7-.2 1 2.4 2.4" />
      </svg>
    </span>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  )
}

  
  
function Navbar({ variant = 'default' }) {
  const isAuthPage = variant === 'guest' || variant === 'signup'
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(location.hash || '#accueil')
  const pendingSectionRef = useRef(null)
  const headerRef = useRef(null)
  const [cityOpen, setCityOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [city, setCity] = useState('Casablanca')
  const cityMenuRef = useRef(null)
  const [cities, setCities] = useState([])

  useEffect(() => {
    const fetchCatgeories = async () =>{
      try{
        const response2 = await axios.get("http://127.0.0.1:8000/api/getCities/")
        setCities(response2.data)
      }
      catch(error){
        console.log(error.message)
      }
    }
    fetchCatgeories()
  
    if (variant !== 'home') return

    let frame = null
    let scrollTimer

    const updateActiveSection = () => {
      if (pendingSectionRef.current) return

      const threshold = (headerRef.current?.getBoundingClientRect().bottom || 80) + 32
      let current = homeItems[0].href
      for (const item of homeItems) {
        const section = document.getElementById(item.href.slice(1))
        if (section && section.getBoundingClientRect().top <= threshold) current = item.href
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = homeItems.at(-1).href
      }
      setActiveSection(current)
    }

    const handleScroll = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(() => {
          frame = null
          updateActiveSection()
        })
      }
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        pendingSectionRef.current = null
        updateActiveSection()
      }, 160)
    }

    const handleHashChange = () => {
      const hash = window.location.hash
      if (homeItems.some((item) => item.href === hash)) {
        pendingSectionRef.current = hash
        setActiveSection(hash)
      }
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    window.addEventListener('hashchange', handleHashChange)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('hashchange', handleHashChange)
      window.clearTimeout(scrollTimer)
      if (frame !== null) window.cancelAnimationFrame(frame)
      pendingSectionRef.current = null
    }
  }, [variant])

  useEffect(() => {
    const closeCityMenu = (event) => {
      if (!cityMenuRef.current?.contains(event.target)) setCityOpen(false)
    }

    document.addEventListener('pointerdown', closeCityMenu)
    return () => document.removeEventListener('pointerdown', closeCityMenu)
  }, [])

  return (
    <header className="site-header" ref={headerRef}>
      <nav className="navbar" aria-label="Navigation principale">
        <Link className="brand" to="/" aria-label="OpenMarket — Accueil" onClick={() => setMenuOpen(false)}>
          <BrandMark />
          <span>OpenMarket</span>
        </Link>

        {/* <div className="city-picker" ref={cityMenuRef}>
          <button
            className="city-trigger"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={cityOpen}
            onClick={() => setCityOpen((open) => !open)}
          >
            <PinIcon />
            <span>{city}</span>
            <svg className="chevron" viewBox="0 0 20 20" aria-hidden="true">
              <path d="m6 8 4 4 4-4" />
            </svg>
          </button>

           {cityOpen && (
            <div className="city-menu" role="listbox" aria-label="Choisir une ville">
              {cities.map((city) => {
                return (
                  <button
                    type="button"
                    role="option"
                    // aria-selected={city === city}
                    key={city.id}
                  onClick={() => {
                    setCity(city.name)
                    setCityOpen(false)
                  }}
                >
                  {city.name}
                </button>
              )})}
            </div>
          )} 
        </div> */}

        <div className={`nav-content${menuOpen ? ' is-open' : ''}`}>
          <div className="nav-links">
            {(variant === 'home' ? homeItems : navItems).map((item) => {
              const isAnchor = variant === 'home'
              const NavigationLink = isAnchor ? 'a' : Link
              const isActive = variant === 'home'
                ? activeSection === item.href
                : location.pathname === item.href.split('#')[0]
              return (
                <NavigationLink
                  className={isActive ? 'active' : ''}
                  aria-current={isActive ? (variant === 'home' ? 'location' : 'page') : undefined}
                  {...(isAnchor ? { href: item.href } : { to: item.href })}
                  key={item.href}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                    setMenuOpen(false)
                    if (variant === 'home') {
                      pendingSectionRef.current = item.href
                      setActiveSection(item.href)
                    }
                  }}
                >
                  {item.label}
                </NavigationLink>
              )
            })}
          </div>

          <div className={`nav-actions${isAuthPage ? ' guest-actions' : ''}`}>
            {isAuthPage ? (
              <span className="guest-signup">{variant === 'signup' ? 'Déjà un compte ?' : 'Pas encore de compte ?'} <Link to={variant === 'signup' ? '/login' : '/signUp'}>{variant === 'signup' ? 'Se connecter' : "S'inscrire"}</Link></span>
            ) : <>
              <button className="icon-button notification-button" type="button" aria-label="Notifications">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
                <span className="notification-dot" />
              </button>
              <button className="icon-button" type="button" aria-label="Messages">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 15a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9Z" /></svg>
              </button>
            </>}
            <Link className="request-button" to={variant === 'home' ? '/signUp' : '/publier-une-demande'} onClick={() => setMenuOpen(false)}>
              <span className="plus-circle" aria-hidden="true">+</span>
              Publier une demande
            </Link>
          </div>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}

export default Navbar
