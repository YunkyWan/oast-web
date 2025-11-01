import { ref, computed } from 'vue'
import api, { csrf } from '../api'

const currentUser = ref(null)
const loadingUser = ref(false)

export function useAuth() {
  async function fetchUser() {
    try {
      loadingUser.value = true
      const { data } = await api.get('/api/user') // ← trae roles
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
    await csrf()
    await api.post('/login', { email, password })
    return fetchUser()
  }

  async function logout() {
    await csrf()
    await api.post('/logout')
    currentUser.value = null
  }

  const isAuthenticated = computed(() => !!currentUser.value)

  // ✅ Comprueba si el usuario tiene un rol con name === 'admin'
  const isAdmin = computed(() =>
    Array.isArray(currentUser.value?.roles) &&
    currentUser.value.roles.some(r => r.name === 'admin')
  )

  return { currentUser, loadingUser, fetchUser, login, logout, isAuthenticated, isAdmin }
}
