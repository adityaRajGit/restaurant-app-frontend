import { getToken } from '../auth/authStorage.js'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://restaurantapp-self.vercel.app/api/v1/').replace(/\/+$/, '')

/**
 * The backend answers every route with the same envelope:
 *   { status: 'Success' | 'Error', data: { ... } }
 * A failure can arrive as a non-2xx status *or* as a 200 body with status
 * 'Error', so both are collapsed into a thrown Error here and callers only
 * ever see the `data` payload.
 */
export async function apiRequest(path, { method = 'GET', body, signal } = {}) {
  let response

  const token = getToken()
  const headers = {
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error("Can't reach the kitchen right now. Check that the server is running.")
  }

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok || payload?.status === 'Error') {
    throw new Error(readErrorMessage(payload) || `Request failed (${response.status})`)
  }

  return payload?.data ?? {}
}

function readErrorMessage(payload) {
  // Most routes wrap errors as { data: { message } }, but the auth
  // middleware (protectRoutes.verifyUser/verifyAdmin) short-circuits before
  // that wrapper exists and sends a bare { message } instead.
  const message = payload?.data?.message ?? payload?.message
  if (typeof message === 'string') return message
  if (message && typeof message.message === 'string') return message.message
  return ''
}
