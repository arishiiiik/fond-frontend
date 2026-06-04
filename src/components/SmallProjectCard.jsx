import '../style.css'

function SmallProjectCard({ city, title, description, status, image, slug }) {
  // Приоритет: 1. API image_url, 2. статика по slug, 3. заглушка
  const getImageUrl = () => {
    if (image && image !== 'null' && image !== '') {
      return image
    }
    // Пробуем загрузить из статики по slug
    return `/images/projects/${slug}.png`
  }
  
  const fallbackImage = '/images/placeholder.jpg'
  const imageUrl = getImageUrl()
  
  const handleError = (e) => {
    console.log(`Не загрузилось: ${imageUrl}, пробуем заглушку`)
    e.target.src = fallbackImage
  }
  
  return (
    <div className="small-project">
      <img 
        className="small-project_img" 
        src={imageUrl} 
        alt={title}
        onError={handleError}
      />
      <div className="small-project_text">
        <p className="small-project_city">{city}</p>
        <h2 className="small-project_title">{title}</h2>
        <p className="small-project_description">{description}</p>
        <p className="small-project_status">{status}</p>
        <div className="small-project_line"></div>
        <a className="small-project_button" href={`/projects/${slug}`}>Подробнее</a>
      </div>
    </div>
  )
}

export default SmallProjectCard