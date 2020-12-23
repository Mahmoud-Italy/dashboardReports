import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/',
  fallback: true,
  routes: [
	
	/** Dashboard **/

	// Reports
  { path: '/',  name: 'reports', component: require('../components/reports/List.vue').default },
  
  ]
})
