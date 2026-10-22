import ServiceCard from './ServiceCard'

const services = [
  {
    "icon": "water_drop",
    "title": "Plomberie",
    "description": "Fuites, chauffe-eau, sanitaires",
    "count": "84 artisans",
    "urgent": false
  },
  {
    "icon": "bolt",
    "title": "Électricité",
    "description": "Court-circuit, tableaux, prises",
    "count": "62 artisans",
    "urgent": false
  },
  {
    "icon": "cleaning_services",
    "title": "Ménage & Nettoyage",
    "description": "Fin de chantier, canapés, vitres",
    "count": "120 pros",
    "urgent": false
  },
  {
    "icon": "format_paint",
    "title": "Peinture & Rénovation",
    "description": "Tadellakt, stuc, enduits, murs",
    "count": "45 artisans",
    "urgent": false
  },
  {
    "icon": "mode_fan",
    "title": "Climatisation & Froid",
    "description": "Recharge gaz, pose split, filtres",
    "count": "38 artisans",
    "urgent": false
  },
  {
    "icon": "yard",
    "title": "Jardinage & Espaces verts",
    "description": "Élagage, arrosage automatique",
    "count": "29 artisans",
    "urgent": false
  },
  {
    "icon": "lock_open",
    "title": "Serrurerie & Urgences",
    "description": "Ouverture de porte, barillets",
    "count": "19 artisans (24/7)",
    "urgent": true
  },
  {
    "icon": "carpenter",
    "title": "Menuiserie & Montage",
    "description": "Cuisines, placards, volets roulants",
    "count": "31 artisans",
    "urgent": false
  }
]


function PopularServices({ search, onReset }) {
  return (
<section id="artisans" className="py-16 md:py-24 bg-surface-container-lowest border-t border-outline-variant">
<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
<div>
<span className="font-label-md text-label-md text-secondary-container uppercase tracking-wider font-bold block mb-1">Nos corps d'état</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">Services &amp; Métiers Populaires</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2 md:mt-0">
          Trouvez en quelques clics l'artisan spécialisé disponible dans votre quartier pour vos urgences ou projets d'aménagement.
        </p>
</div>

{search && (
  <div className="mb-6 flex flex-wrap items-center justify-between gap-4" role="status">
    <p className="text-body-md text-on-surface-variant">Métier : {search.category} · {search.location}{search.problem && ` · ${search.problem}`}</p>
    <button type="button" className="text-primary font-semibold underline underline-offset-4" onClick={onReset}>Voir tous les métiers</button>
  </div>
)}
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

{services.filter((service) => !search || service.title.startsWith(search.category.split(' ')[0])).map((service) => (
  <ServiceCard key={service.title} service={service} />
))}
</div>
</div>
</section>
  )
}

export default PopularServices
