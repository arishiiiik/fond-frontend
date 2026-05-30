import '../style.css'

function ProjectCard({ city, title, description, status, date, image, slug }) {
  const imageUrl = image || 'https://placehold.co/400x300/e2e8f0/825B2C?text=%D0%9D%D0%B5%D1%82+%D1%84%D0%BE%D1%82%D0%BE'
  const statusClass = status === "Активный" ? "status-active" : "status-completed"
  
  return (
    <div className="project">
      <img className="project_img" src={imageUrl} alt={title} />
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