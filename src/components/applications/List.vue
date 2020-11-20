<template>
    <div class="">
        <Header v-on:headerToChild="onSearchSubmit"></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">

                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize">{{ refs }}
                        <!-- Role -->
                        <div class="pull-rights ui-mt-15 pull-right">
                            <span class="badge badge-md badge-pill badge-success-soft text-lowercase">
                                {{ auth.role }}
                            </span>
                        </div>
                        <!-- End Role -->
                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item text-capitalize active" aria-current="page">
                                {{ refs }}
                            </li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->

                    <!-- pgLoading -->
                    <div v-if="pgLoading" class="row h-100">
                        <div class="container text-center">
                            <div class="spinner-grow mt-5" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <!-- End pgLoading -->

                    <!-- Apps :class="(index > 3) ? 'pt-5' : ''"-->
                    <div v-if="!pgLoading" class="row">
                        <div class="col-md-3 pt-5" 
                            v-for="(row, index) in rows"
                            :key="index">
                            <div class="card text-center">
                                <div class="card-header">
                                    <h4>{{ row.name }}</h4>
                                </div>
                                <div class="card-body pt-0">
                                    <span v-if="!row.setup"
                                        class="btn btn-pill btn-with-icon text-uppercase"
                                        :class="(row.setup) ? ' btn-secondary ' : ' btn-danger ' ">
                                        <span :class="'btn-icon mr-2 '+row.icon"></span>
                                        <span v-html="(row.setup) ? 'Update' : 'Set Up'">Update</span>
                                    </span>
                                    <router-link v-if="row.setup" :to="{ name: row.url }"
                                        class="btn btn-pill btn-with-icon text-uppercase"
                                        :class="(row.setup) ? ' btn-secondary ' : ' btn-danger ' ">
                                        <span :class="'btn-icon mr-2 '+row.icon"></span>
                                        <span v-html="(row.setup) ? 'Update' : 'Set Up'">Update</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Apps -->


                </div>
            
            <Footer></Footer>
            
            </div>
        </main>
        <!-- End Main -->
    </div>
</template>

<script>
    import Header from '../layouts/Header.vue';
    import Navigation from '../layouts/Navigation';
    import Footer from '../layouts/Footer.vue';
    import iziToast from 'izitoast';
    
    export default {
        name: 'List',
        components: {
            Header,
            Navigation,
            Footer
        },
        data(){
            return {
                auth: { 
                    role: '',
                    access_token: '',
                },
                // 
                search: '',
                status: 'active',
                pgLoading: true,
                rows: [],
                pagination: {},

                refs: 'applications',
            }
        },
        mounted() {},
        watch: {
          $route() {
            //
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

            this.fetchData();
        },
        methods: {

            // on Search
            onSearchSubmit(value) {
                this.search = value;
                this.fetchData('', true);
            },

            // fetch Data
            fetchData() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/'+this.refs,
                    method: 'GET',
                    data: {},
                    params: {
                        status: this.status,
                        search: this.search,
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.pgLoading = false;
                        this.tenantLoading = false;
                        this.rows = res.data.rows;
                    })
                    .catch(err => {
                        // 403 Forbidden
                        if(err.response && err.response.status == 401) {
                            this.removeLocalStorage();
                            this.$router.push({ name: 'login' });
                        } else if(err.response && err.response.status == 403) {
                            this.$router.push({ name: 'forbidden' });
                        } else {
                            this.btnLoading = false;
                            iziToast.warning({
                                icon: 'ti-alert',
                                title: 'Wow-man,',
                                message: (err.response) ? err.response.data.message : ''+err
                            });
                        }
                    })
                    .finally(() => {})
            },

            // remove sessions
            removeLocalStorage() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_image');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
            },

        },
    }
</script>
