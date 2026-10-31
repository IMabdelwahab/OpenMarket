import ProfileIcon from './ProfileIcon'

function ProfileReviewCard({ review }) {
  const initials = review.artisan.split(' ').map((part) => part[0]).join('')

  return (
    <article className="profile-review-card">
      <div className="review-avatar" aria-hidden="true">{initials}</div>
      <div className="review-copy">
        <div className="review-title-row">
          <div><h3>{review.artisan}</h3><span>{review.trade} · {review.date}</span></div>
          <div className="review-stars" aria-label={`${review.rating} étoiles sur 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <ProfileIcon className={index < review.rating ? 'is-filled' : ''} key={index}>star</ProfileIcon>
            ))}
          </div>
        </div>
        <p>“{review.text}”</p>
      </div>
    </article>
  )
}

export default ProfileReviewCard
