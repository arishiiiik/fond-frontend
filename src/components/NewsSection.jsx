import { useState, useEffect } from 'react'
import api from '../services/api'
import '../style.css'
import NewsCard from './NewsCard'

function NewsSection() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/news/')
      .then(response => {
        console.log('News loaded:', response.data)
        setNews(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Ошибка загрузки новостей:', error)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU')
  }

  if (loading) {
    return (
      <div className="news">
        <div className="zagolovok">
          <p className="zag_main">Последние новости</p>
          <div className="line"></div>
          <p className="zag_description">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="news">
      <div className="zagolovok">
        <p className="zag_main">Последние новости</p>
        <div className="line"></div>
        <p className="zag_description">События и достижения фонда</p>
      </div>
      <div className="content_news">
        {news.map(item => (
          <NewsCard
            key={item.id}
            date={formatDate(item.date)}
            title={item.title}
            description={item.description}
            image={item.image_url}  // ← используем image_url из API
            link={item.link || '#'}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsSection