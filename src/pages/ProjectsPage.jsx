import { useState, useEffect } from 'react'
import api from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroCarousel from '../components/HeroCarousel'
import ProjectCard from '../components/ProjectCard'

function ProjectsPage() {
    const [allProjects, setAllProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeFilter, setActiveFilter] = useState('all')

    useEffect(() => {
        api.get('/projects/')
            .then(response => {
                setAllProjects(response.data)
                setFilteredProjects(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Ошибка API:', err)
                setError('Не удалось загрузить проекты')
                setLoading(false)
            })
    }, [])

    const filterProjects = (filter) => {
        setActiveFilter(filter)
        
        if (filter === 'all') {
            setFilteredProjects(allProjects)
        } else if (filter === 'active') {
            const active = allProjects.filter(p => p.status === 'active' || p.status_display === 'Активный')
            setFilteredProjects(active)
        } else if (filter === 'completed') {
            const completed = allProjects.filter(p => p.status === 'completed' || p.status_display === 'Завершён')
            setFilteredProjects(completed)
        }
    }

    const getCount = (status) => {
        if (status === 'all') return allProjects.length
        if (status === 'active') return allProjects.filter(p => p.status === 'active' || p.status_display === 'Активный').length
        if (status === 'completed') return allProjects.filter(p => p.status === 'completed' || p.status_display === 'Завершён').length
        return 0
    }

    if (loading) return <div><Header /><div style={{ textAlign: 'center', padding: '100px' }}>Загрузка...</div><Footer /></div>
    if (error) return <div><Header /><div style={{ textAlign: 'center', padding: '100px' }}>{error}</div><Footer /></div>

    return (
        <div>
            <Header />
            <HeroCarousel />
            <main>
                <div className="zagolovok">
                    <p className="zag_main">Проекты</p>
                    <div className="line"></div>
                    <p className="zag_description">
                        Всего {allProjects.length} проектов, реализуемых в населенных пунктах <br />
                        Вологодской области
                    </p>
                </div>

                <div className="projects-filters">
                    <button 
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => filterProjects('all')}
                    >
                        Все <span className="count">{getCount('all')}</span>
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
                        onClick={() => filterProjects('active')}
                    >
                        Активные <span className="count">{getCount('active')}</span>
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
                        onClick={() => filterProjects('completed')}
                    >
                        Завершённые <span className="count">{getCount('completed')}</span>
                    </button>
                </div>

                {filteredProjects.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#825B2C' }}>
                        <p>Проекты не найдены</p>
                    </div>
                ) : (
                    <div className="project_catalog">
                        {filteredProjects.map(project => (
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
                )}
            </main>
            <Footer />
        </div>
    )
}

export default ProjectsPage