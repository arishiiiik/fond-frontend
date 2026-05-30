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
            <div style={{ background: 'white', borderRadius: '20px', width: '550px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', margin: 0 }}>{title}</h2>
                </div>
                <div style={{ padding: '24px' }}>{children}</div>
            </div>
        </div>
    )
}

function Field({ label, textarea, rows, type = 'text', value, onChange, required, disabled }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>{label}{required && ' *'}</label>
            {textarea ? (
                <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} disabled={disabled} />
            ) : (
                <input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} disabled={disabled} required={required} />
            )}
        </div>
    )
}

function AdminProjects() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({
        title: '', slug: '', city: '', short_description: '', full_description: '',
        status: 'active', date: '', goal: '', beneficiaries: '', order: 0
    })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        api.get('/projects/').then(res => { setItems(res.data); setLoading(false) }).catch(() => setLoading(false))
    }, [])

    const openForm = (item = null) => {
        if (item) {
            setForm({
                title: item.title || '',
                slug: item.slug || '',
                city: item.city || '',
                short_description: item.short_description || '',
                full_description: item.full_description || '',
                status: item.status || 'active',
                date: item.date || '',
                goal: item.goal || '',
                beneficiaries: item.beneficiaries || '',
                order: item.order || 0
            })
            setEditing(item)
        } else {
            setForm({
                title: '', slug: '', city: '', short_description: '', full_description: '',
                status: 'active', date: '', goal: '', beneficiaries: '', order: 0
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
        
        // slug отправляем ТОЛЬКО при создании нового проекта
        if (!editing) {
            data.append('slug', form.slug)
        }
        data.append('title', form.title)
        data.append('city', form.city)
        data.append('short_description', form.short_description)
        data.append('full_description', form.full_description)
        data.append('status', form.status)
        data.append('date', form.date)
        data.append('goal', form.goal)
        data.append('beneficiaries', form.beneficiaries)
        data.append('order', form.order)
        if (imageFile) {
            data.append('image', imageFile)
        }

        try {
            if (editing) {
                await api.put(`/projects/${editing.slug}/`, data)
                alert('Проект обновлён')
            } else {
                await api.post('/projects/', data)
                alert('Проект создан')
            }
            setShowForm(false)
            const res = await api.get('/projects/')
            setItems(res.data)
        } catch (err) {
            console.error(err)
            alert('Ошибка: ' + (err.response?.data?.detail || err.message))
        }
        setSaving(false)
    }

    const handleDelete = async (slug) => {
        if (confirm('Удалить проект?')) {
            await api.delete(`/projects/${slug}/`)
            const res = await api.get('/projects/')
            setItems(res.data)
            alert('Проект удалён')
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px' }}>Проекты</h1>
                <button onClick={() => openForm()} style={buttonStyle}>+ Добавить проект</button>
            </div>

            <div style={cardStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f5f0e0' }}>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Название</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Локация</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Статус</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e0d5c0' }}>
                                <td style={{ padding: '15px' }}>{item.title}</td>
                                <td style={{ padding: '15px' }}>{item.city}</td>
                                <td style={{ padding: '15px' }}>{item.status_display || item.status}</td>
                                <td style={{ padding: '15px' }}>
                                    <button onClick={() => openForm(item)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>✏️</button>
                                    <button onClick={() => handleDelete(item.slug)} style={deleteButton}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <Modal onClose={() => setShowForm(false)} title={editing ? 'Редактировать проект' : 'Новый проект'}>
                    <form onSubmit={handleSubmit}>
                        <Field label="Название" value={form.title} onChange={val => setForm({ ...form, title: val })} required />
                        <Field label="Slug" value={form.slug} onChange={val => setForm({ ...form, slug: val })} required disabled={!!editing} />
                        <Field label="Локация" value={form.city} onChange={val => setForm({ ...form, city: val })} required />
                        <Field label="Краткое описание" textarea rows={2} value={form.short_description} onChange={val => setForm({ ...form, short_description: val })} required />
                        <Field label="Полное описание" textarea rows={4} value={form.full_description} onChange={val => setForm({ ...form, full_description: val })} />
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle} required>
                            <option value="active">Активный</option>
                            <option value="completed">Завершён</option>
                            <option value="annual">Ежегодный</option>
                        </select>
                        <Field label="Дата" value={form.date} onChange={val => setForm({ ...form, date: val })} required />
                        <Field label="Цель" value={form.goal} onChange={val => setForm({ ...form, goal: val })} />
                        <Field label="Бенефициары" value={form.beneficiaries} onChange={val => setForm({ ...form, beneficiaries: val })} />
                        <Field label="Порядок" type="number" value={form.order} onChange={val => setForm({ ...form, order: parseInt(val) || 0 })} />
                        
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Изображение</label>
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                            {editing && editing.image_url && !imageFile && (
                                <p style={{ fontSize: '12px', marginTop: '4px' }}>Текущее: {editing.image_url.split('/').pop()}</p>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button type="button" onClick={() => setShowForm(false)} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
                            <button type="submit" disabled={saving} style={buttonStyle}>
                                {saving ? 'Сохранение...' : 'Сохранить'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default AdminProjects