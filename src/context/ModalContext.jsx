import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [modalType, setModalType] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const openDonationModal = () => {
    setModalType('donation')
    setIsOpen(true)
  }

  const openPartnerModal = () => {
    setModalType('partner')
    setIsOpen(true)
  }

  const openVolunteerModal = () => {
    setModalType('volunteer')
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalType(null)
  }

  return (
    <ModalContext.Provider value={{
      modalType,
      isOpen,
      openDonationModal,
      openPartnerModal,
      openVolunteerModal,
      closeModal
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}