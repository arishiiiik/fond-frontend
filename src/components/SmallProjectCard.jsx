import '../style.css'

function SmallProjectCard({ city, title, description, status, image, slug }) {
  // Формируем правильный URL для изображения
  const getImageUrl = () => {
    if (!image || image === 'null' || image === '') {
      return '/images/placeholder.jpg'
    }
    // Если путь относительный, добавляем базовый URL бэкенда
    if (image.startsWith('/media/')) {
      return `http://127.0.0.1:8000${image}`
    }
    return image
  }
  
  const imageUrl = getImageUrl()
  const fallbackImage = '/images/placeholder.jpg'
  
  const handleError = (e) => {
    console.log(`Не загрузилось: ${imageUrl}`)
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