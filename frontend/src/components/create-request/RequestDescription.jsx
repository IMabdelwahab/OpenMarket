import RequestIcon from './RequestIcon'
import RequestSectionHeading from './RequestSectionHeading'

function RequestDescription({ value, onChange }) {
  return (
    <section className="request-form-section">
      <div className="request-description-heading">
        <RequestSectionHeading number="2" title="Description détaillée du besoin" detail="Obligatoire" />
        <span className="request-character-count">{value.length} / 600 caractères</span>
      </div>
      <label className="sr-only" htmlFor="request-description">Description détaillée du besoin</label>
      <textarea
        id="request-description"
        name="description"
        maxLength={600}
        minLength={20}
        required
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Précisez le problème, la pièce concernée, l'ancienneté des installations et l'accessibilité..."
      />
      <div className="request-tip">
        <RequestIcon>lightbulb</RequestIcon>
        <p><strong>Conseil OpenMarket :</strong> Ajoutez les détails qui aideront l’artisan à venir avec le matériel adapté. Par exemple, indiquez si l’eau est coupée ou si la fuite s’infiltre chez un voisin.</p>
      </div>
    </section>
  )
}

export default RequestDescription
