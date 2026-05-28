import '../style.css'
import { MEDIA_URL } from '../services/api'

function ProjectCard({ city, title, description, status, date, image, slug }) {
  const imageUrl = image ? `${MEDIA_URL}${image}` : '/images/project/default.png';
  
  // Определяем цвет статуса
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