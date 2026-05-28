import '../../fond.css'

function HistoryItem({ year, title, description, side }) {
  return (
    <div className="history_item">
      <div className="history_year_circle">
        <div className="circle">{year}</div>
      </div>
      <div className={`history_info ${side}`}>
        <div className="info_content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryItem