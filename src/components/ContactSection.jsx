import '../style.css'

function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: отправка формы на бэкенд
    alert('Форма отправлена! В ближайшее время мы свяжемся с вами.')
  }

  return (
    <div className="contact_fond">
      <div className="zagolovok">
        <p className="zag_main">Контактная информация</p>
        <div className="line"></div>
        <p className="zag_description">Способы связи с нами</p>
      </div>
      
      <div className="contact_content">
        {/* Контакты */}
        <div className="contact">
          <div className="contact_zagolovok">
            <img src="/images/contacts/contacts.png" alt="contacts" />
            <h2>Главный офис</h2>
          </div>
          <hr className="contact_line" />
          <div className="contact_information">
            <div className="information">
              <img src="/images/contacts/adres.png" alt="address" />
              <div className="text_adres">
                <p className="mini_zag">Адрес</p>
                <p className="info">160035, г. Вологда, Советский пр., 35-а</p>
              </div>
            </div>
            <div className="information">
              <img src="/images/contacts/phone.png" alt="phone" />
              <div className="text_adres">
                <p className="mini_zag">Телефон</p>
                <p className="info">(8172) 75 61 37</p>
              </div>
            </div>
            <div className="information">
              <img src="/images/contacts/email.png" alt="email" />
              <div className="text_adres">
                <p className="mini_zag">e-mail</p>
                <p className="info">fond.rgs35@yandex.ru</p>
              </div>
            </div>
            <div className="information">
              <img src="/images/contacts/email.png" alt="social" />
              <div className="text_adres">
                <p className="mini_zag">Социальные сети</p>
                <a href="https://vk.com/fondrgs35" className="info" target="_blank" rel="noopener noreferrer">
                  Фонд "Земля Вологодская"
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Форма связи */}
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
              <textarea name="message" required></textarea>
            </div>
            
            <button type="submit" className="submit-button">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactSection