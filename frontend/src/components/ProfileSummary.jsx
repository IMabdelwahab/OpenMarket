import ProfileIcon from './ProfileIcon'

function ProfileSummary({ name, memberLabel, badges, stats, className = '' }) {
  const initials = name.split(' ').map((part) => part[0]).join('')

  return (
    <section className={`profile-summary ${className}`.trim()} aria-label="Résumé du profil">
      <div className="profile-identity pt-6">
        <div className="profile-avatar" aria-hidden="true">{initials}</div>
        <div className="profile-identity-copy">
          <div className="profile-name-row">
            <h2>{name}</h2>
          </div>
          <div className="profile-badges">
            {badges.map((badge) => (
              <span key={badge.label}><ProfileIcon>{badge.icon}</ProfileIcon>{badge.label}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="profile-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}{stat.icon && <ProfileIcon>{stat.icon}</ProfileIcon>}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProfileSummary
 