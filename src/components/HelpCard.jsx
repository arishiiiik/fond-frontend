import { useModal } from '../context/ModalContext'
import { MEDIA_URL } from '../services/api'

function HelpCard({ icon, title, description, buttonText, modalType }) {
  const { openDonationModal, openPartnerModal, openVolunteerModal } = useModal()
  const imageUrl = icon ? `${MEDIA_URL}${icon}` : null

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

export default HelpCard   // ← ЭТА СТРОЧКА ОБЯЗАТЕЛЬНА