import '../style.css'
import '../fond.css'
import Header from '../components/Header'
import HeroCarousel from '../components/HeroCarousel'
import AboutFond from '../components/fond/AboutFond'
import HistoryTimeline from '../components/fond/HistoryTimeline'
import ContactSection from '../components/ContactSection'

function FondPage() {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <main>
        <AboutFond />
        <HistoryTimeline />
        <ContactSection />
      </main>
    </div>
  )
}

export default FondPage