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

                    <ul class="u-sidebar-nav-menu u-sidebar-nav-menu--top-level">
                        <!-- Dashboard -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'dashboard' }" 
                                class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/dashboard/explore') ? 'active' : '' ">
                                <span class="ti-dashboard u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Dashboard</span>
                            </router-link>
                        </li>
                        <!-- End Dashboard -->

                        <!-- Destinations -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'destinations' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/destinations' || 
                                        this.$route.path == '/destinations/status/active' ||
                                        this.$route.path == '/destinations/status/inactive' ||
                                        this.$route.path == '/destinations/status/trash') ? 'active' : '' ">
                                <span class="ti-map-alt u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Destinations</span>
                            </router-link>
                        </li>
                        <!-- End Destinations -->

                        <!-- Categories -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'categories' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/categories' || 
                                        this.$route.path == '/categories/status/active' ||
                                        this.$route.path == '/categories/status/inactive' ||
                                        this.$route.path == '/categories/status/trash') ? 'active' : '' ">
                                <span class="ti-harddrives u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Categories</span>
                            </router-link>
                        </li>
                        <!-- End Categories -->
                        
                        <!-- Writers -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'writers' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/writers' ||
                                        this.$route.path == '/writers/status/active' ||
                                        this.$route.path == '/writers/status/inactive' || 
                                        this.$route.path == '/writers/status/trash' ||
                                        this.$route.path == '/writers/create') ? 'active' : '' ">
                                <span class="ti-agenda u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Writers</span>
                            </router-link>
                        </li>
                        <!-- End Writers -->

                        <!-- Posts -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'articles' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/articles' ||
                                        this.$route.path == '/articles/status/published' ||
                                        this.$route.path == '/articles/status/draft' || 
                                        this.$route.path == '/articles/status/trash' ||
                                        this.$route.path == '/articles/create') ? 'active' : '' ">
                                <span class="ti-pencil-alt u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Articles</span>
                            </router-link>
                        </li>
                        <!-- End Posts -->


                        <!-- Packages -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'packages' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/packages' || 
                                        this.$route.path == '/packages/status/active' ||
                                        this.$route.path == '/packages/status/inactive' ||
                                        this.$route.path == '/packages/status/trash' ||
                                        this.$route.path == '/packages/create') ? 'active' : '' ">
                                <span class="ti-package u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Packages</span>
                            </router-link>
                        </li>
                        <!-- End Packages -->

                        <!-- Cruises -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'cruises' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/cruises' || 
                                        this.$route.path == '/cruises/status/active' ||
                                        this.$route.path == '/cruises/status/inactive' ||
                                        this.$route.path == '/cruises/status/trash' ||
                                        this.$route.path == '/cruises/create') ? 'active' : '' ">
                                <span class="ti-gift u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Cruises</span>
                            </router-link>
                        </li>
                        <!-- End Cruises -->

                        <!-- Tags -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'tags' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/tags' || 
                                        this.$route.path == '/tags/status/active' ||
                                        this.$route.path == '/tags/status/inactive' ||
                                        this.$route.path == '/tags/status/trash' ||
                                        this.$route.path == '/tags/create') ? 'active' : '' ">
                                <span class="ti-tag u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Tags</span>
                            </router-link>
                        </li>
                        <!-- End Tags -->

                        <!-- Media -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'media' }" class="u-sidebar-nav-menu__link"
                                    :class="(this.$route.path == '/dashboard/media') ? 'active' : '' ">
                                <span class="ti-cloud-up u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Media</span>
                            </router-link>
                        </li>
                        <!-- End Media -->

                        <!-- Pages -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'pages' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/pages' || 
                                        this.$route.path == '/pages/status/active' ||
                                        this.$route.path == '/pages/status/inactive' ||
                                        this.$route.path == '/pages/status/trash' ||
                                        this.$route.path == '/pages/create') ? 'active' : '' ">
                                <span class="ti-files u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Pages</span>
                            </router-link>
                        </li>
                        <!-- End Pages -->

                        <!-- Users -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'users' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/users' || 
                                        this.$route.path == '/users/status/trash' ||
                                        this.$route.path == '/users/create') ? 'active' : '' ">
                                <span class="ti-user u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Users</span>
                            </router-link>
                        </li>
                        <!-- End Users -->

                        <!-- Roles v-if="nav_roles == 'show'"-->
                        <li 
                            class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'roles' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/roles' || 
                                        this.$route.path == '/roles/status/active' ||
                                        this.$route.path == '/roles/status/inactive' ||
                                        this.$route.path == '/roles/trash') ? 'active' : '' ">
                                <span class="ti-lock u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Roles</span>
                            </router-link>
                        </li>
                        <!-- End Roles -->


                        <!-- Activity Log -->
                        <li v-if="nav_activity_logs == 'show'"
                            class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'logs' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/activity-logs') ? 'active' : '' ">
                                <span class="ti-brush-alt u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Activity Logs</span>
                            </router-link>
                        </li>
                        <!-- End Activity Log -->

                        <!-- Cache Management -->
                        <li v-if="nav_cache_management == 'show'"
                            class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'settings' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/cache-management') ? 'active' : '' ">
                                <span class="ti-pulse u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Cache Management</span>
                            </router-link>
                        </li>
                        <!-- End Cache Management -->

                        <!-- Settings -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'settings' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/dashboard/settings') ? 'active' : '' ">
                                <span class="ti-layout-grid2 u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">App Settings</span>
                            </router-link>
                        </li>
                        <!-- End Settings -->


                        <!-- Settings -->
                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'settings' }" class="u-sidebar-nav-menu__link"
                                >
                                <span class="ti-agenda u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Documention</span>
                            </router-link>
                        </li>
                        <!-- End Settings -->

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
        props: {
            nav_roles: {
                default: (localStorage.getItem('nav_roles')) ? localStorage.getItem('nav_roles') : 'show',
            },
            nav_sliders: {
                default: (localStorage.getItem('nav_sliders')) ? localStorage.getItem('nav_sliders') : 'show',
            },
            nav_themes: {
                default: (localStorage.getItem('nav_themes')) ? localStorage.getItem('nav_themes') : 'show',
            },
            nav_reports: {
                default: (localStorage.getItem('nav_reports')) ? localStorage.getItem('nav_reports') : 'hide',
            },
            nav_activity_logs: {
                default: (localStorage.getItem('nav_activity_logs')) ? localStorage.getItem('nav_activity_logs') : 'show',
            },
            nav_cache_management: {
                default: (localStorage.getItem('nav_cache_management')) ? localStorage.getItem('nav_cache_management') : 'show',
            },
        },
        data(){
            return {
                //
            }
        },
        mounted() {},
        watch: {
          $route() {
            //
            if(localStorage.getItem('nav_roles')) {
                this.$props.nav_roles = localStorage.getItem('nav_roles');
            }
            if(localStorage.getItem('nav_sliders')) {
                this.$props.nav_sliders = localStorage.getItem('nav_sliders');
            }
            if(localStorage.getItem('nav_themes')) {
                this.$props.nav_themes = localStorage.getItem('nav_themes');
            }
            if(localStorage.getItem('nav_reports')) {
                this.$props.nav_reports = localStorage.getItem('nav_reports');
            }
            if(localStorage.getItem('nav_activity_logs')) {
                this.$props.nav_activity_logs = localStorage.getItem('nav_activity_logs');
            }
            if(localStorage.getItem('nav_cache_management')) {
                this.$props.nav_cache_management = localStorage.getItem('nav_cache_management');
            }

          }
        },
        created() {
            //
            if(localStorage.getItem('nav_roles')) {
                this.$props.nav_roles = localStorage.getItem('nav_roles');
            }
            if(localStorage.getItem('nav_sliders')) {
                this.$props.nav_sliders = localStorage.getItem('nav_sliders');
            }
            if(localStorage.getItem('nav_themes')) {
                this.$props.nav_themes = localStorage.getItem('nav_themes');
            }
            if(localStorage.getItem('nav_reports')) {
                this.$props.nav_reports = localStorage.getItem('nav_reports');
            }
            if(localStorage.getItem('nav_activity_logs')) {
                this.$props.nav_activity_logs = localStorage.getItem('nav_activity_logs');
            }
            if(localStorage.getItem('nav_cache_management')) {
                this.$props.nav_cache_management = localStorage.getItem('nav_cache_management');
            }
        },
        methods: {
            //
       //   requestPropChange: function (path, value) {
             //    if (this.is(path, 'String') && this.isDefined(value) && (new RegExp('^[a-zA-Z_\\$]\\w*(\\.([a-zA-Z_\\$]\\w*|[0-9]+))*$')).test(path)) {
             //      this.$emit('propChange', {path: path.split('.'), value: value})
             //    }
             // },

            onChangeNav(e){
                if(this.$refs['itemComponent'+e].classList.contains('u-sidebar-nav--opened')) {
                    this.$refs['itemComponent'+e].classList.remove('u-sidebar-nav--opened');
                    this.$refs['menuItemComponent'+e].style.display = 'none';
                } else {
                    this.$refs['itemComponent'+e].classList.add('u-sidebar-nav--opened');
                    this.$refs['menuItemComponent'+e].style.display = 'block';
                }
            },

        },
    }
</script>
