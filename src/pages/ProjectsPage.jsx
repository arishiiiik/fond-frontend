import { useState, useEffect } from 'react'
import api from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroCarousel from '../components/HeroCarousel'
import ProjectCard from '../components/ProjectCard'

function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        api.get('/projects/')
            .then(response => {
                setProjects(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Ошибка API:', err)
                setError('Не удалось загрузить проекты')
                setLoading(false)
            })
    }, [])

    if (loading) return <div><Header /><div>Загрузка...</div><Footer /></div>
    if (error) return <div><Header /><div>{error}</div><Footer /></div>

    return (
        <div>
            <Header />
            <HeroCarousel />
            <main>
                <div className="zagolovok">
                    <p className="zag_main">Проекты</p>
                    <div className="line"></div>
                    <p className="zag_description">
                        Всего {projects.length} проектов, реализуемых в населенных пунктах <br />
                        Вологодской области
                    </p>
                </div>
                <div className="project_catalog">
                    {projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            city={project.city}
                            title={project.title}
                            description={project.short_description}
                            status={project.status_display || project.status}
                            date={project.date}
                            image={project.image_url}
                            slug={project.slug}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ProjectsPage