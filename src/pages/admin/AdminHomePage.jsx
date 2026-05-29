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
            <Card title="Hero-блок">
                <Field label="Заголовок" value={home?.hero_title || ''} onChange={val => setHome({...home, hero_title: val})} />
                <Field label="Текст" textarea value={home?.hero_text || ''} onChange={val => setHome({...home, hero_text: val})} />
                <Field label="Текст кнопки" value={home?.hero_button_text || ''} onChange={val => setHome({...home, hero_button_text: val})} />
                <Field label="Ссылка кнопки" value={home?.hero_button_link || ''} onChange={val => setHome({...home, hero_button_link: val})} />
                <Button onClick={save}>Сохранить</Button>
            </Card>
        </div>
    )
}

export default AdminHomePage