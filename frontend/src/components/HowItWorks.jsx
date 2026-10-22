
function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-surface border-t border-outline-variant" id="comment-ca-marche">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-label-md text-label-md text-secondary-container uppercase tracking-wider font-bold block mb-1">Processus garanti</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">Comment ça marche ?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            De la description de votre besoin jusqu'à la fin des travaux, chaque étape est encadrée et sécurisée par OpenMarket.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-0.5 bg-outline-variant -z-0"></div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-headline-md text-headline-md mb-6 shadow-md">
              1
            </div>
            <h3 className="font-title-md text-title-md text-primary font-bold mb-3">Exprimez votre besoin en 2 min</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Décrivez la panne ou votre projet. Précisez la date souhaitée et ajoutez des photos pour recevoir des estimations précises.
            </p>
            <div className="mt-6 flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-label-md" aria-hidden="true">timer</span>
              <span className="">Gratuit &amp; sans engagement</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary-container text-on-secondary flex items-center justify-center font-headline-md text-headline-md mb-6 shadow-md">
              2
            </div>
            <h3 className="font-title-md text-title-md text-primary font-bold mb-3">Recevez des devis certifiés</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Comparez les propositions d'artisans notés, vérifiés par CIN et disposant de références clients dans votre quartier.
            </p>
            <div className="mt-6 flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-label-md" aria-hidden="true">verified</span>
              <span className="">Profils 100% audités</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md mb-6 shadow-md">
              3
            </div>
            <h3 className="font-title-md text-title-md text-primary font-bold mb-3">Intervention Technique</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              L'artisan réalise le travail. Vous ne débloquez le règlement qu'une fois totalement satisfait.
            </p>
            <div className="mt-6 flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-label-md" aria-hidden="true">health_and_safety</span>
              <span className="">Garantie Satisfait ou Refait</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
