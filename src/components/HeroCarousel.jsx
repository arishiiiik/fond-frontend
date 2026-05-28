import { useState, useEffect } from 'react'
import api from '../services/api'
import '../style.css'

const defaultSlides = [
  {
    id: 0,
    title: 'Развиваем малые города и сёла Вологодской области',
    text: 'Создаём условия для устойчивого развития территорий через комплексные программы поддержки',
    buttonText: 'Узнать о проектах',
    buttonLink: '/projects',
    bgImage: '/images/fon1.png'
  },
  {
    id: 1,
    title: 'Поддержка социальных инициатив',
    text: 'Реализуем проекты в сфере образования, здравоохранения и социальной поддержки населения',
    buttonText: 'Поддержать инициативы',
    buttonLink: '/contacts',
    bgImage: '/images/fon2.png'
  },
  {
    id: 2,
    title: 'Сохранение культурного наследия',
    text: 'Восстанавливаем памятники архитектуры и развиваем народные промыслы Вологодчины',
    buttonText: 'Присоединиться',
    buttonLink: '/projects',
    bgImage: '/images/fon3.png'
  }
]

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [slides, setSlides] = useState(defaultSlides)

  // Загружаем данные из админки для первого слайда
  useEffect(() => {
    api.get('/home/')
      .then(response => {
        if (response.data && Object.keys(response.data).length > 0) {
          const updatedSlides = [...defaultSlides]
          updatedSlides[0] = {
            ...updatedSlides[0],
            title: response.data.hero_title || updatedSlides[0].title,
            text: response.data.hero_text || updatedSlides[0].text,
            buttonText: response.data.hero_button_text || updatedSlides[0].buttonText,
            buttonLink: response.data.hero_button_link || updatedSlides[0].buttonLink
          }
          setSlides(updatedSlides)
        }
      })
      .catch(error => console.error('Ошибка загрузки главной:', error))
  }, [])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [autoPlay, currentIndex])

  return (
    <div className="content_block">
      <div className="offer-carousel" id="offerCarousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            data-index={index}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-text">{slide.text}</p>
              <a href={slide.buttonLink} className="slide-button">
                {slide.buttonText}
              </a>
            </div>
            <div className="slide-image"></div>
          </div>
        ))}

        <div className="carousel-navigation">
          <button className="carousel-prev" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                data-index={index}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
          <button className="carousel-next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="auto-play-indicator">
          <i
            className={`fas ${autoPlay ? 'fa-pause' : 'fa-play'}`}
            onClick={() => setAutoPlay(!autoPlay)}
          ></i>
        </div>
      </div>
    </div>
  )
}

export default HeroCarousel