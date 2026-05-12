import { useNavigate } from 'react-router-dom'
import { galleryImages } from '../data/testimonials'
import './AboutPage.css'

const team = [
  {
    name: 'Élise Moreau',
    role: 'Executive Chef & Founder',
    bio: 'Trained at Le Cordon Bleu Paris and honed under two Michelin-starred mentors, Élise founded AURORE in 2012 with a singular vision: that catering could be as artful and intentional as fine dining.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
  },
  {
    name: 'Marcus Delacroix',
    role: 'Head of Events & Concierge',
    bio: 'With 15 years in luxury hospitality across London, Dubai, and New York, Marcus ensures every client interaction reflects the same impeccable standard as the food on the plate.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Pastry Chef & Dessert Architect',
    bio: 'A graduate of the École Nationale Supérieure de Pâtisserie, Priya brings a sculptor\'s precision and a painter\'s palette to every dessert course she creates.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
  },
]

const values = [
  { icon: 'eco', title: 'Sustainability', desc: 'We source 85% of our ingredients from local farms within 100 miles, reducing our carbon footprint and supporting regional agriculture.' },
  { icon: 'workspace_premium', title: 'Excellence', desc: 'Every dish is approached as a work of craft. We hold ourselves to the same standards as the finest restaurants in the world.' },
  { icon: 'favorite', title: 'Intimacy', desc: 'We treat every event as though it were our own. No template menus, no formulaic service — only deeply personal experiences.' },
  { icon: 'handshake', title: 'Heritage', desc: 'Our roots are in classical French cuisine, elevated by global influences and a reverence for culinary tradition.' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <main className="page about-page">

      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="page-header about-page-header">
        <div className="container">
          <span className="label-caps page-header__eyebrow">Our Story</span>
          <h1 className="headline-lg page-header__title">Crafting Legacies Since 2012</h1>
          <div className="divider divider-center" />
          <p className="body-lg page-header__sub">
            A studio of culinary artisans dedicated to transforming your most significant moments into
            timeless sensory memories.
          </p>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="section about-mission">
        <div className="container about-mission__grid">
          <div className="about-mission__text">
            <p className="label-caps" style={{ color: 'var(--color-gold)', marginBottom: 16 }}>Our Philosophy</p>
            <h2 className="headline-lg" style={{ marginBottom: 8 }}>More Than Food —<br />A Sensory Journey</h2>
            <div className="divider" />
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
              At AURORE, we believe that catering is the curation of a sensory narrative. Our culinary approach
              is rooted in the precision of classical technique paired with the vibrant spirit of seasonal,
              locally sourced ingredients.
            </p>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
              We value heritage, sustainability, and the profound joy that comes from a perfectly shared meal.
              Every event is treated as a unique canvas — from the initial consultation to the final crumb,
              our team is dedicated to impeccable service that feels both professional and intimately personal.
            </p>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
              Founded in 2012 by Executive Chef Élise Moreau, AURORE has grown from a boutique Paris atelier
              to a globally acclaimed catering studio with a portfolio spanning intimate private dinners
              for royalty to international corporate summits for 1,000+ guests.
            </p>
          </div>
          <div className="about-mission__stats">
            {[
              { num: '12+', label: 'Years of Excellence' },
              { num: '2,400+', label: 'Events Catered' },
              { num: '98%', label: 'Client Satisfaction' },
              { num: '35', label: 'Culinary Specialists' },
            ].map(({ num, label }) => (
              <div key={label} className="about-stat">
                <p className="about-stat__num">{num}</p>
                <p className="label-caps about-stat__label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="section about-values" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-header">
            <span className="label-caps" style={{ color: 'var(--color-gold)' }}>What Drives Us</span>
            <h2 id="values-heading" className="headline-lg" style={{ marginTop: 16 }}>Our Core Values</h2>
            <div className="divider divider-center" />
          </div>
          <div className="about-values__grid">
            {values.map(v => (
              <div key={v.title} className="about-value-card">
                <span className="material-icons about-value-card__icon">{v.icon}</span>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="body-md about-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="section about-team" aria-labelledby="team-heading">
        <div className="container">
          <div className="section-header">
            <span className="label-caps" style={{ color: 'var(--color-gold)' }}>The People</span>
            <h2 id="team-heading" className="headline-lg" style={{ marginTop: 16 }}>Meet Our Artisans</h2>
            <div className="divider divider-center" />
          </div>
          <div className="about-team__grid">
            {team.map(member => (
              <div key={member.name} className="team-card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-card__img"
                  loading="lazy"
                />
                <div className="team-card__body">
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="label-caps team-card__role">{member.role}</p>
                  <div className="divider" style={{ margin: '16px 0' }} />
                  <p className="body-md team-card__bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sustainability ────────────────────────────────────── */}
      <section id="sustainability" className="about-sustainability section" aria-labelledby="sustainability-heading">
        <div className="container about-sustainability__grid">
          <div className="about-sustainability__text">
            <p className="label-caps" style={{ color: 'var(--color-gold)', marginBottom: 16 }}>Our Commitment</p>
            <h2 id="sustainability-heading" className="headline-lg" style={{ marginBottom: 8 }}>Sustainability at AURORE</h2>
            <div className="divider" />
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
              We believe that the finest food is also the most responsible. Our sustainability programme
              is not a marketing exercise — it is embedded in every decision we make.
            </p>
            <ul className="about-sustainability__list">
              {[
                '85% locally sourced ingredients within 100 miles',
                'Zero single-use plastics at all events since 2020',
                'Composting and food waste programmes at every venue',
                'Carbon-offset fleet for all deliveries',
                'Seasonal menus that reduce food miles by 40%',
                'Partnerships with 12 certified organic farms',
              ].map(item => (
                <li key={item} className="about-sustainability__item">
                  <span className="material-icons" style={{ color: '#2e7d4f', fontSize: 18 }}>eco</span>
                  <span className="body-md">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="about-sustainability__img-col">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&q=80"
              alt="Fresh produce from local farm"
              className="about-sustainability__img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────── */}
      <section id="gallery" className="section about-gallery" aria-labelledby="gallery-heading">
        <div className="container">
          <div className="section-header">
            <span className="label-caps" style={{ color: 'var(--color-gold)' }}>Our Work</span>
            <h2 id="gallery-heading" className="headline-lg" style={{ marginTop: 16 }}>Event Gallery</h2>
            <div className="divider divider-center" />
          </div>
          <div className="about-gallery__grid" role="list">
            {galleryImages.map(img => (
              <div key={img.id} className="about-gallery__item" role="listitem">
                <img src={img.src} alt={img.alt} loading="lazy" />
                <p className="label-caps about-gallery__caption">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="about-cta section-sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="label-caps" style={{ color: 'var(--color-gold)', marginBottom: 16 }}>Begin Your Journey</p>
          <h2 className="headline-md" style={{ marginBottom: 32 }}>Ready to Create Something Extraordinary?</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button id="about-book-btn" className="btn btn-primary" onClick={() => navigate('/book')}>
              Request a Consultation
            </button>
            <button id="about-menus-btn" className="btn btn-secondary" onClick={() => navigate('/menus')}>
              Explore Our Menus
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}
