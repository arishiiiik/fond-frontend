import { useState, useEffect } from 'react'
import api from '../../services/api.js'

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
            } catch (err) {
                console.error('Ошибка удаления:', err)
                alert('Ошибка при удалении')
            }
        }
    }

    if (loading) return <div>Загрузка команды...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Команда</h1>
                <button onClick={() => openForm()} style={{
                    background: '#419037',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}>+ Добавить сотрудника</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <thead style={{ background: '#f0f0f0' }}>
                    <tr>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Имя</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Должность</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {team.map(m => (
                        <tr key={m.id}>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{m.id}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{m.name}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{m.position}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{m.email}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                <button onClick={() => openForm(m)} style={{ marginRight: '8px', padding: '4px 12px', cursor: 'pointer' }}>✏️</button>
                                <button onClick={() => handleDelete(m.id)} style={{ padding: '4px 12px', cursor: 'pointer', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px' }}>🗑️</button>
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
                            <h2>{editing ? 'Редактировать сотрудника' : 'Новый сотрудник'}</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '15px' }}>
                                <input type="text" placeholder="Имя" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <input type="text" placeholder="Должность" value={form.position} onChange={e => setForm({...form, position: e.target.value})} required style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <input type="text" placeholder="Телефон" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <input type="url" placeholder="VK URL" value={form.vk_url} onChange={e => setForm({...form, vk_url: e.target.value})} style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                                <input type="number" placeholder="Порядок" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ padding: '15px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 16px', cursor: 'pointer' }}>Отмена</button>
                                <button type="submit" disabled={saving} style={{ padding: '8px 16px', background: '#419037', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
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

export default AdminTeam