import { useState, useEffect } from 'react'
import api from '../../services/api'
import '../../fond.css'
import HistoryItem from './HistoryItem'

function HistoryTimeline() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/history/')
      .then(response => {
        setHistory(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Ошибка загрузки истории:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="fond_history"><div className="zagolovok"><p>Загрузка...</p></div></div>

  return (
    <div className="fond_history">
      <div className="zagolovok">
        <p className="zag_main">История фонда</p>
        <div className="line"></div>
        <p className="zag_description">Этапы становления и развития нашего фонда</p>
      </div>

      <div className="history_content">
        <div className="history_line"></div>
        {history.map(item => (
          <HistoryItem
            key={item.id}
            year={item.year}
            title={item.title}
            description={item.description}
            side={item.side}
          />
        ))}
      </div>
    </div>
  )
}

export default HistoryTimeline