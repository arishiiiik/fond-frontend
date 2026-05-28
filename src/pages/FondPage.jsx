import '../style.css'
import '../fond.css'
import Header from '../components/Header'
import Footer from '../components/Footer' 
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
      <Footer />
    </div>
  )
}

export default FondPage