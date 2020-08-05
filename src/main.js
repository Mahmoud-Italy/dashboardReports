import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './lang';

/* Vue Axios */
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'izitoast/dist/css/iziToast.min.css';
Vue.use(VueAxios, axios);
/* End Vue Axios */

/* Vue Notificaitons  */
import VueNotifications from 'vue-notifications';
import iziToast from 'izitoast';
Vue.use(VueNotifications, iziToast);
/* End Vue Notificaitons  */

/* Vue Download Json Excel  */
import JsonExcel from 'vue-json-excel'; 
Vue.component('downloadExcel', JsonExcel);
/* End Vue Download Json Excel */

/* Copy to Clipboard */
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);
/* End Copy to Clipboard */

/* Vue Print-nb */
import Print from 'vue-print-nb';
Vue.use(Print);
/* End Vue Print-nb */

/* Axios PLugin */
import AxiosPlugin from 'vue-axios-cors';
Vue.use(AxiosPlugin)
/* End Axios PLugin */

// baseURL
window.baseURL = 'http://localhost:8000/api/v1/dashboard';
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
