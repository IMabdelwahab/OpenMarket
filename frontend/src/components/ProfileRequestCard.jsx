import ProfileIcon from './ProfileIcon'

function ProfileRequestCard({ request }) {
  const isActive = request.status === 'En cours'
  const initials = request.artisan.split(' ').map((part) => part[0]).join('')

  return (
    <article className={`profile-request-card${isActive ? ' is-active' : ''}`}>
      {isActive && <span className="request-accent" />}
      <div className="request-card-top">
        <div className="request-heading">
          <div className="request-meta">
            <span className={`request-status${isActive ? ' status-active' : ' status-complete'}`}>
              <ProfileIcon>{request.statusIcon}</ProfileIcon>
              {request.status}
            </span>
            <span className="request-id">Demande n° {request.id}</span>
          </div>
          <h3>{request.title}</h3>
          <div className="request-details">
            <span><ProfileIcon>category</ProfileIcon>{request.category}</span>
            <span><ProfileIcon>location_on</ProfileIcon>{request.location}</span>
            <span><ProfileIcon>calendar_today</ProfileIcon>{request.date}</span>
          </div>
        </div>
        <div className="request-price">
          <span>{isActive ? 'Devis validé' : 'Montant réglé'}</span>
          <strong>{request.price}</strong>
        </div>
      </div>
      <div className="request-card-bottom">
        <p><span className="artisan-initials">{initials}</span>
          <span><strong>{request.artisan}</strong><small>Artisan OpenMarket vérifié</small></span>
        </p>
        <span className="request-description">{request.description}</span>
        <button type="button" className="profile-button profile-button-secondary">
          <ProfileIcon>{isActive ? 'chat' : 'receipt_long'}</ProfileIcon>
          {isActive ? 'Contacter' : 'Voir le détail'}
        </button>
      </div>
    </article>
  )
}

export default ProfileRequestCard
