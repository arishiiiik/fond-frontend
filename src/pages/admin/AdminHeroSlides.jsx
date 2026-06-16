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

function AdminHeroSlides() {
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingSlide, setEditingSlide] = useState(null)
    const [form, setForm] = useState({
        title: '',
        subtitle: '',
        description: '',
        button_text: 'Узнать больше',
        button_link: '/projects',
        order: 0,
        is_active: true
    })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadSlides()
    }, [])

    const loadSlides = async () => {
        const res = await api.get('/hero-slides/')
        setSlides(res.data)
        setLoading(false)
    }

    const openForm = (slide = null) => {
        if (slide) {
            setEditingSlide(slide)
            setForm({
                title: slide.title || '',
                subtitle: slide.subtitle || '',
                description: slide.description || '',
                button_text: slide.button_text || 'Узнать больше',
                button_link: slide.button_link || '/projects',
                order: slide.order || 0,
                is_active: slide.is_active !== undefined ? slide.is_active : true
            })
        } else {
            setEditingSlide({})
            setForm({
                title: '',
                subtitle: '',
                description: '',
                button_text: 'Узнать больше',
                button_link: '/projects',
                order: slides.length,
                is_active: true
            })
        }
        setImageFile(null)
    }

    const closeForm = () => {
        setEditingSlide(null)
        setForm({
            title: '',
            subtitle: '',
            description: '',
            button_text: 'Узнать больше',
            button_link: '/projects',
            order: 0,
            is_active: true
        })
        setImageFile(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        data.append('title', form.title)
        data.append('subtitle', form.subtitle)
        data.append('description', form.description)
        data.append('button_text', form.button_text)
        data.append('button_link', form.button_link)
        data.append('order', form.order)
        data.append('is_active', form.is_active)
        if (imageFile) data.append('image', imageFile)

        try {
            if (editingSlide.id) {
                await api.put(`/hero-slides/${editingSlide.id}/`, data)
                alert('Слайд обновлён')
            } else {
                await api.post('/hero-slides/', data)
                alert('Слайд создан')
            }
            closeForm()
            loadSlides()
        } catch (err) {
            alert('Ошибка: ' + (err.response?.data?.detail || err.message))
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить слайд?')) {
            await api.delete(`/hero-slides/${id}/`)
            loadSlides()
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px' }}>Слайды на главной</h1>
                <button onClick={() => openForm()} style={buttonStyle}>+ Добавить слайд</button>
            </div>

            {slides.map(slide => (
                <div key={slide.id} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ color: '#825B2C', fontFamily: 'Vezitsa, sans-serif' }}>
                            {slide.title}
                            {!slide.is_active && <span style={{ color: '#e74c3c', fontSize: '12px', marginLeft: '10px' }}>[Неактивен]</span>}
                        </h3>
                        <div>
                            <button onClick={() => openForm(slide)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>Редактировать</button>
                            <button onClick={() => handleDelete(slide.id)} style={deleteButton}>Удалить</button>
                        </div>
                    </div>
                    <p style={{ color: '#666' }}>{slide.description?.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#886429', marginTop: '10px' }}>
                        <span>Порядок: {slide.order}</span>
                        <span>Кнопка: {slide.button_text} → {slide.button_link}</span>
                    </div>
                </div>
            ))}

            {editingSlide !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={closeForm}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '550px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                            <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C' }}>{editingSlide.id ? 'Редактировать слайд' : 'Новый слайд'}</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '24px' }}>
                                <input type="text" placeholder="Заголовок" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
                                <input type="text" placeholder="Подзаголовок" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} style={inputStyle} />
                                <textarea placeholder="Текст слайда" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} required style={inputStyle} />
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <input type="text" placeholder="Текст кнопки" value={form.button_text} onChange={e => setForm({ ...form, button_text: e.target.value })} style={{ ...inputStyle, width: '50%' }} />
                                    <input type="text" placeholder="Ссылка кнопки" value={form.button_link} onChange={e => setForm({ ...form, button_link: e.target.value })} style={{ ...inputStyle, width: '50%' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <input type="number" placeholder="Порядок" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} style={{ ...inputStyle, width: '50%' }} />
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '50%' }}>
                                        <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
                                        Активен
                                    </label>
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Фоновое изображение</label>
                                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                                </div>
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

export default AdminHeroSlides