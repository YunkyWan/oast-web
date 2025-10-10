<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
    <a class="navbar-brand fw-bold" href="#">OAST</a>
    <div class="ms-auto d-flex align-items-center gap-3">
      <span v-if="user">Hola, {{ user.name }}</span>
      <button v-if="user" class="btn btn-outline-secondary btn-sm" @click="onLogout">Salir</button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
const { currentUser, logout } = useAuth()
const user = computed(() => currentUser.value)
const router = useRouter()
const onLogout = async () => { await logout(); router.push('/login') }
</script>
