import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import './ConfirmationPage.css'

export default function ConfirmationPage() {
  const navigate = useNavigate()
  const { state, clearLastEnquiry } = useApp()
  const enquiry = state.lastEnquiry

  // Guard: redirect if visited directly with no pending enquiry
  useEffect(() => {
    if (!enquiry) {
      navigate('/', { replace: true })
    }
  }, [enquiry, navigate])

  if (!enquiry) return null

  const eventLabels = {
    wedding: 'Wedding', corporate: 'Corporate Event',
    private: 'Private Dinner', other: 'Special Event',
  }
  const budgetLabels = {
    'under-5k': 'Under $5,000', '5k-15k': '$5,000 – $15,000',
    '15k-30k': '$15,000 – $30,000', '30k-60k': '$30,000 – $60,000', '60k+': '$60,000+',
  }

  return (
    <main className="page confirmation-page">
      <div className="container confirmation-page__inner">

        {/* Success Icon */}
        <div className="confirmation-icon-wrap" aria-hidden="true">
          <div className="confirmation-icon">
            <span className="material-icons">check</span>
          </div>
        </div>

        <p className="label-caps confirmation-eyebrow">Enquiry Received</p>
        <h1 className="headline-lg confirmation-title">Thank You, {enquiry.fullName.split(' ')[0]}.</h1>
        <div className="divider divider-center" />
        <p className="body-lg confirmation-sub">
          Your enquiry has been received. Our concierge team will review your details and
          reach out within <strong>24 business hours</strong> to begin crafting your bespoke experience.
        </p>

        {/* Reference Card */}
        <div className="confirmation-ref-card">
          <div className="confirmation-ref-card__header">
            <p className="label-caps">Your Reference Number</p>
            <p className="confirmation-ref">{enquiry.id}</p>
          </div>
          <div className="confirmation-ref-card__body">
            <div className="confirmation-summary-grid">
              {[
                { label: 'Event Type',    value: eventLabels[enquiry.eventType] || enquiry.eventType },
                { label: 'Event Date',    value: new Date(enquiry.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                { label: 'Guest Count',   value: `${enquiry.guestCount} guests` },
                { label: 'Budget Range',  value: budgetLabels[enquiry.budgetRange] || enquiry.budgetRange },
                { label: 'Venue',         value: enquiry.venue },
                { label: 'Contact Email', value: enquiry.email },
              ].map(({ label, value }) => (
                <div key={label} className="confirmation-summary-item">
                  <span className="label-caps confirmation-summary-item__label">{label}</span>
                  <span className="body-md confirmation-summary-item__value">{value}</span>
                </div>
              ))}
            </div>

            {enquiry.wishlistedItems?.length > 0 && (
              <div className="confirmation-wishlist">
                <p className="label-caps confirmation-wishlist__label">
                  <span className="material-icons" style={{ fontSize: 14, color: '#c0392b', verticalAlign: 'middle' }}>favorite</span>
                  {' '}Menu Wishlist Included
                </p>
                <p className="body-md" style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>
                  {enquiry.wishlistedItems.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* What Happens Next */}
        <div className="confirmation-steps">
          <h2 className="headline-md confirmation-steps__title">What Happens Next</h2>
          <div className="confirmation-steps__grid">
            {[
              { step: '01', icon: 'email', title: 'Enquiry Review', desc: 'Our concierge team reviews your requirements within 24 hours.' },
              { step: '02', icon: 'phone_in_talk', title: 'Consultation Call', desc: 'A dedicated event specialist calls to discuss your vision in detail.' },
              { step: '03', icon: 'description', title: 'Bespoke Proposal', desc: 'We craft a tailored menu and service proposal just for your event.' },
              { step: '04', icon: 'restaurant', title: 'Tasting Session', desc: 'Enjoy a complimentary tasting with our Executive Chef.' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="confirmation-step">
                <div className="confirmation-step__num" aria-hidden="true">{step}</div>
                <span className="material-icons confirmation-step__icon">{icon}</span>
                <h3 className="confirmation-step__title">{title}</h3>
                <p className="body-md confirmation-step__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="confirmation-ctas">
          <Link
            to="/"
            className="btn btn-primary"
            id="confirmation-home-btn"
            onClick={clearLastEnquiry}
          >
            Return Home
          </Link>
          <Link
            to="/menus"
            className="btn btn-secondary"
            id="confirmation-menus-btn"
          >
            Explore Our Menus
          </Link>
          <Link
            to="/services"
            className="btn btn-ghost"
            id="confirmation-services-btn"
          >
            View Services
          </Link>
        </div>

        {/* Contact note */}
        <p className="body-md confirmation-contact-note">
          Questions? Reach us directly at{' '}
          <a href="mailto:concierge.aurore@gmail.com" id="confirmation-email-link">
            concierge.aurore@gmail.com
          </a>{' '}
          or{' '}
          <a href="tel:+18882476731" id="confirmation-phone-link">
            +1 (888) 247-6731
          </a>
        </p>
      </div>
    </main>
  )
}
