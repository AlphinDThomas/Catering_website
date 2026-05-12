import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { state } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const drawerRef = useRef(null)

  // Only homepage has the transparent-hero navbar; all other pages start "scrolled"
  const isHome = location.pathname === '/'
  const isScrolled = !isHome || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    // Re-check immediately when route changes (for scroll position)
    setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Close drawer on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { to: '/',         label: 'Home',     end: true },
    { to: '/menus',    label: 'Menus' },
    { to: '/services', label: 'Services' },
    { to: '/about',    label: 'About' },
  ]

  return (
    <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="AURORE home">
          AURORE
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="navbar__actions">
          <button
            id="nav-wishlist-btn"
            className="navbar__wishlist"
            onClick={() => navigate('/menus')}
            aria-label={`Menu wishlist, ${state.wishlist.length} items`}
          >
            <span className="material-icons">favorite_border</span>
            {state.wishlist.length > 0 && (
              <span className="navbar__badge" aria-hidden="true">{state.wishlist.length}</span>
            )}
          </button>
          <button
            id="nav-quote-btn"
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/book')}
          >
            Request Quote
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="nav-hamburger-btn"
          className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(o => !o)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && <div className="navbar__overlay" aria-hidden="true" />}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`navbar__drawer${mobileOpen ? ' navbar__drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          id="nav-mobile-quote-btn"
          className="btn btn-primary"
          onClick={() => { navigate('/book'); setMobileOpen(false) }}
          style={{ marginTop: 32, width: '100%' }}
        >
          Request Quote
        </button>
        {state.wishlist.length > 0 && (
          <p className="navbar__drawer-wishlist" onClick={() => { navigate('/menus'); setMobileOpen(false) }}>
            ♡ {state.wishlist.length} menu item{state.wishlist.length !== 1 ? 's' : ''} saved
          </p>
        )}
      </div>
    </header>
  )
}
