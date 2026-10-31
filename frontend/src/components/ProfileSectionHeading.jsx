function ProfileSectionHeading({ eyebrow, title, titleId, description, actions, children }) {
  return (
    <div className="profile-section-heading">
      <div>
        {eyebrow && <p className="profile-eyebrow">{eyebrow}</p>}
        <h2 id={titleId}>{title}</h2>
        {description && <p className="profile-section-description">{description}</p>}
      </div>
      {actions || children}
    </div>
  )
}

export default ProfileSectionHeading
