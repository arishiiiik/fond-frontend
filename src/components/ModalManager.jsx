import { useState } from 'react'
import api from '../services/api'

function DonationModal({ onClose }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value || '',
      amount: parseFloat(e.target.amount.value)
    }
    
    try {
      const response = await api.post('/donation-requests/', formData)
      
      if (response.status === 201) {
        alert('Спасибо! Ваша заявка принята.')
        onClose()
        e.target.reset()
      } else {
        alert('Ошибка: ' + JSON.stringify(response.data))
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Ошибка подключения к серверу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Сумма пожертвования (₽) *</label>
        <input type="number" name="amount" min="10" step="10" required />
      </div>
      <div className="form-group">
        <label>Ваше имя и фамилия *</label>
        <input type="text" name="name" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>Отмена</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </form>
  )
}

function PartnerModal({ onClose }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = {
      name: e.target.name.value,
      position: e.target.position.value,
      organization: e.target.organization.value,
      phone: e.target.phone.value,
      email: e.target.email.value
    }
    
    try {
      const response = await api.post('/partner-requests/', formData)
      
      if (response.status === 201) {
        alert('Заявка отправлена! Мы свяжемся с вами.')
        onClose()
        e.target.reset()
      } else {
        alert('Ошибка: ' + JSON.stringify(response.data))
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Ошибка подключения к серверу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Имя и фамилия *</label>
          <input type="text" name="name" required />
        </div>
        <div className="form-group">
          <label>Должность *</label>
          <input type="text" name="position" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Организация *</label>
          <input type="text" name="organization" required />
        </div>
        <div className="form-group">
          <label>Телефон *</label>
          <input type="tel" name="phone" required />
        </div>
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input type="email" name="email" required />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>Отмена</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </form>
  )
}

function VolunteerModal({ onClose }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = {
      name: e.target.name.value,
      age: parseInt(e.target.age.value),
      city: e.target.city.value,
      phone: e.target.phone.value,
      email: e.target.email.value
    }
    
    try {
      const response = await api.post('/volunteer-requests/', formData)
      
      if (response.status === 201) {
        alert('Заявка отправлена! Мы свяжемся с вами.')
        onClose()
        e.target.reset()
      } else {
        alert('Ошибка: ' + JSON.stringify(response.data))
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Ошибка подключения к серверу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Имя и фамилия *</label>
          <input type="text" name="name" required />
        </div>
        <div className="form-group">
          <label>Возраст *</label>
          <input type="number" name="age" min="14" max="100" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Город *</label>
          <input type="text" name="city" required />
        </div>
        <div className="form-group">
          <label>Телефон *</label>
          <input type="tel" name="phone" required />
        </div>
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input type="email" name="email" required />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>Отмена</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </form>
  )
}

function ModalManager({ modalType, isOpen, onClose }) {
  if (!isOpen) return null

  const renderModal = () => {
    switch (modalType) {
      case 'donation':
        return <DonationModal onClose={onClose} />
      case 'partner':
        return <PartnerModal onClose={onClose} />
      case 'volunteer':
        return <VolunteerModal onClose={onClose} />
      default:
        return null
    }
  }

  const titles = {
    donation: 'Поддержать фонд',
    partner: 'Стать партнёром',
    volunteer: 'Стать волонтёром'
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{titles[modalType]}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {renderModal()}
        </div>
      </div>
    </div>
  )
}

export default ModalManager