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
    const [editingHistory, setEditingHistory] = useState(null)
    const [historyForm, setHistoryForm] = useState({ year: '', title: '', description: '', side: 'left', order: 0 })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const [fondRes, historyRes] = await Promise.all([api.get('/fond/'), api.get('/history/')])
        const fondData = fondRes.data?.[0] || fondRes.data || {}
        setFond(fondData)
        setHistory(historyRes.data || [])
        setLoading(false)
    }

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

    const openHistoryForm = (item = null) => {
        if (item) {
            setEditingHistory(item)
            setHistoryForm({
                year: item.year || '',
                title: item.title || '',
                description: item.description || '',
                side: item.side || 'left',
                order: item.order || 0
            })
        } else {
            setEditingHistory({})
            setHistoryForm({ year: '', title: '', description: '', side: 'left', order: history.length })
        }
    }

    const closeHistoryForm = () => {
        setEditingHistory(null)
        setHistoryForm({ year: '', title: '', description: '', side: 'left', order: 0 })
    }

    const saveHistory = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editingHistory.id) {
                await api.put(`/history/${editingHistory.id}/`, historyForm)
                alert('Событие обновлено')
            } else {
                await api.post('/history/', historyForm)
                alert('Событие добавлено')
            }
            closeHistoryForm()
            loadData()
        } catch (err) { alert('Ошибка') }
        setSaving(false)
    }

    const deleteHistory = async (id) => {
        if (confirm('Удалить событие?')) {
            await api.delete(`/history/${id}/`)
            loadData()
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
                    <button onClick={() => openHistoryForm()} style={buttonStyle}>+ Добавить событие</button>
                </div>
                {history.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <strong>{item.year} - {item.title}</strong>
                            <div>
                                <button onClick={() => openHistoryForm(item)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>✏️</button>
                                <button onClick={() => deleteHistory(item.id)} style={deleteButton}>🗑️</button>
                            </div>
                        </div>
                        <p>{item.description}</p>
                        <small>Сторона: {item.side === 'left' ? 'Слева' : 'Справа'}</small>
                    </div>
                ))}
            </div>

            {/* Форма редактирования/добавления события истории */}
            {editingHistory !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={closeHistoryForm}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                            <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C' }}>{editingHistory.id ? 'Редактировать событие' : 'Новое событие'}</h2>
                        </div>
                        <form onSubmit={saveHistory}>
                            <div style={{ padding: '24px' }}>
                                <input type="number" placeholder="Год" value={historyForm.year} onChange={e => setHistoryForm({ ...historyForm, year: e.target.value })} required style={inputStyle} />
                                <input type="text" placeholder="Заголовок" value={historyForm.title} onChange={e => setHistoryForm({ ...historyForm, title: e.target.value })} required style={inputStyle} />
                                <textarea placeholder="Описание" value={historyForm.description} onChange={e => setHistoryForm({ ...historyForm, description: e.target.value })} rows={3} required style={inputStyle} />
                                <select value={historyForm.side} onChange={e => setHistoryForm({ ...historyForm, side: e.target.value })} style={inputStyle}>
                                    <option value="left">Слева</option>
                                    <option value="right">Справа</option>
                                </select>
                                <input type="number" placeholder="Порядок" value={historyForm.order} onChange={e => setHistoryForm({ ...historyForm, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                                    <button type="button" onClick={closeHistoryForm} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
                                    <button type="submit" disabled={saving} style={buttonStyle}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminFondPage