import { useState, useEffect } from 'react'
import api from '../../services/api.js'

function AdminPartners() {
    const [partners, setPartners] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [form, setForm] = useState({ name: '', link: '', order: 0 })
    const [saving, setSaving] = useState(false)

    const loadPartners = async () => {
        try {
            const res = await api.get('/partners/')
            setPartners(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            console.error('Ошибка загрузки:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadPartners() }, [])

    const openForm = (partner = null) => {
        if (partner) {
            setForm({ name: partner.name || '', link: partner.link || '', order: partner.order || 0 })
            setEditing(partner)
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
                await api.put(`/partners/${editing.id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            } else {
                await api.post('/partners/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
            }
            setShowForm(false)
            loadPartners()
            alert('Сохранено!')
        } catch (err) {
            alert('Ошибка при сохранении')
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить партнера?')) {
            await api.delete(`/partners/${id}/`)
            loadPartners()
        }
    }

    if (loading) return <div>Загрузка партнеров...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Партнеры</h1>
                <button onClick={() => openForm()} style={{ background: '#419037', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    + Добавить партнера
                </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {partners.map(p => (
                    <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '200px', textAlign: 'center' }}>
                        {p.logo_url && <img src={`http://127.0.0.1:8000${p.logo_url}`} alt={p.name} style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '10px' }} />}
                        <h3>{p.name}</h3>
                        <button onClick={() => openForm(p)} style={{ marginRight: '5px' }}>✏️</button>
                        <button onClick={() => handleDelete(p.id)}>🗑️</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPartners