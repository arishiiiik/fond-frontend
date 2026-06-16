import { useState } from 'react'
import api from '../services/api'

function DonationModal({ onClose }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <>
      <div className="details-block">
        <p><strong>Банковские реквизиты:</strong></p>
        <p><strong>Получатель:</strong> Кудряшова Марина Валериевна</p>
        <p><strong>ИНН/КПП:</strong> 3525300881 / 352501001</p>
        <p><strong>Расчетный счет:</strong> 40703810612000001360</p>
        <p><strong>Банк:</strong> Отделение №8638 ПАО «Сбербанк России» г. Вологда</p>
        <p><strong>БИК:</strong> 041909644</p>
        <p><strong>Корр. счет:</strong> 30101810900000000644</p>
        <p><strong>Назначение платежа:</strong> Благотворительное пожертвование</p>
      </div>
      
      <div className="details-block">
        <p><strong>Контактная информация:</strong></p>
        <p><strong>Адрес:</strong> 160035, г. Вологда, Советский проспект, 35А</p>
        <p><strong>Телефон:</strong> (8172) 56-20-69</p>
        <p><strong>E-mail:</strong> fond.rgs35@yandex.ru</p>
        <p><strong>Директор:</strong> Кудряшова Марина Валериевна</p>
      </div>
      
      <div className="qr-block">
        <img 
          src="/images/qr-code.png" 
          alt="QR-код" 
          style={{ width: '120px', height: '120px' }}
          onError={(e) => e.target.style.display = 'none'}
        />
        <p>Отсканируйте QR-код для быстрого перевода</p>
      </div>
      
      <div className="modal-note">
        Спасибо за вашу поддержку!
      </div>
      
      <div style={{ margin: '20px 0 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <input 
            type="checkbox" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)} 
            required 
          />
          <span>
            Я ознакомлен с <a href="/privacy" target="_blank" style={{ color: '#419037' }}>Политикой конфиденциальности</a>
          </span>
        </label>
      </div>
      
      <div className="modal-footer">
        <button className="btn-secondary" onClick={onClose}>Закрыть</button>
      </div>
    </>
  )
}

function PartnerModal({ onClose }) {
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreed) {
      alert('Пожалуйста, подтвердите согласие на обработку персональных данных')
      return
    }
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
        alert('Заявка отправлена! Наш менеджер свяжется с вами.')
        onClose()
        e.target.reset()
        setAgreed(false)
      }
    } catch (error) {
      alert('Ошибка. Пожалуйста, попробуйте позже.')
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

      <div style={{ margin: '16px 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
          />
          <span>
            Я даю согласие на обработку персональных данных в соответствии с
            <a href="/privacy" target="_blank" style={{ color: '#419037' }}> Политикой конфиденциальности</a>
          </span>
        </label>
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
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreed) {
      alert('Пожалуйста, подтвердите согласие на обработку персональных данных')
      return
    }
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
        setAgreed(false)
      }
    } catch (error) {
      alert('Ошибка. Пожалуйста, попробуйте позже.')
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

      <div style={{ margin: '16px 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
          />
          <span>
            Я даю согласие на обработку персональных данных в соответствии с
            <a href="/privacy" target="_blank" style={{ color: '#419037' }}> Политикой конфиденциальности</a>
          </span>
        </label>
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