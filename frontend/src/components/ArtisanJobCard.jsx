import ProfileIcon from './ProfileIcon'

function ArtisanJobCard({ job, onComplete }) {
  return (
    <article className={`artisan-job-card${job.today ? ' is-today' : ''}`}>
      <div className="artisan-job-heading">
        <div className="artisan-job-title">
          <span className="artisan-job-icon"><ProfileIcon>{job.icon}</ProfileIcon></span>
          <div><span className={job.today ? 'job-time is-today' : 'job-time'}>{job.time}</span><h3>{job.title}</h3></div>
        </div>
        <div className="artisan-job-state"><span>{job.status}</span><strong>{job.price}</strong></div>
      </div>
      <div className="artisan-job-details">
        <span><ProfileIcon>person</ProfileIcon>Client : <strong>{job.client}</strong></span>
        <span><ProfileIcon>location_on</ProfileIcon>{job.location}</span>
      </div>
      <div className="artisan-job-footer">
        {job.today
          ? <a href={`tel:${job.phone}`}><ProfileIcon>call</ProfileIcon>Appeler le client</a>
          : <span className="job-escrow"><ProfileIcon>lock</ProfileIcon>Acompte consigné</span>}
        <button onClick={() => onComplete(job.id)} type="button">
          <ProfileIcon>{job.today ? 'task_alt' : 'receipt_long'}</ProfileIcon>
          {job.today ? 'Déclarer fin de travaux' : 'Voir le devis'}
        </button>
      </div>
    </article>
  )
}

export default ArtisanJobCard
