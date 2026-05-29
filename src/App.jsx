import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { ModalProvider, useModal } from './context/ModalContext'
import ModalManager from './components/ModalManager'

// Импорты компонентов админки
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminFondPage from './pages/admin/AdminFondPage'
import AdminProjects from './pages/admin/AdminProjects'
import AdminNews from './pages/admin/AdminNews'
import AdminTeam from './pages/admin/AdminTeam'
import AdminPartners from './pages/admin/AdminPartners'
import AdminDocuments from './pages/admin/AdminDocuments'
import AdminContactsPage from './pages/admin/AdminContactsPage'
import AdminDirections from './pages/admin/AdminDirections'
import AdminDonations from './pages/admin/AdminDonations'
import AdminPartnersRequests from './pages/admin/AdminPartnersRequests'
import AdminVolunteers from './pages/admin/AdminVolunteers'

// Импорты публичных страниц
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import TeamPage from './pages/TeamPage'
import DocumentsPage from './pages/DocumentsPage'
import FondPage from './pages/FondPage'
import ContactsPage from './pages/ContactsPage'
import NotFoundPage from './pages/NotFoundPage'

// Компонент с маршрутами
function AppRoutes() {
  const { modalType, isOpen, closeModal } = useModal()
  
  return (
    <>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/fond" element={<FondPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        
        {/* Админ маршруты - доступны только авторизованным */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<AdminProjects />} />
          <Route path="home" element={<AdminHomePage />} />
          <Route path="fond" element={<AdminFondPage />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="partners" element={<AdminPartners />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="contacts" element={<AdminContactsPage />} />
          <Route path="directions" element={<AdminDirections />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="partner-requests" element={<AdminPartnersRequests />} />
          <Route path="volunteers" element={<AdminVolunteers />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      <ModalManager modalType={modalType} isOpen={isOpen} onClose={closeModal} />
    </>
  )
}

// Главный компонент
function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ModalProvider>
  )
}

export default App