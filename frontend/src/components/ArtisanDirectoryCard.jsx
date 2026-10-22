function ArtisanDirectoryCard({ artisan, onQuote }) {
  return (
    <article className="artisan-directory-card">
      <span className={`artisan-ribbon ${artisan.ribbonTone}`}><span className="material-symbols-outlined">{artisan.ribbonIcon}</span>{artisan.ribbon}</span>
      <div className="artisan-avatar-column">
        <div className="artisan-avatar-wrap">
          <img src={artisan.image} alt={`Portrait de ${artisan.name}`} />
          <span className="artisan-rating"><span className="material-symbols-outlined">star</span>{artisan.rating}</span>
        </div>
        <small>{artisan.reviews}</small>
      </div>

      <div className="artisan-card-body">
        <div>
          <h3>{artisan.name}</h3>
          <p className="artisan-title">{artisan.title}</p>
          <div className="artisan-meta">
            <span><span className="material-symbols-outlined">location_on</span>{artisan.zone}</span>
            <span className={artisan.availabilityTone}><span className="material-symbols-outlined">{artisan.availabilityIcon}</span>{artisan.availability}</span>
          </div>
          <p className="artisan-description">{artisan.description}</p>
          <div className="artisan-tags">{artisan.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>

        <div className="artisan-card-footer">
          <div><small>Tarif indicatif</small><strong>À partir de {artisan.price} DH</strong></div>
          <div className="artisan-actions">
            <button className="profile-button" type="button">Voir profil</button>
            <button className="quote-button" type="button" onClick={() => onQuote(artisan.name)}>Demander un devis</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ArtisanDirectoryCard
