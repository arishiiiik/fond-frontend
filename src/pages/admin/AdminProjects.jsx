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

function AdminProjects() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingItem, setEditingItem] = useState(null) // ← объект, который редактируем
    const [form, setForm] = useState({
        title: '', slug: '', city: '', short_description: '', full_description: '',
        status: 'active', date: '', goal: '', beneficiaries: '', order: 0
    })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        const res = await api.get('/projects/')
        setItems(res.data)
        setLoading(false)
    }

    const openEditForm = (item) => {
        setEditingItem(item)
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
        setImageFile(null)
    }

    const closeForm = () => {
        setEditingItem(null)
        setForm({
            title: '', slug: '', city: '', short_description: '', full_description: '',
            status: 'active', date: '', goal: '', beneficiaries: '', order: 0
        })
        setImageFile(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        data.append('title', form.title)
        data.append('city', form.city)
        data.append('short_description', form.short_description)
        data.append('full_description', form.full_description)
        data.append('status', form.status)
        data.append('date', form.date)
        data.append('goal', form.goal)
        data.append('beneficiaries', form.beneficiaries)
        data.append('order', form.order)
        if (imageFile) data.append('image', imageFile)

        try {
            if (editingItem) {
                await api.put(`/projects/${editingItem.slug}/`, data)
                alert('Проект обновлён')
            } else {
                data.append('slug', form.slug)
                await api.post('/projects/', data)
                alert('Проект создан')
            }
            closeForm()
            loadItems()
        } catch (err) {
            alert('Ошибка: ' + (err.response?.data?.detail || err.message))
        }
        setSaving(false)
    }

    const handleDelete = async (slug) => {
        if (confirm('Удалить проект?')) {
            await api.delete(`/projects/${slug}/`)
            loadItems()
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px' }}>Проекты</h1>
                <button onClick={() => openEditForm(null)} style={buttonStyle}>+ Добавить проект</button>
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
                                    <button onClick={() => openEditForm(item)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>Редактировать</button>
                                    <button onClick={() => handleDelete(item.slug)} style={deleteButton}>Удалить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Форма редактирования/добавления */}
            {editingItem !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={closeForm}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '550px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                            <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C' }}>Редактировать проект</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '24px' }}>
                                <input type="text" placeholder="Название" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
                                <input type="text" placeholder="Локация" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required style={inputStyle} />
                                <textarea placeholder="Краткое описание" value={form.short_description} onChange={e => setForm({ ...form, short_description: e.target.value })} rows={2} required style={inputStyle} />
                                <textarea placeholder="Полное описание" value={form.full_description} onChange={e => setForm({ ...form, full_description: e.target.value })} rows={4} style={inputStyle} />
                                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                                    <option value="active">Активный</option>
                                    <option value="completed">Завершён</option>
                                    <option value="annual">Ежегодный</option>
                                </select>
                                <input type="text" placeholder="Дата" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required style={inputStyle} />
                                <input type="text" placeholder="Цель" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} style={inputStyle} />
                                <input type="text" placeholder="Бенефициары" value={form.beneficiaries} onChange={e => setForm({ ...form, beneficiaries: e.target.value })} style={inputStyle} />
                                <input type="number" placeholder="Порядок" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Изображение</label>
                                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                    <button type="button" onClick={closeForm} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
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

export default AdminProjects