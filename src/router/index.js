import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Login from '../views/Login.vue'
import ImportadoresLista from '../views/ImportadoresLista.vue'
import ImportadorDetalle from '../views/ImportadorDetalle.vue'
import ImportadorNuevo from '../views/ImportadorNuevo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { public: true } },
    { path: '/', redirect: '/importadores' },

    // App (auth requerida por defecto)
    { path: '/importadores', name: 'importadores', component: ImportadoresLista, meta: { requiresAuth: true } },
    { path: '/importadores/nuevo', name: 'importador-nuevo', component: ImportadorNuevo, meta: { requiresAuth: true } },
    { path: '/importadores/:id', name: 'importador', component: ImportadorDetalle, meta: { requiresAuth: true } },

    // Usuarios (solo admin)
    { path: '/usuarios', component: () => import('../views/UsuariosList.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/usuarios/nuevo', component: () => import('../views/UsuarioForm.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/usuarios/:id/editar', component: () => import('../views/UsuarioForm.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  ]
})

// Guardia de rutas
router.beforeEach(async (to) => {
  const { isAuthenticated, isAdmin, fetchUser } = useAuth()

  if (to.meta.public) return true

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    try { await fetchUser() } catch(_) {}
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.requiresAdmin && !isAdmin.value) {
    return { path: '/importadores' }
  }
})

export default router
