import '../../fond.css'
import HistoryItem from './HistoryItem'
import historyData from '../../data123/history'

function HistoryTimeline() {
  return (
    <div className="fond_history">
      <div className="zagolovok">
        <p className="zag_main">История фонда</p>
        <div className="line"></div>
        <p className="zag_description">Этапы становления и развития нашего фонда</p>
      </div>

      <div className="history_content">
        {/* Центральная линия */}
        <div className="history_line"></div>

        {historyData.map(item => (
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