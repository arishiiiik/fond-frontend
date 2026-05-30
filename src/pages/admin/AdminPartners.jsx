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

function AdminPartners() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ name: '', link: '', order: 0 })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api.get('/partners/').then(res => { setItems(res.data); setLoading(false) }).catch(() => setLoading(false))
    }, [])

    const openForm = (item = null) => {
        if (item) {
            setForm(item)
            setEditing(item)
        } else {
            setForm({ name: '', link: '', order: 0 })
            setEditing(null)
        }
        setImageFile(null)
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        data.append('name', form.name)
        data.append('link', form.link)
        data.append('order', form.order)
        if (imageFile) data.append('logo', imageFile)

        try {
            if (editing) {
                await api.put(`/partners/${editing.id}/`, data)
            } else {
                await api.post('/partners/', data)
            }
            setShowForm(false)
            const res = await api.get('/partners/')
            setItems(res.data)
            alert('Сохранено')
        } catch (err) {
            alert('Ошибка')
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить партнёра?')) {
            await api.delete(`/partners/${id}/`)
            const res = await api.get('/partners/')
            setItems(res.data)
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px' }}>Партнёры</h1>
                <button onClick={() => openForm()} style={buttonStyle}>+ Добавить партнёра</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                {items.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', textAlign: 'center', background: 'white' }}>
                        {item.logo_url && <img src={item.logo_url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '8px' }} />}
                        <strong>{item.name}</strong>
                        <div style={{ marginTop: '12px' }}>
                            <button onClick={() => openForm(item)} style={{ ...buttonStyle, marginRight: '8px', padding: '4px 12px' }}>✏️</button>
                            <button onClick={() => handleDelete(item.id)} style={{ ...deleteButton, padding: '4px 12px' }}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={() => setShowForm(false)}>
                    <div style={{ background: 'white', borderRadius: '12px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '16px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                            <h2>{editing ? 'Редактировать партнёра' : 'Новый партнёр'}</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '24px' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Название *</label>
                                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Сайт</label>
                                    <input type="url" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label>Логотип</label>
                                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                                    {editing && editing.logo_url && !imageFile && <p style={{ fontSize: '12px', marginTop: '4px' }}>Текущее: {editing.logo_url.split('/').pop()}</p>}
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

export default AdminPartners