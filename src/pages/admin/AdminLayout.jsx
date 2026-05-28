import { Link, Outlet, useNavigate } from 'react-router-dom'

function AdminLayout() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_refresh')
        navigate('/admin/login')
    }

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#fffcea',
            fontFamily: 'Montserrat-Regular, sans-serif'
        }}>
            <aside style={{
                width: '280px',
                background: '#7E5B2C',
                color: '#FFFCEA',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
            }}>
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <img src="/images/logo.png" alt="Логотип" style={{ width: '80px', marginBottom: '15px' }} />
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', fontSize: '20px', margin: 0 }}>Админ-панель</h2>
                    <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>Фонд "Земля Вологодская"</p>
                </div>
                
                <nav style={{ flex: 1 }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '10px' }}>ОСНОВНЫЕ СТРАНИЦЫ</h3>
                        <Link to="/admin/home" style={linkStyle}>🏠 Главная страница</Link>
                        <Link to="/admin/fond" style={linkStyle}>ℹ️ О фонде</Link>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '10px' }}>КОНТЕНТ</h3>
                        <Link to="/admin/projects" style={linkStyle}>📁 Проекты</Link>
                        <Link to="/admin/news" style={linkStyle}>📰 Новости</Link>
                        <Link to="/admin/team" style={linkStyle}>👥 Команда</Link>
                        <Link to="/admin/partners" style={linkStyle}>🤝 Партнеры</Link>
                        <Link to="/admin/documents" style={linkStyle}>📄 Документы</Link>
                        <Link to="/admin/directions" style={linkStyle}>🎯 Направления</Link>
                    </div>

                    {/* ↓↓↓ ДОБАВЬТЕ ЭТОТ БЛОК ↓↓↓ */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '10px' }}>ЗАЯВКИ</h3>
                        <Link to="/admin/donations" style={linkStyle}>💰 Пожертвования</Link>
                        <Link to="/admin/partner-requests" style={linkStyle}>🤝 Партнёрство</Link>
                        <Link to="/admin/volunteers" style={linkStyle}>🙋 Волонтёры</Link>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '10px' }}>НАСТРОЙКИ</h3>
                        <Link to="/admin/contacts" style={linkStyle}>📞 Контакты</Link>
                    </div>
                </nav>
                
                <button onClick={logout} style={{
                    padding: '12px',
                    background: '#419037',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontFamily: 'Montserrat-Bold, sans-serif',
                    fontSize: '14px',
                    marginTop: '20px'
                }}>
                    🚪 Выйти
                </button>
            </aside>
            
            <main style={{
                flex: 1,
                padding: '30px',
                overflow: 'auto'
            }}>
                <Outlet />
            </main>
        </div>
    )
}

const linkStyle = {
    display: 'block',
    padding: '10px 15px',
    color: '#FFFCEA',
    textDecoration: 'none',
    borderRadius: '12px',
    marginBottom: '5px',
    transition: 'all 0.3s'
}

export default AdminLayout