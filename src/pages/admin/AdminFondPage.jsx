import { useState, useEffect } from 'react'
import api from '../../services/api.js'

function AdminFondPage() {
    const [fond, setFond] = useState(null)
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [imageFile, setImageFile] = useState(null)

    const loadData = async () => {
        try {
            const [fondRes, historyRes] = await Promise.all([
                api.get('/fond/'),
                api.get('/history/'),
            ])
            
            const fondData = Array.isArray(fondRes.data) && fondRes.data.length > 0 
                ? fondRes.data[0] 
                : fondRes.data
            setFond(fondData)
            setHistory(historyRes.data || [])
        } catch (err) {
            console.error('Ошибка:', err)
            alert('Ошибка загрузки: ' + (err.response?.data?.detail || err.message))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadData() }, [])

    const saveFond = async () => {
        try {
            const formData = new FormData()
            formData.append('about_text', fond?.about_text || '')
            if (imageFile) {
                formData.append('about_image', imageFile)
            }

            if (fond?.id) {
                await api.put(`/fond/${fond.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            } else {
                await api.post('/fond/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }
            alert('Сохранено!')
            setImageFile(null)
            loadData()
        } catch (err) {
            console.error('Ошибка сохранения:', err)
            alert('Ошибка: ' + (err.response?.data?.detail || JSON.stringify(err.response?.data) || 'Неизвестная ошибка'))
        }
    }

    const addHistory = async () => {
        try {
            const res = await api.post('/history/', 
                { 
                    year: new Date().getFullYear(), 
                    title: 'Новое событие', 
                    description: 'Описание', 
                    side: 'left', 
                    order: history.length 
                }
            )
            setHistory([...history, res.data])
        } catch (err) {
            console.error('Ошибка:', err)
            alert('Ошибка: ' + (err.response?.data?.detail || 'Неизвестная ошибка'))
        }
    }

    const updateHistory = async (id, field, value) => {
        try {
            await api.patch(`/history/${id}/`, { [field]: value })
            setHistory(history.map(h => h.id === id ? { ...h, [field]: value } : h))
        } catch (err) {
            console.error('Ошибка:', err)
            alert('Ошибка обновления')
        }
    }

    const deleteHistory = async (id) => {
        if (confirm('Удалить событие?')) {
            try {
                await api.delete(`/history/${id}/`)
                setHistory(history.filter(h => h.id !== id))
            } catch (err) {
                console.error('Ошибка:', err)
                alert('Ошибка удаления')
            }
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <h1>Редактирование страницы "О фонде"</h1>

            <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
                <h2>1. Текст о фонде</h2>
                {fond?.about_image && (
                    <div style={{ marginBottom: '10px' }}>
                        <img 
                            src={`http://127.0.0.1:8000${fond.about_image}`} 
                            alt="О фонде" 
                            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                        />
                    </div>
                )}
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    style={{ marginBottom: '10px', display: 'block' }}
                />
                <textarea 
                    value={fond?.about_text || ''} 
                    onChange={e => setFond({...fond, about_text: e.target.value})} 
                    rows="6" 
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
                />
                <button onClick={saveFond}>Сохранить текст и изображение</button>
            </div>

            <div style={{ border: '1px solid #ccc', padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2>2. История фонда (таймлайн)</h2>
                    <button onClick={addHistory}>+ Добавить событие</button>
                </div>
                {history.map(item => (
                    <div key={item.id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input 
                                type="number" 
                                value={item.year} 
                                onChange={e => updateHistory(item.id, 'year', parseInt(e.target.value))} 
                                style={{ width: '100px', padding: '5px' }} 
                            />
                            <select 
                                value={item.side} 
                                onChange={e => updateHistory(item.id, 'side', e.target.value)}
                                style={{ padding: '5px' }}
                            >
                                <option value="left">Слева</option>
                                <option value="right">Справа</option>
                            </select>
                        </div>
                        <input 
                            type="text" 
                            value={item.title} 
                            onChange={e => updateHistory(item.id, 'title', e.target.value)} 
                            style={{ width: '100%', padding: '5px', marginBottom: '10px' }} 
                        />
                        <textarea 
                            value={item.description} 
                            onChange={e => updateHistory(item.id, 'description', e.target.value)} 
                            rows="3" 
                            style={{ width: '100%', padding: '5px', marginBottom: '10px' }} 
                        />
                        <button 
                            onClick={() => deleteHistory(item.id)}
                            style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminFondPage