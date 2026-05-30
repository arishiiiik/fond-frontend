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

function AdminHomePage() {
    const [slides, setSlides] = useState([])
    const [directions, setDirections] = useState([])
    const [news, setNews] = useState([])
    const [helpSection, setHelpSection] = useState(null)
    const [helpCards, setHelpCards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            api.get('/hero-slides/'),
            api.get('/directions/'),
            api.get('/news/'),
            api.get('/help-section/'),
            api.get('/help-cards/')
        ]).then(([slidesRes, dirRes, newsRes, helpSecRes, cardsRes]) => {
            setSlides(slidesRes.data || [])
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

    // CRUD слайдов
    const addSlide = async () => {
        try {
            const res = await api.post('/hero-slides/', { title: 'Новый слайд', text: 'Текст слайда', button_text: 'Подробнее', button_link: '/projects', order: slides.length })
            setSlides([...slides, res.data])
        } catch (err) { alert('Ошибка') }
    }

    const updateSlide = async (id, field, value) => {
        await api.patch(`/hero-slides/${id}/`, { [field]: value })
        setSlides(slides.map(s => s.id === id ? { ...s, [field]: value } : s))
    }

    const deleteSlide = async (id) => {
        if (confirm('Удалить слайд?')) {
            await api.delete(`/hero-slides/${id}/`)
            setSlides(slides.filter(s => s.id !== id))
        }
    }

    const uploadSlideImage = async (id, file) => {
        const data = new FormData()
        data.append('bg_image', file)
        const res = await api.patch(`/hero-slides/${id}/`, data)
        setSlides(slides.map(s => s.id === id ? { ...s, bg_image: res.data.bg_image } : s))
    }

    // CRUD направлений
    const addDirection = async () => {
        const res = await api.post('/directions/', { title: 'Новое направление', description: 'Описание', order: directions.length })
        setDirections([...directions, res.data])
    }

    const updateDirection = async (id, field, value) => {
        await api.patch(`/directions/${id}/`, { [field]: value })
        setDirections(directions.map(d => d.id === id ? { ...d, [field]: value } : d))
    }

    const deleteDirection = async (id) => {
        if (confirm('Удалить направление?')) {
            await api.delete(`/directions/${id}/`)
            setDirections(directions.filter(d => d.id !== id))
        }
    }

    // CRUD новостей
    const addNews = async () => {
        const res = await api.post('/news/', { title: 'Новая новость', description: 'Описание', date: new Date().toISOString().split('T')[0], order: news.length })
        setNews([...news, res.data])
    }

    const updateNews = async (id, field, value) => {
        await api.patch(`/news/${id}/`, { [field]: value })
        setNews(news.map(n => n.id === id ? { ...n, [field]: value } : n))
    }

    const deleteNews = async (id) => {
        if (confirm('Удалить новость?')) {
            await api.delete(`/news/${id}/`)
            setNews(news.filter(n => n.id !== id))
        }
    }

    // CRUD карточек помощи
    const addHelpCard = async () => {
        const res = await api.post('/help-cards/', { title: 'Новая карточка', description: 'Описание', button_text: 'Поддержать', button_type: 'donation', order: helpCards.length })
        setHelpCards([...helpCards, res.data])
    }

    const updateHelpCard = async (id, field, value) => {
        await api.patch(`/help-cards/${id}/`, { [field]: value })
        setHelpCards(helpCards.map(c => c.id === id ? { ...c, [field]: value } : c))
    }

    const deleteHelpCard = async (id) => {
        if (confirm('Удалить карточку?')) {
            await api.delete(`/help-cards/${id}/`)
            setHelpCards(helpCards.filter(c => c.id !== id))
        }
    }

    const saveHelpSection = async () => {
        if (helpSection?.id) {
            await api.put(`/help-section/${helpSection.id}/`, helpSection)
        } else {
            await api.post('/help-section/', helpSection)
        }
        alert('Сохранено')
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px', marginBottom: '24px' }}>Главная страница</h1>

            {/* Hero-слайдер */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px' }}>Hero-слайдер</h2>
                    <button onClick={addSlide} style={buttonStyle}>+ Добавить слайд</button>
                </div>
                {slides.map((slide, idx) => (
                    <div key={slide.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <strong>Слайд {idx + 1}</strong>
                            <button onClick={() => deleteSlide(slide.id)} style={deleteButton}>Удалить</button>
                        </div>
                        <input type="text" placeholder="Заголовок" value={slide.title} onChange={e => updateSlide(slide.id, 'title', e.target.value)} style={inputStyle} />
                        <textarea placeholder="Текст" value={slide.text} onChange={e => updateSlide(slide.id, 'text', e.target.value)} rows={3} style={inputStyle} />
                        <input type="text" placeholder="Текст кнопки" value={slide.button_text} onChange={e => updateSlide(slide.id, 'button_text', e.target.value)} style={inputStyle} />
                        <input type="text" placeholder="Ссылка кнопки" value={slide.button_link} onChange={e => updateSlide(slide.id, 'button_link', e.target.value)} style={inputStyle} />
                        <div>
                            <label>Фоновое изображение</label>
                            {slide.bg_image && <img src={slide.bg_image} alt="preview" style={{ width: '100px', margin: '10px 0', borderRadius: '8px' }} />}
                            <input type="file" accept="image/*" onChange={e => e.target.files[0] && uploadSlideImage(slide.id, e.target.files[0])} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Направления работы */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px' }}>Направления работы</h2>
                    <button onClick={addDirection} style={buttonStyle}>+ Добавить</button>
                </div>
                {directions.map(dir => (
                    <div key={dir.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <input type="text" value={dir.title} onChange={e => updateDirection(dir.id, 'title', e.target.value)} style={inputStyle} placeholder="Заголовок" />
                        <textarea value={dir.description} onChange={e => updateDirection(dir.id, 'description', e.target.value)} rows={2} style={inputStyle} placeholder="Описание" />
                        <button onClick={() => deleteDirection(dir.id)} style={deleteButton}>Удалить</button>
                    </div>
                ))}
            </div>

            {/* Новости */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px' }}>Новости</h2>
                    <button onClick={addNews} style={buttonStyle}>+ Добавить</button>
                </div>
                {news.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <input type="text" value={item.title} onChange={e => updateNews(item.id, 'title', e.target.value)} style={inputStyle} placeholder="Заголовок" />
                        <textarea value={item.description} onChange={e => updateNews(item.id, 'description', e.target.value)} rows={2} style={inputStyle} placeholder="Описание" />
                        <input type="date" value={item.date} onChange={e => updateNews(item.id, 'date', e.target.value)} style={inputStyle} />
                        <button onClick={() => deleteNews(item.id)} style={deleteButton}>Удалить</button>
                    </div>
                ))}
            </div>

            {/* Блок помощи */}
            <div style={cardStyle}>
                <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px', marginBottom: '16px' }}>Блок помощи</h2>
                <input type="text" value={helpSection?.title || ''} onChange={e => setHelpSection({ ...helpSection, title: e.target.value })} style={inputStyle} placeholder="Заголовок" />
                <textarea value={helpSection?.description || ''} onChange={e => setHelpSection({ ...helpSection, description: e.target.value })} rows={3} style={inputStyle} placeholder="Описание" />
                <button onClick={saveHelpSection} style={buttonStyle}>Сохранить блок</button>

                <h3 style={{ margin: '16px 0 12px', fontSize: '18px', color: '#825B2C' }}>Карточки помощи</h3>
                <button onClick={addHelpCard} style={{ ...buttonStyle, marginBottom: '16px' }}>+ Добавить карточку</button>
                {helpCards.map(card => (
                    <div key={card.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <input type="text" value={card.title} onChange={e => updateHelpCard(card.id, 'title', e.target.value)} style={inputStyle} placeholder="Заголовок" />
                        <textarea value={card.description} onChange={e => updateHelpCard(card.id, 'description', e.target.value)} rows={2} style={inputStyle} placeholder="Описание" />
                        <input type="text" value={card.button_text} onChange={e => updateHelpCard(card.id, 'button_text', e.target.value)} style={inputStyle} />
                        <select value={card.button_type} onChange={e => updateHelpCard(card.id, 'button_type', e.target.value)} style={inputStyle}>
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