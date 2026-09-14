import { apiRequest } from './httpClient.js'

/**
 * POST /auth/login — accepts email+password or phone+password.
 * POST /auth/signup — requires name, phone, email and password.
 * Both return { user, token }; the token is what order placement needs as
 * a Bearer header (see protectRoutes.verifyUser on the server).
 */
export async function login({ email, phone, password }) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: phone ? { phone, password } : { email, password },
  })
  return normalizeSession(data)
}

export async function signup({ name, phone, email, password }) {
  const data = await apiRequest('/auth/signup', {
    method: 'POST',
    body: { name, phone, email, password },
  })
  return normalizeSession(data)
}

function normalizeSession(data) {
  return {
    user: data?.user || null,
    token: data?.token || '',
  }
}
