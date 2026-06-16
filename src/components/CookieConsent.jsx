import { useState, useEffect } from 'react'

function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'all')
    setVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <p>
          Мы используем файлы cookie для улучшения работы сайта. 
          Продолжая использовать сайт, вы соглашаетесь с 
          <a href="/privacy" target="_blank"> Политикой обработки персональных данных</a> 
          и использованием cookie-файлов.
        </p>
        <div className="cookie-buttons">
          <button onClick={acceptEssential} className="cookie-btn cookie-btn-secondary">
            Только необходимые
          </button>
          <button onClick={acceptAll} className="cookie-btn cookie-btn-primary">
            Принять все
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent