import { useState, useEffect } from 'react'
import api from '../services/api'  // ← импортируем api
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroCarousel from '../components/HeroCarousel'
import ProjectCard from '../components/ProjectCard'

function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        api.get('/projects/')  // ← используем api, а не axios
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

    // остальной код без изменений...
}