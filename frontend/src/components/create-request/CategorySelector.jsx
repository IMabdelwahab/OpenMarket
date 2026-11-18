import { requestCategories } from './requestOptions'
import RequestIcon from './RequestIcon'
import RequestSectionHeading from './RequestSectionHeading'

function CategorySelector({ category, subService, onCategoryChange, onSubServiceChange }) {
  const selectedCategory = requestCategories.find((item) => item.name === category)

  return (
    <section className="request-form-section" aria-labelledby="request-category-title">
      <RequestSectionHeading number="1" title="Catégorie du métier" detail="Obligatoire" />
      <h3 className="sr-only" id="request-category-title">Choisissez une catégorie</h3>
      <div className="request-category-grid">
        {requestCategories.map((item) => (
          <button
            className={`request-category-card${category === item.name ? ' is-selected' : ''}`}
            type="button"
            key={item.name}
            aria-pressed={category === item.name}
            onClick={() => onCategoryChange(item)}
          >
            {category === item.name && <RequestIcon className="category-selected-icon">check_circle</RequestIcon>}
            <span className="category-icon"><RequestIcon>{item.icon}</RequestIcon></span>
            <strong>{item.name}</strong>
            <small>{item.artisans}</small>
          </button>
        ))}
      </div>

      <div className="request-subservices">
        <span>Sous-service en {category} :</span>
        <div>
          {selectedCategory.services.map((service) => (
            <button
              className={subService === service ? 'is-selected' : ''}
              type="button"
              key={service}
              aria-pressed={subService === service}
              onClick={() => onSubServiceChange(service)}
            >
              {subService === service && <RequestIcon>check</RequestIcon>}
              {service}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySelector
