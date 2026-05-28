import { useState, useEffect } from 'react'
import api from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroCarousel from '../components/HeroCarousel'
import { useModal } from '../hooks/useModal'
import '../style.css'
import '../contacts.css'

function ContactsPage() {
    const { openDonationModal } = useModal()
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/contacts/')
            .then(response => {
                setContacts(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Ошибка загрузки контактов:', error)
                setLoading(false)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
        e.target.reset()
    }

    if (loading) {
        return (
            <div>
                <Header />
                <HeroCarousel />
                <div style={{ textAlign: 'center', padding: '100px' }}>Загрузка контактов...</div>
                <Footer />
            </div>
        )
    }

    const vologda = contacts.find(c => c.city.includes("Вологда"))
    const kirillov = contacts.find(c => c.city.includes("Кириллов"))

    return (
        <div>
            <Header />
            <HeroCarousel />
            <main>
                <div className="zagolovok">
                    <p className="zag_main">Свяжитесь с нами</p>
                    <div className="line"></div>
                    <p className="zag_description">
                        Мы всегда рады ответить на ваши вопросы и обсудить <br />
                        возможности сотрудничества
                    </p>
                </div>

                <div className="contact_info">
                    {/* Контакты Вологда */}
                    {vologda && (
                        <div className="contact">
                            <div className="contact_zagolovok">
                                <img src="/images/contacts/contacts.png" alt="contacts" />
                                <h2>{vologda.city}</h2>
                            </div>
                            <hr className="contact_line" />
                            <div className="contact_information">
                                <div className="information">
                                    <img src="/images/contacts/adres.png" alt="address" />
                                    <div className="text_adres">
                                        <p className="mini_zag">Адрес</p>
                                        <p className="info">{vologda.address}</p>
                                    </div>
                                </div>
                                <div className="information">
                                    <img src="/images/contacts/phone.png" alt="phone" />
                                    <div className="text_adres">
                                        <p className="mini_zag">Телефон</p>
                                        <p className="info">{vologda.phone}</p>
                                    </div>
                                </div>
                                <div className="information">
                                    <img src="/images/contacts/email.png" alt="email" />
                                    <div className="text_adres">
                                        <p className="mini_zag">e-mail</p>
                                        <p className="info">{vologda.email}</p>
                                    </div>
                                </div>
                                {vologda.vk_url && (
                                    <div className="information">
                                        <img src="/images/contacts/email.png" alt="social" />
                                        <div className="text_adres">
                                            <p className="mini_zag">Социальные сети</p>
                                            <a href={vologda.vk_url} className="info" target="_blank" rel="noopener noreferrer">
                                                Фонд "Земля Вологодская"
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Карта */}
                    <div className="carta">
                        <div className="contact_zagolovok_carta">
                            <h2>Местоположение</h2>
                            <div className="line"></div>
                        </div>
                        <div className="content_carta">
                            <iframe
                                src="https://yandex.ru/map-widget/v1/?ll=39.902913%2C59.213689&mode=whatshere&whatshere%5Bpoint%5D=39.902913%2C59.213689&whatshere%5Bzoom%5D=17&z=16"
                                width="100%"
                                height="400"
                                frameBorder="0"
                                allowFullScreen
                                title="Карта офиса"
                                style={{ borderRadius: '20px' }}
                            ></iframe>
                        </div>
                    </div>

                    {/* Контакты Кириллов */}
                    {kirillov && (
                        <div className="contact">
                            <div className="contact_zagolovok">
                                <img src="/images/contacts/contacts.png" alt="contacts" />
                                <h2>{kirillov.city}</h2>
                            </div>
                            <hr className="contact_line" />
                            <div className="contact_information">
                                <div className="information">
                                    <img src="/images/contacts/adres.png" alt="address" />
                                    <div className="text_adres">
                                        <p className="mini_zag">Адрес</p>
                                        <p className="info">{kirillov.address}</p>
                                    </div>
                                </div>
                                <div className="information">
                                    <img src="/images/contacts/phone.png" alt="phone" />
                                    <div className="text_adres">
                                        <p className="mini_zag">Телефон</p>
                                        <p className="info">{kirillov.phone}</p>
                                    </div>
                                </div>
                                <div className="information">
                                    <img src="/images/contacts/email.png" alt="email" />
                                    <div className="text_adres">
                                        <p className="mini_zag">e-mail</p>
                                        <p className="info">{kirillov.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Форма обратной связи */}
                    <div className="contact_form">
                        <div className="text_comunication">
                            <h2 className="com_zag">Свяжитесь с нами</h2>
                            <p className="com_description">Заполните форму, и мы свяжемся с вами в ближайшее время</p>
                        </div>
                        <hr className="contact_line" />
                        <h3 className="form_zag">Ваши контактные данные</h3>
                        <hr />

                        <form onSubmit={handleSubmit}>
                            <div className="form_group">
                                <label>Имя и фамилия *</label>
                                <input type="text" name="name" required />
                            </div>

                            <div className="form_group">
                                <label>Email *</label>
                                <input type="email" name="email" required />
                            </div>

                            <div className="form_group">
                                <label>Телефон</label>
                                <input type="tel" name="phone" />
                            </div>

                            <div className="form_group">
                                <label>Город</label>
                                <input type="text" name="city" />
                            </div>

                            <div className="form_group">
                                <label>Тема обращения *</label>
                                <textarea name="message" rows="5" required></textarea>
                            </div>

                            <button type="submit" className="submit-btn">Отправить</button>
                        </form>
                    </div>
                </div>

                {/* Блок "Поддержать фонд" */}
                <div className="support-block">
                    <div className="support-content">
                        <h2>Поддержите нашу работу</h2>
                        <p>Ваша помощь позволяет нам реализовывать проекты и развивать малые города и сёла Вологодской области</p>
                        <button className="support-btn" onClick={openDonationModal}>Поддержать фонд</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ContactsPage