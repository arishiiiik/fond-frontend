import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import '../style.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  // Скрипт для кнопки "Наверх"
  useEffect(() => {
    const btnUp = document.querySelector('.btn-up')
    
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      if (scrollY > 400) {
        btnUp?.classList.remove('btn-up_hide')
      } else {
        btnUp?.classList.add('btn-up_hide')
      }
    }
    
    const handleClick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    btnUp?.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      btnUp?.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <footer>
      <div className="footer_content_main">
        {/* Левая колонка: логотип и описание */}
        <div className="footer_content">
          <div className="footer_logo_text">
            <img className="logo_footer" src="/images/logo.png" alt="Логотип фонда" />
            <div className="text_logo_f">
              <h3>Земля Вологодская</h3>
              <p>фонд развития малых городов и сёл</p>
            </div>
          </div>
          <div className="fond_description">
            <p>
              Мобилизация ресурсов для социально-<br />
              экономического развития малых городов <br />
              и сёл Вологодской области
            </p>
          </div>
        </div>

        {/* Центральная колонка: навигация */}
        <nav className="footer_nav">
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/fond">Фонд</Link></li>
            <li><Link to="/projects">Проекты</Link></li>
            <li><Link to="/team">Команда</Link></li>
            <li><Link to="/documents">Документы</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
        </nav>

        {/* Правая колонка: контакты */}
        <nav className="footer_nav">
          <ul>
            <li>Контакты:</li>
            <li>Адрес: 160035, г. Вологда, Советский пр., 35-а</li>
            <li>e-mail: fond.rgs35@yandex.ru</li>
            <li>Телефон: (8172) 75 61 37</li>
          </ul>
        </nav>
      </div>

      {/* Кнопка "Наверх" */}
      <button className="btn-up btn-up_hide" aria-label="Наверх">
        ↑
      </button>

      {/* Нижняя линия */}
      <hr className="footer_line" />

      {/* Копирайт */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© {currentYear} Фонд «Земля Вологодская». Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer