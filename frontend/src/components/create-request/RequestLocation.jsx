import { requestCities } from './requestOptions'
import RequestIcon from './RequestIcon'
import RequestSectionHeading from './RequestSectionHeading'

function RequestLocation({ values, onChange, onNotice }) {
  return (
    <section className="request-form-section">
      <div className="request-location-heading">
        <RequestSectionHeading number="4" title="Localisation exacte de l’intervention" detail="Adresse confidentielle" />
        <span><RequestIcon>lock</RequestIcon>Adresse partagée après acceptation du devis</span>
      </div>
      <div className="request-location-grid">
        <label className="request-field">
          Ville
          <select value={values.city} onChange={(event) => onChange('city', event.target.value)} required>
            {requestCities.map((city) => <option key={city}>{city}</option>)}
          </select>
        </label>
        <label className="request-field">
          Adresse &amp; quartier
          <span className="request-input-with-icon">
            <RequestIcon>location_on</RequestIcon>
            <input
              value={values.address}
              onChange={(event) => onChange('address', event.target.value)}
              placeholder="Ex. Boulevard d’Anfa, quartier Gauthier"
              maxLength={200}
              required
            />
          </span>
        </label>
        <label className="request-field">
          Étage / numéro d’appartement
          <input value={values.floor} onChange={(event) => onChange('floor', event.target.value)} placeholder="Ex. 3e étage, appartement 12" maxLength={150} />
        </label>
        <fieldset className="request-access-options">
          <legend>Accès &amp; commodités</legend>
          <label><input type="checkbox" checked={values.elevator} onChange={(event) => onChange('elevator', event.target.checked)} />Ascenseur fonctionnel</label>
          <label><input type="checkbox" checked={values.parking} onChange={(event) => onChange('parking', event.target.checked)} />Stationnement facile</label>
        </fieldset>
      </div>

      <div className="request-map-card" aria-label={`Aperçu de la zone d’intervention à ${values.city}`}>
        <div className="request-map-art">
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-road road-three" />
          <div className="map-road road-four" />
          <div className="map-block block-one" />
          <div className="map-block block-two" />
          <div className="map-block block-three" />
          <div className="map-block block-four" />
          <div className="map-pin"><span><RequestIcon>home_pin</RequestIcon>{values.address.split(',').at(-1)?.trim() || values.city}</span><i /></div>
        </div>
        <div className="request-map-caption">
          <span><RequestIcon>check_circle</RequestIcon>Zone couverte par nos artisans partenaires</span>
          <button type="button" onClick={() => {
            document.querySelector('.request-input-with-icon input')?.focus()
            onNotice('Renseignez votre adresse et votre quartier pour préciser la zone.')
          }}>Ajuster l’adresse</button>
        </div>
      </div>
    </section>
  )
}

export default RequestLocation
