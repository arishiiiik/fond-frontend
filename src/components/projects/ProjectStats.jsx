import '../../project.css'

function ProjectStats() {
  const stats = [
    { value: 12, label: "Всего проектов" },
    { value: 7, label: "Активных" },
    { value: 5, label: "Завершённых" },
    { value: 200, label: "Участников проектов" }
  ]

  return (
    <div className="project_information">
      {stats.map((stat, index) => (
        <div className="info" key={index}>
          <h2>{stat.value}</h2>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default ProjectStats