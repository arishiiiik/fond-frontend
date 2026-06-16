import '../../style.css'
import '../../team.css'

function TeamCard({ name, position, email, phone, vk, photo }) {
    // Формируем правильный URL для фото
    const getPhotoUrl = () => {
        if (!photo) return '/images/team/default.png'
        // Если путь относительный, добавляем базовый URL бэкенда
        if (photo.startsWith('/media/')) {
            return `http://159.194.229.53${photo}`
        }
        return photo
    }
    
    const photoUrl = getPhotoUrl()
    const fallbackPhoto = '/images/team/default.png'
    
    const handleError = (e) => {
        e.target.src = fallbackPhoto
    }
    
    return (
        <div className="team_cart">
            <div className="team_img">
                <img 
                    src={photoUrl} 
                    alt={name}
                    onError={handleError}
                />
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