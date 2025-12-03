<template>
  <div class="container py-4">

    <!-- Botón Volver -->
    <div class="mb-3">
      <router-link to="/importadores" class="btn btn-outline-secondary btn-sm">
        <i class="fas fa-arrow-left me-1"></i> Volver
      </router-link>
    </div>

    <!-- Cargando -->
    <div v-if="!imp && !error" class="text-center py-5 text-muted">
      <div class="spinner-border text-primary mb-3" role="status"></div>
      <p>Cargando datos del importador...</p>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-danger mt-3 fw-semibold">
      {{ error }}
    </p>

    <!-- Detalle del importador -->
    <div v-if="imp" class="card shadow-3 border-light">

      <!-- Header atractivo -->
      <div class="card-header bg-primary text-white py-3 d-flex align-items-center">
        <i class="fas fa-user me-2"></i>
        <h5 class="mb-0 fw-semibold">
          {{ imp.NOMIMP?.trim() }}
        </h5>
      </div>

      <div class="card-body">

        <!-- Sección Información general -->
        <h6 class="text-primary mb-3">
          <i class="fas fa-info-circle me-1"></i> Información general
        </h6>

        <div class="row mb-4">
          <div class="col-md-4 mb-3">
            <p class="text-muted mb-1 small">Fecha de alta</p>
            <p class="fw-semibold">
              {{ imp.DIALMP }}/{{ imp.MEALMP }}/{{ imp.AÑALMP }}
            </p>
          </div>

          <div class="col-md-4 mb-3">
            <p class="text-muted mb-1 small">DNI</p>
            <p class="fw-semibold">{{ imp.DNIIMP?.trim() }}</p>
          </div>

          <div class="col-md-4 mb-3">
            <p class="text-muted mb-1 small">Denominación Comercial</p>
            <p class="fw-semibold">{{ imp.DENCMP?.trim() }}</p>
          </div>
        </div>

        <!-- Sección Contacto -->
        <h6 class="text-primary mb-3">
          <i class="fas fa-phone-alt me-1"></i> Información de contacto
        </h6>

        <div class="row mb-4">

          <div class="col-md-4 mb-3">
            <p class="text-muted mb-1 small">Teléfono fijo</p>
            <p class="fw-semibold">{{ imp.TELFMP }}</p>
          </div>

          <div class="col-md-4 mb-3">
            <p class="text-muted mb-1 small">Móvil</p>
            <p class="fw-semibold">{{ imp.TELMMP }}</p>
          </div>

          <div class="col-md-4 mb-3">
            <p class="text-muted mb-1 small">Email</p>
            <p class="fw-semibold">{{ imp.CORRMP?.trim() }}</p>
          </div>
        </div>

        <!-- Sección Representante -->
        <h6 class="text-primary mb-3">
          <i class="fas fa-user-tie me-1"></i> Representante
        </h6>

        <div class="row mb-4">
          <div class="col-md-6 mb-3">
            <p class="text-muted mb-1 small">Nombre representante</p>
            <p class="fw-semibold">{{ imp.NOMRAP?.trim() }}</p>
          </div>

          <div class="col-md-6 mb-3">
            <p class="text-muted mb-1 small">DNI representante</p>
            <p class="fw-semibold">{{ imp.DNIRAP?.trim() }}</p>
          </div>
        </div>

        <!-- Dirección (si aplica) -->
        <!-- Puedes activarlo si tienes datos completos -->
        <!--
        <h6 class="text-primary mb-3">
          <i class="fas fa-map-marked-alt me-1"></i> Dirección
        </h6>
        <p class="fw-semibold">{{ imp.CALIMP?.trim() }}</p>
        -->

      </div>
    </div>
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
