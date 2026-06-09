import '../style.css'

function ProjectCard({ city, title, description, status, date, slug }) {
  // Изображение ТОЛЬКО из статики, по slug
  const imageUrl = `/images/project/${slug}.png`
  const fallbackImage = '/images/placeholder.jpg'
  const statusClass = status === "Активный" ? "status-active" : "status-completed"
  
  const handleError = (e) => {
    e.target.src = fallbackImage
  }
  
  return (
    <div className="project">
      <img 
        className="project_img" 
        src={imageUrl} 
        alt={title}
        onError={handleError}
      />
      <div className="text_project">
        <p className="city">{city}</p>
        <h2 className="project_zag">{title}</h2>
        <p className="project_description">{description}</p>
        <p className={`date_project ${statusClass}`}>{date}</p>
        <div className="line_project"></div>
        <a className="button_detail" href={`/projects/${slug}`}>Подробнее</a>
      </div>
    </div>
  )
}

export default ProjectCard