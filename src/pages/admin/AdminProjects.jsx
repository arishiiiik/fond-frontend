import { useState, useEffect } from 'react'
import api from '../../services/api.js'

function AdminProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [form, setForm] = useState({
        title: '', slug: '', city: '', short_description: '',
        full_description: '', status: 'active', date: '', goal: '', beneficiaries: '', order: 0
    })
    const [saving, setSaving] = useState(false)

    const loadProjects = async () => {
        try {
            const res = await api.get('/projects/')
            setProjects(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            console.error('Ошибка загрузки:', err)
            alert('Ошибка загрузки: ' + (err.response?.data?.detail || err.message))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadProjects() }, [])

    const openForm = (project = null) => {
        if (project) {
            setForm({
                title: project.title || '',
                slug: project.slug || '',
                city: project.city || '',
                short_description: project.short_description || '',
                full_description: project.full_description || '',
                status: project.status || 'active',
                date: project.date || '',
                goal: project.goal || '',
                beneficiaries: project.beneficiaries || '',
                order: project.order || 0
            })
            setEditing(project)
        } else {
            setForm({
                title: '', slug: '', city: '', short_description: '',
                full_description: '', status: 'active', date: '', goal: '', beneficiaries: '', order: 0
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
        data.append('title', form.title)
        data.append('slug', form.slug)
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
                await api.put(`/projects/${editing.slug}/`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                alert('Проект обновлен!')
            } else {
                await api.post('/projects/', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                alert('Проект создан!')
            }
            setShowForm(false)
            loadProjects()
        } catch (err) {
            console.error('Ошибка сохранения:', err)
            let errorMessage = 'Ошибка при сохранении: '
            if (err.response?.status === 403) {
                errorMessage += 'Нет прав доступа. Проверьте, что вы вошли как администратор.'
            } else if (err.response?.data?.detail) {
                errorMessage += err.response.data.detail
            } else if (err.response?.data) {
                errorMessage += JSON.stringify(err.response.data)
            } else {
                errorMessage += err.message
            }
            alert(errorMessage)
        }
        setSaving(false)
    }

    const handleDelete = async (slug) => {
        if (confirm('Удалить проект?')) {
            try {
                await api.delete(`/projects/${slug}/`)
                loadProjects()
                alert('Проект удален')
            } catch (err) {
                console.error('Ошибка удаления:', err)
                let errorMessage = 'Ошибка при удалении: '
                if (err.response?.status === 403) {
                    errorMessage += 'Нет прав доступа.'
                } else {
                    errorMessage += err.response?.data?.detail || err.message
                }
                alert(errorMessage)
            }
        }
    }

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка проектов...</div>

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <h1 style={{
                    fontFamily: 'Vezitsa, sans-serif',
                    color: '#825B2C',
                    fontSize: '32px',
                    margin: 0
                }}>Проекты</h1>
                <button onClick={() => openForm()} style={{
                    background: 'linear-gradient(90deg, #419037 0%, #92BA52 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat-Bold, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                }}>
                    + Добавить проект
                </button>
            </div>

            {projects.length === 0 ? (
                <p>Нет проектов. Добавьте первый проект.</p>
            ) : (
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 0 20px rgba(130, 91, 44, 0.1)',
                    overflow: 'hidden'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontFamily: 'Montserrat-Regular, sans-serif'
                    }}>
                        <thead style={{ background: '#f5f0e0' }}>
                            <tr>
                                <th style={{ padding: '15px', textAlign: 'left', color: '#825B2C' }}>ID</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: '#825B2C' }}>Название</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: '#825B2C' }}>Локация</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: '#825B2C' }}>Статус</th>
                                <th style={{ padding: '15px', textAlign: 'left', color: '#825B2C' }}>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px' }}>{p.id}</td>
                                    <td style={{ padding: '15px', fontWeight: '500' }}>{p.title}</td>
                                    <td style={{ padding: '15px' }}>{p.city}</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{
                                            background: p.status === 'active' ? '#e8f5e9' : 
                                                       p.status === 'annual' ? '#e3f2fd' : '#fff3e0',
                                            color: p.status === 'active' ? '#419037' : 
                                                   p.status === 'annual' ? '#1976d2' : '#886429',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        }}>
                                            {p.status_display || p.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button 
                                            onClick={() => openForm(p)} 
                                            style={{
                                                marginRight: '10px',
                                                padding: '6px 12px',
                                                background: '#419037',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '20px',
                                                cursor: 'pointer'
                                            }}
                                            title="Редактировать"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(p.slug)} 
                                            style={{
                                                padding: '6px 12px',
                                                background: '#e74c3c',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '20px',
                                                cursor: 'pointer'
                                            }}
                                            title="Удалить"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

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
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }} onClick={() => setShowForm(false)}>
                    <div style={{
                        background: 'white',
                        borderRadius: '25px',
                        width: '550px',
                        maxWidth: '90%',
                        maxHeight: '85%',
                        overflow: 'auto',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '20px 25px',
                            borderBottom: '1px solid #eee',
                            background: '#fffcea',
                            borderRadius: '25px 25px 0 0'
                        }}>
                            <h2 style={{
                                fontFamily: 'Vezitsa, sans-serif',
                                color: '#825B2C',
                                margin: 0
                            }}>{editing ? 'Редактировать проект' : 'Новый проект'}</h2>
                            <button onClick={() => setShowForm(false)} style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '28px',
                                cursor: 'pointer',
                                color: '#886429'
                            }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '25px' }}>
                                <input 
                                    type="text" 
                                    placeholder="Название" 
                                    value={form.title} 
                                    onChange={e => setForm({...form, title: e.target.value})} 
                                    required 
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box' }} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Slug (уникальный идентификатор)" 
                                    value={form.slug} 
                                    onChange={e => setForm({...form, slug: e.target.value})} 
                                    required 
                                    disabled={!!editing} 
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box', background: editing ? '#f5f5f5' : 'white' }} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Локация" 
                                    value={form.city} 
                                    onChange={e => setForm({...form, city: e.target.value})} 
                                    required 
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box' }} 
                                />
                                <textarea 
                                    placeholder="Краткое описание" 
                                    value={form.short_description} 
                                    onChange={e => setForm({...form, short_description: e.target.value})} 
                                    rows="2" 
                                    required
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box', resize: 'vertical' }} 
                                />
                                <textarea 
                                    placeholder="Полное описание" 
                                    value={form.full_description} 
                                    onChange={e => setForm({...form, full_description: e.target.value})} 
                                    rows="4" 
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box', resize: 'vertical' }} 
                                />
                                <select 
                                    value={form.status} 
                                    onChange={e => setForm({...form, status: e.target.value})} 
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box' }}
                                >
                                    <option value="active">Активный</option>
                                    <option value="completed">Завершён</option>
                                    <option value="annual">Ежегодный</option>
                                </select>
                                <input 
                                    type="text" 
                                    placeholder="Дата (например: 2024 год)" 
                                    value={form.date} 
                                    onChange={e => setForm({...form, date: e.target.value})} 
                                    required
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box' }} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Цель проекта" 
                                    value={form.goal} 
                                    onChange={e => setForm({...form, goal: e.target.value})} 
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box' }} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Бенефициары (кто получает помощь)" 
                                    value={form.beneficiaries} 
                                    onChange={e => setForm({...form, beneficiaries: e.target.value})} 
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box' }} 
                                />
                                <input 
                                    type="number" 
                                    placeholder="Порядок сортировки" 
                                    value={form.order} 
                                    onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} 
                                    style={{ width: '100%', padding: '12px', margin: '8px 0', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box' }} 
                                />
                                <div style={{ margin: '8px 0' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', color: '#886429', fontWeight: '500' }}>
                                        Изображение проекта:
                                    </label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => setImageFile(e.target.files[0])}
                                        style={{ width: '100%', padding: '12px', border: '2px solid #e0d5c0', borderRadius: '15px', boxSizing: 'border-box' }} 
                                    />
                                    {editing && !imageFile && editing.image_url && (
                                        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                            📷 Текущее изображение: {editing.image_url.split('/').pop()}
                                        </p>
                                    )}
                                    {imageFile && (
                                        <p style={{ fontSize: '12px', color: '#419037', marginTop: '5px' }}>
                                            ✅ Выбран файл: {imageFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div style={{
                                padding: '20px 25px',
                                borderTop: '1px solid #eee',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '15px'
                            }}>
                                <button type="button" onClick={() => setShowForm(false)} style={{
                                    padding: '10px 25px',
                                    background: '#f0f0f0',
                                    border: 'none',
                                    borderRadius: '25px',
                                    cursor: 'pointer',
                                    fontFamily: 'Montserrat-Bold'
                                }}>Отмена</button>
                                <button type="submit" disabled={saving} style={{
                                    padding: '10px 25px',
                                    background: 'linear-gradient(90deg, #419037 0%, #92BA52 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '25px',
                                    cursor: 'pointer',
                                    fontFamily: 'Montserrat-Bold',
                                    opacity: saving ? 0.7 : 1
                                }}>
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

export default AdminProjects