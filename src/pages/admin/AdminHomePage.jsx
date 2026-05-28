import { useState, useEffect } from 'react'
import api from '../../services/api.js'

function AdminHomePage() {
    const [home, setHome] = useState(null)
    const [directions, setDirections] = useState([])
    const [news, setNews] = useState([])
    const [helpSection, setHelpSection] = useState(null)
    const [helpCards, setHelpCards] = useState([])
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        try {
            const [homeRes, dirRes, newsRes, helpSecRes, cardsRes] = await Promise.all([
                api.get('/home/'),
                api.get('/directions/'),
                api.get('/news/'),
                api.get('/help-section/'),
                api.get('/help-cards/'),
            ])
            
            // Обработка синглтонов
            setHome(homeRes.data || {})
            setHelpSection(helpSecRes.data || {})
            
            // Обработка списков
            setDirections(Array.isArray(dirRes.data) ? dirRes.data : [])
            setNews(Array.isArray(newsRes.data) ? newsRes.data : [])
            setHelpCards(Array.isArray(cardsRes.data) ? cardsRes.data : [])
        } catch (err) {
            console.error('Ошибка загрузки:', err)
            alert('Ошибка загрузки: ' + (err.response?.data?.detail || err.message))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadData() }, [])

    const saveHome = async () => {
        try {
            if (home?.id) {
                await api.put(`/home/${home.id}/`, home)
            } else {
                await api.post('/home/', home)
            }
            alert('Сохранено!')
            loadData()
        } catch (err) {
            console.error('Ошибка сохранения:', err)
            alert('Ошибка: ' + (err.response?.data?.detail || 'Неизвестная ошибка'))
        }
    }

    const saveHelpSection = async () => {
        try {
            if (helpSection?.id) {
                await api.put(`/help-section/${helpSection.id}/`, helpSection)
            } else {
                await api.post('/help-section/', helpSection)
            }
            alert('Сохранено!')
            loadData()
        } catch (err) {
            console.error('Ошибка сохранения:', err)
            alert('Ошибка: ' + (err.response?.data?.detail || 'Неизвестная ошибка'))
        }
    }

    // CRUD для направлений
    const addDirection = async () => {
        try {
            const res = await api.post('/directions/', 
                { title: 'Новое направление', description: 'Описание', order: directions.length }
            )
            setDirections([...directions, res.data])
        } catch (err) {
            alert('Ошибка: ' + (err.response?.data?.detail || 'Неизвестная ошибка'))
        }
    }

    const updateDirection = async (id, field, value) => {
        try {
            await api.patch(`/directions/${id}/`, { [field]: value })
            setDirections(directions.map(d => d.id === id ? { ...d, [field]: value } : d))
        } catch (err) {
            console.error('Ошибка:', err)
        }
    }

    const deleteDirection = async (id) => {
        if (confirm('Удалить направление?')) {
            try {
                await api.delete(`/directions/${id}/`)
                setDirections(directions.filter(d => d.id !== id))
            } catch (err) {
                alert('Ошибка удаления')
            }
        }
    }

    // CRUD для новостей
    const addNews = async () => {
        try {
            const res = await api.post('/news/', 
                { title: 'Новая новость', description: 'Описание', date: new Date().toISOString().split('T')[0], order: news.length }
            )
            setNews([...news, res.data])
        } catch (err) {
            alert('Ошибка: ' + (err.response?.data?.detail || 'Неизвестная ошибка'))
        }
    }

    const updateNews = async (id, field, value) => {
        try {
            await api.patch(`/news/${id}/`, { [field]: value })
            setNews(news.map(n => n.id === id ? { ...n, [field]: value } : n))
        } catch (err) {
            console.error('Ошибка:', err)
        }
    }

    const deleteNews = async (id) => {
        if (confirm('Удалить новость?')) {
            try {
                await api.delete(`/news/${id}/`)
                setNews(news.filter(n => n.id !== id))
            } catch (err) {
                alert('Ошибка удаления')
            }
        }
    }

    // CRUD для карточек помощи
    const addHelpCard = async () => {
        try {
            const res = await api.post('/help-cards/', 
                { title: 'Новая карточка', description: 'Описание', button_text: 'Поддержать', button_type: 'donation', order: helpCards.length }
            )
            setHelpCards([...helpCards, res.data])
        } catch (err) {
            alert('Ошибка: ' + (err.response?.data?.detail || 'Неизвестная ошибка'))
        }
    }

    const updateHelpCard = async (id, field, value) => {
        try {
            await api.patch(`/help-cards/${id}/`, { [field]: value })
            setHelpCards(helpCards.map(c => c.id === id ? { ...c, [field]: value } : c))
        } catch (err) {
            console.error('Ошибка:', err)
        }
    }

    const deleteHelpCard = async (id) => {
        if (confirm('Удалить карточку?')) {
            try {
                await api.delete(`/help-cards/${id}/`)
                setHelpCards(helpCards.filter(c => c.id !== id))
            } catch (err) {
                alert('Ошибка удаления')
            }
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <h1>Редактирование главной страницы</h1>

            {/* Hero блок */}
            <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
                <h2>1. Главный экран (Hero)</h2>
                <input 
                    type="text" 
                    value={home?.hero_title || ''} 
                    onChange={e => setHome({...home, hero_title: e.target.value})} 
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
                    placeholder="Заголовок"
                />
                <textarea 
                    value={home?.hero_text || ''} 
                    onChange={e => setHome({...home, hero_text: e.target.value})} 
                    rows="3" 
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
                    placeholder="Текст"
                />
                <input 
                    type="text" 
                    value={home?.hero_button_text || ''} 
                    onChange={e => setHome({...home, hero_button_text: e.target.value})} 
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
                    placeholder="Текст кнопки"
                />
                <input 
                    type="text" 
                    value={home?.hero_button_link || ''} 
                    onChange={e => setHome({...home, hero_button_link: e.target.value})} 
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
                    placeholder="Ссылка кнопки"
                />
                <button onClick={saveHome} style={{ padding: '8px 16px', background: '#419037', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Сохранить Hero
                </button>
            </div>

            {/* Направления работы */}
            <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h2>2. Направления работы</h2>
                    <button onClick={addDirection} style={{ padding: '8px 16px', background: '#419037', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Добавить
                    </button>
                </div>
                {directions.map(dir => (
                    <div key={dir.id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
                        <input 
                            type="text" 
                            value={dir.title} 
                            onChange={e => updateDirection(dir.id, 'title', e.target.value)} 
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }} 
                            placeholder="Заголовок"
                        />
                        <textarea 
                            value={dir.description} 
                            onChange={e => updateDirection(dir.id, 'description', e.target.value)} 
                            rows="2" 
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }} 
                            placeholder="Описание"
                        />
                        <button onClick={() => deleteDirection(dir.id)} style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {/* Новости */}
            <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h2>3. Новости</h2>
                    <button onClick={addNews} style={{ padding: '8px 16px', background: '#419037', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Добавить новость
                    </button>
                </div>
                {news.map(item => (
                    <div key={item.id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
                        <input 
                            type="text" 
                            value={item.title} 
                            onChange={e => updateNews(item.id, 'title', e.target.value)} 
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }} 
                            placeholder="Заголовок"
                        />
                        <textarea 
                            value={item.description} 
                            onChange={e => updateNews(item.id, 'description', e.target.value)} 
                            rows="2" 
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }} 
                            placeholder="Описание"
                        />
                        <input 
                            type="date" 
                            value={item.date} 
                            onChange={e => updateNews(item.id, 'date', e.target.value)} 
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }} 
                        />
                        <button onClick={() => deleteNews(item.id)} style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {/* Блок помощи */}
            <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
                <h2>4. Блок "Как помочь фонду"</h2>
                <input 
                    type="text" 
                    value={helpSection?.title || ''} 
                    onChange={e => setHelpSection({...helpSection, title: e.target.value})} 
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
                    placeholder="Заголовок"
                />
                <textarea 
                    value={helpSection?.description || ''} 
                    onChange={e => setHelpSection({...helpSection, description: e.target.value})} 
                    rows="2" 
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }} 
                    placeholder="Описание"
                />
                <button onClick={saveHelpSection} style={{ padding: '8px 16px', background: '#419037', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>
                    Сохранить блок
                </button>

                <h3>Карточки помощи</h3>
                <button onClick={addHelpCard} style={{ padding: '8px 16px', background: '#419037', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '15px' }}>
                    + Добавить карточку
                </button>
                {helpCards.map(card => (
                    <div key={card.id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
                        <input 
                            type="text" 
                            value={card.title} 
                            onChange={e => updateHelpCard(card.id, 'title', e.target.value)} 
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }} 
                            placeholder="Заголовок"
                        />
                        <textarea 
                            value={card.description} 
                            onChange={e => updateHelpCard(card.id, 'description', e.target.value)} 
                            rows="2" 
                            style={{ width: '100%', padding: '5px', marginBottom: '5px' }} 
                            placeholder="Описание"
                        />
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                            <input 
                                type="text" 
                                value={card.button_text} 
                                onChange={e => updateHelpCard(card.id, 'button_text', e.target.value)} 
                                style={{ flex: 1, padding: '5px' }} 
                                placeholder="Текст кнопки"
                            />
                            <select 
                                value={card.button_type} 
                                onChange={e => updateHelpCard(card.id, 'button_type', e.target.value)}
                                style={{ padding: '5px' }}
                            >
                                <option value="donation">Пожертвование</option>
                                <option value="partner">Партнёрство</option>
                                <option value="volunteer">Волонтёрство</option>
                            </select>
                        </div>
                        <button onClick={() => deleteHelpCard(card.id)} style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Удалить карточку
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminHomePage