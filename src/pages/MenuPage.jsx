import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { menuItems } from '../data/menuItems'
import { useApp } from '../store/AppContext'
import './MenuPage.css'

const CATEGORIES = ['all', 'starters', 'mains', 'desserts']
const DIETARY = ['vegetarian', 'vegan', 'gluten-free']

export default function MenuPage() {
  const navigate = useNavigate()
  const { state, toggleWishlist, addToast } = useApp()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [activeDietary, setActiveDietary] = useState([])
  const [customNote, setCustomNote] = useState('')
  const [noteSubmitted, setNoteSubmitted] = useState(false)
  const [noteError, setNoteError] = useState('')

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      const catMatch = activeCategory === 'all' || item.category === activeCategory
      const searchMatch = search === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      const dietMatch = activeDietary.length === 0 ||
        activeDietary.every(d => item.dietary.includes(d))
      return catMatch && searchMatch && dietMatch
    })
  }, [activeCategory, search, activeDietary])

  const toggleDietary = (d) => {
    setActiveDietary(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  const handleWishlist = (item) => {
    toggleWishlist(item.id)
    const inList = state.wishlist.includes(item.id)
    addToast(inList ? `Removed "${item.name}" from wishlist` : `Added "${item.name}" to your wishlist`, 'success')
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (customNote.trim().length < 10) {
      setNoteError('Please describe your requirements (at least 10 characters).')
      return
    }
    const notes = JSON.parse(localStorage.getItem('aurore_menu_notes') || '[]')
    notes.push({ note: customNote, savedAt: new Date().toISOString() })
    localStorage.setItem('aurore_menu_notes', JSON.stringify(notes))
    setNoteSubmitted(true)
    addToast('Your menu requirements have been saved. Our chef will review them.', 'success')
  }

  return (
    <main className="page menu-page">
      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="page-header menu-page-header">
        <div className="container">
          <span className="label-caps page-header__eyebrow">Our Culinary Offerings</span>
          <h1 className="headline-lg page-header__title">Menu Explorer</h1>
          <div className="divider divider-center" />
          <p className="body-lg page-header__sub">
            Our menus evolve with the seasons, ensuring every ingredient is at its peak of flavor and provenance.
          </p>
        </div>
      </section>

      <div className="container menu-page__body">
        {/* ── Filters Row ──────────────────────────────────────── */}
        <div className="menu-filters" role="group" aria-label="Menu filters">
          {/* Category Tabs */}
          <div className="menu-filters__tabs" role="tablist" aria-label="Menu categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                id={`menu-tab-${cat}`}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`menu-tab${activeCategory === cat ? ' menu-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="menu-search-wrap">
            <span className="material-icons menu-search-icon">search</span>
            <input
              id="menu-search-input"
              type="search"
              placeholder="Search dishes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="menu-search"
              aria-label="Search menu items"
            />
            {search && (
              <button
                id="menu-search-clear-btn"
                className="menu-search-clear"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <span className="material-icons">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Dietary Chips */}
        <div className="dietary-chips" role="group" aria-label="Dietary filters">
          {DIETARY.map(d => (
            <button
              key={d}
              id={`dietary-chip-${d}`}
              className={`dietary-chip${activeDietary.includes(d) ? ' dietary-chip--active' : ''}`}
              onClick={() => toggleDietary(d)}
              aria-pressed={activeDietary.includes(d)}
            >
              {d === 'vegetarian' && '🌿 '}
              {d === 'vegan' && '🌱 '}
              {d === 'gluten-free' && '🌾 '}
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
          {activeDietary.length > 0 && (
            <button
              id="dietary-clear-btn"
              className="dietary-chip dietary-chip--clear"
              onClick={() => setActiveDietary([])}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Wishlist Bar */}
        {state.wishlist.length > 0 && (
          <div className="wishlist-bar" role="status" aria-live="polite">
            <span className="material-icons" style={{ color: '#c0392b' }}>favorite</span>
            <span>
              {state.wishlist.length} dish{state.wishlist.length !== 1 ? 'es' : ''} saved to your wishlist
            </span>
            <button
              id="wishlist-book-btn"
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/book')}
            >
              Include in Enquiry
            </button>
          </div>
        )}

        {/* ── Menu Grid ────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="menu-empty" role="status">
            <span className="material-icons menu-empty__icon">search_off</span>
            <p className="headline-md">No dishes found</p>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>
              Try adjusting your filters or search term.
            </p>
            <button
              id="menu-clear-filters-btn"
              className="btn btn-ghost"
              style={{ marginTop: 24 }}
              onClick={() => { setSearch(''); setActiveCategory('all'); setActiveDietary([]) }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="menu-grid" role="list">
            {filtered.map(item => (
              <article
                key={item.id}
                className="menu-item-card card"
                role="listitem"
                id={`menu-item-${item.id}`}
              >
                <div className="menu-item-card__img-wrap">
                  <img src={item.image} alt={item.name} className="menu-item-card__img" loading="lazy" />
                  <span className="badge badge-gold menu-item-card__category">{item.category}</span>
                  <button
                    id={`wishlist-${item.id}-btn`}
                    className={`menu-card__heart${state.wishlist.includes(item.id) ? ' menu-card__heart--active' : ''}`}
                    onClick={() => handleWishlist(item)}
                    aria-label={`${state.wishlist.includes(item.id) ? 'Remove' : 'Save'} ${item.name}`}
                    aria-pressed={state.wishlist.includes(item.id)}
                  >
                    <span className="material-icons">
                      {state.wishlist.includes(item.id) ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                </div>
                <div className="card-body menu-item-card__body">
                  <div className="menu-card__tags">
                    {item.dietary.map(d => (
                      <span key={d} className={`badge badge-${d === 'vegetarian' ? 'green' : d === 'vegan' ? 'blue' : 'gold'}`}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <h2 className="menu-card__name">{item.name}</h2>
                  <p className="menu-card__desc body-md">{item.description}</p>
                  <div className="menu-item-card__footer">
                    <p className="menu-card__price">
                      From <strong>${item.price}</strong>
                      <span className="label-caps"> / head</span>
                    </p>
                    <button
                      id={`menu-enquire-${item.id}-btn`}
                      className="btn btn-ghost btn-sm"
                      onClick={() => navigate('/book')}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Results count */}
        {filtered.length > 0 && (
          <p className="menu-results-count label-caps" aria-live="polite">
            Showing {filtered.length} of {menuItems.length} dishes
          </p>
        )}

        {/* ── Customise Menu Form ───────────────────────────────── */}
        <section className="custom-menu-section" aria-labelledby="customize-heading">
          <div className="custom-menu-inner">
            <div className="custom-menu-text">
              <p className="label-caps" style={{ color: 'var(--color-gold)', marginBottom: 12 }}>Bespoke Experience</p>
              <h2 id="customize-heading" className="headline-md">Customise Your Menu</h2>
              <div className="divider" />
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                Allow us to tailor our culinary offerings to match your unique vision. Our chefs are dedicated
                to creating a bespoke dining experience for your event.
              </p>
            </div>
            <div className="custom-menu-form-wrap">
              {noteSubmitted ? (
                <div className="custom-menu-success">
                  <span className="material-icons">check_circle</span>
                  <div>
                    <p className="headline-md" style={{ fontSize: '1.1rem' }}>Requirements Saved</p>
                    <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>
                      Our Executive Chef will review your brief and follow up within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form id="customize-menu-form" onSubmit={handleCustomSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="custom-note" className="form-label">
                      Your menu requirements
                    </label>
                    <textarea
                      id="custom-note"
                      value={customNote}
                      onChange={e => { setCustomNote(e.target.value); if (noteError) setNoteError('') }}
                      className={`form-textarea${noteError ? ' error' : ''}`}
                      placeholder="Describe your ideal menu — dietary restrictions, preferred cuisines, number of courses, special requests..."
                      maxLength={500}
                      rows={5}
                      aria-describedby="custom-note-error custom-note-count"
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {noteError
                        ? <p id="custom-note-error" className="form-error" role="alert">{noteError}</p>
                        : <span />
                      }
                      <span id="custom-note-count" className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '0.6rem' }}>
                        {customNote.length}/500
                      </span>
                    </div>
                  </div>
                  <button id="customize-submit-btn" type="submit" className="btn btn-primary" style={{ marginTop: 16 }}>
                    Submit Requirements
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
