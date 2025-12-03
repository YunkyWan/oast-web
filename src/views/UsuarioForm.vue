<template>

  <main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold text-primary mb-0">
        <i class="fas fa-user-cog me-2"></i>{{ isEdit ? 'Editar usuario' : 'Nuevo usuario' }}
      </h3>
      <div>
        <router-link to="/usuarios" class="btn btn-outline-secondary me-2">
          <i class="fas fa-arrow-left me-1"></i> Volver
        </router-link>
        <button class="btn btn-primary" :disabled="saving" @click="onSubmit">
          <i class="fas fa-save me-1"></i>{{ saving ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </div>

    <div class="card shadow-3">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="form.name" id="name" class="form-control" required />
              <label class="form-label" for="name">Nombre</label>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="form.email" type="email" id="email" class="form-control" required />
              <label class="form-label" for="email">Email</label>
            </div>
          </div>

          <div class="col-md-6" v-if="!isEdit">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="form.password" type="password" id="password" class="form-control" required />
              <label class="form-label" for="password">Contraseña</label>
            </div>
          </div>

          <div class="col-md-6" v-else>
            <div class="form-outline" data-mdb-input-init>
              <input v-model="form.password" type="password" id="password" class="form-control" />
              <label class="form-label" for="password">Nueva contraseña (opcional)</label>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-outline" data-mdb-select-init>
              <select v-model="form.role" id="role" class="form-select" required>
                <option value=""></option>
                <option value="admin">Admin</option>
                <option value="consultor">Consultor</option>
              </select>
              <label class="form-label" for="role">Rol</label>
            </div>
          </div>
        </div>

        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'
import * as mdb from 'mdb-ui-kit'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const isEdit = computed(() => !!id)

const form = ref({ name: '', email: '', password: '', role: '' })
const saving = ref(false)
const error = ref('')

async function loadIfEdit() {
  if (!isEdit.value) return
  const { data } = await api.get('/api/usuarios')
  const u = data.find(x => x.id == id)
  if (u) {
    form.value.name = u.name
    form.value.email = u.email
    form.value.role = u.role
  }
}

const initMDB = async () => {
  await nextTick()

  document.querySelectorAll('.form-outline').forEach((formOutline) => {
    if (!formOutline.dataset.mdbInitialized) {
      new mdb.Input(formOutline).init()
      formOutline.dataset.mdbInitialized = 'true'
    }
  })

  const selectWrapper = document.querySelector('[data-mdb-select-init].form-outline')
  if (selectWrapper) {
    const sel = selectWrapper.querySelector('select.form-select')
    if (sel && !sel.dataset.mdbSelect) {
      new mdb.Select(sel)
    }
  }
}

onMounted(async () => {
  await loadIfEdit()
  await initMDB()
})

async function onSubmit() {
  try {
    error.value = ''
    saving.value = true
    if (isEdit.value) {
      const payload = { ...form.value }
      if (!payload.password) delete payload.password
      await api.put(`/api/usuarios/${id}`, payload)
    } else {
      await api.post('/api/usuarios', form.value)
    }
    router.push('/usuarios')
  } catch (e) {
    error.value = e.response?.data?.message || 'No se pudo guardar.'
  } finally {
    saving.value = false
  }
}
</script>
