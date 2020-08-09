<template>
    <div class="">
        <Header v-on:headerToChild="onSearchSubmit"></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">

                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">App Settings

                        <div class="pull-rights ui-mt-15 pull-right ">
                            <div class="dropdown">
                                <span class="badge badge-md badge-pill badge-secondary-soft">
                                    {{ auth.role }}
                                </span>
                            </div>
                        </div>
                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">App Settings</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->

                    <!-- pgLoading -->
                    <div v-if="pgLoading" class="row h-100">
                        <div class="container text-center">
                            <p><br/></p>
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <p><br/></p>
                        </div>
                    </div>
                    <!-- End pgLoading -->


                    <!-- Apps -->
                    <div v-if="!pgLoading" class="row">
                        <div class="col-md-3 " 
                            v-for="(row, index) in rows"
                            :key="index"
                            :class="(index > 3) ? 'pt-5' : ''">
                            <div class="card text-center">
                                <div class="card-header">
                                    <h4>{{ row.name }}</h4>
                                </div>
                                <div class="card-body pt-0">
                                    <router-link :to="{ name: row.url }"
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
                search: '',
                pgLoading: true,
                rows: [],
                pagination: {},
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

            onSearchSubmit(value) {
                this.search = value;
                this.fetchData('', true);
            },

            // Fetch Data
            fetchData() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                let vm = this;
                const options = {
                    url: window.baseURL+'/appSettings',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.pgLoading = false;
                        this.rows = res.data.rows;
                        if(res.data.pagiante.total) {
                            this.total_data = res.data.pagiante.total;
                            vm.makePagination(res.data.pagiante)
                        }
                    })
                    .catch(err => {
                        // 403 Forbidden
                        if(err.response && err.response.status == 403) {
                            this.removeLocalStorage()
                            this.$router.push({ name: 'forbidden' })
                        } else {
                            this.btnLoading = false;
                            iziToast.warning({
                                icon: 'ti-alert',
                                title: 'Wow-man,',
                                message: err.response.data.message
                            });
                        }
                    })
                    .finally(() => {})
            },

            // Pagination
            makePagination(meta) {
                let pagination = {
                    current_page: meta.current_page,
                    last_page: meta.last_page,
                    next_page_url: meta.next_page_url,
                    prev_page_url: meta.prev_page_url
                }
                this.pagination = pagination;
            },

            // remove sessions
            removeLocalStorage() {
                localStorage.removeItem('access_token');
            },

        },
    }
</script>
