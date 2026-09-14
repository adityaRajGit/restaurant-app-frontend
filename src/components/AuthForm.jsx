import { useState } from 'react'
import LoadingOverlay from './LoadingOverlay.jsx'

const inputClassName =
  'w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

function AuthForm({ mode, onModeChange, onSubmit, isSubmitting, error }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(mode === 'signup' ? { name, phone, email, password } : { email, password })
  }

  return (
    <div className="relative px-6 py-8">
      {isSubmitting && (
        <LoadingOverlay
          fixed={false}
          className="rounded-2xl"
          message={mode === 'login' ? 'Logging you in…' : 'Creating your account…'}
        />
      )}

      <h2 className="text-lg font-bold text-gray-900">
        {mode === 'login' ? 'Log in to order' : 'Create an account'}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        {mode === 'login'
          ? 'Sign in so the kitchen knows where to send your order.'
          : 'Just a few details to get your order placed.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        {mode === 'signup' && (
          <>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              className={inputClassName}
            />
            <input
              type="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Phone number"
              className={inputClassName}
            />
          </>
        )}
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className={inputClassName}
        />
        <input
          type="password"
          required
          minLength={mode === 'signup' ? 8 : undefined}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className={inputClassName}
        />

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full cursor-pointer rounded-xl bg-brand-500 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
        className="mt-4 w-full cursor-pointer text-center text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Log in'}
      </button>
    </div>
  )
}

export default AuthForm
