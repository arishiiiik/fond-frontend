import '../style.css'

function Hero() {
  return (
    <div className="content_block">
      <div className="offer-carousel">
        <div className="carousel-slide active">
          <div className="slide-content">
            <h1 className="slide-title">Развиваем малые города и сёла Вологодской области</h1>
            <p className="slide-text">
              Создаём условия для устойчивого развития территорий через комплексные программы поддержки
            </p>
            <a href="/projects" className="slide-button">Узнать о проектах</a>
          </div>
          <div className="slide-image"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero