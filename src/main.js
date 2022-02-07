import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BaseCard from './components/BaseCard'
import BaseModal from './components/BaseModal'
import RequestStatusNotifier from './components/RequestStatusNotifier'
import VueHtmlToPaper from './plugin/VueHtmlToPager'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
// let basePath = 'http://localhost:8080'
// const options = {
//     name: '_blank',
//     specs: [
//         'fullscreen=yes',
//         'titlebar=yes',
//         'scrollbars=yes'
//     ],
//     styles: [
//         'bootstrap/dist/css/bootstrap.min.css'
//     ]
// }
const app = createApp(App);
app.component('Datepicker', Datepicker);
app.component('BaseCard', BaseCard)
app.component('BaseModal', BaseModal)
app.component('RequestStatusNotifier', RequestStatusNotifier)
app.use(store).use(router).use(VueHtmlToPaper).mount('#app')