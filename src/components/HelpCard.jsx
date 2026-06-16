import { useModal } from '../context/ModalContext'

function HelpCard({ icon, title, description, buttonText, modalType }) {
  const { openDonationModal, openPartnerModal, openVolunteerModal } = useModal()
  
  // Формируем правильный URL для иконки
  const getImageUrl = () => {
    if (!icon) return null
    if (icon.startsWith('/media/')) {
      return `http://159.194.229.53${icon}`
    }
    return icon
  }
  
  const imageUrl = getImageUrl()
  
  const handleClick = () => {
    if (modalType === 'donation') openDonationModal()
    else if (modalType === 'partner') openPartnerModal()
    else if (modalType === 'volunteer') openVolunteerModal()
    else alert('Форма в разработке')
  }
  
  return (
    <div className="help_block">
      {imageUrl && <img className="help_img" src={imageUrl} alt={title} />}
      <h2 className="help_zag">{title}</h2>
      <p className="help_description">{description}</p>
      <button className="help_button" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  )
}

export default HelpCard