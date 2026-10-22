import { Link } from 'react-router'

function ArtisanCallToAction() {
  return (
    <section className="py-12 bg-surface-container-low border-t border-outline-variant" id="devenir-artisan">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-headline-md" aria-hidden="true">engineering</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Vous êtes un artisan qualifié au Maroc ?</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Rejoignez le réseau OpenMarket, accédez à des centaines de demandes par semaine et valorisez votre savoir-faire.</p>
            </div>
          </div>
          <Link to="/signUp" className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3.5 rounded-xl font-label-lg text-label-lg whitespace-nowrap shadow-sm hover:shadow transition-all active:scale-95 duration-100 ease-out">
            Rejoindre le réseau
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ArtisanCallToAction
