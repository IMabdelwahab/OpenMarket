import ProfileIcon from './ProfileIcon'

function ProfileSupport({
  eyebrow = 'UNE QUESTION ? ON EST LÀ POUR VOUS',
  title = 'Besoin d’aide sur une intervention ?',
  description = 'Notre équipe vous accompagne avant, pendant et après vos travaux, 7j/7.',
  contactHref = 'mailto:contact@openmarket.ma',
  contactLabel = 'Contacter le support',
}) {
  return (
    <aside className="profile-support">
      <div className="support-icon"><ProfileIcon>support_agent</ProfileIcon></div>
      <div className="support-copy">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <a href={contactHref}><ProfileIcon>mail</ProfileIcon>{contactLabel}</a>
    </aside>
  )
}

export default ProfileSupport
