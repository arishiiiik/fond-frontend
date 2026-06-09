import '../style.css'

function SmallProjectCard({ city, title, description, status, slug }) {
  const imageUrl = `/images/project/${slug}.png`
  const fallbackImage = '/images/placeholder.jpg'
  
  const handleError = (e) => {
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