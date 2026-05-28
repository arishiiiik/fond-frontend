import '../style.css'
import SmallProjectCard from './SmallProjectCard'

// Только активные проекты для главной
const activeProjects = [
  {
    id: 1,
    city: "Кирилловский район",
    title: "Сады Севера",
    description: "Испытание сортов и видов плодовых и декоративных растений, пригодных для почвенно-климатических условий Русского севера.",
    status: "Активный",
    image: "/images/project/project2.png",
    slug: "sady-severa"
  },
  {
    id: 2,
    city: "Вологодский район",
    title: "Усадьба Спасское-Куркино",
    description: "Создание модели построения современной усадьбы на примере культурно-исторического наследия предков.",
    status: "Активный",
    image: "/images/project/project4.png",
    slug: "usadba-spasskoe-kurkino"
  },
  {
    id: 3,
    city: "Вологодская область",
    title: "Фестиваль 'Деревня - душа России'",
    description: "Восстановление и сохранение духовно-нравственных ценностей традиционной народной культуры Севера России.",
    status: "Ежегодный",
    image: "/images/project/project3.png",
    slug: "festival-derevnya-dusha-rossii"
  }
]

function ProjectsSection() {
  return (
    <div className="active_project">
      <div className="zagolovok">
        <p className="zag_main">Активные проекты</p>
        <div className="line"></div>
        <p className="zag_description">
          Проекты, реализуемые прямо сейчас в различных районах <br />
          Вологодской области
        </p>
      </div>
      <div className="small-project_catalog">
        {activeProjects.map(project => (
          <SmallProjectCard
            key={project.id}
            city={project.city}
            title={project.title}
            description={project.description}
            status={project.status}
            image={project.image}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsSection