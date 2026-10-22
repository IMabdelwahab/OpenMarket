const specialties = [
  ["Fuite d'eau & recherche", 29],
  ['Débouchage canalisation', 24],
  ['Chauffe-eau & Chaudière', 18],
  ['Remplacement robinetterie', 33],
  ['Installation sanitaire complète', 12],
]

const districts = ['Maarif', 'Racine', 'Bourgogne', 'Gauthier', 'Ain Sebaa', 'Oulfa', 'Californie', 'Anfa']

function DirectoryFilters({ budget, onBudgetChange, onReset }) {
  return (
    <aside className="directory-filters">
      <form onSubmit={(event) => event.preventDefault()} onReset={onReset}>
      <div className="filter-heading">
        <h2><span className="material-symbols-outlined">tune</span>Filtres détaillés</h2>
        <button type="reset">Réinitialiser</button>
      </div>

      <fieldset className="filter-group">
        <legend>Sous-spécialités <span className="material-symbols-outlined">keyboard_arrow_up</span></legend>
        {specialties.map(([label, count], index) => (
          <label className="filter-option" key={label}><input type="checkbox" defaultChecked={index < 2} /><span>{label}</span><small>{count}</small></label>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Quartier d'intervention <span className="material-symbols-outlined">keyboard_arrow_up</span></legend>
        <div className="district-grid">
          {districts.map((district, index) => <label key={district}><input type="checkbox" defaultChecked={index < 4} /><span>{district}</span></label>)}
        </div>
      </fieldset>

      <fieldset className="trust-filter-group">
        <legend><span className="material-symbols-outlined">verified_user</span>Critères de confiance</legend>
        <label><input type="checkbox" defaultChecked /><span><strong>Artisan vérifié CIN</strong><small>Identité nationale validée</small></span></label>
        <label><input type="checkbox" defaultChecked /><span><strong>Assuré Responsabilité Civile</strong><small>Garantie partenaire incluse</small></span></label>
        <label className="emergency-filter"><input type="checkbox" /><span><strong>Disponible urgence 24/7</strong><small>Arrivée en moins d'une heure</small></span></label>
      </fieldset>

      <fieldset className="filter-group rating-group">
        <legend>Note des clients</legend>
        <label><input name="rating" type="radio" defaultChecked /><span><b>4.5 ★</b> et plus <small>(Excellence recommandée)</small></span></label>
        <label><input name="rating" type="radio" /><span><b>4.0 ★</b> et plus <small>(Très bien noté)</small></span></label>
      </fieldset>

      <div className="filter-group budget-group">
        <div><strong>Budget indicatif</strong><b>100 - {budget} DH</b></div>
        <input aria-label="Budget maximal" type="range" min="100" max="800" step="50" value={budget} onChange={(event) => onBudgetChange(event.target.value)} />
        <p><span>100 DH</span><span>400 DH</span><span>800+ DH</span></p>
      </div>

      <button className="apply-filters" type="button">Appliquer les filtres (48)</button>
      </form>
    </aside>
  )
}

export default DirectoryFilters
