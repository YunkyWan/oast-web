import { ref, computed } from 'vue'
import api, { csrf } from '../api'

const currentUser = ref(null)
const loadingUser = ref(false)

export function useAuth() {
  async function fetchUser() {
    try {
      loadingUser.value = true
      const { data } = await api.get('/api/user')
      currentUser.value = data
      return data
    } catch {
      currentUser.value = null
      throw new Error('Unauthenticated')
    } finally {
      loadingUser.value = false
    }
  }

  async function login(email, password) {
    // 1. Pide la cookie CSRF
    await csrf()

    // 2. Leer el token de la cookie XSRF-TOKEN
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/)
    const headers = {}

    if (match) {
      try {
        headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1])
      } catch {
        headers['X-XSRF-TOKEN'] = match[1]
      }
    }

    // 3. Hacer el login enviando el header explícitamente
    await api.post('/login', { email, password }, { headers })

    // 4. Si todo va bien, recuperar el usuario
    return fetchUser()
  }

  async function logout() {
    try {
      await api.post('/logout')
    } catch (e) {
      // No bloqueamos el logout del frontend por errores del backend
      console.warn('Error en /logout, se limpia sesión igualmente', e)
    } finally {
      currentUser.value = null
    }
  }

  const isAuthenticated = computed(() => !!currentUser.value)

  const isAdmin = computed(() =>
    Array.isArray(currentUser.value?.roles) &&
    currentUser.value.roles.some(r => r.name === 'admin')
  )

  return { currentUser, loadingUser, fetchUser, login, logout, isAuthenticated, isAdmin }
}
