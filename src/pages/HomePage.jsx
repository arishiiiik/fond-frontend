import Header from '../components/Header'
import Footer from '../components/Footer'  // ← добавить
import HeroCarousel from '../components/HeroCarousel'
import ProjectsSection from '../components/ProjectsSection'
import DirectionsSection from '../components/DirectionsSection'
import HelpSection from '../components/HelpSection'
import PartnersSection from '../components/PartnersSection'
import NewsSection from '../components/NewsSection'
import ContactSection from '../components/ContactSection'

function HomePage() {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <main>
        <DirectionsSection />
        <ProjectsSection />
        <HelpSection />
        <PartnersSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />  {/* ← добавить */}
    </div>
  )
}

export default HomePage