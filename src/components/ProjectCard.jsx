import { useModal } from '../context/ModalContext'

function HelpCard({ icon, title, description, buttonText, modalType }) {
  const { openDonationModal, openPartnerModal, openVolunteerModal } = useModal()
  
  const handleClick = () => {
    if (modalType === 'donation') openDonationModal()
    else if (modalType === 'partner') openPartnerModal()
    else if (modalType === 'volunteer') openVolunteerModal()
    else alert('Форма в разработке')
  }
  
  return (
    <div className="help_block">
      <img className="help_img" src={icon} alt={title} />
      <h2 className="help_zag">{title}</h2>
      <p className="help_description">{description}</p>
      <button className="help_button" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  )
}

export default HelpCard