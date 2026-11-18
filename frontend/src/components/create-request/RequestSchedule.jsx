import { timeSlots } from './requestOptions'
import RequestIcon from './RequestIcon'
import RequestSectionHeading from './RequestSectionHeading'

function getToday() {
  const date = new Date()
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 10)
}

function RequestSchedule({ urgent, date, timeSlot, onChange }) {
  return (
    <section className="request-schedule-section">
      <div className="request-schedule-heading">
        <RequestSectionHeading number="5" title="Délai d’intervention souhaité" />
        <span><RequestIcon>bolt</RequestIcon>Dépannage express</span>
      </div>
      <label className="request-urgency-card">
        <span className="urgency-icon"><RequestIcon>alarm_on</RequestIcon></span>
        <span className="urgency-copy">
          <strong>Intervention urgente (moins de 2 heures)</strong>
          <small>Votre demande sera proposée en priorité aux artisans disponibles à proximité.</small>
        </span>
        <input type="checkbox" role="switch" checked={urgent} onChange={(event) => onChange('urgent', event.target.checked)} aria-label="Demander une intervention urgente" />
      </label>
      {!urgent && (
        <div className="request-schedule-fields">
          <span>Choisir une intervention programmée :</span>
          <label>
            <span className="sr-only">Date souhaitée</span>
            <input type="date" value={date} min={getToday()} required={!urgent} onChange={(event) => onChange('date', event.target.value)} />
          </label>
          <label>
            <span className="sr-only">Créneau souhaité</span>
            <select value={timeSlot} onChange={(event) => onChange('timeSlot', event.target.value)}>
              {timeSlots.map((slot) => <option key={slot}>{slot}</option>)}
            </select>
          </label>
        </div>
      )}
    </section>
  )
}

export default RequestSchedule
