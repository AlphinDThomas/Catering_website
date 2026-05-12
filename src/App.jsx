import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider } from './store/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ToastContainer from './components/Toast'

import HomePage         from './pages/HomePage'
import MenuPage         from './pages/MenuPage'
import ServicesPage     from './pages/ServicesPage'
import BookingPage      from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import AboutPage        from './pages/AboutPage'
import NotFoundPage     from './pages/NotFoundPage'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Don't scroll to top if there's a hash (anchor navigation)
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])
  return null
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/menus"       element={<MenuPage />} />
        <Route path="/services"    element={<ServicesPage />} />
        <Route path="/book"        element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="*"            element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  )
}
