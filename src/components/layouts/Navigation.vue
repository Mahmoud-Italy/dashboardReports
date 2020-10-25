<template>
    <div class="">
        
        <!-- Sidebar -->
        <aside id="sidebar" class="u-sidebar">
            <div class="u-sidebar-inner">

                <!-- Sidebar Header -->
                <header class="u-sidebar-header">
                    <router-link :to="{ name: 'dashboard'}" class="u-sidebar-logo">
                        <img class="u-sidebar-logo__icon" src="/assets/svg/logo-mini.svg" alt="">
                        <img class="u-sidebar-logo__text" src="/assets/svg/logo-text-light.svg" alt="">
                    </router-link>
                </header>
                <!-- End Sidebar Header -->

                <!-- Sidebar Nav -->
                <nav class="u-sidebar-nav">

                    <!-- Sidebar Nav Menu -->
                    <ul v-if="!pgLoading" class="u-sidebar-nav-menu u-sidebar-nav-menu--top-level">

                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'applications' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/applications') ? 'active' : '' ">
                                <span class="ti-layout-grid2 u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Applications</span>
                            </router-link>
                        </li>

                        <li v-for="(nav, index) in navigation" 
                                :key="index" 
                                :class="(nav.authority) ? '' : 'hidden'"
                                class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: nav.url }" 
                                class="u-sidebar-nav-menu__link"
                                :class="(path == '/'+nav.url ||
                                         path == '/'+nav.url+'/status/active' ||
                                         path == '/'+nav.url+'/status/inactive' ||
                                         path == '/'+nav.url+'/trash') 
                                    ? 'active' : '' ">
                                <span :class="nav.icon" class="u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title text-capitalize">
                                    {{ nav.name }}
                                </span>
                            </router-link>
                        </li>

                        <li class="u-sidebar-nav-menu__item"></li>
                        <br/><br/><br/><br/><br/><br/>

                    </ul>
                    <!-- End Sidebar Nav Menu -->
                </nav>
                <!-- End Sidebar Nav -->

            </div>
        </aside>
        <!-- End Sidebar -->

    </div>
</template>

<script>
    export default {
        name: 'Navigation',
        props: [ 'tenant' ],
        data(){
            return {
                //
                auth: { 
                    role: '',
                    access_token: '',
                },

                pgLoading: true,
                navigation: [], 

                tenant_id: 0,

                path: '/',
            }
        },
        mounted() {},
        watch: {
            tenant: function(newVal) {
                this.tenant_id = newVal;
                this.fetchNavigation();
            },
            $route() {
                //
                if(localStorage.getItem('tenant_id')) {
                    this.tenant_id = localStorage.getItem('tenant_id');
                }
                this.fetchNavigation();
            }
        },
        created() {
            // AccessToken & Role
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }

            // Path
            if(this.$route.path) {
                this.path = this.$route.path;
            }

            // Tenants
            if(localStorage.getItem('tenant_id')) {
                this.tenant_id = localStorage.getItem('tenant_id');
            }

            this.fetchNavigation();
        },
        methods: {
            //

            onChangeNav(e){
                if(this.$refs['itemComponent'+e].classList.contains('u-sidebar-nav--opened')) {
                    this.$refs['itemComponent'+e].classList.remove('u-sidebar-nav--opened');
                    this.$refs['menuItemComponent'+e].style.display = 'none';
                } else {
                    this.$refs['itemComponent'+e].classList.add('u-sidebar-nav--opened');
                    this.$refs['menuItemComponent'+e].style.display = 'block';
                }
            },

            fetchNavigation(){ 
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/applications',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: this.status,
                        search: this.search,
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.pgLoading = false;
                        this.navigation = res.data.rows;
                    })
                    .catch(() => { })
                    .finally(() => { })
            },

        },

        beforeRouteEnter (to, from, next) { 
          next(() => { 
            //next();
            //console.log('here'+vm);
          }) 
        },
    }
</script>
