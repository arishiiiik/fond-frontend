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
        await api.patch(`/contacts/${id}/`, { [field]: value })
        setItems(items.map(c => c.id === id ? { ...c, [field]: value } : c))
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
                <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px' }}>Контакты</h1>
                <button onClick={addContact} style={buttonStyle}>+ Добавить контакт</button>
            </div>

            {items.map(contact => (
                <div key={contact.id} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <input type="text" value={contact.city} onChange={e => updateContact(contact.id, 'city', e.target.value)} style={{ ...inputStyle, fontSize: '18px', fontWeight: 'bold', width: 'auto' }} />
                        <button onClick={() => deleteContact(contact.id)} style={deleteButton}>Удалить</button>
                    </div>
                    <input type="text" placeholder="Адрес" value={contact.address} onChange={e => updateContact(contact.id, 'address', e.target.value)} style={inputStyle} />
                    <input type="text" placeholder="Телефон" value={contact.phone} onChange={e => updateContact(contact.id, 'phone', e.target.value)} style={inputStyle} />
                    <input type="email" placeholder="Email" value={contact.email} onChange={e => updateContact(contact.id, 'email', e.target.value)} style={inputStyle} />
                    <input type="url" placeholder="VK URL" value={contact.vk_url || ''} onChange={e => updateContact(contact.id, 'vk_url', e.target.value)} style={inputStyle} />
                </div>
            ))}
        </div>
    )
}

export default AdminContactsPage