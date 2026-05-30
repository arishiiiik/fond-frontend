import { useState, useEffect } from 'react'
import api from '../services/api'
import SmallProjectCard from './SmallProjectCard'

function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/projects/?status=active')
      .then(response => {
        setProjects(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Ошибка загрузки проектов:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="active_project">Загрузка...</div>

  return (
    <div className="active_project">
      <div className="zagolovok">
        <p className="zag_main">Активные проекты</p>
        <div className="line"></div>
        <p className="zag_description">
          Проекты, реализуемые прямо сейчас в различных районах <br />
          Вологодской области
        </p>
      </div>
      <div className="small-project_catalog">
        {projects.map(project => (
          <SmallProjectCard
            key={project.id}
            city={project.city}
            title={project.title}
            description={project.short_description}
            status={project.status_display || project.status}
            image={project.image}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsSection