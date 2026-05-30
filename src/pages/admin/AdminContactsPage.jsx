import { useState, useEffect } from 'react'
import api from '../../services/api'

const buttonStyle = {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
}

const deleteButton = {
    background: '#ef4444',
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

function AdminContactsPage() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/contacts/').then(res => { setItems(res.data); setLoading(false) }).catch(() => setLoading(false))
    }, [])

    const addContact = async () => {
        try {
            const res = await api.post('/contacts/', { city: 'Новый город', address: 'Адрес', phone: '+7 (000) 000-00-00', email: 'email@example.com', vk_url: '', order: items.length })
            setItems([...items, res.data])
            alert('Добавлено')
        } catch (err) { alert('Ошибка') }
    }

    const updateContact = async (id, field, value) => {
        try {
            await api.patch(`/contacts/${id}/`, { [field]: value })
            setItems(items.map(c => c.id === id ? { ...c, [field]: value } : c))
        } catch (err) { console.error(err) }
    }

    const deleteContact = async (id) => {
        if (confirm('Удалить контакт?')) {
            await api.delete(`/contacts/${id}/`)
            setItems(items.filter(c => c.id !== id))
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px' }}>Контакты</h1>
                <button onClick={addContact} style={buttonStyle}>+ Добавить контакт</button>
            </div>

            {items.map(contact => (
                <div key={contact.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '16px', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <input type="text" value={contact.city} onChange={e => updateContact(contact.id, 'city', e.target.value)} style={{ ...inputStyle, width: 'auto', fontSize: '18px', fontWeight: 'bold' }} />
                        <button onClick={() => deleteContact(contact.id)} style={deleteButton}>Удалить</button>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label>Адрес</label>
                        <input type="text" value={contact.address} onChange={e => updateContact(contact.id, 'address', e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label>Телефон</label>
                        <input type="text" value={contact.phone} onChange={e => updateContact(contact.id, 'phone', e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label>Email</label>
                        <input type="email" value={contact.email} onChange={e => updateContact(contact.id, 'email', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                        <label>VK URL</label>
                        <input type="url" value={contact.vk_url || ''} onChange={e => updateContact(contact.id, 'vk_url', e.target.value)} style={inputStyle} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AdminContactsPage