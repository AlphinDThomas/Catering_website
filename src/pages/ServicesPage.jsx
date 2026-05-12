import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { services, comparisonFeatures } from '../data/services'
import { galleryImages } from '../data/testimonials'
import Modal from '../components/Modal'
import './ServicesPage.css'

function GalleryLightbox({ images, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx)
  const go = (dir) => setIdx(i => (i + dir + images.length) % images.length)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [idx])

  const img = images[idx]

  return (
    <Modal isOpen onClose={onClose} title={img.caption} id="gallery-lightbox">
      <div className="lightbox-body">
        <button id="lightbox-prev-btn" className="lightbox-arrow lightbox-arrow--prev" onClick={() => go(-1)} aria-label="Previous image">
          <span className="material-icons">arrow_back</span>
        </button>
        <img src={img.src} alt={img.alt} className="lightbox-img" />
        <button id="lightbox-next-btn" className="lightbox-arrow lightbox-arrow--next" onClick={() => go(1)} aria-label="Next image">
          <span className="material-icons">arrow_forward</span>
        </button>
        <p className="lightbox-caption label-caps">{idx + 1} / {images.length} — {img.caption}</p>
      </div>
    </Modal>
  )
}

export default function ServicesPage() {
  const navigate = useNavigate()
  const [showComparison, setShowComparison] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(null)

  // Handle hash-based anchoring on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }
  }, [])

  return (
    <main className="page services-page">
      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="page-header services-page-header">
        <div className="container">
          <span className="label-caps page-header__eyebrow">What We Offer</span>
          <h1 className="headline-lg page-header__title">Bespoke Culinary Artistry</h1>
          <div className="divider divider-center" />
          <p className="body-lg page-header__sub">
            Elevating your most significant moments through precision, heritage, and sensory excellence.
          </p>
        </div>
      </section>

      <div className="container">
        {/* ── Service Cards ─────────────────────────────────────── */}
        {services.map((svc, idx) => (
          <section
            key={svc.id}
            id={svc.id}
            className={`service-detail${idx % 2 !== 0 ? ' service-detail--reverse' : ''}`}
            aria-labelledby={`svc-title-${svc.id}`}
          >
            <div className="service-detail__img-col">
              <img src={svc.image} alt={svc.title} className="service-detail__img" loading="lazy" />
              <div className="service-detail__img-accent" aria-hidden="true" />
            </div>
            <div className="service-detail__content">
              <p className="label-caps service-detail__label">{svc.label}</p>
              <h2 id={`svc-title-${svc.id}`} className="headline-lg service-detail__title">{svc.title}</h2>
              <div className="divider" />
              <p className="body-lg service-detail__desc" style={{ color: 'var(--on-surface-variant)' }}>
                {svc.description}
              </p>
              <ul className="service-features" aria-label={`${svc.title} features`}>
                {svc.features.map(f => (
                  <li key={f} className="service-features__item">
                    <span className="material-icons service-features__check">check</span>
                    <span className="body-md">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing Tiers */}
              <div className="service-tiers" aria-label={`${svc.title} pricing`}>
                <h3 className="label-caps service-tiers__title">Pricing from</h3>
                <div className="service-tiers__grid">
                  {svc.tiers.map(tier => (
                    <div key={tier.name} className="service-tier-card">
                      <p className="service-tier-card__name label-caps">{tier.name}</p>
                      <p className="service-tier-card__guests body-md">{tier.guests} guests</p>
                      <p className="service-tier-card__price">
                        ${tier.pricePerHead}
                        <span className="label-caps"> / head</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                id={`service-plan-${svc.id}-btn`}
                className="btn btn-primary"
                onClick={() => navigate('/book')}
                style={{ marginTop: 32 }}
              >
                Plan Your {svc.subtitle}
              </button>
            </div>
          </section>
        ))}

        {/* ── Comparison Table ──────────────────────────────────── */}
        <section className="comparison-section" aria-labelledby="comparison-heading">
          <div className="comparison-header">
            <h2 id="comparison-heading" className="headline-md">Compare All Services</h2>
            <button
              id="comparison-toggle-btn"
              className="btn btn-ghost"
              onClick={() => setShowComparison(v => !v)}
              aria-expanded={showComparison}
              aria-controls="comparison-table"
            >
              {showComparison ? 'Hide Comparison' : 'View Comparison'}
              <span className="material-icons" style={{ fontSize: 18 }}>
                {showComparison ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>

          {showComparison && (
            <div id="comparison-table" className="comparison-table-wrap">
              <table className="comparison-table" role="grid">
                <thead>
                  <tr>
                    <th scope="col" className="comparison-table__feature-col">Feature</th>
                    {services.map(s => (
                      <th key={s.id} scope="col" className="comparison-table__header">{s.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map(row => (
                    <tr key={row.feature}>
                      <td className="comparison-table__feature">{row.feature}</td>
                      {['weddings', 'corporate', 'private'].map(key => (
                        <td key={key} className="comparison-table__cell">
                          {row[key]
                            ? <span className="material-icons comparison-check">check_circle</span>
                            : <span className="material-icons comparison-cross">remove</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Gallery ───────────────────────────────────────────── */}
        <section className="services-gallery section" aria-labelledby="gallery-heading">
          <div className="section-header" style={{ marginBottom: 48 }}>
            <span className="label-caps" style={{ color: 'var(--color-gold)' }}>Our Work</span>
            <h2 id="gallery-heading" className="headline-lg" style={{ marginTop: 16 }}>A Visual Feast</h2>
            <div className="divider divider-center" />
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
              Click any image to explore our portfolio in full detail.
            </p>
          </div>
          <div className="gallery-grid" role="list">
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                id={`gallery-img-${img.id}-btn`}
                className="gallery-item"
                role="listitem"
                onClick={() => setLightboxIdx(i)}
                aria-label={`View ${img.caption}`}
              >
                <img src={img.src} alt={img.alt} className="gallery-item__img" loading="lazy" />
                <div className="gallery-item__overlay">
                  <span className="material-icons gallery-item__icon">open_in_full</span>
                  <span className="label-caps gallery-item__caption">{img.caption}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="services-cta-banner">
          <p className="label-caps services-cta-banner__eyebrow">Crafting Legacies Through Flavor</p>
          <h2 className="headline-md services-cta-banner__title">Ready to Plan Your Experience?</h2>
          <button
            id="services-page-book-btn"
            className="btn btn-primary"
            onClick={() => navigate('/book')}
          >
            Begin Your Journey
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <GalleryLightbox
          images={galleryImages}
          startIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </main>
  )
}
