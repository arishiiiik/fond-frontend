import { useModal as useModalContext } from '../context/ModalContext'

export const useModal = () => {
  const { openModal } = useModalContext()
  
  const openDonationModal = () => {
    openModal({
      type: 'donation',
      props: { title: 'Поддержать фонд', size: 'md' }
    })
  }
  
  const openPartnerModal = () => {
    openModal({
      type: 'partner',
      props: { title: 'Стать партнёром', size: 'lg' }
    })
  }
  
  const openVolunteerModal = () => {
    openModal({
      type: 'volunteer',
      props: { title: 'Стать волонтёром', size: 'lg' }
    })
  }
  
  return { openDonationModal, openPartnerModal, openVolunteerModal, openModal }
}