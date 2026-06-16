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

function AdminPrivacy() {
    const [privacy, setPrivacy] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
        loadPrivacy()
    }, [])

    const loadPrivacy = async () => {
        const res = await api.get('/privacy/')
        const data = res.data
        setPrivacy(data)
        setForm({
            title: data?.title || 'Политика обработки персональных данных',
            content: data?.content || ''
        })
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            if (privacy?.id) {
                await api.put(`/privacy/${privacy.id}/`, form)
                alert('Политика обновлена')
            } else {
                await api.post('/privacy/', form)
                alert('Политика создана')
            }
            loadPrivacy()
        } catch (err) {
            alert('Ошибка: ' + (err.response?.data?.detail || err.message))
        }
        setSaving(false)
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px' }}>Политика конфиденциальности</h1>
            </div>

            <div style={cardStyle}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Заголовок страницы"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                        style={inputStyle}
                    />
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Содержимое страницы (HTML)</label>
                        <textarea
                            placeholder="Введите HTML содержимое страницы политики конфиденциальности"
                            value={form.content}
                            onChange={e => setForm({ ...form, content: e.target.value })}
                            rows={20}
                            required
                            style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '13px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px', padding: '12px', background: '#f5f0e0', borderRadius: '15px' }}>
                        <p style={{ fontSize: '12px', color: '#886429', margin: 0 }}>
                            Поддерживается HTML-разметка: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;a&gt; и другие.
                            Рекомендуется использовать стили из глобального CSS.
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                        <button type="submit" disabled={saving} style={buttonStyle}>
                            {saving ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>

            <div style={cardStyle}>
                <h3 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', marginBottom: '16px' }}>Предпросмотр</h3>
                <div 
                    className="privacy-content"
                    dangerouslySetInnerHTML={{ __html: form.content }}
                    style={{ maxHeight: '400px', overflow: 'auto', padding: '15px', background: '#fffcea', borderRadius: '15px' }}
                />
            </div>
        </div>
    )
}

export default AdminPrivacy