import { useState, useEffect } from 'react'
import api from '../../services/api.js'  // ← изменено с ../services/api на ../../services/api.js

function AdminDocuments() {
    const [docs, setDocs] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ title: '', file: null, order: 0 })
    const [saving, setSaving] = useState(false)

    const loadDocs = async () => {
        try {
            const res = await api.get('/documents/')
            setDocs(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            console.error('Ошибка загрузки:', err)
            alert('Ошибка загрузки: ' + (err.response?.data?.detail || err.message))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadDocs() }, [])

    const openForm = (doc = null) => {
        if (doc) {
            setForm({ title: doc.title || '', file: null, order: doc.order || 0 })
            setEditing(doc)
        } else {
            setForm({ title: '', file: null, order: 0 })
            setEditing(null)
        }
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        data.append('title', form.title)
        data.append('order', form.order)
        if (form.file) data.append('file', form.file)

        try {
            if (editing) {
                await api.put(`/documents/${editing.id}/`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            } else {
                await api.post('/documents/', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }
            setShowForm(false)
            loadDocs()
            alert('Сохранено успешно!')
        } catch (err) {
            console.error('Ошибка сохранения:', err)
            alert('Ошибка при сохранении: ' + (err.response?.data?.detail || err.message))
        }
        setSaving(false)
    }

    const handleDelete = async (id) => {
        if (confirm('Удалить документ?')) {
            try {
                await api.delete(`/documents/${id}/`)
                loadDocs()
                alert('Документ удален')
            } catch (err) {
                console.error('Ошибка удаления:', err)
                alert('Ошибка при удалении: ' + (err.response?.data?.detail || err.message))
            }
        }
    }

    if (loading) return <div>Загрузка документов...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Документы</h1>
                <button onClick={() => openForm()} style={{
                    background: '#419037',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}>
                    + Добавить документ
                </button>
            </div>

            {docs.length === 0 ? (
                <p>Нет документов. Добавьте первый документ.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                    <thead style={{ background: '#f0f0f0' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Название</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Файл</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Порядок</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docs.map(d => (
                            <tr key={d.id}>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{d.id}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{d.title}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                    {d.file_url && <a href={d.file_url} target="_blank" rel="noopener noreferrer">Скачать</a>}
                                </td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{d.order}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                    <button onClick={() => openForm(d)} style={{ marginRight: '8px', padding: '4px 12px', cursor: 'pointer' }}>✏️</button>
                                    <button onClick={() => handleDelete(d.id)} style={{ padding: '4px 12px', cursor: 'pointer', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                            <h2>{editing ? 'Редактировать документ' : 'Новый документ'}</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '15px' }}>
                                <input 
                                    type="text" 
                                    placeholder="Название" 
                                    value={form.title} 
                                    onChange={e => setForm({...form, title: e.target.value})} 
                                    required 
                                    style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} 
                                />
                                <input 
                                    type="file" 
                                    accept=".pdf,.docx,.doc" 
                                    onChange={e => setForm({...form, file: e.target.files[0]})} 
                                    required={!editing} 
                                    style={{ width: '100%', padding: '8px', margin: '8px 0' }} 
                                />
                                <input 
                                    type="number" 
                                    placeholder="Порядок" 
                                    value={form.order} 
                                    onChange={e => setForm({...form, order: parseInt(e.target.value)})} 
                                    style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px' }} 
                                />
                                {editing && !form.file && (
                                    <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                                        Оставьте поле файла пустым, чтобы сохранить текущий файл
                                    </p>
                                )}
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

export default AdminDocuments