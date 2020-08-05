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

    // Posts
    { path: '/posts', name: 'posts', component: require('../components/posts/List.vue').default, beforeEnter: requireAuth },
    { path: '/posts/create', name: 'create-posts', component: require('../components/posts/Create.vue').default, beforeEnter: requireAuth },
    { path: '/posts/edit/:id', name: 'edit-posts', component: require('../components/posts/Edit.vue').default, beforeEnter: requireAuth },

    // Blogs
      // Authors
      // { path: '/blogs/authors', name: 'authors', component: require('../components/blogs/authors/List.vue').default, beforeEnter: requireAuth },
      // { path: '/blogs/authors/create', name: 'create-authors', component: require('../components/blogs/authors/Create.vue').default, beforeEnter: requireAuth },
      // { path: '/blogs/authors/edit/:id', name: 'edit-authors', component: require('../components/blogs/authors/Edit.vue').default, beforeEnter: requireAuth },

      // Posts




    // Categories
    { path: '/categories', name: 'categories', component: require('../components/categories/List.vue').default, beforeEnter: requireAuth },
    { path: '/categories/status/:status', name: 'status-categories', component: require('../components/categories/List.vue').default, beforeEnter: requireAuth },
    { path: '/categories/create', name: 'create-categories', component: require('../components/categories/Create.vue').default, beforeEnter: requireAuth },
    { path: '/categories/edit/:id', name: 'edit-categories', component: require('../components/categories/Edit.vue').default, beforeEnter: requireAuth },
    //{ path: '/categories/:subcategory', name: 'sub-categories', component: require('./components/categories/Sub.vue').default, beforeEnter: requireAuth },
    //{ path: '/categories/:subcategory/status/:status', name: 'status-sub-category', component: require('./components/categories/Sub.vue').default, beforeEnter: requireAuth },
    
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