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
VueClipboard.config.autoSetContainer = true;
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

/* VueApexCharts */
import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
/* End VueApexCharts */

/* Vue Tooltip */
import VTooltip from "v-tooltip";
Vue.use(VTooltip);
/* End VueTooltip */

/* Vue Editor */
window.editor_apiKey  = 'xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b';
window.editor_menubar = 'file edit view insert format tools table tc help';
window.editor_plugins = 'advlist autolink lists link image charmap print preview anchor',
                         'searchreplace visualblocks code fullscreen',
                         'insertdatetime media table paste code help wordcount';
window.editor_toolbar = 'undo redo | formatselect | bold italic backcolor | \
                         alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent | removeformat | help';
/* Vue End Editor */

// baseURL
window.baseURL = 'https://apibema.mazadak.net/v1/dashboard';
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
