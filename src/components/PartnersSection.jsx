import { useState, useEffect } from 'react'
import api from '../services/api'  // ← убрали MEDIA_URL
import '../style.css'

function PartnersSection() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/partners/')
      .then(response => {
        setPartners(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Ошибка загрузки партнеров:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return null
  if (partners.length === 0) return null

  return (
    <div className="partner_fond">
      <div className="zagolovok">
        <p className="zag_main">Наши партнёры</p>
        <div className="line"></div>
        <p className="zag_description">Совместными усилиями мы достигаем большего</p>
      </div>
      
      <div className="content_partner">
        {partners.map(partner => (
          <div key={partner.id} className="partner">
            {partner.logo && (
              <img className="patner_img" src={partner.logo} alt={partner.name} />
            )}
            <a className="partner_name" href={partner.link} target="_blank" rel="noopener noreferrer">
              {partner.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PartnersSection