import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import { menuItems } from '../data/menuItems'
import './BookingPage.css'

/* ── Validation helpers ──────────────────────────────────── */
const validators = {
  fullName:    v => !v.trim() ? 'Full name is required' : v.trim().length < 2 ? 'Please enter your full name' : '',
  email:       v => !v.trim() ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email address' : '',
  phone:       v => !v.trim() ? 'Phone number is required' : v.replace(/\D/g, '').length < 7 ? 'Please enter a valid phone number' : '',
  eventType:   v => !v ? 'Please select an event type' : '',
  guestCount:  v => !v ? 'Guest count is required' : +v < 1 ? 'Must be at least 1 guest' : +v > 5000 ? 'Maximum 5000 guests' : '',
  eventDate:   v => !v ? 'Event date is required' : new Date(v) <= new Date() ? 'Event date must be in the future' : '',
  venue:       v => !v.trim() ? 'Venue is required' : v.trim().length < 5 ? 'Please provide more venue detail' : '',
  budgetRange: v => !v ? 'Please select a budget range' : '',
}

const INITIAL = {
  fullName: '', email: '', phone: '', eventType: '',
  guestCount: '', eventDate: '', venue: '', budgetRange: '',
  specialRequests: '',
}

function validate(fields) {
  const errs = {}
  Object.entries(validators).forEach(([k, fn]) => {
    const msg = fn(fields[k] ?? '')
    if (msg) errs[k] = msg
  })
  return errs
}

export default function BookingPage() {
  const navigate = useNavigate()
  const { state, submitEnquiry, addToast } = useApp()
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const wishlistedItems = menuItems.filter(m => state.wishlist.includes(m.id))

  const set = (name, value) => {
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      const err = validators[name] ? validators[name](value) : ''
      setErrors(e => ({ ...e, [name]: err }))
    }
  }

  const blur = (name) => {
    setTouched(t => ({ ...t, [name]: true }))
    const err = validators[name] ? validators[name](fields[name]) : ''
    setErrors(e => ({ ...e, [name]: err }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Mark all as touched
    const allTouched = Object.keys(validators).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      // Scroll to first error
      const firstErrKey = Object.keys(errs)[0]
      document.getElementById(`field-${firstErrKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      addToast('Please fix the errors below before submitting.', 'error')
      return
    }
    setSubmitting(true)
    // Simulate async submission
    await new Promise(r => setTimeout(r, 800))
    submitEnquiry({
      ...fields,
      wishlistedItems: wishlistedItems.map(m => m.name),
    })
    navigate('/confirmation')
  }

  const fieldProps = (name) => ({
    id: `field-${name}`,
    name,
    value: fields[name],
    onChange: e => set(name, e.target.value),
    onBlur: () => blur(name),
    className: `form-input${errors[name] ? ' error' : ''}`,
    'aria-describedby': errors[name] ? `error-${name}` : undefined,
    'aria-invalid': !!errors[name],
  })

  const ErrorMsg = ({ name }) => errors[name]
    ? <p id={`error-${name}`} className="form-error" role="alert">{errors[name]}</p>
    : null

  // Get tomorrow's date for min date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <main className="page booking-page">
      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="page-header booking-page-header">
        <div className="container">
          <span className="label-caps page-header__eyebrow">Begin Your Journey</span>
          <h1 className="headline-lg page-header__title">Booking Inquiry</h1>
          <div className="divider divider-center" />
          <p className="body-lg page-header__sub">
            Our team typically responds within 24 business hours. Fill in the details below and we'll
            craft a bespoke proposal for your event.
          </p>
        </div>
      </section>

      <div className="container booking-page__body">
        <div className="booking-grid">

          {/* ── Form ─────────────────────────────────────────── */}
          <div className="booking-form-col">
            <form id="booking-form" onSubmit={handleSubmit} noValidate aria-label="Booking enquiry form">

              {/* Personal Details */}
              <fieldset className="booking-fieldset">
                <legend className="booking-legend">Personal Details</legend>
                <div className="form-row">
                  <div className="form-group" id="field-fullName-group">
                    <label htmlFor="field-fullName" className="form-label">Full Name *</label>
                    <input type="text" {...fieldProps('fullName')} placeholder="Alexandra Laurent" autoComplete="name" />
                    <ErrorMsg name="fullName" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-email" className="form-label">Email Address *</label>
                    <input type="email" {...fieldProps('email')} placeholder="hello@example.com" autoComplete="email" />
                    <ErrorMsg name="email" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="field-phone" className="form-label">Phone Number *</label>
                  <input type="tel" {...fieldProps('phone')} placeholder="+1 (555) 000-0000" autoComplete="tel" />
                  <ErrorMsg name="phone" />
                </div>
              </fieldset>

              {/* Event Details */}
              <fieldset className="booking-fieldset">
                <legend className="booking-legend">Event Details</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="field-eventType" className="form-label">Event Type *</label>
                    <select
                      id="field-eventType"
                      name="eventType"
                      value={fields.eventType}
                      onChange={e => set('eventType', e.target.value)}
                      onBlur={() => blur('eventType')}
                      className={`form-select${errors.eventType ? ' error' : ''}`}
                      aria-describedby={errors.eventType ? 'error-eventType' : undefined}
                      aria-invalid={!!errors.eventType}
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="private">Private Dinner</option>
                      <option value="other">Other</option>
                    </select>
                    <ErrorMsg name="eventType" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-guestCount" className="form-label">Number of Guests *</label>
                    <input
                      type="number"
                      {...fieldProps('guestCount')}
                      placeholder="e.g. 80"
                      min="1"
                      max="5000"
                    />
                    <ErrorMsg name="guestCount" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="field-eventDate" className="form-label">Event Date *</label>
                    <input type="date" {...fieldProps('eventDate')} min={minDate} />
                    <ErrorMsg name="eventDate" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-budgetRange" className="form-label">Budget Range *</label>
                    <select
                      id="field-budgetRange"
                      name="budgetRange"
                      value={fields.budgetRange}
                      onChange={e => set('budgetRange', e.target.value)}
                      onBlur={() => blur('budgetRange')}
                      className={`form-select${errors.budgetRange ? ' error' : ''}`}
                      aria-describedby={errors.budgetRange ? 'error-budgetRange' : undefined}
                      aria-invalid={!!errors.budgetRange}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 – $15,000</option>
                      <option value="15k-30k">$15,000 – $30,000</option>
                      <option value="30k-60k">$30,000 – $60,000</option>
                      <option value="60k+">$60,000+</option>
                    </select>
                    <ErrorMsg name="budgetRange" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="field-venue" className="form-label">Venue / Location *</label>
                  <input
                    type="text"
                    {...fieldProps('venue')}
                    placeholder="Venue name and city, e.g. The Grand Hall, New York"
                    autoComplete="street-address"
                  />
                  <ErrorMsg name="venue" />
                </div>
              </fieldset>

              {/* Special Requests */}
              <fieldset className="booking-fieldset">
                <legend className="booking-legend">Additional Information</legend>
                <div className="form-group">
                  <label htmlFor="field-specialRequests" className="form-label">
                    Special Requests <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <textarea
                    id="field-specialRequests"
                    name="specialRequests"
                    value={fields.specialRequests}
                    onChange={e => set('specialRequests', e.target.value)}
                    className="form-textarea"
                    placeholder="Dietary requirements, cuisine preferences, theme, décor wishes, accessibility needs..."
                    rows={4}
                    maxLength={500}
                  />
                  <span className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '0.6rem', display: 'block', textAlign: 'right' }}>
                    {fields.specialRequests.length}/500
                  </span>
                </div>

                {/* Wishlisted Items */}
                {wishlistedItems.length > 0 && (
                  <div className="booking-wishlist" aria-label="Your menu wishlist">
                    <p className="label-caps booking-wishlist__title">
                      <span className="material-icons" style={{ fontSize: 14, color: '#c0392b' }}>favorite</span>
                      Your Menu Wishlist ({wishlistedItems.length} items)
                    </p>
                    <ul className="booking-wishlist__list">
                      {wishlistedItems.map(item => (
                        <li key={item.id} className="booking-wishlist__item">
                          <span className="material-icons" style={{ fontSize: 14, color: 'var(--color-gold)' }}>restaurant</span>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                    <p className="body-md" style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem' }}>
                      These will be included with your enquiry for our Chef to consider.
                    </p>
                  </div>
                )}
              </fieldset>

              {/* Submit */}
              <div className="booking-submit">
                <button
                  id="booking-submit-btn"
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ minWidth: 200 }}
                >
                  {submitting ? (
                    <>
                      <span className="booking-spinner" aria-hidden="true" />
                      Sending Enquiry...
                    </>
                  ) : 'Send Enquiry'}
                </button>
                <p className="body-md booking-submit__note">
                  By submitting, you agree to our{' '}
                  <span style={{ color: 'var(--color-gold)' }}>Terms of Service</span>.
                  No payment is taken at this stage.
                </p>
              </div>
            </form>
          </div>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <aside className="booking-sidebar" aria-label="Contact information">
            <div className="booking-sidebar__card">
              <p className="label-caps booking-sidebar__eyebrow">Concierge &amp; Inquiries</p>
              <h2 className="headline-md" style={{ marginBottom: 20 }}>We're Here for You</h2>
              <blockquote className="booking-sidebar__quote">
                "Every menu is a bespoke masterpiece, crafted with seasonal precision and served with the quiet elegance your event deserves."
              </blockquote>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: 32, fontSize: '0.9rem' }}>
                Our concierge team typically responds within 24 business hours.
              </p>
              <div className="booking-contact-list">
                {[
                  { icon: 'phone', label: 'PHONE', value: '+1 (888) 247-6731', href: 'tel:+18882476731' },
                  { icon: 'email', label: 'EMAIL', value: 'concierge.aurore@gmail.com', href: 'mailto:concierge.aurore@gmail.com' },
                  { icon: 'tag', label: 'SOCIAL', value: '@aurore.catering', href: null },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="booking-contact-item">
                    <span className="material-icons booking-contact-item__icon">{icon}</span>
                    <div>
                      <p className="label-caps booking-contact-item__label">{label}</p>
                      {href
                        ? <a href={href} className="booking-contact-item__value">{value}</a>
                        : <p className="booking-contact-item__value">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="booking-sidebar__features">
              {[
                { icon: 'check_circle', text: 'No payment required at this stage' },
                { icon: 'schedule', text: 'Response within 24 business hours' },
                { icon: 'workspace_premium', text: 'Complimentary tasting session included' },
                { icon: 'lock', text: 'Your data is never shared or sold' },
              ].map(({ icon, text }) => (
                <div key={text} className="booking-feature">
                  <span className="material-icons booking-feature__icon">{icon}</span>
                  <span className="body-md">{text}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
