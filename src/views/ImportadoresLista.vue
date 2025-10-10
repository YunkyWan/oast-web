<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Importadores</h3>
      <input v-model="q" class="form-control" style="max-width:260px" placeholder="Buscar por nombre o DNI" @input="debouncedLoad" />
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="imp in items" :key="imp.CLAVIM">
              <td>{{ imp.CLAVIM }}</td>
              <td>{{ imp.NOMIMP?.trim() }}</td>
              <td>{{ imp.DNIIMP?.trim() }}</td>
              <td>{{ imp.TELFMP || imp.TELMMP }}</td>
              <td><router-link class="btn btn-outline-primary btn-sm" :to="`/importadores/${imp.CLAVIM}`">Ver</router-link></td>
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
import Navbar from '../components/Navbar.vue'
import api from '../api'

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

// debounce simple
let t
function debouncedLoad() {
  clearTimeout(t)
  t = setTimeout(load, 400)
}
</script>
