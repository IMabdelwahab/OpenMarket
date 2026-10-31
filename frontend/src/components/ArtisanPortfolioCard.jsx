import ProfileIcon from './ProfileIcon'

function ArtisanPortfolioCard({ project }) {
  return (
    <article className="artisan-portfolio-card">
      <div className={`portfolio-visual ${project.visualClass}`}>
        <ProfileIcon>{project.icon}</ProfileIcon>
        <span className="portfolio-certified"><ProfileIcon>verified</ProfileIcon>Certifié</span>
      </div>
      <div className="portfolio-card-copy">
        <span className="portfolio-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div><span>Durée : {project.duration}</span><strong>{project.price}</strong></div>
      </div>
    </article>
  )
}

export default ArtisanPortfolioCard
