<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <!-- Marca -->
      <router-link class="navbar-brand fw-bold text-primary d-flex align-items-center" to="/">
        <i class="fas fa-landmark me-2 text-warning"></i>
        OAST Importadores
      </router-link>

      <!-- Botón menú móvil -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-mdb-collapse-init
        data-mdb-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Enlaces -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item">
            <router-link
              class="nav-link d-flex align-items-center"
              active-class="active fw-semibold text-primary"
              to="/importadores"
            >
              <i class="fas fa-boxes me-2 text-secondary"></i>
              Importadores
            </router-link>
          </li>

          <li class="nav-item" v-if="isAdmin">
            <router-link
              class="nav-link d-flex align-items-center"
              active-class="active fw-semibold text-primary"
              to="/usuarios"
            >
              <i class="fas fa-users-cog me-2 text-secondary"></i>
              Usuarios
            </router-link>
          </li>
        </ul>

        <!-- Usuario y logout -->
        <div class="d-flex align-items-center">
          <i class="fas fa-user-circle text-secondary me-1"></i>
          <span class="me-3 text-muted small" v-if="user">
            {{ user.name }}
          </span>
          <button class="btn btn-outline-secondary btn-sm" @click="logout">
            <i class="fas fa-sign-out-alt me-1"></i>Salir
          </button>
        
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import api from '../api'

const router = useRouter()
const { currentUser, isAdmin, logout: logoutAuth } = useAuth()
const user = computed(() => currentUser.value)

async function logout() {
  try {
    await api.post('/logout')
    await logoutAuth()
    router.push('/login')
  } catch (e) {
    console.error('Error al cerrar sesión', e)
  }
}
</script>

<style scoped>
.nav-link {
  color: #555 !important;
  transition: all 0.2s ease-in-out;
}
.nav-link:hover {
  color: #0d6efd !important;
  background-color: rgba(13, 110, 253, 0.05);
  border-radius: 0.5rem;
}
.navbar-brand {
  font-size: 1.25rem;
}
</style>
