import { useState } from 'react'
import './App.css'

function App() {
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [message, setMessage] = useState({
    type: 'info',
    text: 'Please enter your details to continue.',
  })
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleButtonMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const offsetX = ((x / rect.width) - 0.5) * 10
    const offsetY = ((y / rect.height) - 0.5) * 10
    setButtonOffset({ x: offsetX, y: offsetY })
  }

  const resetButton = () => setButtonOffset({ x: 0, y: 0 })

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        return 'Please fill in both email and password.'
      }
      if (!emailPattern.test(formData.email)) {
        return 'Please enter a valid email address.'
      }
      if (formData.password.length < 6) {
        return 'Password must be at least 6 characters.'
      }
      return ''
    }

    if (!formData.name.trim()) {
      return 'Please enter your full name.'
    }
    if (!emailPattern.test(formData.email)) {
      return 'Please enter a valid email address.'
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters.'
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.'
    }
    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const error = validateForm()

    if (error) {
      setMessage({ type: 'error', text: error })
      return
    }

    setMessage({
      type: 'success',
      text:
        mode === 'login'
          ? 'Login details look good. Welcome back!'
          : 'Account created successfully. Welcome aboard!',
    })
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="brand-panel">
          <div className="brand-badge">EMS</div>
          <h1>Manage work with confidence</h1>
          <p>Secure access to your employee dashboard with a modern experience.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="toggle-switch" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={mode === 'login' ? 'active' : ''}
              onClick={() => {
                setMode('login')
                setMessage({ type: 'info', text: 'Welcome back! Please sign in.' })
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === 'signup' ? 'active' : ''}
              onClick={() => {
                setMode('signup')
                setMessage({ type: 'info', text: 'Create your free account.' })
              }}
            >
              Sign Up
            </button>
          </div>

          <h2>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h2>
          <p className="subtitle">
            {mode === 'login'
              ? 'Sign in to continue managing your team.'
              : 'Join the platform and get started in minutes.'}
          </p>

          {mode === 'signup' && (
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Aarav Sharma"
              />
            </label>
          )}

          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
          </label>

          {mode === 'signup' && (
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
              />
            </label>
          )}

          <button
            type="submit"
            className="magnetic-btn"
            onMouseMove={handleButtonMove}
            onMouseLeave={resetButton}
            style={{ transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)` }}
          >
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </button>

          <p className={`form-message ${message.type}`}>{message.text}</p>

          <p className="switch-link">
            {mode === 'login' ? "New here?" : 'Already have an account?'}
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setMessage({
                  type: 'info',
                  text: mode === 'login' ? 'Create your free account.' : 'Welcome back! Please sign in.',
                })
              }}
            >
              {mode === 'login' ? 'Create account' : 'Log in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default App
