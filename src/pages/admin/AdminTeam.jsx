import { useState, useEffect } from 'react'
import api from '../../services/api'

const buttonStyle = {
    background: '#419037',
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

function AdminTeam() {
    const [team, setTeam] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({
        name: '', position: '', email: '', phone: '', vk_url: '', order: 0
    })
    const [saving, setSaving] = useState(false)

    const loadTeam = async () => {
        try {
            const res = await api.get('/team/')
            setTeam(res.data)
        } catch (err) {
            console.error('Ошибка загрузки:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadTeam() }, [])

    const openForm = (member = null) => {
        if (member) {
            setForm({
                name: member.name || '',
                position: member.position || '',
                email: member.email || '',
                phone: member.phone || '',
                vk_url: member.vk_url || '',
                order: member.order || 0
            })
            setEditing(member)
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
            loadTeam()
            alert('Сохранено')
        } catch (err) {
            console.error('Ошибка сохранения:', err)
            alert('Ошибка при сохранении')
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить сотрудника?')) {
            try {
                await api.delete(`/team/${id}/`)
                loadTeam()
                alert('Удалено')
            } catch (err) {
                console.error('Ошибка удаления:', err)
                alert('Ошибка при удалении')
            }
        }
    }

    if (loading) return <div>Загрузка команды...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px' }}>Команда</h1>
                <button onClick={() => openForm()} style={buttonStyle}>+ Добавить сотрудника</button>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Имя</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Должность</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map(m => (
                            <tr key={m.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '12px' }}>{m.name}</td>
                                <td style={{ padding: '12px' }}>{m.position}</td>
                                <td style={{ padding: '12px' }}>{m.email}</td>
                                <td style={{ padding: '12px' }}>
                                    <button onClick={() => openForm(m)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>✏️</button>
                                    <button onClick={() => handleDelete(m.id)} style={{ ...buttonStyle, background: '#ef4444', padding: '4px 12px' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={() => setShowForm(false)}>
                    <div style={{ background: 'white', borderRadius: '12px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '16px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ margin: 0 }}>{editing ? 'Редактировать сотрудника' : 'Новый сотрудник'}</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '24px' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px' }}>Имя *</label>
                                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px' }}>Должность *</label>
                                    <input type="text" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px' }}>Email *</label>
                                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px' }}>Телефон</label>
                                    <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px' }}>VK URL</label>
                                    <input type="url" value={form.vk_url} onChange={e => setForm({ ...form, vk_url: e.target.value })} style={inputStyle} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px' }}>Порядок</label>
                                    <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
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

export default AdminTeam