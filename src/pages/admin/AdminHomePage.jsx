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
    const [home, setHome] = useState(null)
    const [directions, setDirections] = useState([])
    const [editingDirection, setEditingDirection] = useState(null)
    const [directionForm, setDirectionForm] = useState({ title: '', description: '', order: 0 })
    const [iconFile, setIconFile] = useState(null)
    const [news, setNews] = useState([])
    const [editingNews, setEditingNews] = useState(null)
    const [newsForm, setNewsForm] = useState({ title: '', description: '', date: '', link: '', order: 0 })
    const [newsImageFile, setNewsImageFile] = useState(null)
    const [helpSection, setHelpSection] = useState(null)
    const [helpCards, setHelpCards] = useState([])
    const [editingHelpCard, setEditingHelpCard] = useState(null)
    const [helpCardForm, setHelpCardForm] = useState({ title: '', description: '', button_text: '', button_type: 'donation', order: 0 })
    const [helpIconFile, setHelpIconFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const [homeRes, dirRes, newsRes, helpSecRes, cardsRes] = await Promise.all([
            api.get('/home/'),
            api.get('/directions/'),
            api.get('/news/'),
            api.get('/help-section/'),
            api.get('/help-cards/')
        ])
        setHome(homeRes.data?.[0] || homeRes.data || {})
        setDirections(dirRes.data || [])
        setNews(newsRes.data || [])
        setHelpSection(helpSecRes.data?.[0] || helpSecRes.data || {})
        setHelpCards(cardsRes.data || [])
        setLoading(false)
    }

    const saveHome = async () => {
        try {
            if (home?.id) {
                await api.put(`/home/${home.id}/`, home)
            } else {
                await api.post('/home/', home)
            }
            alert('Сохранено')
        } catch (err) { alert('Ошибка') }
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

    // Направления
    const openDirectionForm = (item = null) => {
        if (item) {
            setEditingDirection(item)
            setDirectionForm({ title: item.title || '', description: item.description || '', order: item.order || 0 })
        } else {
            setEditingDirection({})
            setDirectionForm({ title: '', description: '', order: directions.length })
        }
        setIconFile(null)
    }

    const closeDirectionForm = () => {
        setEditingDirection(null)
        setDirectionForm({ title: '', description: '', order: 0 })
        setIconFile(null)
    }

    const saveDirection = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        data.append('title', directionForm.title)
        data.append('description', directionForm.description)
        data.append('order', directionForm.order)
        if (iconFile) data.append('icon', iconFile)

        try {
            if (editingDirection.id) {
                await api.put(`/directions/${editingDirection.id}/`, data)
                alert('Направление обновлено')
            } else {
                await api.post('/directions/', data)
                alert('Направление создано')
            }
            closeDirectionForm()
            const res = await api.get('/directions/')
            setDirections(res.data)
        } catch (err) { alert('Ошибка') }
        setSaving(false)
    }

    const deleteDirection = async (id) => {
        if (confirm('Удалить направление?')) {
            await api.delete(`/directions/${id}/`)
            const res = await api.get('/directions/')
            setDirections(res.data)
        }
    }

    // Новости
    const openNewsForm = (item = null) => {
        if (item) {
            setEditingNews(item)
            setNewsForm({ title: item.title || '', description: item.description || '', date: item.date || '', link: item.link || '', order: item.order || 0 })
        } else {
            setEditingNews({})
            setNewsForm({ title: '', description: '', date: new Date().toISOString().split('T')[0], link: '', order: news.length })
        }
        setNewsImageFile(null)
    }

    const closeNewsForm = () => {
        setEditingNews(null)
        setNewsForm({ title: '', description: '', date: '', link: '', order: 0 })
        setNewsImageFile(null)
    }

    const saveNews = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        data.append('title', newsForm.title)
        data.append('description', newsForm.description)
        data.append('date', newsForm.date)
        data.append('link', newsForm.link)
        data.append('order', newsForm.order)
        if (newsImageFile) data.append('image', newsImageFile)

        try {
            if (editingNews.id) {
                await api.put(`/news/${editingNews.id}/`, data)
                alert('Новость обновлена')
            } else {
                await api.post('/news/', data)
                alert('Новость создана')
            }
            closeNewsForm()
            const res = await api.get('/news/')
            setNews(res.data)
        } catch (err) { alert('Ошибка') }
        setSaving(false)
    }

    const deleteNews = async (id) => {
        if (confirm('Удалить новость?')) {
            await api.delete(`/news/${id}/`)
            const res = await api.get('/news/')
            setNews(res.data)
        }
    }

    // Карточки помощи
    const openHelpCardForm = (item = null) => {
        if (item) {
            setEditingHelpCard(item)
            setHelpCardForm({ title: item.title || '', description: item.description || '', button_text: item.button_text || '', button_type: item.button_type || 'donation', order: item.order || 0 })
        } else {
            setEditingHelpCard({})
            setHelpCardForm({ title: '', description: '', button_text: 'Поддержать', button_type: 'donation', order: helpCards.length })
        }
        setHelpIconFile(null)
    }

    const closeHelpCardForm = () => {
        setEditingHelpCard(null)
        setHelpCardForm({ title: '', description: '', button_text: '', button_type: 'donation', order: 0 })
        setHelpIconFile(null)
    }

    const saveHelpCard = async (e) => {
        e.preventDefault()
        setSaving(true)
        const data = new FormData()
        data.append('title', helpCardForm.title)
        data.append('description', helpCardForm.description)
        data.append('button_text', helpCardForm.button_text)
        data.append('button_type', helpCardForm.button_type)
        data.append('order', helpCardForm.order)
        if (helpIconFile) data.append('icon', helpIconFile)

        try {
            if (editingHelpCard.id) {
                await api.put(`/help-cards/${editingHelpCard.id}/`, data)
                alert('Карточка обновлена')
            } else {
                await api.post('/help-cards/', data)
                alert('Карточка создана')
            }
            closeHelpCardForm()
            const res = await api.get('/help-cards/')
            setHelpCards(res.data)
        } catch (err) { alert('Ошибка') }
        setSaving(false)
    }

    const deleteHelpCard = async (id) => {
        if (confirm('Удалить карточку?')) {
            await api.delete(`/help-cards/${id}/`)
            const res = await api.get('/help-cards/')
            setHelpCards(res.data)
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div>
            <h1 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '32px', marginBottom: '24px' }}>Главная страница</h1>

            {/* Hero-блок */}
            <div style={cardStyle}>
                <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px', marginBottom: '16px' }}>Hero-блок</h2>
                <input type="text" placeholder="Заголовок" value={home?.hero_title || ''} onChange={e => setHome({ ...home, hero_title: e.target.value })} style={inputStyle} />
                <textarea placeholder="Текст" value={home?.hero_text || ''} onChange={e => setHome({ ...home, hero_text: e.target.value })} rows={3} style={inputStyle} />
                <input type="text" placeholder="Текст кнопки" value={home?.hero_button_text || ''} onChange={e => setHome({ ...home, hero_button_text: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Ссылка кнопки" value={home?.hero_button_link || ''} onChange={e => setHome({ ...home, hero_button_link: e.target.value })} style={inputStyle} />
                <button onClick={saveHome} style={buttonStyle}>Сохранить Hero</button>
            </div>

            {/* Направления работы */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px' }}>Направления работы</h2>
                    <button onClick={() => openDirectionForm()} style={buttonStyle}>+ Добавить</button>
                </div>
                {directions.map(dir => (
                    <div key={dir.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div><strong>{dir.title}</strong><br /><small>{dir.description}</small></div>
                            <div>
                                <button onClick={() => openDirectionForm(dir)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>✏️</button>
                                <button onClick={() => deleteDirection(dir.id)} style={deleteButton}>🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Новости */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px' }}>Новости</h2>
                    <button onClick={() => openNewsForm()} style={buttonStyle}>+ Добавить</button>
                </div>
                {news.map(item => (
                    <div key={item.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div><strong>{item.title}</strong><br /><small>{item.date}</small></div>
                            <div>
                                <button onClick={() => openNewsForm(item)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>✏️</button>
                                <button onClick={() => deleteNews(item.id)} style={deleteButton}>🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Блок помощи */}
            <div style={cardStyle}>
                <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C', fontSize: '24px', marginBottom: '16px' }}>Блок помощи</h2>
                <input type="text" placeholder="Заголовок" value={helpSection?.title || ''} onChange={e => setHelpSection({ ...helpSection, title: e.target.value })} style={inputStyle} />
                <textarea placeholder="Описание" value={helpSection?.description || ''} onChange={e => setHelpSection({ ...helpSection, description: e.target.value })} rows={3} style={inputStyle} />
                <button onClick={saveHelpSection} style={buttonStyle}>Сохранить блок</button>

                <h3 style={{ margin: '16px 0 12px', fontSize: '18px', color: '#825B2C' }}>Карточки помощи</h3>
                <button onClick={() => openHelpCardForm()} style={{ ...buttonStyle, marginBottom: '16px' }}>+ Добавить карточку</button>
                {helpCards.map(card => (
                    <div key={card.id} style={{ border: '1px solid #e0d5c0', borderRadius: '15px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div><strong>{card.title}</strong><br /><small>{card.button_text}</small></div>
                            <div>
                                <button onClick={() => openHelpCardForm(card)} style={{ ...buttonStyle, padding: '4px 12px', marginRight: '8px' }}>Редактировать</button>
                                <button onClick={() => deleteHelpCard(card.id)} style={deleteButton}>Удалить</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Формы редактирования */}
            {editingDirection !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={closeDirectionForm}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                            <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C' }}>{editingDirection.id ? 'Редактировать направление' : 'Новое направление'}</h2>
                        </div>
                        <form onSubmit={saveDirection}>
                            <div style={{ padding: '24px' }}>
                                <input type="text" placeholder="Название" value={directionForm.title} onChange={e => setDirectionForm({ ...directionForm, title: e.target.value })} required style={inputStyle} />
                                <textarea placeholder="Описание" value={directionForm.description} onChange={e => setDirectionForm({ ...directionForm, description: e.target.value })} rows={3} required style={inputStyle} />
                                <div><label>Иконка</label><input type="file" accept="image/*" onChange={e => setIconFile(e.target.files[0])} /></div>
                                <input type="number" placeholder="Порядок" value={directionForm.order} onChange={e => setDirectionForm({ ...directionForm, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                                    <button type="button" onClick={closeDirectionForm} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
                                    <button type="submit" disabled={saving} style={buttonStyle}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingNews !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={closeNewsForm}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                            <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C' }}>{editingNews.id ? 'Редактировать новость' : 'Новая новость'}</h2>
                        </div>
                        <form onSubmit={saveNews}>
                            <div style={{ padding: '24px' }}>
                                <input type="text" placeholder="Заголовок" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} required style={inputStyle} />
                                <textarea placeholder="Описание" value={newsForm.description} onChange={e => setNewsForm({ ...newsForm, description: e.target.value })} rows={4} required style={inputStyle} />
                                <input type="date" value={newsForm.date} onChange={e => setNewsForm({ ...newsForm, date: e.target.value })} required style={inputStyle} />
                                <input type="url" placeholder="Ссылка" value={newsForm.link} onChange={e => setNewsForm({ ...newsForm, link: e.target.value })} style={inputStyle} />
                                <div><label>Изображение</label><input type="file" accept="image/*" onChange={e => setNewsImageFile(e.target.files[0])} /></div>
                                <input type="number" placeholder="Порядок" value={newsForm.order} onChange={e => setNewsForm({ ...newsForm, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                                    <button type="button" onClick={closeNewsForm} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
                                    <button type="submit" disabled={saving} style={buttonStyle}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingHelpCard !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={closeHelpCardForm}>
                    <div style={{ background: 'white', borderRadius: '20px', width: '500px', maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #e0d5c0', background: '#fffcea' }}>
                            <h2 style={{ fontFamily: 'Vezitsa, sans-serif', color: '#825B2C' }}>{editingHelpCard.id ? 'Редактировать карточку' : 'Новая карточка'}</h2>
                        </div>
                        <form onSubmit={saveHelpCard}>
                            <div style={{ padding: '24px' }}>
                                <input type="text" placeholder="Заголовок" value={helpCardForm.title} onChange={e => setHelpCardForm({ ...helpCardForm, title: e.target.value })} required style={inputStyle} />
                                <textarea placeholder="Описание" value={helpCardForm.description} onChange={e => setHelpCardForm({ ...helpCardForm, description: e.target.value })} rows={3} required style={inputStyle} />
                                <input type="text" placeholder="Текст кнопки" value={helpCardForm.button_text} onChange={e => setHelpCardForm({ ...helpCardForm, button_text: e.target.value })} required style={inputStyle} />
                                <select value={helpCardForm.button_type} onChange={e => setHelpCardForm({ ...helpCardForm, button_type: e.target.value })} style={inputStyle}>
                                    <option value="donation">Пожертвование</option>
                                    <option value="partner">Партнёрство</option>
                                    <option value="volunteer">Волонтёрство</option>
                                </select>
                                <div><label>Иконка</label><input type="file" accept="image/*" onChange={e => setHelpIconFile(e.target.files[0])} /></div>
                                <input type="number" placeholder="Порядок" value={helpCardForm.order} onChange={e => setHelpCardForm({ ...helpCardForm, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                                    <button type="button" onClick={closeHelpCardForm} style={{ ...buttonStyle, background: '#94a3b8' }}>Отмена</button>
                                    <button type="submit" disabled={saving} style={buttonStyle}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminHomePage