import { useState, useEffect } from 'react'
import api from '../../services/api.js'

function AdminDirections() {
    const [directions, setDirections] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [form, setForm] = useState({ title: '', description: '', order: 0 })
    const [saving, setSaving] = useState(false)

    const loadDirections = async () => {
        try {
            const res = await api.get('/directions/')
            setDirections(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            console.error('Ошибка загрузки:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadDirections() }, [])

    const openForm = (dir = null) => {
        if (dir) {
            setForm({ title: dir.title || '', description: dir.description || '', order: dir.order || 0 })
            setEditing(dir)
        } else {
            setForm({ title: '', description: '', order: 0 })
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
        data.append('order', form.order)
        if (imageFile) data.append('icon', imageFile)

        try {
            if (editing) {
                await api.put(`/directions/${editing.id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            } else {
                await api.post('/directions/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
            }
            setShowForm(false)
            loadDirections()
            alert('Сохранено!')
        } catch (err) {
            alert('Ошибка при сохранении')
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить направление?')) {
            await api.delete(`/directions/${id}/`)
            loadDirections()
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Направления работы</h1>
                <button onClick={() => openForm()} style={{ background: '#419037', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    + Добавить направление
                </button>
            </div>
            {directions.map(dir => (
                <div key={dir.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        {dir.icon_url && <img src={`http://127.0.0.1:8000${dir.icon_url}`} alt="" style={{ width: '40px', height: '40px', marginRight: '15px' }} />}
                        <strong>{dir.title}</strong>
                        <p style={{ margin: '5px 0 0', color: '#666' }}>{dir.description}</p>
                    </div>
                    <div>
                        <button onClick={() => openForm(dir)} style={{ marginRight: '5px' }}>✏️</button>
                        <button onClick={() => handleDelete(dir.id)}>🗑️</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AdminDirections