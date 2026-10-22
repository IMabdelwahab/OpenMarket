import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import PopularServices from '../components/PopularServices'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import ArtisanCallToAction from '../components/ArtisanCallToAction'

function Home() {
  const [search, setSearch] = useState(null)

  function handleSearch(event) {
    event.preventDefault()
    
  }

  return (
    <div className="home-page">
      <a className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4" href="#main-content">Aller au contenu</a>
      <Navbar variant="home" />
      <main id="main-content">
        <Hero onSearch={handleSearch} />
        <PopularServices search={search} onReset={() => setSearch(null)} />
        <HowItWorks />
        <Testimonials />
        <ArtisanCallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default Home
