const quickFilters = [
  "Fuite d'eau urgente",
  'Débouchage canalisation',
  'Chauffe-eau électrique & gaz',
  'Robinetterie & Mitigeur',
  'Changement joint & siphon',
]

function DirectorySearch({ activeQuickFilter, onQuickFilterChange }) {
  return (
    <section className="directory-search-shell" aria-label="Recherche d'artisans">
      <div className="directory-container">
        <form className="directory-search-bar" onSubmit={(event) => event.preventDefault()}>
          <label className="directory-search-field">
            <span className="material-symbols-outlined">plumbing</span>
            <span><small>Spécialité demandée</small><strong>Plomberie &amp; Sanitaire</strong></span>
            <span className="material-symbols-outlined field-action">tune</span>
          </label>
          <span className="search-divider" />
          <label className="directory-search-field location-field">
            <span className="material-symbols-outlined">pin_drop</span>
            <span><small>Ville &amp; Secteur</small><strong>Casablanca (Tous quartiers)</strong></span>
            <span className="material-symbols-outlined field-action">keyboard_arrow_down</span>
          </label>
          <span className="search-divider" />
          <label className="directory-search-field">
            <span className="material-symbols-outlined">calendar_month</span>
            <span><small>Date d'intervention</small><strong>Dès aujourd'hui (Urgence ou RDV)</strong></span>
          </label>
          <button className="refresh-search" type="submit"><span className="material-symbols-outlined">search</span>Actualiser</button>
        </form>

        <div className="quick-filters">
          <span className="quick-label">Filtres fréquents :</span>
          {quickFilters.map((filter) => (
            <button className={activeQuickFilter === filter ? 'active' : ''} type="button" key={filter} onClick={() => onQuickFilterChange(filter)}>
              {filter === "Fuite d'eau urgente" && <span className="material-symbols-outlined">water_drop</span>}
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DirectorySearch
