<template>

  <main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold text-primary mb-0"><i class="fas fa-users me-2"></i>Usuarios</h3>
      <router-link class="btn btn-primary" to="/usuarios/nuevo">
        <i class="fas fa-user-plus me-1"></i> Nuevo usuario
      </router-link>
    </div>

    <div class="card shadow-3">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Creado</th>
                <th class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in usuarios" :key="u.id">
                <td>{{ u.id }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>
                  <span class="badge" :class="u.role === 'admin' ? 'bg-warning text-dark' : 'bg-secondary'">
                    {{ u.role }}
                  </span>
                </td>
                <td>{{ new Date(u.created_at).toLocaleDateString() }}</td>
                <td class="text-end">
                  <router-link :to="`/usuarios/${u.id}/editar`" class="btn btn-sm btn-outline-primary me-2">
                    <i class="fas fa-edit"></i>
                  </router-link>
                  <button class="btn btn-sm btn-outline-danger" @click="onDelete(u)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="!usuarios.length">
                <td colspan="6" class="text-center text-muted py-4">No hay usuarios</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import api from '../api'

const usuarios = ref([])
const error = ref('')

async function load() {
  try {
    const { data } = await api.get('/api/usuarios')
    usuarios.value = data
  } catch (e) {
    error.value = e.response?.data?.message || 'No se pudieron cargar los usuarios.'
  }
}

async function onDelete(u) {
  if (!confirm(`¿Eliminar al usuario "${u.name}"?`)) return
  try {
    await api.delete(`/api/usuarios/${u.id}`)
    usuarios.value = usuarios.value.filter(x => x.id !== u.id)
  } catch (e) {
    error.value = e.response?.data?.message || 'No se pudo eliminar.'
  }
}

onMounted(load)
</script>
