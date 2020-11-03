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

  // Applications
  { path: '/applications', name: 'applications', component: require('../components/applications/List.vue').default, beforeEnter: requireAuth },

  // Accommodations
  { path: '/accommodations', name: 'accommodations', component: require('../components/accommodations/List.vue').default, beforeEnter: requireAuth },
  { path: '/accommodations/status/:status', name: 'status-accommodations', component: require('../components/accommodations/List.vue').default, beforeEnter: requireAuth },
  { path: '/accommodations/filter/:filter_by/:filter', name: 'filter-accommodations', component: require('../components/accommodations/List.vue').default, beforeEnter: requireAuth },
  { path: '/accommodations/create', name: 'create-accommodations', component: require('../components/accommodations/Create.vue').default, beforeEnter: requireAuth },
  { path: '/accommodations/edit/:id', name: 'edit-accommodations', component: require('../components/accommodations/Edit.vue').default, beforeEnter: requireAuth },

  // Articles
  { path: '/articles', name: 'articles', component: require('../components/articles/List.vue').default, beforeEnter: requireAuth },
  { path: '/articles/status/:status', name: 'status-articles', component: require('../components/articles/List.vue').default, beforeEnter: requireAuth },
  { path: '/articles/filter/:filter_by/:filter', name: 'filter-articles', component: require('../components/articles/List.vue').default, beforeEnter: requireAuth },
  { path: '/articles/create', name: 'create-articles', component: require('../components/articles/Create.vue').default, beforeEnter: requireAuth },
  { path: '/articles/edit/:id', name: 'edit-articles', component: require('../components/articles/Edit.vue').default, beforeEnter: requireAuth },

  // Cabins
  { path: '/cabins', name: 'cabins', component: require('../components/cabins/List.vue').default, beforeEnter: requireAuth },
  { path: '/cabins/status/:status', name: 'status-cabins', component: require('../components/cabins/List.vue').default, beforeEnter: requireAuth },
  { path: '/cabins/filter/:filter_by/:filter', name: 'filter-cabins', component: require('../components/cabins/List.vue').default, beforeEnter: requireAuth },
  { path: '/cabins/create', name: 'create-cabins', component: require('../components/cabins/Create.vue').default, beforeEnter: requireAuth },
  { path: '/cabins/edit/:id', name: 'edit-cabins', component: require('../components/cabins/Edit.vue').default, beforeEnter: requireAuth },

  // Caches
  { path: '/caches', name: 'caches', component: require('../components/caches/List.vue').default, beforeEnter: requireAuth },

  // Categories
  { path: '/categories', name: 'categories', component: require('../components/categories/List.vue').default, beforeEnter: requireAuth },
  { path: '/categories/status/:status', name: 'status-categories', component: require('../components/categories/List.vue').default, beforeEnter: requireAuth },
  { path: '/categories/filter/:filter_by/:filter', name: 'filter-categories', component: require('../components/categories/List.vue').default, beforeEnter: requireAuth },
  { path: '/categories/create', name: 'create-categories', component: require('../components/categories/Create.vue').default, beforeEnter: requireAuth },
  { path: '/categories/edit/:id', name: 'edit-categories', component: require('../components/categories/Edit.vue').default, beforeEnter: requireAuth },

  // Cruises
  { path: '/cruises', name: 'cruises', component: require('../components/cruises/List.vue').default, beforeEnter: requireAuth },
  { path: '/cruises/status/:status', name: 'status-cruises', component: require('../components/cruises/List.vue').default, beforeEnter: requireAuth },
  { path: '/cruises/filter/:filter_by/:filter', name: 'filter-cruises', component: require('../components/cruises/List.vue').default, beforeEnter: requireAuth },
  { path: '/cruises/create', name: 'create-cruises', component: require('../components/cruises/Create.vue').default, beforeEnter: requireAuth },
  { path: '/cruises/edit/:id', name: 'edit-cruises', component: require('../components/cruises/Edit.vue').default, beforeEnter: requireAuth },

  // CruisesType
  { path: '/cruiseTypes', name: 'cruisetypes', component: require('../components/cruiseTypes/List.vue').default, beforeEnter: requireAuth },
  { path: '/cruiseTypes/status/:status', name: 'status-cruisetypes', component: require('../components/cruiseTypes/List.vue').default, beforeEnter: requireAuth },
  { path: '/cruiseTypes/filter/:filter_by/:filter', name: 'filter-cruisetypes', component: require('../components/cruiseTypes/List.vue').default, beforeEnter: requireAuth },
  { path: '/cruiseTypes/create', name: 'create-cruisetypes', component: require('../components/cruiseTypes/Create.vue').default, beforeEnter: requireAuth },
  { path: '/cruiseTypes/edit/:id', name: 'edit-cruisetypes', component: require('../components/cruiseTypes/Edit.vue').default, beforeEnter: requireAuth },

  // Destinations
  { path: '/destinations', name: 'destinations', component: require('../components/destinations/List.vue').default, beforeEnter: requireAuth },
  { path: '/destinations/status/:status', name: 'status-destinations', component: require('../components/destinations/List.vue').default, beforeEnter: requireAuth },
  { path: '/destinations/filter/:filter_by/:filter', name: 'filter-destinations', component: require('../components/destinations/List.vue').default, beforeEnter: requireAuth },
  { path: '/destinations/create', name: 'create-destinations', component: require('../components/destinations/Create.vue').default, beforeEnter: requireAuth },
  { path: '/destinations/edit/:id', name: 'edit-destinations', component: require('../components/destinations/Edit.vue').default, beforeEnter: requireAuth },

  // Faqs
  { path: '/faqs', name: 'faqs', component: require('../components/faqs/List.vue').default, beforeEnter: requireAuth },
  { path: '/faqs/status/:status', name: 'status-faqs', component: require('../components/faqs/List.vue').default, beforeEnter: requireAuth },
  { path: '/faqs/filter/:filter_by/:filter', name: 'filter-faqs', component: require('../components/faqs/List.vue').default, beforeEnter: requireAuth },
  { path: '/faqs/create', name: 'create-faqs', component: require('../components/faqs/Create.vue').default, beforeEnter: requireAuth },
  { path: '/faqs/edit/:id', name: 'edit-faqs', component: require('../components/faqs/Edit.vue').default, beforeEnter: requireAuth },

  // Hotels
  { path: '/hotels', name: 'hotels', component: require('../components/hotels/List.vue').default, beforeEnter: requireAuth },
  { path: '/hotels/status/:status', name: 'status-hotels', component: require('../components/hotels/List.vue').default, beforeEnter: requireAuth },
  { path: '/hotels/filter/:filter_by/:filter', name: 'filter-hotels', component: require('../components/hotels/List.vue').default, beforeEnter: requireAuth },
  { path: '/hotels/create', name: 'create-hotels', component: require('../components/hotels/Create.vue').default, beforeEnter: requireAuth },
  { path: '/hotels/edit/:id', name: 'edit-hotels', component: require('../components/hotels/Edit.vue').default, beforeEnter: requireAuth },

  // Icons
  { path: '/icons', name: 'icons', component: require('../components/icons/List.vue').default, beforeEnter: requireAuth },
  { path: '/icons/status/:status', name: 'status-icons', component: require('../components/icons/List.vue').default, beforeEnter: requireAuth },
  { path: '/icons/filter/:filter_by/:filter', name: 'filter-icons', component: require('../components/icons/List.vue').default, beforeEnter: requireAuth },

  // Inbox
  { path: '/inbox', name: 'inbox', component: require('../components/inbox/List.vue').default, beforeEnter: requireAuth },
  { path: '/inbox/status/:status', name: 'status-inbox', component: require('../components/inbox/List.vue').default, beforeEnter: requireAuth },
  { path: '/inbox/filter/:filter_by/:filter', name: 'filter-inbox', component: require('../components/inbox/List.vue').default, beforeEnter: requireAuth },
  { path: '/inbox/show/:id', name: 'show-inbox', component: require('../components/inbox/Show.vue').default, beforeEnter: requireAuth },

  // Inquires
  { path: '/inquires', name: 'inquires', component: require('../components/inquires/List.vue').default, beforeEnter: requireAuth },
  { path: '/inquires/status/:status', name: 'status-inquires', component: require('../components/inquires/List.vue').default, beforeEnter: requireAuth },
  { path: '/inquires/filter/:filter_by/:filter', name: 'filter-inquires', component: require('../components/inquires/List.vue').default, beforeEnter: requireAuth },
  { path: '/inquires/show/:id', name: 'show-inquires', component: require('../components/inquires/Show.vue').default, beforeEnter: requireAuth },

  // Ipblockers
  { path: '/ip-blockers', name: 'ip-blockers', component: require('../components/ip-blockers/List.vue').default, beforeEnter: requireAuth },
  { path: '/ip-blockers/status/:status', name: 'status-ip-blockers', component: require('../components/ip-blockers/List.vue').default, beforeEnter: requireAuth },
  { path: '/ip-blockers/filter/:filter_by/:filter', name: 'filter-ip-blockers', component: require('../components/ip-blockers/List.vue').default, beforeEnter: requireAuth },

  // Logs
  { path: '/logs', name: 'logs', component: require('../components/logs/List.vue').default, beforeEnter: requireAuth },

  // Media
  { path: '/media', name: 'media', component: require('../components/media/List.vue').default, beforeEnter: requireAuth },

  // Packages
  { path: '/packages', name: 'packages', component: require('../components/packages/List.vue').default, beforeEnter: requireAuth },
  { path: '/packages/status/:status', name: 'status-packages', component: require('../components/packages/List.vue').default, beforeEnter: requireAuth },
  { path: '/packages/filter/:filter_by/:filter', name: 'filter-packages', component: require('../components/packages/List.vue').default, beforeEnter: requireAuth },
  { path: '/packages/create', name: 'create-packages', component: require('../components/packages/Create.vue').default, beforeEnter: requireAuth },
  { path: '/packages/edit/:id', name: 'edit-packages', component: require('../components/packages/Edit.vue').default, beforeEnter: requireAuth },

  // PackageTypes
  { path: '/packageTypes', name: 'packagetypes', component: require('../components/packageTypes/List.vue').default, beforeEnter: requireAuth },
  { path: '/packageTypes/status/:status', name: 'status-packagetypes', component: require('../components/packageTypes/List.vue').default, beforeEnter: requireAuth },
  { path: '/packageTypes/filter/:filter_by/:filter', name: 'filter-packageTypes', component: require('../components/packageTypes/List.vue').default, beforeEnter: requireAuth },
  { path: '/packageTypes/create', name: 'create-packagetypes', component: require('../components/packageTypes/Create.vue').default, beforeEnter: requireAuth },
  { path: '/packageTypes/edit/:id', name: 'edit-packagetypes', component: require('../components/packageTypes/Edit.vue').default, beforeEnter: requireAuth },

  // Pages
  { path: '/pages', name: 'pages', component: require('../components/pages/List.vue').default, beforeEnter: requireAuth },
  { path: '/pages/status/:status', name: 'status-pages', component: require('../components/pages/List.vue').default, beforeEnter: requireAuth },
  { path: '/pages/filter/:filter_by/:filter', name: 'filter-pages', component: require('../components/pages/List.vue').default, beforeEnter: requireAuth },
  { path: '/pages/create', name: 'create-pages', component: require('../components/pages/Create.vue').default, beforeEnter: requireAuth },
  { path: '/pages/edit/:id', name: 'edit-pages', component: require('../components/pages/Edit.vue').default, beforeEnter: requireAuth },
  
  // Regions
  { path: '/regions', name: 'regions', component: require('../components/regions/List.vue').default, beforeEnter: requireAuth },
  { path: '/regions/status/:status', name: 'status-regions', component: require('../components/regions/List.vue').default, beforeEnter: requireAuth },
  { path: '/regions/filter/:filter_by/:filter', name: 'filter-regions', component: require('../components/regions/List.vue').default, beforeEnter: requireAuth },
  { path: '/regions/create', name: 'create-regions', component: require('../components/regions/Create.vue').default, beforeEnter: requireAuth },
  { path: '/regions/edit/:id', name: 'edit-regions', component: require('../components/regions/Edit.vue').default, beforeEnter: requireAuth },

  // Reviews
  { path: '/reviews', name: 'reviews', component: require('../components/reviews/List.vue').default, beforeEnter: requireAuth },
  { path: '/reviews/status/:status', name: 'status-reviews', component: require('../components/reviews/List.vue').default, beforeEnter: requireAuth },
  { path: '/reviews/filter/:filter_by/:filter', name: 'filter-reviews', component: require('../components/reviews/List.vue').default, beforeEnter: requireAuth },
  { path: '/reviews/create', name: 'create-reviews', component: require('../components/reviews/Create.vue').default, beforeEnter: requireAuth },
  { path: '/reviews/edit/:id', name: 'edit-reviews', component: require('../components/reviews/Edit.vue').default, beforeEnter: requireAuth },

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

  // Sliders
  { path: '/sliders', name: 'sliders', component: require('../components/sliders/List.vue').default, beforeEnter: requireAuth },
  { path: '/sliders/status/:status', name: 'status-sliders', component: require('../components/sliders/List.vue').default, beforeEnter: requireAuth },
  { path: '/sliders/filter/:filter_by/:filter', name: 'filter-sliders', component: require('../components/sliders/List.vue').default, beforeEnter: requireAuth },
  { path: '/sliders/create', name: 'create-sliders', component: require('../components/sliders/Create.vue').default, beforeEnter: requireAuth },
  { path: '/sliders/edit/:id', name: 'edit-sliders', component: require('../components/sliders/Edit.vue').default, beforeEnter: requireAuth },

  // Socials
  { path: '/socials', name: 'socials', component: require('../components/socials/List.vue').default, beforeEnter: requireAuth },
  { path: '/socials/status/:status', name: 'status-socials', component: require('../components/socials/List.vue').default, beforeEnter: requireAuth },
  { path: '/socials/filter/:filter_by/:filter', name: 'filter-socials', component: require('../components/socials/List.vue').default, beforeEnter: requireAuth },

  // Tags
  { path: '/tags', name: 'tags', component: require('../components/tags/List.vue').default, beforeEnter: requireAuth },
  { path: '/tags/status/:status', name: 'status-tags', component: require('../components/tags/List.vue').default, beforeEnter: requireAuth },
  { path: '/tags/filter/:filter_by/:filter', name: 'filter-tags', component: require('../components/tags/List.vue').default, beforeEnter: requireAuth },

  // Tenants
  { path: '/tenants', name: 'tenants', component: require('../components/tenants/List.vue').default, beforeEnter: requireAuth },
  { path: '/tenants/status/:status', name: 'status-tenants', component: require('../components/tenants/List.vue').default, beforeEnter: requireAuth },
  { path: '/tenants/filter/:filter_by/:filter', name: 'filter-tenants', component: require('../components/tenants/List.vue').default, beforeEnter: requireAuth },
  { path: '/tenants/create', name: 'create-tenants', component: require('../components/tenants/Create.vue').default, beforeEnter: requireAuth },
  { path: '/tenants/edit/:id', name: 'edit-tenants', component: require('../components/tenants/Edit.vue').default, beforeEnter: requireAuth },
  
  // Updates
  { path: '/updates', name: 'updates', component: require('../components/updates/List.vue').default, beforeEnter: requireAuth },
  { path: '/updates/status/:status', name: 'status-updates', component: require('../components/updates/List.vue').default, beforeEnter: requireAuth },
  { path: '/updates/filter/:filter_by/:filter', name: 'filter-updates', component: require('../components/updates/List.vue').default, beforeEnter: requireAuth },
  { path: '/updates/create', name: 'create-updates', component: require('../components/updates/Create.vue').default, beforeEnter: requireAuth },
  { path: '/updates/edit/:id', name: 'edit-updates', component: require('../components/updates/Edit.vue').default, beforeEnter: requireAuth },

  // Users
  { path: '/users', name: 'users', component: require('../components/users/List.vue').default, beforeEnter: requireAuth },
  { path: '/users/status/:status', name: 'status-users', component: require('../components/users/List.vue').default, beforeEnter: requireAuth },
  { path: '/users/filter/:filter_by/:filter', name: 'filter-users', component: require('../components/users/List.vue').default, beforeEnter: requireAuth },
  { path: '/users/create', name: 'create-users', component: require('../components/users/Create.vue').default, beforeEnter: requireAuth },
  { path: '/users/edit/:id', name: 'edit-users', component: require('../components/users/Edit.vue').default, beforeEnter: requireAuth },

  // wikis
  { path: '/wikis', name: 'wikis', component: require('../components/wikis/List.vue').default, beforeEnter: requireAuth },
  { path: '/wikis/status/:status', name: 'status-wikis', component: require('../components/wikis/List.vue').default, beforeEnter: requireAuth },
  { path: '/wikis/filter/:filter_by/:filter', name: 'filter-wikis', component: require('../components/wikis/List.vue').default, beforeEnter: requireAuth },
  { path: '/wikis/create', name: 'create-wikis', component: require('../components/wikis/Create.vue').default, beforeEnter: requireAuth },
  { path: '/wikis/edit/:id', name: 'edit-wikis', component: require('../components/wikis/Edit.vue').default, beforeEnter: requireAuth },

  // Writers
  { path: '/writers', name: 'writers', component: require('../components/writers/List.vue').default, beforeEnter: requireAuth },
  { path: '/writers/status/:status', name: 'status-writers', component: require('../components/writers/List.vue').default, beforeEnter: requireAuth },
  { path: '/writers/filter/:filter_by/:filter', name: 'filter-writers', component: require('../components/writers/List.vue').default, beforeEnter: requireAuth },
  { path: '/writers/create', name: 'create-writers', component: require('../components/writers/Create.vue').default, beforeEnter: requireAuth },
  { path: '/writers/edit/:id', name: 'edit-writers', component: require('../components/writers/Edit.vue').default, beforeEnter: requireAuth },

    
  // Errors
  { path: '/forbidden', name: 'forbidden', component: require('../components/errors/Forbidden.vue').default, beforeEnter: requireAuth },
  { path: '/*', name: 'not-found', component: require('../components/errors/NotFound.vue').default }

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