function Footer() {

return (
<footer className="bg-primary dark:bg-primary text-on-primary dark:text-on-primary border-t border-primary-container full-width bottom">
<div className="w-full py-space-xl px-margin-mobile md:px-margin max-w-7xl mx-auto">

<div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-primary-container">

<div className="md:col-span-2 space-y-4">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-title-md">construction</span>
</div>
<span className="text-headline-md font-headline-md font-bold text-on-primary tracking-tight">OpenMarket</span>
</div>
<p className="font-body-sm text-body-sm text-on-primary-container max-w-sm">
            Première plateforme d'artisans au Maroc certifiés sur pièce d'identité avec assurance responsabilité civile professionnelle incluse et avis clients contrôlés.
          </p>
<div className="flex items-center gap-3 pt-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-label-sm" style={{"fontVariationSettings": "'FILL' 1"}}>verified</span>
              Partenaire AXA Maroc
            </span>
</div>
</div>

<div>
<h4 className="font-title-sm text-title-sm font-bold text-on-primary mb-4">Garanties &amp; Confiance</h4>
<ul className="space-y-2.5 font-label-md text-label-md">
<li className="">
<a className="text-on-primary-container hover:text-on-primary transition-colors hover:translate-x-0.5 inline-block" href="/#garanties">Vérification d'identité &amp; CIN</a>
</li>
<li className="">
<a className="text-on-primary-container hover:text-on-primary transition-colors hover:translate-x-0.5 inline-block" href="/#garanties">Assurance AXA Maroc</a>
</li>
<li className="">
<a className="text-on-primary-container hover:text-on-primary transition-colors hover:translate-x-0.5 inline-block" href="/#garanties">Charte Qualité &amp; Déontologie</a>
</li>
<li className="">
<a className="text-on-primary-container hover:text-on-primary transition-colors hover:translate-x-0.5 inline-block" href="/#garanties">Garantie Travaux</a>
</li>
</ul>
</div>

<div>
<h4 className="font-title-sm text-title-sm font-bold text-on-primary mb-4">Assistance &amp; Légal</h4>
<ul className="space-y-2.5 font-label-md text-label-md">
<li className="">
<a className="text-on-primary-container hover:text-on-primary transition-colors hover:translate-x-0.5 inline-block" href="/#aide">Centre d'aide &amp; Réclamations</a>
</li>
<li className="">
<a className="text-on-primary-container hover:text-on-primary transition-colors hover:translate-x-0.5 inline-block" href="/#cgu">Mentions Légales &amp; CGU</a>
</li>
<li className="">
<a className="text-on-primary-container hover:text-on-primary transition-colors hover:translate-x-0.5 inline-block" href="/#confidentialite">Politique de confidentialité</a>
</li>
<li className="">
<a className="text-on-primary-container hover:text-on-primary transition-colors hover:translate-x-0.5 inline-block" href="mailto:contact@openmarket.ma">Contactez-nous (Casablanca)</a>
</li>
</ul>
</div>

<div>
<h4 className="font-title-sm text-title-sm font-bold text-on-primary mb-4">Villes couvertes</h4>
<ul className="space-y-2.5 font-label-md text-label-md text-on-primary-container">
<li className="">Casablanca &amp; Bouskoura</li>
<li className="">Rabat, Salé &amp; Témara</li>
<li className="">Marrakech &amp; Palmier</li>
<li className="">Tanger &amp; Tétouan</li>
</ul>
</div>
</div>

<div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
<p className="font-body-sm text-body-sm text-on-primary-container">
          © 2026 OpenMarket Maroc - Première plateforme d'artisans certifiés CIN avec assurance responsabilité civile incluse. Tous droits réservés.
        </p>
<div className="flex items-center space-x-4 text-on-primary-container">
<span className="font-label-sm text-label-sm">Fait avec fierté au Maroc 🇲🇦</span>
</div>
</div>
</div>
</footer>
  )
}

export default Footer
