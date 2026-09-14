const STORAGE_KEY = 'restaurant-app.auth'

/**
 * The order API requires a Bearer token (see protectRoutes.verifyUser on the
 * server), so the session has to survive a reload — kept in localStorage,
 * not component state.
 */
export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function getToken() {
  return getSession()?.token || null
}

export function setSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}
