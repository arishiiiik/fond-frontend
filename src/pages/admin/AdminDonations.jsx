import { useState, useEffect } from 'react'
import api from '../../services/api'

function AdminDonations() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/donation-requests/')
      .then(res => {
        setRequests(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Ошибка загрузки:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Загрузка...</div>

  return (
    <div>
      <h1>Заявки на пожертвования</h1>
      {requests.length === 0 ? (
        <p>Нет заявок</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ background: '#f0f0f0' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Имя</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Сумма</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Дата</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>{r.id}</td>
                <td style={{ padding: '12px' }}>{r.name}</td>
                <td style={{ padding: '12px' }}>{r.email || '-'}</td>
                <td style={{ padding: '12px' }}>{r.amount} ₽</td>
                <td style={{ padding: '12px' }}>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminDonations