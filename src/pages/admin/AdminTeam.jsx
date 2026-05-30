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

function AdminTeam() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ name: '', position: '', email: '', phone: '', vk_url: '', order: 0 })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api.get('/team/').then(res => { setItems(res.data); setLoading(false) }).catch(() => setLoading(false))
    }, [])

    const openForm = (item = null) => {
        if (item) {
            setForm(item)
            setEditing(item)
        } else {
            setForm({ name: '', position: '', email: '', phone: '', vk_url: '', order: 0 })
            setEditing(null)
        }
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editing) {
                await api.put(`/team/${editing.id}/`, form)
            } else {
                await api.post('/team/', form)
            }
            setShowForm(false)
            const res = await api.get('/team/')
            setItems(res.data)
            alert('Сохранено')
        } catch (err) { alert('Ошибка') }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить сотрудника?')) {
            await api.delete(`/team/${id}/`)
            const res = await api.get('/team/')
            setItems(res.data)
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px' }}>Команда</h1>
                <button onClick={() => openForm()} style={buttonStyle}>+ Добавить сотрудника</button>
            </div>

            <div style={cardStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f5f0e0' }}>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Имя</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Должность</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e0d5c0' }}>
                                <td style={{ padding: '15px' }}>{item.name}</td>
                                <td style={{ padding: '15px' }}>{item.position}</td>
                                <td style={{ padding: '15px' }}>{item.email}</td>
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
                <Modal onClose={() => setShowForm(false)} title={editing ? 'Редактировать сотрудника' : 'Новый сотрудник'}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Имя" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
                        <input type="text" placeholder="Должность" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required style={inputStyle} />
                        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={inputStyle} />
                        <input type="text" placeholder="Телефон" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                        <input type="url" placeholder="VK URL" value={form.vk_url} onChange={e => setForm({ ...form, vk_url: e.target.value })} style={inputStyle} />
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

export default AdminTeam