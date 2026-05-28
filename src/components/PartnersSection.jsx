import { useState, useEffect } from 'react'
import api, { MEDIA_URL } from '../services/api'
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

  const firstRow = partners.slice(0, 3)
  const secondRow = partners.slice(3, 5)
  const thirdRow = partners.slice(5, 8)

  return (
    <div className="partner_fond">
      <div className="zagolovok">
        <p className="zag_main">Наши партнёры</p>
        <div className="line"></div>
        <p className="zag_description">Совместными усилиями мы достигаем большего</p>
      </div>
      
      <div className="content_partner">
        {firstRow.map(partner => (
          <div key={partner.id} className="partner">
            {partner.logo_url && (
              <img 
                className="patner_img" 
                src={`${MEDIA_URL}${partner.logo_url}`} 
                alt={partner.name} 
              />
            )}
            <a className="partner_name" href={partner.link} target="_blank" rel="noopener noreferrer">
              {partner.name}
            </a>
          </div>
        ))}
      </div>
      
      {secondRow.length > 0 && (
        <div className="content_partner">
          {secondRow.map(partner => (
            <div key={partner.id} className="partner_long">
              <a className="partner_name" href={partner.link} target="_blank" rel="noopener noreferrer">
                {partner.name}
              </a>
            </div>
          ))}
        </div>
      )}
      
      {thirdRow.length > 0 && (
        <div className="content_partner">
          {thirdRow.map(partner => (
            <div key={partner.id} className="partner">
              {partner.logo_url && (
                <img 
                  className="patner_img" 
                  src={`${MEDIA_URL}${partner.logo_url}`} 
                  alt={partner.name} 
                />
              )}
              <a className="partner_name" href={partner.link} target="_blank" rel="noopener noreferrer">
                {partner.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PartnersSection