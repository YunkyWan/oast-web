import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://localhost:8000
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
})

// 🔐 Fuerza el header X-XSRF-TOKEN decodificado desde la cookie
api.interceptors.request.use((config) => {
  const m = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/)
  if (m) {
    try {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(m[1])
    } catch {
      config.headers['X-XSRF-TOKEN'] = m[1]
    }
  }
  return config
})

export async function csrf() {
  await api.get('/sanctum/csrf-cookie') 
}

export default api
