import '../style.css'

function SmallProjectCard({ city, title, description, status, image, slug }) {
  // Берём изображение ТОЛЬКО из API
  const imageUrl = image && image !== 'null' && image !== '' 
    ? image 
    : '/images/placeholder.jpg'  // только заглушка, без попыток угадать slug
  
  const handleError = (e) => {
    console.log(`Не загрузилось: ${imageUrl}`)
    e.target.src = '/images/placeholder.jpg'
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