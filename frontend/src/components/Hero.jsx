import SearchConsole from './SearchConsole'
import TrustPillars from './TrustPillars'

function Hero({ onSearch }) {
  return (
    <section id="accueil" className="relative overflow-hidden pt-10 pb-16 md:py-20 bg-linear-to-b from-surface to-surface-container-low">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{"backgroundImage": "radial-gradient(#003460 1px, transparent 1px)", "backgroundSize": "24px 24px"}}></div>
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant shadow-sm mb-6">
            <span className="material-symbols-outlined text-tertiary-container text-title-sm" aria-hidden="true" style={{"fontVariationSettings": "'FILL' 1"}}>verified_user</span> 
            <span className="font-label-md text-label-md text-primary font-bold">1er Réseau d'Artisans Certifiés &amp; Assurés au Maroc</span> 
          </div> */}
          <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary tracking-tight font-extrabold mb-4">
            Trouvez un artisan de confiance vérifié chez vous en toute sérénité
          </h1>
          {/* <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant">
            Artisans certifiés sur pièce d'identité (CIN), casier vierge, assurance responsabilité civile AXA Maroc incluse et devis sans surprise.
          </p> */}
        </div>
        <SearchConsole onSubmit={onSearch} />
        {/* <TrustPillars /> */}
      </div>
    </section>
  )
}

export default Hero
