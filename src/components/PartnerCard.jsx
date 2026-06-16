import '../style.css'

function PartnerCard({ partner }) {
  // Исправлено: parther -> partner
  const className = partner.type === 'long' ? 'partner_long' : 'partner'
  
  // Формируем правильный URL для логотипа
  const getLogoUrl = () => {
    if (!partner.logo) return null
    // Используем logo_url, если есть
    const logoUrl = partner.logo_url || partner.logo
    if (logoUrl.startsWith('/media/')) {
      return `http://159.194.229.53${logoUrl}`
    }
    return logoUrl
  }
  
  const logoUrl = getLogoUrl()
  
  return (
    <div className={className}>
      {logoUrl && (
        <img 
          className='partner_img' 
          src={logoUrl} 
          alt={partner.name} 
        />
      )}
      <a 
        className='partner_name' 
        href={partner.link}  // Исправлено: partner.url -> partner.link
        target='_blank' 
        rel='noopener noreferrer'
      >
        {partner.name}
      </a>
    </div>
  )
}

export default PartnerCard