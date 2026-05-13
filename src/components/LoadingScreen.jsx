import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import './LoadingScreen.css'

/**
 * LoadingScreen — Ring trace reveal animation.
 *
 * - On first site visit: full ring trace animation (~3.8s)
 * - On subsequent page navigations: faster variant (~2s)
 *
 * Uses sessionStorage to track whether the initial load animation
 * has already played in the current browser tab.
 */
export default function LoadingScreen() {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [isTransition, setIsTransition] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const hasPlayedInitial = () => {
    try { return sessionStorage.getItem('aurore_loaded') === '1' }
    catch { return false }
  }

  const markInitialPlayed = () => {
    try { sessionStorage.setItem('aurore_loaded', '1') }
    catch { /* storage unavailable */ }
  }

  const hideLoader = useCallback(() => {
    setVisible(false)
  }, [])

  // Initial load
  useEffect(() => {
    if (hasPlayedInitial()) {
      setVisible(false)
      return
    }

    // Full animation: ring trace + marks + text (~3.8s) + brief hold
    const timer = setTimeout(() => {
      markInitialPlayed()
      hideLoader()
    }, 4200)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Page navigation transition
  useEffect(() => {
    if (!hasPlayedInitial()) return

    setIsTransition(true)
    setVisible(true)
    setAnimKey(k => k + 1)

    // Faster transition: ~2s
    const timer = setTimeout(() => {
      hideLoader()
    }, 2200)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Remove from DOM after fade-out
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => setRemoved(true), 700)
      return () => clearTimeout(t)
    } else {
      setRemoved(false)
    }
  }, [visible])

  if (removed) return null

  return (
    <div
      key={animKey}
      className={`al-container${!visible ? ' al-container--hidden' : ''}${isTransition ? ' al-container--transition' : ''}`}
      aria-live="polite"
      role="status"
    >
      <h2 className="sr-only">Loading Aurore Catering</h2>

      <div className="al-loader">
        <svg
          className="al-ring-svg"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Ghost ring */}
          <circle className="al-ring-ghost" cx="150" cy="150" r="130" />

          {/* Animated trace ring */}
          <circle
            className="al-ring-trace"
            cx="150" cy="150" r="130"
            transform="rotate(-90 150 150)"
          />

          {/* Diamond marks at cardinal points */}
          <g className="al-mark" style={{ transformOrigin: '150px 20px' }}>
            <rect x="147.5" y="17.5" width="5" height="5" fill="#BFA270" transform="rotate(45 150 20)" />
          </g>
          <g className="al-mark" style={{ transformOrigin: '280px 150px' }}>
            <rect x="277.5" y="147.5" width="5" height="5" fill="#BFA270" transform="rotate(45 280 150)" />
          </g>
          <g className="al-mark" style={{ transformOrigin: '150px 280px' }}>
            <rect x="147.5" y="277.5" width="5" height="5" fill="#BFA270" transform="rotate(45 150 280)" />
          </g>
          <g className="al-mark" style={{ transformOrigin: '20px 150px' }}>
            <rect x="17.5" y="147.5" width="5" height="5" fill="#BFA270" transform="rotate(45 20 150)" />
          </g>
        </svg>

        <div className="al-text-center">
          <div className="al-brand">Aurore</div>
          <div className="al-gold-rule"></div>
          <div className="al-tagline">Artisanal catering since 2012</div>
        </div>
      </div>
    </div>
  )
}
