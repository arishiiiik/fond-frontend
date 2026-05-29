import { useState, useEffect } from 'react'
import api from '../../services/api'

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
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    const saveFond = async () => {
        try {
            if (fond?.id) {
                await api.put(`/fond/${fond.id}/`, fond)
            } else {
                await api.post('/fond/', fond)
            }
            alert('Сохранено')
        } catch (err) {
            alert('Ошибка')
        }
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
            <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>О фонде</h1>
            
            <Card title="Текст о фонде">
                <Field label="Текст" textarea rows={6} value={fond?.about_text || ''} onChange={val => setFond({...fond, about_text: val})} />
                <Button onClick={saveFond}>Сохранить</Button>
            </Card>

            <Card title="История фонда">
                <button onClick={addHistory} style={{ ...buttonStyle, marginBottom: '16px', background: '#22c55e' }}>+ Добавить событие</button>
                {history.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <input type="number" value={item.year} onChange={e => updateHistory(item.id, 'year', parseInt(e.target.value))} style={inputStyle} placeholder="Год" />
                            <select value={item.side} onChange={e => updateHistory(item.id, 'side', e.target.value)} style={inputStyle}>
                                <option value="left">Слева</option>
                                <option value="right">Справа</option>
                            </select>
                        </div>
                        <input type="text" value={item.title} onChange={e => updateHistory(item.id, 'title', e.target.value)} style={{ ...inputStyle, width: '100%', marginBottom: '12px' }} placeholder="Заголовок" />
                        <textarea value={item.description} onChange={e => updateHistory(item.id, 'description', e.target.value)} rows={3} style={{ ...inputStyle, width: '100%', marginBottom: '12px' }} placeholder="Описание" />
                        <button onClick={() => deleteHistory(item.id)} style={{ ...buttonStyle, background: '#ef4444' }}>Удалить</button>
                    </div>
                ))}
            </Card>
        </div>
    )
}

export default AdminFondPage