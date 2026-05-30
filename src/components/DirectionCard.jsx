import '../style.css'

function DirectionCard({ icon, title, description }) {
  const imageUrl = icon || null
  
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h2 className="card_zag">{title}</h2>
      <p className="card_description">{description}</p>
    </div>
  )
}

export default DirectionCard