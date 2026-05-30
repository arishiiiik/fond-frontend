import '../../style.css'
import '../../team.css'

function TeamCard({ name, position, email, phone, vk, photo }) {
  const photoUrl = photo ? `${MEDIA_URL}${photo}` : '/images/team/default.png'
  return (
    <div className="team_cart">
      <div className="team_img">
        <img src={photo} alt={name} />
      </div>
      <div className="team_text">
        <h2>{name}</h2>
        <p>{position}</p>
        <div className="email">
          <img src="/images/team/email.png" alt="email" />
          <p>{email}</p>
        </div>
        <div className="phone">
          <img src="/images/team/phone.png" alt="phone" />
          <p>{phone}</p>
        </div>
        <hr className="team_line" />
        {vk ? (
          <a href={vk} target="_blank" rel="noopener noreferrer">Профиль</a>
        ) : (
          <a href="#" style={{ opacity: 0.5, cursor: 'default', pointerEvents: 'none' }}>Профиль</a>
        )}
      </div>
    </div>
  )
}

export default TeamCard