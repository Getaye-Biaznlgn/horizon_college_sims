import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BaseCard from './components/BaseCard'
import BaseModal from './components/BaseModal'
import RequestStatusNotifier from './components/RequestStatusNotifier'
import vuetopeper from './vuetopaper/export.js'
const app = createApp(App)
app.component('BaseCard', BaseCard)
app.component('BaseModal', BaseModal)
app.component('RequestStatusNotifier', RequestStatusNotifier)
app.use(store).use(router).mount('#app')
app.use(vuetopeper)