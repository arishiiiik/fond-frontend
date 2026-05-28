import { useState, useEffect } from 'react'
import { getTeam } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroCarousel from '../components/HeroCarousel'
import TeamCard from '../components/team/TeamCard'  // ← исправленный путь
import '../style.css'
import '../team.css'

function TeamPage() {
    const [team, setTeam] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTeam()
            .then(response => {
                setTeam(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Ошибка загрузки команды:', error)
                setLoading(false)
            })
    }, [])

    if (loading) return (
        <div>
            <Header />
            <div style={{ textAlign: 'center', padding: '100px' }}>Загрузка команды...</div>
            <Footer />
        </div>
    )

    return (
        <div>
            <Header />
            <HeroCarousel />
            <main>
                <div className="zagolovok">
                    <p className="zag_main">Команда</p>
                    <div className="line"></div>
                    <p className="zag_description">
                        Профессионалы, которые каждый день работают для развития малых городов <br />
                        и сёл Вологодской области
                    </p>
                </div>

                <div className="team_list">
                    {team.map(member => (
                        <TeamCard 
                            key={member.id}
                            name={member.name}
                            position={member.position}
                            email={member.email}
                            phone={member.phone}
                            vk={member.vk_url}
                            photo={member.photo_url || '/images/team/default.png'}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default TeamPage