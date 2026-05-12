import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { menuItems } from '../data/menuItems'
import { testimonials } from '../data/testimonials'
import { services } from '../data/services'
import { useApp } from '../store/AppContext'
import './HomePage.css'

/* ── Newsletter Form ─────────────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { addToast } = useApp()

  const validate = (v) => {
    if (!v.trim()) return 'Email address is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address'
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate(email)
    if (err) { setError(err); return }
    setSubmitted(true)
    addToast('Welcome to the AURORE circle — we\'ll be in touch.', 'success')
  }

  if (submitted) {
    return (
      <div className="newsletter__success">
        <span className="material-icons">check_circle</span>
        <p>Thank you. You are now part of the AURORE circle.</p>
      </div>
    )
  }

  return (
    <form id="newsletter-form" onSubmit={handleSubmit} noValidate className="newsletter__form">
      <div className="newsletter__input-row">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); if (error) setError('') }}
          onBlur={() => setError(validate(email))}
          placeholder="Your email address"
          className={`form-input newsletter__input${error ? ' error' : ''}`}
          aria-describedby="newsletter-error"
          aria-invalid={!!error}
        />
        <button type="submit" id="newsletter-submit-btn" className="btn btn-primary">
          Join the Circle
        </button>
      </div>
      {error && <p id="newsletter-error" className="form-error" role="alert">{error}</p>}
    </form>
  )
}

/* ── Testimonials Carousel ───────────────────────────────── */
function TestimonialsCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  const go = (idx) => setActive((idx + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => go(active + 1), 5000)
    return () => clearInterval(intervalRef.current)
  }, [active, paused])

  const t = testimonials[active]

  return (
    <div
      className="testimonials__carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Client testimonials"
      aria-roledescription="carousel"
    >
      <div className="testimonials__slide" key={active}>
        <div className="testimonials__stars" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i} className="material-icons" aria-hidden="true">star</span>
          ))}
        </div>
        <blockquote className="testimonials__quote quote-text">"{t.quote}"</blockquote>
        <div className="testimonials__author">
          <img src={t.image} alt={t.name} className="testimonials__avatar" loading="lazy" />
          <div>
            <p className="testimonials__name">{t.name}</p>
            <p className="label-caps testimonials__event">{t.eventType}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="testimonials__controls">
        <button
          id="testimonials-prev-btn"
          onClick={() => go(active - 1)}
          aria-label="Previous testimonial"
          className="testimonials__arrow"
        >
          <span className="material-icons">arrow_back</span>
        </button>
        <div className="testimonials__dots" role="tablist">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              id={`testimonial-dot-${i}`}
              aria-selected={i === active}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`testimonials__dot${i === active ? ' testimonials__dot--active' : ''}`}
            />
          ))}
        </div>
        <button
          id="testimonials-next-btn"
          onClick={() => go(active + 1)}
          aria-label="Next testimonial"
          className="testimonials__arrow"
        >
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  )
}

/* ── Main HomePage ───────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate()
  const featured = menuItems.filter(m => m.category === 'starters').slice(0, 3)
  const { toggleWishlist, state, addToast } = useApp()

  const handleWishlist = (item) => {
    toggleWishlist(item.id)
    const inList = state.wishlist.includes(item.id)
    addToast(inList ? `Removed "${item.name}" from wishlist` : `Added "${item.name}" to wishlist`, 'success')
  }

  return (
    <main className="page home-page">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85"
            alt="Fine dining"
            className="hero__img"
          />
          <div className="hero__overlay" />
        </div>
        <div className="container hero__content">
          <p className="label-caps hero__eyebrow animate-in">Artisanal Catering Since 2012</p>
          <h1 className="display-lg hero__title animate-in animate-delay-1">
            Elevating Moments<br />Through Flavor
          </h1>
          <p className="body-lg hero__sub animate-in animate-delay-2">
            Bespoke catering for weddings, corporate events, and private dining — crafted with heritage and sensory excellence.
          </p>
          <div className="hero__ctas animate-in animate-delay-3">
            <button
              id="hero-explore-menus-btn"
              className="btn btn-primary"
              onClick={() => navigate('/menus')}
            >
              Explore Our Menus
            </button>
            <button
              id="hero-plan-event-btn"
              className="btn btn-secondary"
              onClick={() => navigate('/book')}
            >
              Plan Your Event
            </button>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span className="material-icons">arrow_downward</span>
        </div>
      </section>

      {/* ── Brand Strip ──────────────────────────────────────── */}
      <section className="brand-strip" aria-label="Brand values">
        <div className="container brand-strip__inner">
          {[
            { icon: 'restaurant', label: 'Bespoke Menus' },
            { icon: 'local_florist', label: 'Seasonal Ingredients' },
            { icon: 'workspace_premium', label: 'White-Glove Service' },
            { icon: 'eco', label: 'Sustainable Sourcing' },
          ].map(({ icon, label }) => (
            <div key={label} className="brand-strip__item">
              <span className="material-icons brand-strip__icon">{icon}</span>
              <span className="label-caps">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── About Snippet ─────────────────────────────────────── */}
      <section className="section about-snippet" aria-labelledby="about-heading">
        <div className="container about-snippet__grid">
          <div className="about-snippet__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80"
              alt="Chef preparing a dish"
              className="about-snippet__image"
              loading="lazy"
            />
            <div className="about-snippet__badge">
              <p className="display-lg about-snippet__year">12</p>
              <p className="label-caps">Years of Excellence</p>
            </div>
          </div>
          <div className="about-snippet__text">
            <p className="label-caps" style={{ color: 'var(--color-gold)', marginBottom: 16 }}>Our Philosophy</p>
            <h2 id="about-heading" className="headline-lg">
              More Than Catering —<br />A Sensory Journey
            </h2>
            <div className="divider" />
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
              At AURORE, we believe that catering is the curation of a sensory narrative. Our culinary approach
              is rooted in the precision of classical technique paired with the vibrant spirit of seasonal,
              locally sourced ingredients.
            </p>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 40 }}>
              Every event is a unique canvas. From the initial consultation to the final crumb, our team delivers
              impeccable service that feels both professional and intimately personal.
            </p>
            <button
              id="about-discover-btn"
              className="btn btn-secondary"
              onClick={() => navigate('/about')}
            >
              Our Story <span className="material-icons" style={{ fontSize: 16 }}>north_east</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────── */}
      <section className="section services-section" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-header">
            <span className="label-caps" style={{ color: 'var(--color-gold)' }}>What We Offer</span>
            <h2 id="services-heading" className="headline-lg" style={{ marginTop: 16 }}>The Art of the Event</h2>
            <div className="divider divider-center" />
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
              AURORE specialises in creating atmospheric dining experiences where every detail is meticulously curated for your unique narrative.
            </p>
          </div>

          <div className="services-grid">
            {services.map((svc, i) => (
              <div key={svc.id} className="service-card" id={`service-card-${svc.id}`}>
                <div className="service-card__img-wrap">
                  <img src={svc.image} alt={svc.title} className="service-card__img" loading="lazy" />
                  <span className="badge badge-gold service-card__badge">{svc.label}</span>
                </div>
                <div className="service-card__body">
                  <h3 className="headline-md service-card__title">{svc.title}</h3>
                  <p className="body-md service-card__desc" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
                    {svc.tagline}
                  </p>
                  <button
                    id={`service-discover-${svc.id}-btn`}
                    className="btn btn-ghost btn-sm"
                    onClick={() => navigate(`/services#${svc.id}`)}
                  >
                    Discover More <span className="material-icons" style={{ fontSize: 14 }}>arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Menu ─────────────────────────────────────── */}
      <section className="section featured-menu" aria-labelledby="menu-heading">
        <div className="container">
          <div className="section-header">
            <span className="label-caps" style={{ color: 'var(--color-gold)' }}>A Taste of Excellence</span>
            <h2 id="menu-heading" className="headline-lg" style={{ marginTop: 16 }}>Signature Starters</h2>
            <div className="divider divider-center" />
          </div>
          <div className="featured-grid">
            {featured.map(item => (
              <div key={item.id} className="menu-card card">
                <div className="menu-card__img-wrap">
                  <img src={item.image} alt={item.name} className="menu-card__img" loading="lazy" />
                  <button
                    id={`featured-wishlist-${item.id}-btn`}
                    className={`menu-card__heart${state.wishlist.includes(item.id) ? ' menu-card__heart--active' : ''}`}
                    onClick={() => handleWishlist(item)}
                    aria-label={`${state.wishlist.includes(item.id) ? 'Remove' : 'Add'} ${item.name} to wishlist`}
                    aria-pressed={state.wishlist.includes(item.id)}
                  >
                    <span className="material-icons">
                      {state.wishlist.includes(item.id) ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                </div>
                <div className="menu-card__body card-body">
                  <div className="menu-card__tags">
                    {item.dietary.map(d => (
                      <span key={d} className={`badge badge-${d === 'vegetarian' ? 'green' : d === 'vegan' ? 'blue' : 'gold'}`}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <h3 className="menu-card__name">{item.name}</h3>
                  <p className="menu-card__desc body-md">{item.description}</p>
                  <p className="menu-card__price">From <strong>${item.price}</strong> <span className="label-caps">per head</span></p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <button
              id="home-view-full-menu-btn"
              className="btn btn-primary"
              onClick={() => navigate('/menus')}
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* ── Signature CTA ─────────────────────────────────────── */}
      <section className="signature-cta" aria-label="Premium service callout">
        <div className="container signature-cta__inner">
          <p className="label-caps signature-cta__eyebrow">White-Glove Experience</p>
          <h2 className="headline-lg signature-cta__title">
            Experience Our Highest Level of Service
          </h2>
          <p className="body-lg signature-cta__sub">
            From custom menu design with our Executive Chef to full venue curation and management —
            your event deserves nothing less than perfection.
          </p>
          <button
            id="signature-cta-btn"
            className="btn btn-primary"
            onClick={() => navigate('/book')}
          >
            Request a Private Consultation
          </button>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="section testimonials-section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section-header">
            <span className="label-caps" style={{ color: 'var(--color-gold)' }}>Client Stories</span>
            <h2 id="testimonials-heading" className="headline-lg" style={{ marginTop: 16 }}>
              Words from Our Guests
            </h2>
            <div className="divider divider-center" />
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────── */}
      <section className="newsletter-section section-sm" aria-labelledby="newsletter-heading">
        <div className="container newsletter__inner">
          <div className="newsletter__text">
            <h2 id="newsletter-heading" className="headline-md">Join the AURORE Circle</h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginTop: 12 }}>
              Seasonal menus, exclusive events, and culinary inspiration — delivered to your inbox.
            </p>
          </div>
          <div className="newsletter__form-wrap">
            <NewsletterForm />
          </div>
        </div>
      </section>

    </main>
  )
}
