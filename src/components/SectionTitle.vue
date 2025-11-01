<template>
  <div class="mt-4 mb-2 border-bottom pt-3">
    <h5>
      <i v-if="icon" :class="`fas fa-${icon} text-warning me-2`"></i>
      <slot />
    </h5>
  </div>
</template>

<script setup>
defineProps({ icon: { type: String, default: '' } })
</script>
