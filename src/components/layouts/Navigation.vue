<template>
    <div class="">
        
        <!-- Sidebar -->
        <aside id="sidebar" class="u-sidebar">
            <div class="u-sidebar-inner">


                <!-- Sidebar Header -->
                <header class="u-sidebar-header">
                    <router-link :to="{ name: 'reports'}" class="u-sidebar-logo">
                        <img class="u-sidebar-logo__icon" src="/assets/svg/logo-mini.svg" alt="">
                        <img class="u-sidebar-logo__text" src="/assets/svg/logo-text-light.svg" alt="">
                    </router-link>
                </header>
                <!-- End Sidebar Header -->


                <!-- Sidebar Nav -->
                <nav class="u-sidebar-nav">
                    <ul class="u-sidebar-nav-menu u-sidebar-nav-menu--top-level">

                        <li class="u-sidebar-nav-menu__item">
                            <router-link :to="{ name: 'reports' }" class="u-sidebar-nav-menu__link"
                                :class="(this.$route.path == '/') ? 'active' : '' ">
                                <span class="ti-bar-chart u-sidebar-nav-menu__item-icon"></span>
                                <span class="u-sidebar-nav-menu__item-title">Reports</span>
                            </router-link>
                        </li>

                        <li class="u-sidebar-nav-menu__item"></li>
                        <br/><br/><br/><br/><br/><br/>

                    </ul>
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
        data(){
            return {
                //
            }
        },
        mounted() {},
        watch: {},
        created() {
            //
        },
        methods: {
            //
        },
    }
</script>
