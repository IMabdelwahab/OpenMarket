
function TrustPillars() {
  return (
    <div id="garanties" className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm">
        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-title-md" aria-hidden="true">task_alt</span>
        </div>
        <div>
          <p className="font-label-lg text-label-lg text-on-surface font-bold">+15 000 interventions</p>
          <p className="font-body-sm text-body-sm text-outline">Réalisées avec 98% de satisfaction</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm">
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary-container shrink-0">
          <span className="material-symbols-outlined text-title-md" aria-hidden="true" style={{"fontVariationSettings": "'FILL' 1"}}>badge</span>
        </div>
        <div>
          <p className="font-label-lg text-label-lg text-on-surface font-bold">100% Vérifiés &amp; Certifiés</p>
          <p className="font-body-sm text-body-sm text-outline">CIN validée &amp; casier judiciaire vierge</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm">
        <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
          <span className="material-symbols-outlined text-title-md" aria-hidden="true">security</span>
        </div>
        <div>
          <p className="font-label-lg text-label-lg text-on-surface font-bold">Garantie Satisfait ou Refait</p>
          <p className="font-body-sm text-body-sm text-outline">Couverture décennale &amp; AXA Assurances</p>
        </div>
      </div>
    </div>
  )
}

export default TrustPillars
