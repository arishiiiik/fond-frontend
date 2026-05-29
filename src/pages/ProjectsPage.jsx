import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroCarousel from '../components/HeroCarousel'
import ProjectCard from '../components/ProjectCard'
import { MEDIA_URL } from '../services/api'
import api from '../services/api'


function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                console.log('Загружено проектов:', response.data.length)
                setProjects(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Ошибка API:', err)
                setError('Не удалось загрузить проекты')
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div>
                <Header />
                <div style={{ textAlign: 'center', padding: '100px' }}>Загрузка проектов...</div>
                <Footer />
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <Header />
                <div style={{ textAlign: 'center', padding: '100px', color: 'red' }}>{error}</div>
                <Footer />
            </div>
        )
    }

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
                            key={project.id}  // ← КЛЮЧ ОБЯЗАТЕЛЬНО!
                            city={project.city}
                            title={project.title}
                            description={project.short_description}
                            status={project.status_display || project.status}
                            date={project.date}
                            image={project.image_url}  // ← передаем image_url из API
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