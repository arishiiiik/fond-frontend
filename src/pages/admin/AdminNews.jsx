import { useState, useEffect } from 'react'
import api from '../../services/api'

const buttonStyle = {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
}

const deleteButton = {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box'
}

function AdminNews() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ title: '', description: '', date: new Date().toISOString().split('T')[0], link: '', order: 0 })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api.get('/news/').then(res => { setItems(res.data); setLoading(false) }).catch(() => setLoading(false))
    }, [])

    const openForm = (item = null) => {
        if (item) {
            setForm(item)
            setEditing(item)
        } else {
            setForm({ title: '', description: '', date: new Date().toISOString().split('T')[0], link: '', order: 0 })
            setEditing(null)
        }
        setImageFile(null)
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        Object.keys(form).forEach(k => data.append(k, form[k]))
        if (imageFile) data.append('image', imageFile)

        try {
            if (editing) {
                await api.put(`/news/${editing.id}/`, data)
            } else {
                await api.post('/news/', data)
            }
            setShowForm(false)
            const res = await api.get('/news/')
            setItems(res.data)
            alert('Сохранено')
        } catch (err) {
            alert('Ошибка')
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить новость?')) {
            await api.delete(`/news/${id}/`)
            const res = await api.get('/news/')
            setItems(res.data)
            alert('Удалено')
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px' }}>Новости</h1>
                <button onClick={() => openForm()} style={buttonStyle}>+ Добавить новость</button>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Заголовок</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Дата</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '12px' }}>{item.title}</td>
                                <td style={{ padding: '12px' }}>{item.date}</td>
                                <td style={{ padding: '12px' }}>
                                    <button onClick={() => openForm(item)} style={{ ...buttonStyle, marginRight: '8px', padding: '4px 12px' }}>✏️</button>
                                    <button onClick={() => handleDelete(item.id)} style={{ ...deleteButton, padding: '4px 12px' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={() => setShowForm(false)}>
                    <div style={{ background: 'white', borderRadius: '12px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '16px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                            <h2>{editing ? 'Редактировать новость' : 'Новая новость'}</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '24px' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Заголовок *</label>
                                    <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Описание *</label>
                                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Дата *</label>
                                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Ссылка</label>
                                    <input type="url" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Изображение</label>
                                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                                    {editing && editing.image_url && !imageFile && <p style={{ fontSize: '12px', marginTop: '4px' }}>Текущее: {editing.image_url.split('/').pop()}</p>}
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Порядок</label>
                                    <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                    <button type="button" onClick={() => setShowForm(false)} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
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

export default AdminNews