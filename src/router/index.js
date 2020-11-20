import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/',
  fallback: true,
  routes: [
	
	/** Dashboard **/

	// App
	{ path: '/',  name: 'dashboard', component: require('../components/dashboard/App.vue').default, beforeEnter: requireAuth },

  // Auth
  { path: '/login', name: 'login', component: require('../components/auth/Login.vue').default, beforeEnter: requireUnAuth },
  { path: '/forget/password', name:'forget', component: require('../components/auth/Forget.vue').default, beforeEnter: requireUnAuth },
  { path: '/reset/password', name:'reset', component: require('../components/auth/Reset.vue').default, beforeEnter: requireUnAuth },

  // Applications
  { path: '/applications', name: 'applications', component: require('../components/applications/List.vue').default, beforeEnter: requireAuth },

  // Caches
  { path: '/caches', name: 'caches', component: require('../components/caches/List.vue').default, beforeEnter: requireAuth },

  // Inbox
  { path: '/inbox', name: 'inbox', component: require('../components/inbox/List.vue').default, beforeEnter: requireAuth },
  { path: '/inbox/status/:status', name: 'status-inbox', component: require('../components/inbox/List.vue').default, beforeEnter: requireAuth },
  { path: '/inbox/filter/:filter_by/:filter', name: 'filter-inbox', component: require('../components/inbox/List.vue').default, beforeEnter: requireAuth },
  { path: '/inbox/show/:id', name: 'show-inbox', component: require('../components/inbox/Show.vue').default, beforeEnter: requireAuth },

  // Ipblockers
  { path: '/ip-blockers', name: 'ipblockers', component: require('../components/ip-blockers/List.vue').default, beforeEnter: requireAuth },
  { path: '/ip-blockers', name: 'ip-blockers', component: require('../components/ip-blockers/List.vue').default, beforeEnter: requireAuth },
  { path: '/ip-blockers/status/:status', name: 'status-ipblockers', component: require('../components/ip-blockers/List.vue').default, beforeEnter: requireAuth },
  { path: '/ip-blockers/filter/:filter_by/:filter', name: 'filter-ipblockers', component: require('../components/ip-blockers/List.vue').default, beforeEnter: requireAuth },

  // Media
  { path: '/media', name: 'media', component: require('../components/media/List.vue').default, beforeEnter: requireAuth },

  // Pages
  { path: '/pages', name: 'pages', component: require('../components/pages/List.vue').default, beforeEnter: requireAuth },
  { path: '/pages/status/:status', name: 'status-pages', component: require('../components/pages/List.vue').default, beforeEnter: requireAuth },
  { path: '/pages/filter/:filter_by/:filter', name: 'filter-pages', component: require('../components/pages/List.vue').default, beforeEnter: requireAuth },
  { path: '/pages/create', name: 'create-pages', component: require('../components/pages/Create.vue').default, beforeEnter: requireAuth },
  { path: '/pages/edit/:id', name: 'edit-pages', component: require('../components/pages/Edit.vue').default, beforeEnter: requireAuth },
  
  // Roles
  { path: '/roles', name: 'roles', component: require('../components/roles/List.vue').default, beforeEnter: requireAuth },
  { path: '/roles/status/:status', name: 'status-roles', component: require('../components/roles/List.vue').default, beforeEnter: requireAuth },
  { path: '/roles/filter/:filter_by/:filter', name: 'filter-roles', component: require('../components/roles/List.vue').default, beforeEnter: requireAuth },
  { path: '/roles/create', name: 'create-roles', component: require('../components/roles/Create.vue').default, beforeEnter: requireAuth },
  { path: '/roles/edit/:id', name: 'edit-roles', component: require('../components/roles/Edit.vue').default, beforeEnter: requireAuth },

  // Settings
  { path: '/settings', name: 'settings', component: require('../components/settings/List.vue').default, beforeEnter: requireAuth },
  { path: '/settings/status/:status', name: 'status-settings', component: require('../components/settings/List.vue').default, beforeEnter: requireAuth },
  { path: '/settings/filter/:filter_by/:filter', name: 'filter-settings', component: require('../components/settings/List.vue').default, beforeEnter: requireAuth },
  { path: '/settings/create', name: 'create-settings', component: require('../components/settings/Create.vue').default, beforeEnter: requireAuth },
  { path: '/settings/edit/:id', name: 'edit-settings', component: require('../components/settings/Edit.vue').default, beforeEnter: requireAuth },

  // Socials
  { path: '/socials', name: 'socials', component: require('../components/socials/List.vue').default, beforeEnter: requireAuth },
  { path: '/socials/status/:status', name: 'status-socials', component: require('../components/socials/List.vue').default, beforeEnter: requireAuth },
  { path: '/socials/filter/:filter_by/:filter', name: 'filter-socials', component: require('../components/socials/List.vue').default, beforeEnter: requireAuth },

  // Users
  { path: '/users', name: 'users', component: require('../components/users/List.vue').default, beforeEnter: requireAuth },
  { path: '/users/status/:status', name: 'status-users', component: require('../components/users/List.vue').default, beforeEnter: requireAuth },
  { path: '/users/filter/:filter_by/:filter', name: 'filter-users', component: require('../components/users/List.vue').default, beforeEnter: requireAuth },
  { path: '/users/create', name: 'create-users', component: require('../components/users/Create.vue').default, beforeEnter: requireAuth },
  { path: '/users/edit/:id', name: 'edit-users', component: require('../components/users/Edit.vue').default, beforeEnter: requireAuth },

  // Errors
  { path: '/forbidden', name: 'forbidden', component: require('../components/errors/Forbidden.vue').default, beforeEnter: requireAuth },
  { path: '/*', name: 'not-found', component: require('../components/errors/NotFound.vue').default }

  ]
})


function requireAuth(to, from, next) {
  if(!localStorage.getItem('access_token')) { next('/login'); }
  else { next(); }
}

function requireUnAuth(to, from, next) {
  if(localStorage.getItem('access_token')) { next('/'); }
  else { next(); }
}