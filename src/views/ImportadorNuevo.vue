<template>
  
  <main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-primary mb-0">
        <i class="fas fa-user-plus me-2"></i>Nuevo Importador
      </h3>

      <div>
        <router-link to="/importadores" class="btn btn-outline-secondary me-2">
          <i class="fas fa-xmark me-1"></i> Cancelar
        </router-link>
        <button class="btn btn-primary" @click="onSubmit" :disabled="saving">
          <i class="fas fa-save me-1"></i> {{ saving ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </div>

    <div class="card shadow-3">
      <div class="card-body">
        <!-- === Identificación === -->
        <SectionTitle icon="id-card">Identificación</SectionTitle>

        <div class="row g-3">
          <div class="col-md-3">
            <div class="form-outline" data-mdb-input-init>
              <input v-model.number="f.CLAVIM" type="number" id="codigo" class="form-control" required />
              <label class="form-label" for="codigo">Código</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="fechaAlta" type="date" id="fechaAlta" class="form-control" />
              <label class="form-label" for="fechaAlta">Fecha Alta</label>
            </div>
          </div>

          <div class="col-md-3">
            <div class="form-outline" data-mdb-select-init>
              <select v-model="f.EXEIMP" id="iaeManual" class="form-select">
                <option value=""></option>
                <option value="S">Sí</option>
                <option value="N">No</option>
              </select>
              <label class="form-label" for="iaeManual">IAE Manual</label>
            </div>
          </div>

        <div class="col-md-3">
        <div class="form-outline" data-mdb-select-init>
            <select v-model="f.PAGIMP" id="gestionNfu" class="form-select">
            <option value="">-</option>
            <option value="S">Sí</option>
            <option value="N">No</option>
            </select>
            <label class="form-label" for="gestionNfu">Gestión N.F.U.</label>
        </div>
        </div>

        </div>

        <!-- === Datos Identificativos === -->
        <SectionTitle icon="user">Datos Identificativos</SectionTitle>
        <div class="row g-3">
          <div class="col-lg-6">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.NOMIMP" id="nombre" class="form-control" :class="error.NOMIMP && 'is-invalid'" required />
              <label class="form-label" for="nombre">Nombre *</label>
              <div v-if="error.NOMIMP" class="invalid-feedback">
                {{ error.NOMIMP }}
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.DNIIMP" id="dni" class="form-control" :class="error.DNIIMP && 'is-invalid'" required />
              <label class="form-label" for="dni">CIF/NIF *</label>
              <div v-if="error.DNIIMP" class="invalid-feedback">
                {{ error.DNIIMP }}
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.EORIMP" id="eori" class="form-control" />
              <label class="form-label" for="eori">EORI</label>
            </div>
          </div>
        </div>

        <div class="row g-3 mt-1">
          <div class="col-lg-3">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.TELFMP" type="tel" id="telfijo" class="form-control" />
              <label class="form-label" for="telfijo">Teléfono Fijo</label>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.TELMMP" type="tel" id="telmovil" class="form-control" />
              <label class="form-label" for="telmovil">Teléfono Móvil</label>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.CORRMP" type="email" id="correo" class="form-control" :class="error.CORRMP && 'is-invalid'" required />
              <label class="form-label" for="correo">Correo Electrónico *</label>
              <div v-if="error.CORRMP" class="invalid-feedback">
                {{ error.CORRMP }}
              </div>
            </div>
          </div>
        </div>

        <!-- === Domicilio Fiscal === -->
        <SectionTitle icon="map-marker-alt">Domicilio Fiscal</SectionTitle>
        <div class="row g-3">
          <div class="col-lg-5">
            <div class="form-outline" data-mdb-input-init>
              <input v-model.number="f.CALIMP" id="calleFiscal" type="number" class="form-control" />
              <label class="form-label" for="calleFiscal">Clave Calle</label>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.NUMIMP" id="numFiscal" class="form-control" />
              <label class="form-label" for="numFiscal">Número</label>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.BLO1MP" id="bloqueFiscal" class="form-control" />
              <label class="form-label" for="bloqueFiscal">Bloque</label>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.POR1MP" id="portalFiscal" class="form-control" />
              <label class="form-label" for="portalFiscal">Portal</label>
            </div>
          </div>
        </div>

        <!-- === Representante === -->
        <SectionTitle icon="user-tie">Representante</SectionTitle>
        <div class="row g-3">
          <div class="col-lg-5">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.NOMRAP" id="nomRepr" class="form-control" :class="error.NOMRAP && 'is-invalid'" required />
              <label class="form-label" for="nomRepr">Nombre *</label>
              <div v-if="error.NOMRAP" class="invalid-feedback">
                {{ error.NOMRAP }}
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.DNIRAP" id="dniRepr" class="form-control" :class="error.DNIRAP && 'is-invalid'" required />
              <label class="form-label" for="dniRepr">CIF/NIF *</label>
              <div v-if="error.DNIRAP" class="invalid-feedback">
                {{ error.DNIRAP }}
              </div>              
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.TIREMP" id="tipoRepr" class="form-control" />
              <label class="form-label" for="tipoRepr">Tipo</label>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.TITUMP" id="tituloRepr" class="form-control" />
              <label class="form-label" for="tituloRepr">Título</label>
            </div>
          </div>
        </div>

        <!-- === Otros Datos === -->
        <SectionTitle icon="clipboard-list">Otros Datos</SectionTitle>
        <div class="row g-3">
          <div class="col-lg-6">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.DENCMP" id="denCom" class="form-control" />
              <label class="form-label" for="denCom">Denominación Comercial</label>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-outline" data-mdb-input-init>
              <input v-model="f.OBSEMP" id="obs" class="form-control" />
              <label class="form-label" for="obs">Observaciones</label>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
      <div>
        <router-link to="/importadores" class="btn btn-outline-secondary me-2">
          <i class="fas fa-xmark me-1"></i> Cancelar
        </router-link>
      </div>
      <div>  
        <button class="btn btn-primary" @click="onSubmit" :disabled="saving">
          <i class="fas fa-save me-1"></i> {{ saving ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </div>

  </main>
  
</template>

<script setup>
import { reactive, ref, watchEffect, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import * as mdb from 'mdb-ui-kit'
import Navbar from '../components/Navbar.vue'
import SectionTitle from '../components/SectionTitle.vue'

const router = useRouter()
const saving = ref(false)
const error = ref('')

const f = reactive({
  CLAVIM: null, NOMIMP: '', DNIIMP: '', EORIMP: 'ES',
  EXEIMP: '', PAGIMP: '',
  TELFMP: null, TELMMP: null, CORRMP: '',
  CALIMP: 0, NUMIMP: '', BLO1MP: '', POR1MP: '',
  NOMRAP: '', DNIRAP: '', TIREMP: '', TITUMP: '',
  DENCMP: '', OBSEMP: '',
  DIALMP: 0, MEALMP: 0, AÑALMP: 0
})

// Fecha de alta “amigable” que rellena los campos descompuestos
const fechaAlta = ref('')

watchEffect(() => {
  if (!fechaAlta.value) return
  const d = new Date(fechaAlta.value)
  f.DIALMP = d.getUTCDate()
  f.MEALMP = d.getUTCMonth() + 1
  f.AÑALMP = d.getUTCFullYear()
})

const initMdbInputs = async () => {
  await nextTick()

  document.querySelectorAll('.form-outline').forEach((wrapper) => {
    if (!wrapper.dataset.mdbInitialized) {
      // Cada .form-outline envuelve un input o textarea
      new mdb.Input(wrapper).init()
      wrapper.dataset.mdbInitialized = 'true'
    }
  })

  document
    .querySelectorAll('[data-mdb-select-init] select.form-select')
    .forEach((sel) => {
      if (!sel.dataset.mdbSelect) {
        new mdb.Select(sel)
      }
    })
}

onMounted(() => {
  initMdbInputs()
})

function validateForm() {
  const e = {}

  // Obligatorios
  if (!f.NOMIMP?.trim()) {
    e.NOMIMP = 'El nombre del importador es obligatorio.'
  }

  if (!f.DNIIMP?.trim()) {
    e.DNIIMP = 'El CIF/NIF del importador es obligatorio.'
  }

  if (!f.NOMRAP?.trim()) {
    e.NOMRAP = 'El nombre del representante es obligatorio.'
  }

  if (!f.DNIRAP?.trim()) {
    e.DNIRAP = 'El CIF/NIF del representante es obligatorio.'
  }

  if (!f.CORRMP?.trim()) {
    e.CORRMP = 'El correo electrónico es obligatorio.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.CORRMP)) {
    e.CORRMP = 'El correo electrónico no tiene un formato válido.'
  }

  // CALIMP: smallint (a efectos prácticos, entero entre 0 y 32767)
  if (f.CALIMP !== null && f.CALIMP !== '' && f.CALIMP !== undefined) {
    if (!Number.isInteger(f.CALIMP)) {
      e.CALIMP = 'La clave de calle debe ser un número entero.'
    } else if (f.CALIMP < 0 || f.CALIMP > 32767) {
      e.CALIMP = 'La clave de calle debe estar entre 0 y 32767.'
    }
  }

  error.value = e
  return Object.keys(e).length === 0
}

async function onSubmit() {
  try {
    error.value = ''
    saving.value = true
    if (!validateForm()) {
      saving.value = false
      // Opcional: subir al principio del formulario
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
   }
    const payload = { ...f }
    await api.post('/api/importadores', payload)
    router.push('/importadores')
  } catch (e) {
    error.value = e.response?.data?.message || 'No se pudo guardar el importador.'
  } finally {
    saving.value = false
  }
}
</script>
