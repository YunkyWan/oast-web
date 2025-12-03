<template>

  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold text-primary mb-0"><i class="fas fa-boxes me-2"></i>Gestión de Importadores</h3>
        <div class="d-flex gap-2">
            <router-link v-if="isAdmin" to="/importadores/nuevo" class="btn btn-success">
            + Nuevo importador
            </router-link>
            <input v-model="q" class="form-control" style="max-width:260px"
                placeholder="Buscar por nombre o DNI" @input="debouncedLoad" />
        </div>
    </div>

    <div class="card shadow-sm">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Clave</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="imp in items" :key="imp.CLAVIM">
              <td>{{ imp.CLAVIM }}</td>
              <td>{{ imp.NOMIMP?.trim() }}</td>
              <td>{{ imp.DNIIMP?.trim() }}</td>
              <td>{{ imp.TELFMP || imp.TELMMP }}</td>
              <td>{{ imp.CORRMP?.trim() }}</td>
              <td class="text-end">
                <router-link :to="`/importadores/${imp.CLAVIM}`" class="btn btn-sm btn-outline-secondary me-2">
                  <i class="fas fa-eye"></i>
                </router-link>

                <router-link v-if="isAdmin" :to="`/importadores/${imp.CLAVIM}/editar`" class="btn btn-sm btn-outline-primary me-2">
                  <i class="fas fa-edit"></i>
                </router-link>

                <button v-if="isAdmin" class="btn btn-sm btn-outline-danger" @click="deleteImportador(imp.CLAVIM)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api'
import { useAuth } from '../composables/useAuth'

const { isAdmin } = useAuth()
const items = ref([])
const q = ref('')
const error = ref('')

async function load() {
  try {
    error.value = ''
    // Ajusta query si implementas filtros en backend
    const { data } = await api.get('/api/importadores', { params: { q: q.value || undefined } })
    items.value = data
  } catch (e) {
    error.value = 'No se pudo cargar el listado.'
  }
}
load()

async function deleteImportador(id) {
  if (!confirm('¿Seguro que deseas eliminar este importador?')) {
    return
  }

  try {
    await api.delete(`/api/importadores/${id}`)

    // Filtrar la lista sin recargar
    items.value = items.value.filter(i => i.CLAVIM !== id)

  } catch (e) {
    console.error(e)
    alert('No se pudo eliminar el importador.')
  }
}

// debounce simple
let t
function debouncedLoad() {
  clearTimeout(t)
  t = setTimeout(load, 400)
}
</script>
