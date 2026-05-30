import { useState, useEffect } from 'react'
import api from '../../services/api'

const buttonStyle = {
    background: 'linear-gradient(90deg, #419037 0%, #92BA52 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontFamily: 'Montserrat-Bold, sans-serif',
    fontSize: '14px'
}

const deleteButton = {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontFamily: 'Montserrat-Bold, sans-serif',
    fontSize: '12px'
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '15px',
    border: '2px solid #e0d5c0',
    fontSize: '14px',
    fontFamily: 'Montserrat-Regular, sans-serif',
    boxSizing: 'border-box',
    marginBottom: '12px'
}

const cardStyle = {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0px 0px 20px rgba(130, 91, 44, 0.1)',
    borderTop: '4px solid #419037'
}

function AdminFondPage() {
    const [fond, setFond] = useState(null)
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([api.get('/fond/'), api.get('/history/')])
            .then(([fondRes, historyRes]) => {
                const fondData = fondRes.data?.[0] || fondRes.data || {}
                setFond(fondData)
                setHistory(historyRes.data || [])
                setLoading(false)
            })
            .catch(err => { console.error(err); setLoading(false) })
    }, [])

    const saveFond = async () => {
        try {
            if (fond?.id) {
                await api.put(`/fond/${fond.id}/`, fond)
            } else {
                await api.post('/fond/', fond)
            }
            alert('Сохранено')
        } catch (err) { alert('Ошибка') }
    }

    const addHistory = async () => {
        const res = await api.post('/history/', { year: new Date().getFullYear(), title: 'Новое событие', description: '', side: 'left', order: history.length })
        setHistory([...history, res.data])
    }

    const updateHistory = async (id, field, value) => {
        await api.patch(`/history/${id}/`, { [field]: value })
        setHistory(history.map(h => h.id === id ? { ...h, [field]: value } : h))
    }

    const deleteHistory = async (id) => {
        if (confirm('Удалить событие?')) {
            await api.delete(`/history/${id}/`)
            setHistory(history.filter(h => h.id !== id))
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px', marginBottom: '24px' }}>О фонде</h1>

            <div style={cardStyle}>
                <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px', marginBottom: '16px' }}>Текст о фонде</h2>
                <textarea value={fond?.about_text || ''} onChange={e => setFond({ ...fond, about_text: e.target.value })} rows={8} style={inputStyle} />
                <button onClick={saveFond} style={buttonStyle}>Сохранить</button>
            </div>

            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px' }}>История фонда</h2>
                    <button onClick={addHistory} style={buttonStyle}>+ Добавить событие</button>
                </div>
                {history.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <input type="number" value={item.year} onChange={e => updateHistory(item.id, 'year', parseInt(e.target.value))} style={{ ...inputStyle, width: '100px' }} placeholder="Год" />
                            <select value={item.side} onChange={e => updateHistory(item.id, 'side', e.target.value)} style={{ ...inputStyle, width: '120px' }}>
                                <option value="left">Слева</option>
                                <option value="right">Справа</option>
                            </select>
                        </div>
                        <input type="text" value={item.title} onChange={e => updateHistory(item.id, 'title', e.target.value)} style={inputStyle} placeholder="Заголовок" />
                        <textarea value={item.description} onChange={e => updateHistory(item.id, 'description', e.target.value)} rows={3} style={inputStyle} placeholder="Описание" />
                        <button onClick={() => deleteHistory(item.id)} style={deleteButton}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminFondPage