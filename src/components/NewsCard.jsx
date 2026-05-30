import '../style.css'

function NewsCard({ date, title, description, image, link }) {
  const imageUrl = image || null
  
  return (
    <div className="new">
      {imageUrl && <img className="new_img" src={imageUrl} alt={title} />}
      <div className="text_new">
        <p className="new_date">{date}</p>
        <h2 className="new_zag">{title}</h2>
        <a 
          href={link} 
          className="new_description" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {description}
        </a>
      </div>
    </div>
  )
}

export default NewsCard