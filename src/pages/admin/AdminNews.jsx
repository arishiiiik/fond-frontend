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

function AdminNews() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingItem, setEditingItem] = useState(null)
    const [form, setForm] = useState({ title: '', description: '', date: '', link: '', order: 0 })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        const res = await api.get('/news/')
        setItems(res.data)
        setLoading(false)
    }

    const openEditForm = (item) => {
        if (item) {
            setEditingItem(item)
            setForm({
                title: item.title || '',
                description: item.description || '',
                date: item.date || '',
                link: item.link || '',
                order: item.order || 0
            })
        } else {
            setEditingItem({})
            setForm({ title: '', description: '', date: '', link: '', order: 0 })
        }
        setImageFile(null)
    }

    const closeForm = () => {
        setEditingItem(null)
        setForm({ title: '', description: '', date: '', link: '', order: 0 })
        setImageFile(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        data.append('title', form.title)
        data.append('description', form.description)
        data.append('date', form.date)
        data.append('link', form.link)
        data.append('order', form.order)
        if (imageFile) data.append('image', imageFile)

        try {
            if (editingItem.id) {
                await api.put(`/news/${editingItem.id}/`, data)
                alert('Новость обновлена')
            } else {
                await api.post('/news/', data)
                alert('Новость создана')
            }
            closeForm()
            loadItems()
        } catch (err) {
            alert('Ошибка')
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить новость?')) {
            await api.delete(`/news/${id}/`)
            loadItems()
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px' }}>Новости</h1>
                <button onClick={() => openEditForm(null)} style={buttonStyle}>+ Добавить новость</button>
            </div>

            <div style={cardStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f5f0e0' }}>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Заголовок</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Дата</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e0d5c0' }}>
                                <td style={{ padding: '15px' }}>{item.title}</td>
                                <td style={{ padding: '15px' }}>{item.date}</td>
                                <td style={{ padding: '15px' }}>
                                    <button onClick={() => openEditForm(item)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>Редактировать</button>
                                    <button onClick={() => handleDelete(item.id)} style={deleteButton}>Редактировать</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingItem !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={closeForm}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                            <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C' }}>Редактировать новость</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '24px' }}>
                                <input type="text" placeholder="Заголовок" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
                                <textarea placeholder="Описание" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} required style={inputStyle} />
                                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required style={inputStyle} />
                                <input type="url" placeholder="Ссылка" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} style={inputStyle} />
                                <div><label>Изображение</label><input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} /></div>
                                <input type="number" placeholder="Порядок" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
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

export default AdminNews