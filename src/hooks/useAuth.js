import { useCallback, useState } from 'react'
import { login as loginRequest, signup as signupRequest } from '../api/authApi.js'
import { clearSession, getSession, setSession } from '../auth/authStorage.js'

/**
 * Session lives in localStorage (see authStorage), this hook just mirrors it
 * into component state so login/signup/logout re-render whoever reads it.
 */
export default function useAuth() {
  const [session, setSessionState] = useState(() => getSession())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState(null)

  const runAuth = useCallback(async (request) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const result = await request()
      setSession(result)
      setSessionState(result)
      return true
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const login = useCallback((credentials) => runAuth(() => loginRequest(credentials)), [runAuth])
  const signup = useCallback((details) => runAuth(() => signupRequest(details)), [runAuth])

  // There's no logout endpoint on the server (the token just gets discarded
  // client-side) — the brief pause is purely so the transition gets the
  // same loader treatment as every other auth action, instead of an
  // instant, jarring snap back to the login screen.
  const logout = useCallback(() => {
    setIsLoggingOut(true)
    setTimeout(() => {
      clearSession()
      setSessionState(null)
      setIsLoggingOut(false)
    }, 500)
  }, [])

  return {
    user: session?.user || null,
    isAuthenticated: Boolean(session?.token),
    isSubmitting,
    isLoggingOut,
    error,
    login,
    signup,
    logout,
  }
}
