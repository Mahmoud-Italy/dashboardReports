import Vue from 'vue'
import Router from 'vue-router'
//import store from '../store';

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
  { path: '/reset/password', name:'reset', component: require('../components/auth/Reset.vue').default, beforeEnter: requireAuth },

  // Apps
  { path: '/apps', name: 'apps', component: require('../components/apps/List.vue').default, beforeEnter: requireAuth },
  { path: '/apps/create', name: 'create-apps', component: require('../components/apps/Create.vue').default, beforeEnter: requireAuth },
  { path: '/apps/edit/:id', name: 'edit-apps', component: require('../components/apps/Edit.vue').default, beforeEnter: requireAuth },

  // Accommodations
  { path: '/accommodations', name: 'accommodations', component: require('../components/accommodations/List.vue').default, beforeEnter: requireAuth },
  { path: '/accommodations/status/:status', name: 'status-accommodations', component: require('../components/accommodations/List.vue').default, beforeEnter: requireAuth },
  { path: '/accommodations/create', name: 'create-accommodations', component: require('../components/accommodations/Create.vue').default, beforeEnter: requireAuth },
  { path: '/accommodations/edit/:id', name: 'edit-accommodations', component: require('../components/accommodations/Edit.vue').default, beforeEnter: requireAuth },

  // Articles
  { path: '/articles', name: 'articles', component: require('../components/articles/List.vue').default, beforeEnter: requireAuth },
  { path: '/articles/status/:status', name: 'status-articles', component: require('../components/articles/List.vue').default, beforeEnter: requireAuth },
  { path: '/articles/create', name: 'create-articles', component: require('../components/articles/Create.vue').default, beforeEnter: requireAuth },
  { path: '/articles/edit/:id', name: 'edit-articles', component: require('../components/articles/Edit.vue').default, beforeEnter: requireAuth },

  // Caches
  { path: '/articles', name: 'caches', component: require('../components/caches/List.vue').default, beforeEnter: requireAuth },

  // Categories
  { path: '/categories', name: 'categories', component: require('../components/categories/List.vue').default, beforeEnter: requireAuth },
  { path: '/categories/status/:status', name: 'status-categories', component: require('../components/categories/List.vue').default, beforeEnter: requireAuth },
  { path: '/categories/create', name: 'create-categories', component: require('../components/categories/Create.vue').default, beforeEnter: requireAuth },
  { path: '/categories/edit/:id', name: 'edit-categories', component: require('../components/categories/Edit.vue').default, beforeEnter: requireAuth },

  // Cruises
  { path: '/cruises', name: 'cruises', component: require('../components/cruises/List.vue').default, beforeEnter: requireAuth },
  { path: '/cruises/status/:status', name: 'status-cruises', component: require('../components/cruises/List.vue').default, beforeEnter: requireAuth },
  { path: '/cruises/create', name: 'create-cruises', component: require('../components/cruises/Create.vue').default, beforeEnter: requireAuth },
  { path: '/cruises/edit/:id', name: 'edit-cruises', component: require('../components/cruises/Edit.vue').default, beforeEnter: requireAuth },

  // Destinations
  { path: '/destinations', name: 'destinations', component: require('../components/destinations/List.vue').default, beforeEnter: requireAuth },
  { path: '/destinations/status/:status', name: 'status-destinations', component: require('../components/destinations/List.vue').default, beforeEnter: requireAuth },
  { path: '/destinations/create', name: 'create-destinations', component: require('../components/destinations/Create.vue').default, beforeEnter: requireAuth },
  { path: '/destinations/edit/:id', name: 'edit-destinations', component: require('../components/destinations/Edit.vue').default, beforeEnter: requireAuth },

  // Logs
  { path: '/logs', name: 'logs', component: require('../components/logs/List.vue').default, beforeEnter: requireAuth },

  // Media
  { path: '/media', name: 'media', component: require('../components/media/List.vue').default, beforeEnter: requireAuth },
  { path: '/media/status/:status', name: 'status-media', component: require('../components/media/List.vue').default, beforeEnter: requireAuth },
  { path: '/media/create', name: 'create-media', component: require('../components/media/Create.vue').default, beforeEnter: requireAuth },
  { path: '/media/edit/:id', name: 'edit-media', component: require('../components/media/Edit.vue').default, beforeEnter: requireAuth },

  // Packages
  { path: '/packages', name: 'packages', component: require('../components/packages/List.vue').default, beforeEnter: requireAuth },
  { path: '/packages/status/:status', name: 'status-packages', component: require('../components/packages/List.vue').default, beforeEnter: requireAuth },
  { path: '/packages/create', name: 'create-packages', component: require('../components/packages/Create.vue').default, beforeEnter: requireAuth },
  { path: '/packages/edit/:id', name: 'edit-packages', component: require('../components/packages/Edit.vue').default, beforeEnter: requireAuth },

  // PackageTypes
  { path: '/packageTypes', name: 'packageTypes', component: require('../components/packageTypes/List.vue').default, beforeEnter: requireAuth },
  { path: '/packageTypes/status/:status', name: 'status-packageTypes', component: require('../components/packageTypes/List.vue').default, beforeEnter: requireAuth },
  { path: '/packageTypes/create', name: 'create-packageTypes', component: require('../components/packageTypes/Create.vue').default, beforeEnter: requireAuth },
  { path: '/packageTypes/edit/:id', name: 'edit-packageTypes', component: require('../components/packageTypes/Edit.vue').default, beforeEnter: requireAuth },

  // Pages
  { path: '/pages', name: 'pages', component: require('../components/pages/List.vue').default, beforeEnter: requireAuth },
  { path: '/pages/status/:status', name: 'status-pages', component: require('../components/pages/List.vue').default, beforeEnter: requireAuth },
  { path: '/pages/create', name: 'create-pages', component: require('../components/pages/Create.vue').default, beforeEnter: requireAuth },
  { path: '/pages/edit/:id', name: 'edit-pages', component: require('../components/pages/Edit.vue').default, beforeEnter: requireAuth },
  
  // Roles
  { path: '/roles', name: 'roles', component: require('../components/roles/List.vue').default, beforeEnter: requireAuth },
  { path: '/roles/status/:status', name: 'status-roles', component: require('../components/roles/List.vue').default, beforeEnter: requireAuth },
  { path: '/roles/create', name: 'create-roles', component: require('../components/roles/Create.vue').default, beforeEnter: requireAuth },
  { path: '/roles/edit/:id', name: 'edit-roles', component: require('../components/roles/Edit.vue').default, beforeEnter: requireAuth },

  // Sliders
  { path: '/sliders', name: 'sliders', component: require('../components/sliders/List.vue').default, beforeEnter: requireAuth },
  { path: '/sliders/status/:status', name: 'status-sliders', component: require('../components/sliders/List.vue').default, beforeEnter: requireAuth },
  { path: '/sliders/create', name: 'create-sliders', component: require('../components/sliders/Create.vue').default, beforeEnter: requireAuth },
  { path: '/sliders/edit/:id', name: 'edit-sliders', component: require('../components/sliders/Edit.vue').default, beforeEnter: requireAuth },

  // Socials
  { path: '/socials', name: 'socials', component: require('../components/socials/List.vue').default, beforeEnter: requireAuth },
  { path: '/socials/status/:status', name: 'status-socials', component: require('../components/socials/List.vue').default, beforeEnter: requireAuth },
  { path: '/socials/create', name: 'create-socials', component: require('../components/socials/Create.vue').default, beforeEnter: requireAuth },
  { path: '/socials/edit/:id', name: 'edit-socials', component: require('../components/socials/Edit.vue').default, beforeEnter: requireAuth },

  // Tags
  { path: '/tags', name: 'tags', component: require('../components/tags/List.vue').default, beforeEnter: requireAuth },
  { path: '/tags/status/:status', name: 'status-tags', component: require('../components/tags/List.vue').default, beforeEnter: requireAuth },
  { path: '/tags/create', name: 'create-tags', component: require('../components/tags/Create.vue').default, beforeEnter: requireAuth },
  { path: '/tags/edit/:id', name: 'edit-tags', component: require('../components/tags/Edit.vue').default, beforeEnter: requireAuth },

  // Users
  { path: '/users', name: 'users', component: require('../components/users/List.vue').default, beforeEnter: requireAuth },
  { path: '/users/status/:status', name: 'status-users', component: require('../components/users/List.vue').default, beforeEnter: requireAuth },
  { path: '/users/create', name: 'create-users', component: require('../components/users/Create.vue').default, beforeEnter: requireAuth },
  { path: '/users/edit/:id', name: 'edit-users', component: require('../components/users/Edit.vue').default, beforeEnter: requireAuth },

  // wikis
  { path: '/wikis', name: 'wikis', component: require('../components/wikis/List.vue').default, beforeEnter: requireAuth },
  { path: '/wikis/status/:status', name: 'status-wikis', component: require('../components/wikis/List.vue').default, beforeEnter: requireAuth },
  { path: '/wikis/create', name: 'create-wikis', component: require('../components/wikis/Create.vue').default, beforeEnter: requireAuth },
  { path: '/wikis/edit/:id', name: 'edit-wikis', component: require('../components/wikis/Edit.vue').default, beforeEnter: requireAuth },

  // Writers
  { path: '/writers', name: 'writers', component: require('../components/writers/List.vue').default, beforeEnter: requireAuth },
  { path: '/writers/status/:status', name: 'status-writers', component: require('../components/writers/List.vue').default, beforeEnter: requireAuth },
  { path: '/writers/create', name: 'create-writers', component: require('../components/writers/Create.vue').default, beforeEnter: requireAuth },
  { path: '/writers/edit/:id', name: 'edit-writers', component: require('../components/writers/Edit.vue').default, beforeEnter: requireAuth },

    
  // Extra
  { path: '/forbidden', name: 'forbidden', component: require('../components/extra/403.vue').default },
  { path: '/*', name: 'not-found', component: require('../components/extra/404.vue').default }

  ]
})


function requireAuth(to, from, next) {
  // store.dispatch('fetchAccessToken');
  // if (!store.state.accessToken) { next('/login'); } 
  // else { next(); }
  if(!localStorage.getItem('access_token')) { next('/login'); }
  else { next(); }
}

function requireUnAuth(to, from, next) {
  //store.dispatch('fetchAccessToken');
  // if (store.state.accessToken) { next('/'); } 
  // else { next(); }
  if(localStorage.getItem('access_token')) { next('/'); }
  else { next(); }
}