<template>
  <div class="container py-5" style="max-width:420px">
    <h2 class="mb-4 text-center">Acceso</h2>
    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="onSubmit" novalidate>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" required autocomplete="username" />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="password" type="password" class="form-control" required autocomplete="current-password" />
          </div>
          <button class="btn btn-primary w-100" :disabled="loading">{{ loading ? 'Entrando...' : 'Entrar' }}</button>
          <p v-if="error" class="text-danger mt-3">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { login } = useAuth()

const email = ref('admin@oast.local')
const password = ref('123456')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const route = useRoute()
const { login } = useAuth()

async function onSubmit() {
  loading.value = true
  errorMessage.value = ''

  try {
    await login(email.value, password.value)   // ⬅️ usa useAuth.login
    const redirect = route.query.redirect || '/importadores'
    router.push(redirect)
  } catch (error) {
    errorMessage.value = 'Credenciales incorrectas o error de autenticación'
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- campos email, password, etc. -->
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>
