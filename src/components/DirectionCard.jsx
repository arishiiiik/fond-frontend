import '../style.css'
import { MEDIA_URL } from '../services/api'

function DirectionCard({ icon, title, description }) {
  // Полный URL для изображения
  const imageUrl = icon ? `${MEDIA_URL}${icon}` : null;
  
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h2 className="card_zag">{title}</h2>
      <p className="card_description">{description}</p>
    </div>
  )
}

export default DirectionCard