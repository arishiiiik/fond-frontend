import { useState, useEffect } from 'react'
import api from '../services/api'
import '../style.css'
import DirectionCard from './DirectionCard'

function DirectionsSection() {
  const [directions, setDirections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/directions/')
      .then(response => {
        console.log('Directions loaded:', response.data)
        setDirections(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Ошибка загрузки направлений:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="content_work">
        <div className="zagolovok">
          <p className="zag_main">Ключевые направления работы</p>
          <div className="line"></div>
          <p className="zag_description">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="content_work">
      <div className="zagolovok">
        <p className="zag_main">Ключевые направления работы</p>
        <div className="line"></div>
        <p className="zag_description">
          Мы фокусируемся на комплексном развитии территорий через <br />
          несколько взаимосвязанных направлений
        </p>
      </div>
      <div className="cards_work">
        {directions.map(direction => (
          <DirectionCard
            key={direction.id}
            icon={direction.icon} 
            title={direction.title}
            description={direction.description}
          />
        ))}
      </div>
    </div>
  )
}

export default DirectionsSection