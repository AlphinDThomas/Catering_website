import { Link } from 'react-router-dom'
import { useState } from 'react'
import Modal from './Modal'
import { useApp } from '../store/AppContext'
import './Footer.css'

const PRIVACY_CONTENT = `
<h2>Privacy Policy</h2>
<p><strong>Last updated:</strong> May 2024</p>
<p>AURORE Catering ("we", "us", "our") is committed to protecting your personal information. This policy explains how we collect, use, and safeguard data submitted through our website.</p>
<h3>Information We Collect</h3>
<p>When you submit a booking enquiry, we collect your name, email, phone number, and event details. This information is used solely to respond to your request and provide catering services.</p>
<h3>Data Storage</h3>
<p>Enquiry data submitted through this site is stored locally in your browser (localStorage) and is not transmitted to any external server unless you have a confirmed booking arrangement with our team.</p>
<h3>Cookies</h3>
<p>We use no third-party tracking cookies. Google Fonts may set performance cookies; these are strictly functional.</p>
<h3>Your Rights</h3>
<p>You may request deletion of your data at any time by contacting concierge.aurore@gmail.com. We will respond within 5 business days.</p>
<h3>Contact</h3>
<p>Questions? Email us at <strong>concierge.aurore@gmail.com</strong></p>
`

const TERMS_CONTENT = `
<h2>Terms of Service</h2>
<p><strong>Last updated:</strong> May 2024</p>
<p>By using this website and submitting an enquiry, you agree to the following terms.</p>
<h3>Enquiries</h3>
<p>Submitting an enquiry form does not constitute a confirmed booking. A booking is only confirmed upon written confirmation from an AURORE representative and receipt of a signed contract and deposit.</p>
<h3>Pricing</h3>
<p>All prices shown on this website are indicative "from" prices. Final pricing is determined after a bespoke consultation and is subject to event requirements, guest count, menu complexity, and service specifications.</p>
<h3>Cancellations</h3>
<p>Cancellation terms are outlined in individual service contracts. Generally, a 30-day notice is required for a partial refund of any paid deposit.</p>
<h3>Intellectual Property</h3>
<p>All content on this website — including photographs, menu descriptions, and design — is the intellectual property of AURORE Catering. Reproduction without written consent is prohibited.</p>
<h3>Limitation of Liability</h3>
<p>AURORE's liability is limited to the value of confirmed services contracted. We are not liable for indirect or consequential damages arising from use of this website.</p>
`

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const { addToast } = useApp()

  const handleCareers = (e) => {
    e.preventDefault()
    addToast('Careers page coming soon — check back in Q3 2024', 'info')
  }

  const handleSustainability = (e) => {
    e.preventDefault()
    addToast('Our sustainability report is currently being updated', 'info')
  }

  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__top">
            {/* Brand */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">AURORE</Link>
              <p className="body-md footer__tagline">
                Crafting artisanal culinary stories since 2012. Transforming events into timeless memories through flavor and grace.
              </p>
              <div className="footer__social" aria-label="Social media links">
                <a
                  href="https://instagram.com/aurore.catering"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-instagram-link"
                  aria-label="Follow AURORE on Instagram"
                  className="footer__social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/aurore-catering"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-linkedin-link"
                  aria-label="Connect with AURORE on LinkedIn"
                  className="footer__social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Explore */}
            <div className="footer__col">
              <h3 className="label-caps footer__col-title">Explore</h3>
              <ul>
                <li><Link to="/menus" id="footer-menus-link">Menus</Link></li>
                <li><Link to="/services" id="footer-services-link">Services</Link></li>
                <li><Link to="/about#gallery" id="footer-gallery-link">Gallery</Link></li>
                <li><Link to="/book" id="footer-book-link">Request Quote</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer__col">
              <h3 className="label-caps footer__col-title">Company</h3>
              <ul>
                <li><Link to="/about" id="footer-about-link">About Us</Link></li>
                <li><a href="/sustainability" id="footer-sustainability-link" onClick={handleSustainability}>Sustainability</a></li>
                <li><a href="/careers" id="footer-careers-link" onClick={handleCareers}>Careers</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h3 className="label-caps footer__col-title">Contact</h3>
              <ul className="footer__contact">
                <li>
                  <span className="label-caps footer__contact-label">Phone</span>
                  <a href="tel:+18882476731" id="footer-phone-link">+1 (888) 247-6731</a>
                </li>
                <li>
                  <span className="label-caps footer__contact-label">Email</span>
                  <a href="mailto:concierge.aurore@gmail.com" id="footer-email-link">concierge.aurore@gmail.com</a>
                </li>
                <li>
                  <span className="label-caps footer__contact-label">Social</span>
                  <span>@aurore.catering</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer__bottom">
            <p className="label-caps footer__copyright">
              © 2024 AURORE CATERING. ALL RIGHTS RESERVED.
            </p>
            <div className="footer__legal">
              <button id="footer-privacy-btn" onClick={() => setPrivacyOpen(true)} className="footer__legal-link">
                Privacy Policy
              </button>
              <button id="footer-terms-btn" onClick={() => setTermsOpen(true)} className="footer__legal-link">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy"
        id="privacy-modal"
      >
        <div dangerouslySetInnerHTML={{ __html: PRIVACY_CONTENT }} className="modal-prose" />
      </Modal>

      <Modal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Terms of Service"
        id="terms-modal"
      >
        <div dangerouslySetInnerHTML={{ __html: TERMS_CONTENT }} className="modal-prose" />
      </Modal>
    </>
  )
}
