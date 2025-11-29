// src/composables/useAuth.js
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
    // 1. Pedimos la cookie CSRF a la API
    await csrf()

    // 2. Leemos el token de la cookie XSRF-TOKEN
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))

    if (!cookie) {
      console.error('No se encontró la cookie XSRF-TOKEN')
      throw new Error('CSRF token not found')
    }

    let token = cookie.split('=')[1]
    try {
      token = decodeURIComponent(token)
    } catch {
      // si falla decodeURIComponent usamos el valor tal cual
    }

    // 3. Hacemos el login enviando explícitamente el header X-XSRF-TOKEN
    await api.post(
      '/login',
      { email, password },
      {
        headers: {
          'X-XSRF-TOKEN': token,
        },
      },
    )

    // 4. Si el login funciona, pedimos los datos del usuario
    return fetchUser()
  }

  async function logout() {
    await api.post('/logout')
    currentUser.value = null
  }

  const isAuthenticated = computed(() => !!currentUser.value)

  const isAdmin = computed(() =>
    Array.isArray(currentUser.value?.roles) &&
    currentUser.value.roles.some(r => r.name === 'admin'),
  )

  return {
    currentUser,
    loadingUser,
    fetchUser,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  }
}
