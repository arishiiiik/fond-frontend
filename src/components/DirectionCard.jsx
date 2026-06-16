import '../style.css'

function DirectionCard({ icon, title, description }) {
  // Если icon начинается с /media/, добавляем базовый URL бэкенда
  const getImageUrl = () => {
    if (!icon) return null
    if (icon.startsWith('/media/')) {
      return `http://159.194.229.53${icon}`
    }
    return icon
  }
  
  const imageUrl = getImageUrl()
  
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h2 className="card_zag">{title}</h2>
      <p className="card_description">{description}</p>
    </div>
  )
}

export default DirectionCard