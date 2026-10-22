import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DirectorySearch from '../components/DirectorySearch'
import DirectoryFilters from '../components/DirectoryFilters'
import ArtisanDirectoryCard from '../components/ArtisanDirectoryCard'
import '../artisan-directory.css'

const artisans = [
  {
    name: 'Si Mohamed Bennani',
    title: "Maître Plombier Chauffagiste • 14 ans d'expérience",
    zone: 'Casablanca (Maarif, Anfa, Gauthier)',
    availability: 'Intervient sous 45 min',
    availabilityIcon: 'bolt', availabilityTone: 'available-now',
    description: "Expertise en détection acoustique de fuite non destructive, remplacement de colonnes d'évacuation, installation de ballons d'eau chaude et robinetterie de luxe.",
    tags: ['Recherche de fuite', 'Dépannage chauffe-eau', 'Débouchage haute pression'],
    rating: 4.9, reviews: '128 interventions', price: 150,
    ribbon: 'Vérifié CIN & Assurance', ribbonIcon: 'verified', ribbonTone: 'verified-ribbon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuLJI1V53HqRswe7eJIw6sFuehUWKNNm3G2TKEEb7bhebvApepgBUwkT8M3H2OJ872d9TirjkoYniZnERZvqoHSiOJh21Sk0Zd-BIOx94mKwdtPNS6b8HFMBFNgsVOZQyi-ewZViiopNLhOPbUQO6SR6hzm349MGQnWP51vKwwFl6F6J7X9gGZuCpPWIllXO9vIHQ3VBJrPxjpp0nA1cgURKMwAcCHQvGX0lISjN8Rwo9f5NlwEUtObg',
  },
  {
    name: 'Karim El Amrani',
    title: "Expert Sanitaire & Détection de fuites • 9 ans d'expérience",
    zone: 'Casablanca & Bouskoura',
    availability: 'Disponible demain dès 09h',
    availabilityIcon: 'schedule', availabilityTone: 'available-later',
    description: 'Spécialisé dans le débouchage urgent, diagnostic par caméra thermique et rénovation complète des réseaux sanitaires d’appartements et villas.',
    tags: ['Caméra thermique', 'Remplacement mitigeur', 'Assainissement'],
    rating: 4.8, reviews: '94 avis vérifiés', price: 180,
    ribbon: 'Vérifié Pro', ribbonIcon: 'verified', ribbonTone: 'pro-ribbon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhJdYhVbh0n5jQ4SN9S9MW-L78iEv_WhEPwcm1U4SaIh_gu-Z1hlExkHgsixArisHXp1Xb9viFRuDmebPWrMBaD_v7ZkNwk3AubOChq0Al9es6jc5t2NfRMZ2tHPMTYLOr542RmnOtxc-FLPxo0MlIn9FxvnX_JEhmbIo5ODoKtEJYTcQ4bbpZCZhbP4G4FTCQgeuG4nThxCmdQeuQd7n57MLgkNjWJAlVqTvhe1nd9SgHFlH_NSRoMA',
  },
  {
    name: 'Hassan Tazi',
    title: 'Plomberie générale & Rénovation Salle de bain • 22 ans de métier',
    zone: 'Grand Casablanca (Tous secteurs)',
    availability: 'Garantie Travaux 1 an',
    availabilityIcon: 'verified', availabilityTone: 'available-now',
    description: "Artisan historique de la métropole. Pose de cabines de douche à l'italienne, remplacement de réseaux en multicouche et résolution des problèmes de pression d'eau.",
    tags: ['Rénovation complète', "Surpresseur d'eau", 'Douche italienne'],
    rating: 4.9, reviews: '210 avis vérifiés', price: 200,
    ribbon: 'Top Artisan 2026', ribbonIcon: 'military_tech', ribbonTone: 'top-ribbon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD_KmUaD3mcasYRqVr0ih5COkQYK-f-RM_O1JJK59GRKI1EHUVsjtnu9Wc68K2TQJ8JTgmN5zMR_B8XOqXFmGRdUyI5aPqxgUNN3uz14C2l5MJCgLfSHx119LorGu0TYw8x0QDsB5gyc41afOGRAy9gir7lEc-fnX8EkyEIHz22HBAnEs1gR0MRWG9OTM1WwrVm5npGbvmTqB2l4cTgGhRNFl61fqRePVpXoIgqSChmOUg7Z3Qzul7OA',
  },
  {
    name: 'Yassine Mounir',
    title: "Dépannage Plomberie Express • 6 ans d'expérience",
    zone: 'Casablanca Est & Centre',
    availability: 'Intervention Nuit & Week-end',
    availabilityIcon: 'emergency', availabilityTone: 'available-emergency',
    description: "Intervention rapide pour canalisations bouchées, remplacement express de mécanismes WC et robinets d'arrêt bloqués. Matériel professionnel prêt en camionnette.",
    tags: ['Dépannage express', 'Mécanisme WC', 'Dispo dimanche'],
    rating: 4.7, reviews: '65 avis vérifiés', price: 140,
    ribbon: 'Vérifié', ribbonIcon: 'check_circle', ribbonTone: 'pro-ribbon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS-S95U6-YSZXJAeqhHudciF30SR-Wy4PtiVrgqNfYB9A673KtBTeaNruWpo-OKR__Bx-WtGC9GmlKcBYEEJrkawZDY-QhZ14byV_1BUEEIW72u6tfddyBC_fNIkPVx8ofUEm-Kk11uowONc0ZTIYYI4CmC7sU1gj3PSflcws80Yx0a7GwOGX0706Grb7oHfB6bfH5seU9JeECDz5YRqa-oWqDlbqO7vFNJII2MQKN8eBYCIQPXsLhFQ',
  },
]

function ArtisanDirectory() {
  const [quickFilter, setQuickFilter] = useState("Fuite d'eau urgente")
  const [sort, setSort] = useState('rating')
  const [budget, setBudget] = useState('450')
  const [quoteTarget, setQuoteTarget] = useState('')

  const sortedArtisans = useMemo(() => {
    const result = [...artisans]
    if (sort === 'price') result.sort((a, b) => a.price - b.price)
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sort === 'response') result.sort((a, b) => Number(b.availabilityTone === 'available-now') - Number(a.availabilityTone === 'available-now'))
    return result
  }, [sort])

  const resetFilters = () => {
    setQuickFilter("Fuite d'eau urgente")
    setBudget('450')
    setSort('rating')
  }

  return (
    <div className="directory-page">
      <a className="directory-skip-link" href="#directory-results">Aller aux résultats</a>
      <Navbar />
      <DirectorySearch activeQuickFilter={quickFilter} onQuickFilterChange={setQuickFilter} />

      <main className="directory-container directory-main" id="directory-results">
        <div className="results-header">
          <div>
            <div className="results-title-row"><h1>48 artisans disponibles à Casablanca</h1><span>En ligne</span></div>
            <p>Spécialité sélectionnée : <strong>Plomberie &amp; Sanitaire</strong> • Tous certifiés CIN et vérifiés sur le terrain.</p>
          </div>
          <label className="sort-control">Trier par :
            <span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="rating">Mieux notés (Avis vérifiés)</option><option value="recommended">Plus recommandés</option><option value="response">Plus réactifs (&lt; 1 heure)</option><option value="price">Prix indicatif croissant</option></select><span className="material-symbols-outlined">expand_more</span></span>
          </label>
        </div>

        <div className="directory-layout">
          <DirectoryFilters budget={budget} onBudgetChange={setBudget} onReset={resetFilters} />
          <section className="artisan-results" aria-label="Résultats artisans">
            {sortedArtisans.map((artisan) => <ArtisanDirectoryCard artisan={artisan} onQuote={setQuoteTarget} key={artisan.name} />)}
            <nav className="directory-pagination" aria-label="Pagination des résultats">
              <button type="button"><span className="material-symbols-outlined">arrow_back</span>Précédent</button>
              <div><button className="active" type="button">1</button><button type="button">2</button><button type="button">3</button><span>…</span><button type="button">12</button></div>
              <button type="button">Suivant<span className="material-symbols-outlined">arrow_forward</span></button>
            </nav>
          </section>
        </div>

        <section className="directory-trust-banner" aria-label="Garanties OpenMarket">
          <article><span className="material-symbols-outlined">badge</span><div><h2>Contrôle strict des antécédents</h2><p>Chaque artisan dépose sa CIN et justifie de références vérifiées.</p></div></article>
          <article><span className="material-symbols-outlined">security</span><div><h2>Couverture partenaire incluse</h2><p>Vos biens et les interventions sont protégés en cas d’incident.</p></div></article>
          <article><span className="material-symbols-outlined">price_check</span><div><h2>Tarifs transparents & sans surprise</h2><p>Devis validé avant toute réparation, sans majoration abusive.</p></div></article>
        </section>
      </main>

      {quoteTarget && (
        <div className="quote-toast" role="status"><span className="material-symbols-outlined">check_circle</span><span><strong>Demande préparée</strong><small>Vous pouvez maintenant préciser votre besoin à {quoteTarget}.</small></span><button type="button" aria-label="Fermer" onClick={() => setQuoteTarget('')}>×</button></div>
      )}
      <Footer variant="full" />
    </div>
  )
}

export default ArtisanDirectory
