import { useEffect } from 'react'
import { useApp } from '../store/AppContext'
import './Toast.css'

function ToastItem({ toast }) {
  const { removeToast } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 4000)
    return () => clearTimeout(timer)
  }, [toast.id, removeToast])

  const icons = { success: 'check_circle', error: 'error', info: 'info' }

  return (
    <div className={`toast toast--${toast.type}`} role="alert" aria-live="polite">
      <span className="material-icons toast__icon">{icons[toast.type] || icons.success}</span>
      <span className="toast__message">{toast.message}</span>
      <button
        className="toast__close"
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
      >
        <span className="material-icons">close</span>
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const { state } = useApp()
  if (!state.toasts.length) return null

  return (
    <div className="toast-container" aria-label="Notifications" role="region">
      {state.toasts.map(t => <ToastItem key={t.id} toast={t} />)}
    </div>
  )
}
