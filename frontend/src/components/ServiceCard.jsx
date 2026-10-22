function ServiceCard({ service }) {
  return (
    <a className="group p-5 rounded-2xl border border-outline-variant bg-surface hover:bg-surface-container-low transition-all duration-200 hover:-translate-y-1 hover:shadow-md" href="#recherche" onClick={() => {
      const field = document.getElementById('search-category')
      const option = [...field.options].find((option) => option.text.startsWith(service.title.split(' &')[0]))
      if (option) field.value = option.value
      field.focus({ preventScroll: true })
    }}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${service.urgent ? 'bg-secondary-fixed text-secondary group-hover:bg-secondary group-hover:text-on-secondary' : 'bg-primary-fixed text-primary group-hover:bg-primary group-hover:text-on-primary'}`}>
        <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">{service.icon}</span>
      </div>
      <h3 className="font-title-sm text-title-sm text-on-surface font-bold group-hover:text-primary transition-colors">{service.title}</h3>
      <p className="font-body-sm text-body-sm text-outline mt-1 mb-3">{service.description}</p>
      <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
        <span className={`font-label-sm text-label-sm font-semibold ${service.urgent ? 'text-secondary' : 'text-tertiary-container'}`}>{service.count}</span>
        <span className="material-symbols-outlined text-outline text-label-md group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
      </div>
    </a>
  )
}

export default ServiceCard
