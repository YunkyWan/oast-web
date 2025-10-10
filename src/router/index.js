import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Login from '../views/Login.vue'
import ImportadoresLista from '../views/ImportadoresLista.vue'
import ImportadorDetalle from '../views/ImportadorDetalle.vue'

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { public: true } },
  { path: '/', redirect: '/importadores' },
  { path: '/importadores', name: 'importadores', component: ImportadoresLista },
  { path: '/importadores/:id', name: 'importador', component: ImportadorDetalle }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protección de rutas
router.beforeEach(async (to) => {
  const { isAuthenticated, fetchUser } = useAuth()

  if (to.meta.public) return true

  if (isAuthenticated()) return true

  try {
    await fetchUser()
    return true
  } catch {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
