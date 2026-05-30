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

function Modal({ onClose, title, children }) {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={onClose}>
            <div style={{ background: 'white', borderRadius: '20px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', margin: 0 }}>{title}</h2>
                </div>
                <div style={{ padding: '24px' }}>{children}</div>
            </div>
        </div>
    )
}

function AdminDirections() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ title: '', description: '', order: 0 })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api.get('/directions/').then(res => { setItems(res.data); setLoading(false) }).catch(() => setLoading(false))
    }, [])

    const openForm = (item = null) => {
        if (item) {
            setForm(item)
            setEditing(item)
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
                await api.put(`/directions/${editing.id}/`, data)
            } else {
                await api.post('/directions/', data)
            }
            setShowForm(false)
            const res = await api.get('/directions/')
            setItems(res.data)
            alert('Сохранено')
        } catch (err) { alert('Ошибка') }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить направление?')) {
            await api.delete(`/directions/${id}/`)
            const res = await api.get('/directions/')
            setItems(res.data)
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px' }}>Направления работы</h1>
                <button onClick={() => openForm()} style={buttonStyle}>+ Добавить направление</button>
            </div>

            <div style={cardStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f5f0e0' }}>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Название</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Описание</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e0d5c0' }}>
                                <td style={{ padding: '15px' }}>{item.title}</td>
                                <td style={{ padding: '15px' }}>{item.description?.substring(0, 50)}...</td>
                                <td style={{ padding: '15px' }}>
                                    <button onClick={() => openForm(item)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>✏️</button>
                                    <button onClick={() => handleDelete(item.id)} style={deleteButton}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <Modal onClose={() => setShowForm(false)} title={editing ? 'Редактировать направление' : 'Новое направление'}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Название" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
                        <textarea placeholder="Описание" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required style={inputStyle} />
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Иконка</label>
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                            {editing && editing.icon_url && !imageFile && <p style={{ fontSize: '12px', marginTop: '4px' }}>Текущее: {editing.icon_url.split('/').pop()}</p>}
                        </div>
                        <input type="number" placeholder="Порядок" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                            <button type="button" onClick={() => setShowForm(false)} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
                            <button type="submit" disabled={saving} style={buttonStyle}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default AdminDirections