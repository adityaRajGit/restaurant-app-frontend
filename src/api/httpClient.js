const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1').replace(/\/+$/, '')

/**
 * The backend answers every route with the same envelope:
 *   { status: 'Success' | 'Error', data: { ... } }
 * A failure can arrive as a non-2xx status *or* as a 200 body with status
 * 'Error', so both are collapsed into a thrown Error here and callers only
 * ever see the `data` payload.
 */
export async function apiRequest(path, { method = 'GET', body, signal } = {}) {
  let response

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
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
  const message = payload?.data?.message
  if (typeof message === 'string') return message
  if (message && typeof message.message === 'string') return message.message
  return ''
}
