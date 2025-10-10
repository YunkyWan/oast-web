<template>
  <div class="container py-4">
    <Navbar />
    <div class="mb-3">
      <router-link to="/importadores" class="btn btn-link">&larr; Volver</router-link>
    </div>

    <div v-if="imp" class="card shadow-sm">
      <div class="card-body">
        <h4 class="card-title">{{ imp.NOMIMP?.trim() }}</h4>
        <p class="mb-1"><strong>DNI:</strong> {{ imp.DNIIMP?.trim() }}</p>
        <p class="mb-1"><strong>Teléfono:</strong> {{ imp.TELFMP || imp.TELMMP }}</p>
        <p class="mb-0"><strong>Clave:</strong> {{ imp.CLAVIM }}</p>
      </div>
    </div>

    <p v-else class="text-muted">Cargando...</p>
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import api from '../api'

const route = useRoute()
const id = route.params.id
const imp = ref(null)
const error = ref('')

onMounted(async () => {
  try {
    const { data } = await api.get(`/api/importadores/${id}`)
    imp.value = data
  } catch (e) {
    error.value = 'No se pudo cargar el importador.'
  }
})
</script>
