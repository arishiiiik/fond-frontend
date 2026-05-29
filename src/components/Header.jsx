import { Link } from 'react-router-dom'
import { useModal } from '../hooks/useModal'
import '../style.css'

function Header() {
  const { openDonationModal } = useModal()

  return (
    <header>
      <div className="logo">
        <img src="/images/logo.png" alt="fond_logo" />
        <div className="logo_text">
          <p className="logo-description_1">Земля Вологодская</p>
          <p className="logo-description_2">фонд развития малых городов и сёл</p>
        </div>
      </div>
      <div className="navigaciya">
        <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/fond">Фонд</Link></li>
            <li><Link to="/projects">Проекты</Link></li>
            <li><Link to="/team">Команда</Link></li>
            <li><Link to="/documents">Документы</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
        </nav>
      </div>
      <button className="button_support" onClick={openDonationModal}>
        Поддержать фонд
      </button>

      <input type="checkbox" id="burger-toggle" style={{ display: 'none' }} />
      <label htmlFor="burger-toggle" className="burger-btn">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <label htmlFor="burger-toggle" className="mobile-overlay"></label>
      <nav className="mobile-nav">
        <div className="logo">
          <img src="/images/logo.png" alt="fond_logo" />
          <div className="logo_text">
            <p className="logo-description_1">Земля Вологодская</p>
            <p className="logo-description_2">фонд развития малых городов и сёл</p>
          </div>
        </div>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/fond">Фонд</Link></li>
          <li><Link to="/projects">Проекты</Link></li>
          <li><Link to="/team">Команда</Link></li>
          <li><Link to="/documents">Документы</Link></li>
          <li><Link to="/contacts">Контакты</Link></li>
        </ul>
        <button className="button_support" onClick={openDonationModal}>Поддержать фонд</button>
      </nav>
    </header>
  )
}

export default Header

