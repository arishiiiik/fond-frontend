import { Link } from 'react-router-dom'
import '../style.css'
import Header from '../components/Header'

function NotFoundPage() {
  return (
    <div>
      <Header />
      <main>
        <div className="not-found-container">
          <div className="not-found-content">
            <div className="not-found-code">404</div>
            <h1 className="not-found-title">Страница не найдена</h1>
            <p className="not-found-text">
              К сожалению, страница, которую вы ищете, не существует или была перемещена.
            </p>
            <div className="not-found-actions">
              <Link to="/" className="not-found-button primary">
                Вернуться на главную
              </Link>
              <Link to="/projects" className="not-found-button secondary">
                Посмотреть проекты
              </Link>
            </div>
            <div className="not-found-suggestions">
              <p>Возможно, вас заинтересуют:</p>
              <div className="suggestions-links">
                <Link to="/fond">О фонде</Link>
                <Link to="/team">Команда</Link>
                <Link to="/documents">Документы</Link>
                <Link to="/contacts">Контакты</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage