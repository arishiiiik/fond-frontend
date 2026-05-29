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
            background: '#f1f5f9',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <aside style={{
                width: '260px',
                background: '#0f172a',
                color: '#e2e8f0',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ padding: '24px 20px', borderBottom: '1px solid #334155' }}>
                    <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 600 }}>Земля Вологодская</h2>
                    <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>Административная панель</p>
                </div>
                
                <nav style={{ flex: 1, padding: '20px 12px' }}>
                    <NavSection title="Основные страницы">
                        <NavLink to="/admin/home" active={isActive('/admin/home')}>Главная страница</NavLink>
                        <NavLink to="/admin/fond" active={isActive('/admin/fond')}>О фонде</NavLink>
                    </NavSection>

                    <NavSection title="Контент">
                        <NavLink to="/admin/projects" active={isActive('/admin/projects')}>Проекты</NavLink>
                        <NavLink to="/admin/news" active={isActive('/admin/news')}>Новости</NavLink>
                        <NavLink to="/admin/team" active={isActive('/admin/team')}>Команда</NavLink>
                        <NavLink to="/admin/partners" active={isActive('/admin/partners')}>Партнёры</NavLink>
                        <NavLink to="/admin/documents" active={isActive('/admin/documents')}>Документы</NavLink>
                        <NavLink to="/admin/directions" active={isActive('/admin/directions')}>Направления</NavLink>
                    </NavSection>

                    <NavSection title="Заявки">
                        <NavLink to="/admin/donations" active={isActive('/admin/donations')}>Пожертвования</NavLink>
                        <NavLink to="/admin/partner-requests" active={isActive('/admin/partner-requests')}>Партнёрство</NavLink>
                        <NavLink to="/admin/volunteers" active={isActive('/admin/volunteers')}>Волонтёры</NavLink>
                    </NavSection>

                    <NavSection title="Настройки">
                        <NavLink to="/admin/contacts" active={isActive('/admin/contacts')}>Контакты</NavLink>
                    </NavSection>
                </nav>
                
                <button onClick={logout} style={{
                    margin: '16px',
                    padding: '10px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500
                }}>
                    Выйти
                </button>
            </aside>
            
            <main style={{ flex: 1, padding: '32px 40px', overflow: 'auto' }}>
                <Outlet />
            </main>
        </div>
    )
}

function NavSection({ title, children }) {
    return (
        <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5, marginBottom: '12px' }}>
                {title}
            </h3>
            {children}
        </div>
    )
}

function NavLink({ to, active, children }) {
    return (
        <Link
            to={to}
            style={{
                display: 'block',
                padding: '8px 12px',
                marginBottom: '4px',
                color: active ? 'white' : '#cbd5e1',
                background: active ? '#3b82f6' : 'transparent',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px'
            }}
        >
            {children}
        </Link>
    )
}

export default AdminLayout