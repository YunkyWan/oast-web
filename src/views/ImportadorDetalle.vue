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

        <!-- Documentos adjuntos -->
        <div class="card shadow-3 border-light mt-4">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h6 class="mb-0 text-primary fw-semibold">
              <i class="fas fa-paperclip me-2"></i>Documentos adjuntos
            </h6>

            <!-- Subida solo admin -->
            <div v-if="isAdmin" class="d-flex align-items-center gap-2">
              <input ref="fileInput" type="file" class="form-control form-control-sm" @change="onFileSelected" style="max-width: 280px" />
              <button class="btn btn-sm btn-primary" :disabled="uploading || !selectedFile" @click="uploadFile">
                <i class="fas fa-upload me-1"></i>
                {{ uploading ? 'Subiendo...' : 'Subir' }}
              </button>
            </div>
          </div>

          <div class="card-body">
            <p v-if="docsError" class="text-danger mb-3">{{ docsError }}</p>

            <div v-if="loadingDocs" class="text-muted">
              <div class="spinner-border spinner-border-sm me-2" role="status"></div>
              Cargando documentos...
            </div>

            <div v-else>
              <div v-if="docs.length === 0" class="text-muted">
                No hay documentos asociados a este importador.
              </div>

              <div v-else class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr class="text-muted small">
                      <th>Nombre</th>
                      <th class="d-none d-md-table-cell">Tipo</th>
                      <th class="d-none d-md-table-cell text-end">Tamaño</th>
                      <th class="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="d in docs" :key="d.id">
                      <td class="fw-semibold"><a href="#" class="text-decoration-none" @click.prevent="openDoc(d)">{{ d.nombre_original }}</a></td>
                      <td class="d-none d-md-table-cell">{{ d.mime }}</td>
                      <td class="d-none d-md-table-cell text-end">{{ formatBytes(d.tamano) }}</td>
                      <td class="text-end">
                        <button class="btn btn-sm btn-outline-secondary me-2" @click="downloadDoc(d)">
                          <i class="fas fa-download"></i>
                        </button>

                        <button v-if="isAdmin" class="btn btn-sm btn-outline-danger" :disabled="deletingId === d.id" @click="deleteDoc(d)">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <small class="text-muted d-block mt-3">
                Formatos permitidos: PDF e imágenes (JPG/PNG). Tamaño máximo permitido: 10 MB.
              </small>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import api from '../api'

const route = useRoute()
const id = route.params.id
const imp = ref(null)
const error = ref('')
const { isAdmin } = useAuth()

// Documentos
const docs = ref([])
const loadingDocs = ref(false)
const docsError = ref('')

const selectedFile = ref(null)
const fileInput = ref(null)
const uploading = ref(false)
const deletingId = ref(null)

function onFileSelected(e) {
  const f = e.target.files?.[0] || null
  selectedFile.value = f
}

function validateSelectedFile(file) {
  if (!file) return 'Selecciona un archivo.'

  // 10 MB (ajústalo si quieres)
  const maxBytes = 10 * 1024 * 1024
  if (file.size > maxBytes) return 'El archivo supera el tamaño máximo (10 MB).'

  // Permitir PDF + imágenes (ajusta según backend)
  const allowed = ['application/pdf', 'image/png', 'image/jpeg']
  if (!allowed.includes(file.type)) return 'Formato no permitido. Solo PDF o imágenes (JPG/PNG).'

  return ''
}

function formatBytes(bytes) {
  if (bytes === null || bytes === undefined) return '-'
  const units = ['B', 'KB', 'MB', 'GB']
  let b = Number(bytes)
  let u = 0
  while (b >= 1024 && u < units.length - 1) {
    b /= 1024
    u++
  }
  return `${b.toFixed(u === 0 ? 0 : 1)} ${units[u]}`
}

async function loadImportador() {
  try {
    const { data } = await api.get(`/api/importadores/${id}`)
    imp.value = data
  } catch {
    error.value = 'No se pudo cargar el importador.'
  }
}

async function loadDocs() {
  loadingDocs.value = true
  docsError.value = ''
  try {
    const { data } = await api.get(`/api/importadores/${id}/documentos`)
    // Asumo que devuelves un array directamente
    docs.value = Array.isArray(data) ? data : (data.data ?? [])
  } catch (e) {
    docsError.value = e.response?.data?.message || 'No se pudieron cargar los documentos.'
  } finally {
    loadingDocs.value = false
  }
}

async function uploadFile() {
  const msg = validateSelectedFile(selectedFile.value)
  if (msg) {
    docsError.value = msg
    return
  }

  uploading.value = true
  docsError.value = ''

  try {
    const form = new FormData()
    form.append('file', selectedFile.value)

    await api.post(`/api/importadores/${id}/documentos`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    // Reset UI
    selectedFile.value = null
    if (fileInput.value) fileInput.value.value = ''

    // Recargar listado
    await loadDocs()
  } catch (e) {
    docsError.value = e.response?.data?.message || 'No se pudo subir el documento.'
  } finally {
    uploading.value = false
  }
}

async function downloadDoc(doc) {
  try {
    // Asumo que tu backend devuelve { url: "..." } (URL firmada)
    const { data } = await api.get(`/api/documentos/${doc.id}/download`)
    const url = data?.url
    if (!url) throw new Error('URL de descarga no disponible.')
    window.open(url, '_self', 'noopener')
  } catch (e) {
    docsError.value = e.response?.data?.message || 'No se pudo descargar el documento.'
  }
}

async function openDoc(doc) {
  try {
    const { data } = await api.get(`/api/documentos/${doc.id}/view`)
    const url = data?.url
    if (!url) throw new Error('URL de visualización no disponible.')
    window.open(url, '_blank', 'noopener')
  } catch (e) {
    docsError.value = e.response?.data?.message || 'No se pudo abrir el documento.'
  }
}

async function deleteDoc(doc) {
  if (!confirm(`¿Eliminar el documento "${doc.nombre_original}"?`)) return

  deletingId.value = doc.id
  docsError.value = ''

  try {
    await api.delete(`/api/documentos/${doc.id}`)
    docs.value = docs.value.filter(d => d.id !== doc.id)
  } catch (e) {
    docsError.value = e.response?.data?.message || 'No se pudo eliminar el documento.'
  } finally {
    deletingId.value = null
  }
}

onMounted(async () => {
  try {
    const { data } = await api.get(`/api/importadores/${id}`)
    imp.value = data
  } catch (e) {
    error.value = 'No se pudo cargar el importador.'
  }
  await loadImportador()
  await loadDocs()
})

</script>
