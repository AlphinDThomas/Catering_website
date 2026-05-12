import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import './LoadingScreen.css'

/**
 * LoadingScreen — Cloche dome reveal animation.
 *
 * - On first site visit: full dome-lift animation (~7.5s)
 * - On subsequent page navigations: shorter transition (~2s)
 *
 * Uses sessionStorage to track whether the initial load animation
 * has already played in the current browser tab.
 */
export default function LoadingScreen() {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [isTransition, setIsTransition] = useState(false)
  const [animKey, setAnimKey] = useState(0) // forces re-mount for fresh animation

  // Check if initial load animation already played this session
  const hasPlayedInitial = () => {
    try { return sessionStorage.getItem('aurore_loaded') === '1' }
    catch { return false }
  }

  const markInitialPlayed = () => {
    try { sessionStorage.setItem('aurore_loaded', '1') }
    catch { /* storage unavailable */ }
  }

  // Handle the hide transition after animation completes
  const hideLoader = useCallback(() => {
    setVisible(false)
  }, [])

  // Initial load effect
  useEffect(() => {
    if (hasPlayedInitial()) {
      // Skip initial animation — already played this session
      setVisible(false)
      return
    }

    // Full animation: wait for bar fill to complete (~7.5s)
    const timer = setTimeout(() => {
      markInitialPlayed()
      hideLoader()
    }, 7500)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Page navigation transition
  useEffect(() => {
    // Skip the very first render (handled by initial load above)
    if (!hasPlayedInitial()) return

    // Show the transition loader
    setIsTransition(true)
    setVisible(true)
    setAnimKey(k => k + 1)

    // Transition with dome: ~3.5s
    const timer = setTimeout(() => {
      hideLoader()
    }, 3500)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Don't render anything if hidden (after fade-out completes)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => setRemoved(true), 700) // wait for CSS fade-out
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
      <h2 className="sr-only">
        Aurore catering loading animation — a silver cloche dome lifts slowly to
        reveal the Aurore wordmark with golden shimmer
      </h2>

      <div className="al-box">
        <div className="al-spot"></div>
        <div className="al-scene">
          <svg
            width="278"
            height="210"
            viewBox="0 0 278 210"
            style={{ overflow: 'visible' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="al-dg" x1="14%" y1="0%" x2="86%" y2="100%">
                <stop offset="0%" stopColor="#f2f2f2" />
                <stop offset="18%" stopColor="#e5e5e5" />
                <stop offset="47%" stopColor="#b5b5b5" />
                <stop offset="76%" stopColor="#cbcbcb" />
                <stop offset="100%" stopColor="#bfbfbf" />
              </linearGradient>
              <linearGradient id="al-rg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a2a2a2" />
                <stop offset="28%" stopColor="#e8e8e8" />
                <stop offset="58%" stopColor="#f7f7f7" />
                <stop offset="100%" stopColor="#9c9c9c" />
              </linearGradient>
              <linearGradient id="al-pg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ebebeb" />
                <stop offset="28%" stopColor="#cecece" />
                <stop offset="72%" stopColor="#8e8e8e" />
                <stop offset="100%" stopColor="#6c6c6c" />
              </linearGradient>
              <linearGradient id="al-hg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#acacac" />
                <stop offset="38%" stopColor="#f5f5f5" />
                <stop offset="68%" stopColor="#dedede" />
                <stop offset="100%" stopColor="#a0a0a0" />
              </linearGradient>
              <radialGradient id="al-gg" cx="50%" cy="32%" r="62%">
                <stop offset="0%" stopColor="rgba(218,160,55,0.32)" />
                <stop offset="100%" stopColor="rgba(218,160,55,0)" />
              </radialGradient>
            </defs>

            {/* Plate base */}
            <ellipse cx="139" cy="186" rx="127" ry="20" fill="url(#al-pg)" stroke="#8c8c8c" strokeWidth="0.5" />
            <ellipse cx="139" cy="182" rx="116" ry="13" fill="rgba(0,0,0,0.14)" />
            <path d="M 16,185 Q 78,174 139,172 Q 200,174 262,185" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />

            {/* Food glow revealed */}
            <ellipse cx="139" cy="182" rx="105" ry="15" fill="url(#al-gg)" className="al-glow" />

            {/* Steam wisps */}
            <g className="al-w al-w1">
              <path d="M 115,178 Q 101,152 115,130 Q 129,108 115,84" fill="none" stroke="rgba(255,255,255,0.54)" strokeWidth="2.6" strokeLinecap="round" />
            </g>
            <g className="al-w al-w2">
              <path d="M 139,180 Q 154,155 139,133 Q 124,111 139,87" fill="none" stroke="rgba(255,255,255,0.47)" strokeWidth="2.1" strokeLinecap="round" />
            </g>
            <g className="al-w al-w3">
              <path d="M 164,178 Q 179,153 164,130 Q 149,107 164,83" fill="none" stroke="rgba(255,255,255,0.43)" strokeWidth="2.3" strokeLinecap="round" />
            </g>
            <g className="al-w al-w4">
              <path d="M 99,173 Q 86,149 100,126 Q 114,103 99,80" fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="1.7" strokeLinecap="round" />
            </g>

            {/* Dome — animates upward */}
            <g className="al-dome">
              <path d="M 27,182 C 27,95 75,45 139,39 C 203,45 251,95 251,182 Z" fill="url(#al-dg)" stroke="#b2b2b2" strokeWidth="0.6" />
              {/* Primary highlight */}
              <path d="M 52,172 Q 66,105 108,71 Q 127,58 153,54" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3.3" strokeLinecap="round" />
              {/* Secondary highlight */}
              <path d="M 70,162 Q 83,118 118,89" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.8" strokeLinecap="round" />
              {/* Shadow side */}
              <path d="M 227,172 Q 217,120 199,90" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="2.8" strokeLinecap="round" />
              {/* Bottom rim ring */}
              <ellipse cx="139" cy="182" rx="112" ry="12" fill="url(#al-rg)" stroke="#a0a0a0" strokeWidth="0.5" />
              <path d="M 30,182 Q 85,174 139,172 Q 193,174 248,182" fill="none" stroke="rgba(255,255,255,0.27)" strokeWidth="1" strokeLinecap="round" />
              {/* Handle stem */}
              <rect x="132" y="31" width="14" height="20" rx="3.5" fill="url(#al-hg)" stroke="#acacac" strokeWidth="0.5" />
              {/* Handle knob */}
              <ellipse cx="139" cy="29" rx="20" ry="11" fill="url(#al-hg)" stroke="#acacac" strokeWidth="0.5" />
              {/* Knob highlights */}
              <ellipse cx="134" cy="24" rx="9" ry="5" fill="rgba(255,255,255,0.44)" />
              <ellipse cx="136" cy="24" rx="4.5" ry="2.2" fill="rgba(255,255,255,0.2)" />
            </g>
          </svg>

          <div className="al-title">Aurore</div>
          <div className="al-sub">Artisanal Catering Since 2012</div>
          <div className="al-bar">
            <div className="al-fill">
              <div className="al-shine"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
