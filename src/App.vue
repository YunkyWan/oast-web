<template>
  <div>
    <!-- Navbar global -->
    <Navbar />

    <!-- Contenedor de las vistas -->
    <main class="container py-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>

