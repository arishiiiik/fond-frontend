import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'

function AdminLayout() {
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_refresh')
        navigate('/admin/login')
    }

    const isActive = (path) => location.pathname === path

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#fffcea',
            fontFamily: 'Montserrat-Regular, sans-serif'
        }}>
            {/* Левое меню */}
            <aside style={{
                width: '280px',
                background: '#7E5B2C',
                color: '#FFFCEA',
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <img src="/images/logo.png" alt="Логотип" style={{ width: '80px', marginBottom: '15px' }} />
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', fontSize: '20px', margin: 0 }}>Админ-панель</h2>
                    <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>Фонд "Земля Вологодская"</p>
                </div>

                <nav style={{ flex: 1 }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '10px' }}>ОСНОВНЫЕ СТРАНИЦЫ</h3>
                        <NavLink to="/admin/home" active={isActive('/admin/home')}>🏠 Главная страница</NavLink>
                        <NavLink to="/admin/fond" active={isActive('/admin/fond')}>ℹ️ О фонде</NavLink>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '10px' }}>КОНТЕНТ</h3>
                        <NavLink to="/admin/projects" active={isActive('/admin/projects')}>📁 Проекты</NavLink>
                        <NavLink to="/admin/news" active={isActive('/admin/news')}>📰 Новости</NavLink>
                        <NavLink to="/admin/team" active={isActive('/admin/team')}>👥 Команда</NavLink>
                        <NavLink to="/admin/partners" active={isActive('/admin/partners')}>🤝 Партнёры</NavLink>
                        <NavLink to="/admin/documents" active={isActive('/admin/documents')}>📄 Документы</NavLink>
                        <NavLink to="/admin/directions" active={isActive('/admin/directions')}>🎯 Направления</NavLink>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '10px' }}>ЗАЯВКИ</h3>
                        <NavLink to="/admin/donations" active={isActive('/admin/donations')}>💰 Пожертвования</NavLink>
                        <NavLink to="/admin/partner-requests" active={isActive('/admin/partner-requests')}>🤝 Партнёрство</NavLink>
                        <NavLink to="/admin/volunteers" active={isActive('/admin/volunteers')}>🙋 Волонтёры</NavLink>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '10px' }}>НАСТРОЙКИ</h3>
                        <NavLink to="/admin/contacts" active={isActive('/admin/contacts')}>📞 Контакты</NavLink>
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
                    marginTop: '20px',
                    transition: 'all 0.3s'
                }}>
                    🚪 Выйти
                </button>
            </aside>

            {/* Основной контент */}
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

function NavLink({ to, active, children }) {
    return (
        <Link
            to={to}
            style={{
                display: 'block',
                padding: '10px 15px',
                color: active ? 'white' : '#FFFCEA',
                background: active ? '#419037' : 'transparent',
                textDecoration: 'none',
                borderRadius: '12px',
                marginBottom: '5px',
                transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = '#419037'
            }}
            onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = 'transparent'
            }}
        >
            {children}
        </Link>
    )
}

export default AdminLayoutgit add .