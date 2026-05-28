import { useState, useEffect } from 'react'
import api from '../../services/api.js'

function AdminNews() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [form, setForm] = useState({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        link: '',
        order: 0
    })
    const [saving, setSaving] = useState(false)

    const loadNews = async () => {
        try {
            const res = await api.get('/news/')
            setNews(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            console.error('Ошибка загрузки:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadNews() }, [])

    const openForm = (item = null) => {
        if (item) {
            setForm({
                title: item.title || '',
                description: item.description || '',
                date: item.date || new Date().toISOString().split('T')[0],
                link: item.link || '',
                order: item.order || 0
            })
            setEditing(item)
        } else {
            setForm({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                link: '',
                order: 0
            })
            setEditing(null)
        }
        setImageFile(null)
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        
        const data = new FormData()
        data.append('title', form.title)
        data.append('description', form.description)
        data.append('date', form.date)
        data.append('link', form.link)
        data.append('order', form.order)
        if (imageFile) {
            data.append('image', imageFile)
        }

        try {
            if (editing) {
                await api.put(`/news/${editing.id}/`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            } else {
                await api.post('/news/', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }
            setShowForm(false)
            loadNews()
            alert('Сохранено!')
        } catch (err) {
            console.error('Ошибка сохранения:', err)
            alert('Ошибка при сохранении')
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить новость?')) {
            try {
                await api.delete(`/news/${id}/`)
                loadNews()
            } catch (err) {
                alert('Ошибка удаления')
            }
        }
    }

    if (loading) return <div>Загрузка новостей...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Новости</h1>
                <button onClick={() => openForm()} style={{
                    background: '#419037',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}>
                    + Добавить новость
                </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <thead style={{ background: '#f0f0f0' }}>
                    <tr>
                        <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Заголовок</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Дата</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Изображение</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '12px' }}>{item.id}</td>
                            <td style={{ padding: '12px' }}>{item.title}</td>
                            <td style={{ padding: '12px' }}>{item.date}</td>
                            <td style={{ padding: '12px' }}>
                                {item.image_url && <img src={`http://127.0.0.1:8000${item.image_url}`} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
                            </td>
                            <td style={{ padding: '12px' }}>
                                <button onClick={() => openForm(item)} style={{ marginRight: '8px', padding: '4px 12px', cursor: 'pointer' }}>✏️</button>
                                <button onClick={() => handleDelete(item.id)} style={{ padding: '4px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }} onClick={() => setShowForm(false)}>
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        width: '500px',
                        maxWidth: '90%',
                        maxHeight: '90%',
                        overflow: 'auto'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ddd' }}>
                            <h2>{editing ? 'Редактировать новость' : 'Новая новость'}</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '15px' }}>
                                <input type="text" placeholder="Заголовок" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <textarea placeholder="Описание" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="4" required style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <input type="url" placeholder="Ссылка (если есть)" value={form.link} onChange={e => setForm({...form, link: e.target.value})} style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
                                <input type="number" placeholder="Порядок" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ padding: '15px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button type="button" onClick={() => setShowForm(false)}>Отмена</button>
                                <button type="submit" disabled={saving} style={{ background: '#419037', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                                    {saving ? 'Сохранение...' : 'Сохранить'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminNews