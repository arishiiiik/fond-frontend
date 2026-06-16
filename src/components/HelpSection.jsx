import { useState, useEffect } from 'react'
import api from '../services/api'
import '../style.css'
import HelpCard from './HelpCard'

function HelpSection() {
  const [helpCards, setHelpCards] = useState([])
  const [helpSection, setHelpSection] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/help-cards/'),
      api.get('/help-section/')
    ])
      .then(([cardsRes, sectionRes]) => {
        console.log('HelpCards loaded:', cardsRes.data)
        setHelpCards(cardsRes.data)
        setHelpSection(sectionRes.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Ошибка загрузки:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="help_fond">
        <div className="zagolovok">
          <p className="zag_main">Как помочь фонду?</p>
          <div className="line"></div>
          <p className="zag_description">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="help_fond">
      <div className="zagolovok">
        <p className="zag_main">{helpSection.title || "Как помочь фонду?"}</p>
        <div className="line"></div>
        <p className="zag_description">
          {helpSection.description || "Вы можете внести вклад в развитие малых городов и сёл Вологодской области"}
        </p>
      </div>
      <div className="help_content">
        {helpCards.map(card => (
          <HelpCard
            key={card.id}
            icon={card.icon_url}  // ← используем icon_url из API
            title={card.title}
            description={card.description}
            buttonText={card.button_text}
            modalType={card.button_type}
          />
        ))}
      </div>
    </div>
  )
}

export default HelpSection