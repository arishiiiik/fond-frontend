import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

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
      const response = await api.post('/token/', { username, password })
      localStorage.setItem('admin_token', response.data.access)
      localStorage.setItem('admin_refresh', response.data.refresh)
      navigate('/admin/projects')
    } catch (err) {
      setError(err.response?.data?.detail || 'Неверный логин или пароль')
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
      background: '#f5f0e0'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        width: '360px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#825B2C' }}>Вход в админ-панель</h2>
        {error && <div style={{ background: '#fee', color: 'red', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Логин" 
            value={username} 
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc' }}
            required
          />
          <input 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: 'linear-gradient(90deg, #419037 0%, #92BA52 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
