import { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext(null)

const initialState = {
  wishlist: [],       // array of menu item ids
  enquiries: [],      // submitted booking forms
  toasts: [],         // {id, message, type}
  lastEnquiry: null,  // for confirmation page
}

function loadState() {
  try {
    const raw = localStorage.getItem('aurore_state')
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    return { ...initialState, ...parsed, toasts: [] }
  } catch {
    return initialState
  }
}

function saveState(state) {
  try {
    const { toasts, ...toSave } = state
    localStorage.setItem('aurore_state', JSON.stringify(toSave))
  } catch {}
}

let toastIdCounter = 0

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const id = action.payload
      const exists = state.wishlist.includes(id)
      return { ...state, wishlist: exists ? state.wishlist.filter(i => i !== id) : [...state.wishlist, id] }
    }
    case 'SUBMIT_ENQUIRY': {
      const enquiry = { ...action.payload, id: `AUR-${Date.now()}`, createdAt: new Date().toISOString() }
      return { ...state, enquiries: [...state.enquiries, enquiry], lastEnquiry: enquiry }
    }
    case 'CLEAR_LAST_ENQUIRY':
      return { ...state, lastEnquiry: null }
    case 'ADD_TOAST': {
      const toast = { id: ++toastIdCounter, message: action.payload.message, type: action.payload.type || 'success' }
      return { ...state, toasts: [...state.toasts, toast] }
    }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => { saveState(state) }, [state])

  const toggleWishlist = (id) => dispatch({ type: 'TOGGLE_WISHLIST', payload: id })
  const submitEnquiry = (data) => dispatch({ type: 'SUBMIT_ENQUIRY', payload: data })
  const clearLastEnquiry = () => dispatch({ type: 'CLEAR_LAST_ENQUIRY' })
  const addToast = (message, type = 'success') => {
    dispatch({ type: 'ADD_TOAST', payload: { message, type } })
  }
  const removeToast = (id) => dispatch({ type: 'REMOVE_TOAST', payload: id })

  return (
    <AppContext.Provider value={{ state, toggleWishlist, submitEnquiry, clearLastEnquiry, addToast, removeToast }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
