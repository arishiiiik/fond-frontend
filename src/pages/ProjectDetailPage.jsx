import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProject } from '../services/api'
import '../style.css'
import '../project_description.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function ProjectDetailPage() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProject(slug)
            .then(response => {
                setProject(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigate('/404')
            })
    }, [slug, navigate])

    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Загрузка...</div>
    if (!project) return null

    return (
        <div>
            <Header />
            <main>
                <div className="zagolovok">
                    <p className="zag_main">{project.title}</p>
                    <div className="line"></div>
                </div>

                <div className="project_content">
                    <div className="project_descr">
                        <p className="pd_text">{project.full_description || project.short_description}</p>
                        <img className="pd_img" src={project.image_url || '/images/project/default.png'} alt={project.title} />
                    </div>

                    <div className="zagolovok">
                        <p className="zag_main">Цели и задачи</p>
                        <div className="line"></div>
                    </div>

                    <div className="purpose_project">
                        <div className="text_purpose">
                            <div className="purpose">
                                <h2>Цели:</h2>
                                <p>{project.goal || 'Информация уточняется'}</p>
                            </div>
                            <div className="purpose">
                                <h2>Обзор проекта:</h2>
                                <p>{project.full_description || project.short_description}</p>
                            </div>
                        </div>

                        <div className="project_short2">
                            <div className="project_inf2">
                                <img src="/images/project/location.png" alt="Локация" />
                                <div className="text_project_info">
                                    <p>Локация</p>
                                    <h2>{project.city}</h2>
                                </div>
                            </div>
                            <div className="project_inf2">
                                <img src="/images/project/date.png" alt="Сроки" />
                                <div className="text_project_info">
                                    <p>Сроки</p>
                                    <h2>{project.date}</h2>
                                </div>
                            </div>
                            <div className="project_inf2">
                                <img src="/images/project/people.png" alt="Участники" />
                                <div className="text_project_info">
                                    <p>Бенефициары</p>
                                    <h2>{project.beneficiaries || 'информация уточняется'}</h2>
                                </div>
                            </div>
                            <div className="project_inf2">
                                <img src="/images/project/status.png" alt="Статус" />
                                <div className="text_project_info">
                                    <p>Статус</p>
                                    <h2>{project.status_display || project.status}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ProjectDetailPage