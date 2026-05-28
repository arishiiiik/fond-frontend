import '../../style.css'
import '../../fond.css'

function AboutFond() {
  return (
    <div className="fond_information">
      <div className="zagolovok">
        <p className="zag_main">О фонде</p>
        <div className="line"></div>
        <p className="zag_description">
          Мобилизуем ресурсы для социально-экономического развития <br />
          малых городов и сёл Вологодской области
        </p>
      </div>
      
      <div className="content_information">
        <img src="/images/fond/fond.png" alt="О фонде" />
        <div className="text_information">
          <h2>Цель:</h2>
          <p>
            мобилизация финансовых, научных, производственных, материально-технических, 
            трудовых и общественных ресурсов для социально-экономического развития 
            малых городов и сел Вологодской области.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutFond