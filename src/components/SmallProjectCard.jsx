import '../style.css'

function SmallProjectCard({ city, title, description, status, image, slug }) {
  const imageUrl = image || 'https://placehold.co/400x300/e2e8f0/825B2C?text=%D0%9D%D0%B5%D1%82+%D1%84%D0%BE%D1%82%D0%BE'
  return (
    <div className="small-project">
      <img className="small-project_img" src={image} alt={title} />
      <div className="small-project_text">
        <p className="small-project_city">{city}</p>
        <h2 className="small-project_title">{title}</h2>
        <p className="small-project_description">{description}</p>
        <p className="small-project_status">{status}</p>
        <div className="small-project_line"></div>
        <a className="small-project_button" href={`/projects/${slug}`}>Подробнее</a>
      </div>
    </div>
  )
}

export default SmallProjectCard