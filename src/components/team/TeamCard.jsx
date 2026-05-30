import '../../style.css'
import '../../team.css'

function TeamCard({ name, position, email, phone, vk, photo }) {
  const imageUrl = image || 'https://placehold.co/400x300/e2e8f0/825B2C?text=%D0%9D%D0%B5%D1%82+%D1%84%D0%BE%D1%82%D0%BE'
  
  return (
    <div className="team_cart">
      <div className="team_img">
        <img src={photoUrl} alt={name} />
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