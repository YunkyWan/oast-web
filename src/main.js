import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import router from './router'

// Estilos
import '@fortawesome/fontawesome-free/css/all.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-ui-kit/css/mdb.min.css';
//import * as mdb from 'mdb-ui-kit'

createApp(App).use(router).mount('#app')
