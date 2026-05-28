import { useState, useEffect } from 'react'
import api from '../../services/api.js'

function AdminContactsPage() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    const loadContacts = async () => {
        try {
            const res = await api.get('/contacts/')
            setContacts(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            console.error('Ошибка:', err)
            alert('Ошибка загрузки: ' + (err.response?.data?.detail || err.message))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadContacts() }, [])

    const addContact = async () => {
        try {
            const res = await api.post('/contacts/', {
                city: 'Новый город',
                address: 'Адрес',
                phone: '+7 (000) 000-00-00',
                email: 'email@example.com',
                vk_url: '',
                order: contacts.length
            })
            setContacts([...contacts, res.data])
            alert('Контакт добавлен!')
        } catch (err) {
            alert('Ошибка: ' + (err.response?.data?.detail || err.message))
        }
    }

    const updateContact = async (id, field, value) => {
        try {
            await api.patch(`/contacts/${id}/`, { [field]: value })
            setContacts(contacts.map(c => c.id === id ? { ...c, [field]: value } : c))
        } catch (err) {
            alert('Ошибка обновления')
        }
    }

    const deleteContact = async (id) => {
        if (confirm('Удалить контакт?')) {
            try {
                await api.delete(`/contacts/${id}/`)
                setContacts(contacts.filter(c => c.id !== id))
                alert('Контакт удален!')
            } catch (err) {
                alert('Ошибка удаления')
            }
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Редактирование контактов</h1>
                <button onClick={addContact} style={{
                    background: '#419037',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}>
                    + Добавить контакт
                </button>
            </div>

            {contacts.length === 0 ? (
                <p>Нет контактов. Добавьте первый контакт.</p>
            ) : (
                contacts.map(contact => (
                    <div key={contact.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px', background: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <input 
                                type="text" 
                                value={contact.city} 
                                onChange={e => updateContact(contact.id, 'city', e.target.value)} 
                                style={{ fontSize: '20px', fontWeight: 'bold', padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                                placeholder="Город"
                            />
                            <button onClick={() => deleteContact(contact.id)} style={{
                                padding: '5px 10px',
                                background: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                Удалить
                            </button>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Адрес</label>
                            <input 
                                type="text" 
                                value={contact.address} 
                                onChange={e => updateContact(contact.id, 'address', e.target.value)} 
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Телефон</label>
                            <input 
                                type="text" 
                                value={contact.phone} 
                                onChange={e => updateContact(contact.id, 'phone', e.target.value)} 
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                            <input 
                                type="email" 
                                value={contact.email} 
                                onChange={e => updateContact(contact.id, 'email', e.target.value)} 
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>VK URL</label>
                            <input 
                                type="url" 
                                value={contact.vk_url || ''} 
                                onChange={e => updateContact(contact.id, 'vk_url', e.target.value)} 
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default AdminContactsPage