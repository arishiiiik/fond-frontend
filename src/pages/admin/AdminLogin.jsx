import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password
            })
            
            // Сохраняем токены
            localStorage.setItem('admin_token', response.data.access)
            localStorage.setItem('admin_refresh', response.data.refresh)
            
            // Перенаправляем на страницу проектов
            navigate('/admin/projects')
        } catch (err) {
            console.error('Login error:', err)
            setError('Неверный логин или пароль')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fffcea 0%, #f5f0e0 100%)',
            fontFamily: 'Montserrat-Regular, sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '30px',
                boxShadow: '0 20px 40px rgba(130, 91, 44, 0.15)',
                width: '360px',
                textAlign: 'center'
            }}>
                <img src="/images/logo.png" alt="Логотип" style={{ width: '80px', marginBottom: '20px' }} />
                <h1 style={{
                    fontFamily: 'Vezitsa, sans-serif',
                    color: '#825B2C',
                    fontSize: '28px',
                    marginBottom: '10px'
                }}>Админ-панель</h1>
                <p style={{ color: '#886429', marginBottom: '30px', fontSize: '14px' }}>Фонд "Земля Вологодская"</p>
                
                <form onSubmit={handleSubmit}>
                    {error && <div style={{
                        background: '#fee',
                        color: '#e74c3c',
                        padding: '10px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>{error}</div>}
                    
                    <input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            margin: '10px 0',
                            border: '2px solid #e0d5c0',
                            borderRadius: '15px',
                            fontSize: '16px',
                            fontFamily: 'Montserrat-Regular, sans-serif',
                            boxSizing: 'border-box'
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            margin: '10px 0',
                            border: '2px solid #e0d5c0',
                            borderRadius: '15px',
                            fontSize: '16px',
                            fontFamily: 'Montserrat-Regular, sans-serif',
                            boxSizing: 'border-box'
                        }}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'linear-gradient(90deg, #419037 0%, #92BA52 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontFamily: 'Montserrat-Bold, sans-serif',
                            cursor: 'pointer',
                            marginTop: '20px'
                        }}
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin