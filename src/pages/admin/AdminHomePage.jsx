import { useState, useEffect } from 'react'
import api from '../../services/api'

function AdminHomePage() {
    const [home, setHome] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/home/')
            .then(res => {
                const data = res.data?.[0] || res.data || {}
                setHome(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    const save = async () => {
        try {
            if (home?.id) {
                await api.put(`/home/${home.id}/`, home)
            } else {
                await api.post('/home/', home)
            }
            alert('Сохранено')
        } catch (err) {
            alert('Ошибка')
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Главная страница</h1>

            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', maxWidth: '700px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Hero-блок</h2>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Заголовок</label>
                    <input
                        type="text"
                        value={home?.hero_title || ''}
                        onChange={e => setHome({ ...home, hero_title: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Текст</label>
                    <textarea
                        value={home?.hero_text || ''}
                        onChange={e => setHome({ ...home, hero_text: e.target.value })}
                        rows="4"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Текст кнопки</label>
                    <input
                        type="text"
                        value={home?.hero_button_text || ''}
                        onChange={e => setHome({ ...home, hero_button_text: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Ссылка кнопки</label>
                    <input
                        type="text"
                        value={home?.hero_button_link || ''}
                        onChange={e => setHome({ ...home, hero_button_link: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                </div>

                <button onClick={save} style={{ background: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                    Сохранить
                </button>
            </div>
        </div>
    )
}

export default AdminHomePage