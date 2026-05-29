import { useState, useEffect } from 'react'
import api from '../../services/api'

function AdminProjects() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ title: '', slug: '', city: '', short_description: '', full_description: '', status: 'active', date: '', goal: '', beneficiaries: '', order: 0 })
    const [saving, setSaving] = useState(false)
    const [imageFile, setImageFile] = useState(null)

    useEffect(() => {
        api.get('/projects/').then(res => { setItems(res.data); setLoading(false) }).catch(() => setLoading(false))
    }, [])

    const openForm = (item = null) => {
        if (item) {
            setForm(item)
            setEditing(item)
        } else {
            setForm({ title: '', slug: '', city: '', short_description: '', full_description: '', status: 'active', date: '', goal: '', beneficiaries: '', order: 0 })
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
                await api.put(`/projects/${editing.slug}/`, data)
            } else {
                await api.post('/projects/', data)
            }
            setShowForm(false)
            const res = await api.get('/projects/')
            setItems(res.data)
            alert('Сохранено')
        } catch (err) {
            alert('Ошибка')
        }
        setSaving(false)
    }

    const handleDelete = async (slug) => {
        if (confirm('Удалить проект?')) {
            await api.delete(`/projects/${slug}/`)
            const res = await api.get('/projects/')
            setItems(res.data)
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px' }}>Проекты</h1>
                <button onClick={() => openForm()} style={buttonStyle}>+ Добавить проект</button>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Название</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Локация</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Статус</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '12px' }}>{item.title}</td>
                                <td style={{ padding: '12px' }}>{item.city}</td>
                                <td style={{ padding: '12px' }}>{item.status_display || item.status}</td>
                                <td style={{ padding: '12px' }}>
                                    <button onClick={() => openForm(item)} style={{ ...smallButton, marginRight: '8px' }}>✏️</button>
                                    <button onClick={() => handleDelete(item.slug)} style={{ ...smallButton, background: '#ef4444' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <Modal onClose={() => setShowForm(false)} title={editing ? 'Редактировать проект' : 'Новый проект'}>
                    <form onSubmit={handleSubmit}>
                        <Field label="Название" value={form.title} onChange={val => setForm({...form, title: val})} required />
                        <Field label="Slug" value={form.slug} onChange={val => setForm({...form, slug: val})} required disabled={!!editing} />
                        <Field label="Локация" value={form.city} onChange={val => setForm({...form, city: val})} required />
                        <Field label="Краткое описание" textarea rows={2} value={form.short_description} onChange={val => setForm({...form, short_description: val})} required />
                        <Field label="Полное описание" textarea rows={4} value={form.full_description} onChange={val => setForm({...form, full_description: val})} />
                        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={inputStyle} required>
                            <option value="active">Активный</option>
                            <option value="completed">Завершён</option>
                            <option value="annual">Ежегодный</option>
                        </select>
                        <Field label="Дата" value={form.date} onChange={val => setForm({...form, date: val})} required />
                        <Field label="Цель" value={form.goal} onChange={val => setForm({...form, goal: val})} />
                        <Field label="Бенефициары" value={form.beneficiaries} onChange={val => setForm({...form, beneficiaries: val})} />
                        <Field label="Порядок" type="number" value={form.order} onChange={val => setForm({...form, order: parseInt(val) || 0})} />
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Изображение</label>
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                            {editing && editing.image_url && !imageFile && <p style={{ fontSize: '12px', marginTop: '4px' }}>Текущее: {editing.image_url.split('/').pop()}</p>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button type="button" onClick={() => setShowForm(false)} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
                            <button type="submit" disabled={saving} style={buttonStyle}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default AdminProjects