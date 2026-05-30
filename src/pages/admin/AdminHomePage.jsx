import { useState, useEffect } from 'react'
import api from '../../services/api'

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box'
}

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

function AdminHomePage() {
    const [home, setHome] = useState(null)
    const [slides, setSlides] = useState([
        { id: 1, title: '', text: '', buttonText: '', buttonLink: '/projects', bgImage: '' },
        { id: 2, title: '', text: '', buttonText: '', buttonLink: '/projects', bgImage: '' },
        { id: 3, title: '', text: '', buttonText: '', buttonLink: '/projects', bgImage: '' }
    ])
    const [directions, setDirections] = useState([])
    const [news, setNews] = useState([])
    const [helpSection, setHelpSection] = useState(null)
    const [helpCards, setHelpCards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            api.get('/home/'),
            api.get('/directions/'),
            api.get('/news/'),
            api.get('/help-section/'),
            api.get('/help-cards/')
        ]).then(([homeRes, dirRes, newsRes, helpSecRes, cardsRes]) => {
            const homeData = homeRes.data?.[0] || homeRes.data || {}
            setHome(homeData)
            setDirections(dirRes.data || [])
            setNews(newsRes.data || [])
            setHelpSection(helpSecRes.data?.[0] || helpSecRes.data || {})
            setHelpCards(cardsRes.data || [])
            setLoading(false)
        }).catch(err => {
            console.error(err)
            setLoading(false)
        })
    }, [])

    const saveHome = async () => {
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

    const updateSlide = (index, field, value) => {
        const newSlides = [...slides]
        newSlides[index][field] = value
        setSlides(newSlides)
    }

    const saveSlides = async () => {
        // TODO: создать API эндпоинт для слайдов
        alert('Слайды сохранены (требуется API)')
    }

    // CRUD направлений
    const addDirection = async () => {
        try {
            const res = await api.post('/directions/', { title: 'Новое направление', description: 'Описание', order: directions.length })
            setDirections([...directions, res.data])
        } catch (err) { alert('Ошибка') }
    }

    const updateDirection = async (id, field, value) => {
        try {
            await api.patch(`/directions/${id}/`, { [field]: value })
            setDirections(directions.map(d => d.id === id ? { ...d, [field]: value } : d))
        } catch (err) { console.error(err) }
    }

    const deleteDirection = async (id) => {
        if (confirm('Удалить направление?')) {
            await api.delete(`/directions/${id}/`)
            setDirections(directions.filter(d => d.id !== id))
        }
    }

    // CRUD новостей
    const addNews = async () => {
        try {
            const res = await api.post('/news/', { title: 'Новая новость', description: 'Описание', date: new Date().toISOString().split('T')[0], order: news.length })
            setNews([...news, res.data])
        } catch (err) { alert('Ошибка') }
    }

    const updateNews = async (id, field, value) => {
        try {
            await api.patch(`/news/${id}/`, { [field]: value })
            setNews(news.map(n => n.id === id ? { ...n, [field]: value } : n))
        } catch (err) { console.error(err) }
    }

    const deleteNews = async (id) => {
        if (confirm('Удалить новость?')) {
            await api.delete(`/news/${id}/`)
            setNews(news.filter(n => n.id !== id))
        }
    }

    // CRUD карточек помощи
    const addHelpCard = async () => {
        try {
            const res = await api.post('/help-cards/', { title: 'Новая карточка', description: 'Описание', button_text: 'Поддержать', button_type: 'donation', order: helpCards.length })
            setHelpCards([...helpCards, res.data])
        } catch (err) { alert('Ошибка') }
    }

    const updateHelpCard = async (id, field, value) => {
        try {
            await api.patch(`/help-cards/${id}/`, { [field]: value })
            setHelpCards(helpCards.map(c => c.id === id ? { ...c, [field]: value } : c))
        } catch (err) { console.error(err) }
    }

    const deleteHelpCard = async (id) => {
        if (confirm('Удалить карточку?')) {
            await api.delete(`/help-cards/${id}/`)
            setHelpCards(helpCards.filter(c => c.id !== id))
        }
    }

    const saveHelpSection = async () => {
        try {
            if (helpSection?.id) {
                await api.put(`/help-section/${helpSection.id}/`, helpSection)
            } else {
                await api.post('/help-section/', helpSection)
            }
            alert('Сохранено')
        } catch (err) { alert('Ошибка') }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Главная страница</h1>

            {/* Hero слайдер (3 слайда) */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Hero-слайдер (3 слайда)</h2>
                {slides.map((slide, idx) => (
                    <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                        <h3>Слайд {idx + 1}</h3>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>Заголовок</label>
                            <input type="text" value={slide.title} onChange={e => updateSlide(idx, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>Текст</label>
                            <textarea value={slide.text} onChange={e => updateSlide(idx, 'text', e.target.value)} rows={3} style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>Текст кнопки</label>
                            <input type="text" value={slide.buttonText} onChange={e => updateSlide(idx, 'buttonText', e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>Ссылка кнопки</label>
                            <input type="text" value={slide.buttonLink} onChange={e => updateSlide(idx, 'buttonLink', e.target.value)} style={inputStyle} />
                        </div>
                    </div>
                ))}
                <button onClick={saveSlides} style={buttonStyle}>Сохранить слайды</button>
            </div>

            {/* Направления работы */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '18px' }}>Направления работы</h2>
                    <button onClick={addDirection} style={buttonStyle}>+ Добавить</button>
                </div>
                {directions.map(dir => (
                    <div key={dir.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                        <input type="text" value={dir.title} onChange={e => updateDirection(dir.id, 'title', e.target.value)} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Заголовок" />
                        <textarea value={dir.description} onChange={e => updateDirection(dir.id, 'description', e.target.value)} rows={2} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Описание" />
                        <button onClick={() => deleteDirection(dir.id)} style={deleteButton}>Удалить</button>
                    </div>
                ))}
            </div>

            {/* Новости */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '18px' }}>Новости</h2>
                    <button onClick={addNews} style={buttonStyle}>+ Добавить</button>
                </div>
                {news.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                        <input type="text" value={item.title} onChange={e => updateNews(item.id, 'title', e.target.value)} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Заголовок" />
                        <textarea value={item.description} onChange={e => updateNews(item.id, 'description', e.target.value)} rows={2} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Описание" />
                        <input type="date" value={item.date} onChange={e => updateNews(item.id, 'date', e.target.value)} style={{ ...inputStyle, marginBottom: '8px' }} />
                        <button onClick={() => deleteNews(item.id)} style={deleteButton}>Удалить</button>
                    </div>
                ))}
            </div>

            {/* Блок помощи */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Блок "Как помочь фонду"</h2>
                <input type="text" value={helpSection?.title || ''} onChange={e => setHelpSection({ ...helpSection, title: e.target.value })} style={{ ...inputStyle, marginBottom: '12px' }} placeholder="Заголовок" />
                <textarea value={helpSection?.description || ''} onChange={e => setHelpSection({ ...helpSection, description: e.target.value })} rows={3} style={{ ...inputStyle, marginBottom: '12px' }} placeholder="Описание" />
                <button onClick={saveHelpSection} style={buttonStyle}>Сохранить блок</button>

                <h3 style={{ fontSize: '16px', margin: '16px 0 12px' }}>Карточки помощи</h3>
                <button onClick={addHelpCard} style={{ ...buttonStyle, background: '#22c55e', marginBottom: '16px' }}>+ Добавить карточку</button>
                {helpCards.map(card => (
                    <div key={card.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                        <input type="text" value={card.title} onChange={e => updateHelpCard(card.id, 'title', e.target.value)} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Заголовок" />
                        <textarea value={card.description} onChange={e => updateHelpCard(card.id, 'description', e.target.value)} rows={2} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Описание" />
                        <input type="text" value={card.button_text} onChange={e => updateHelpCard(card.id, 'button_text', e.target.value)} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Текст кнопки" />
                        <select value={card.button_type} onChange={e => updateHelpCard(card.id, 'button_type', e.target.value)} style={{ ...inputStyle, marginBottom: '8px' }}>
                            <option value="donation">Пожертвование</option>
                            <option value="partner">Партнёрство</option>
                            <option value="volunteer">Волонтёрство</option>
                        </select>
                        <button onClick={() => deleteHelpCard(card.id)} style={deleteButton}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminHomePage