<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">

                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Cache Management

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
                            <li class="breadcrumb-item"><router-link :to="{ name: 'dashboard' }">Home</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Cache Management</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->

                    
                <!-- Button Types -->
                <div class="row">


                    <!-- Clear Application Cache -->
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-header">
                                <h4>Clear Application Cache</h4>
                            </div>
                            <div class="card-body pt-0">
                                <button type="button" :disabled="btn1Loading"
                                    @click="func1"
                                    class="btn btn-secondary btn-pill btn-with-icon">
                                    <span class="btn-icon ti-wand mr-2"></span>
                                    <span v-if="!btn1Loading">cache:clear</span>
                                    <span v-if="btn1Loading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" aria-hidden="true">
                                        </span>clearing...
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Clear Application Cache -->

                    
                    <!-- Clear Configuration Cache -->
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-header">
                                <h4>Clear Configuration Cache</h4>
                            </div>
                            <div class="card-body pt-0">
                                <button type="button" :disabled="btn2Loading"
                                    @click="func2"
                                    class="btn btn-danger btn-pill btn-with-icon">
                                    <span class="btn-icon ti-wand mr-2"></span>
                                    <span v-if="!btn2Loading">config:clear</span>
                                    <span v-if="btn2Loading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" aria-hidden="true">
                                        </span>clearing...
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Clear Configuration Cache -->


                    <!-- Clear Views Cache -->
                    <div class="col-md-4">
                        <div class="card text-center">
                            <div class="card-header">
                                <h4>Clear Views Cache</h4>
                            </div>
                            <div class="card-body pt-0">
                                <button type="button" :disabled="btn3Loading"
                                    @click="func3"
                                    class="btn btn-warning btn-pill btn-with-icon">
                                    <span class="btn-icon ti-wand mr-2"></span>
                                    <span v-if="!btn3Loading">view:clear</span>
                                    <span v-if="btn3Loading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" aria-hidden="true">
                                        </span>clearing...
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Clear Views Cache -->


                    <!-- Route Cache -->
                    <div class="col-md-4 pt-5">
                        <div class="card text-center">
                            <div class="card-header">
                                <h4>Route Cache</h4>
                            </div>
                            <div class="card-body pt-0">
                                <button type="button" :disabled="btn4Loading"
                                    @click="func4"
                                    class="btn btn-primary btn-pill btn-with-icon">
                                    <span class="btn-icon ti-wand mr-2"></span>
                                    <span v-if="!btn4Loading">route:clear</span>
                                    <span v-if="btn4Loading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" aria-hidden="true">
                                        </span>clearing...
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Route Cache -->

                    <!-- Clear Route Cache -->
                    <div class="col-md-4 pt-5">
                        <div class="card text-center">
                            <div class="card-header">
                                <h4>Clear Route Cache</h4>
                            </div>
                            <div class="card-body pt-0">
                                <button type="button" :disabled="btn5Loading"
                                    @click="func5"
                                    class="btn btn-info btn-pill btn-with-icon">
                                    <span class="btn-icon ti-wand mr-2"></span>
                                    <span v-if="!btn5Loading">route:clear</span>
                                    <span v-if="btn5Loading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" aria-hidden="true">
                                        </span>clearing...
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- End Clear Route Cache -->


                    </div>
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
        name: 'Caches',
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
                btn1Loading: false,
                btn2Loading: false,
                btn3Loading: false,
                btn4Loading: false,
                btn5Loading: false,
            }
        },
        mounted() {},
        created() {
            // AccessToken & Roles
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }

        },
        methods: {

            // func 1
            func1(){
                this.btn1Loading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/caches/cache-clear',
                    method: 'GET',
                    data: {}
                }
                this.axios(options)
                    .then(() => {
                        this.btn1Loading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Cache Cleared Successfully',
                        });
                    })
                    .catch(() => {
                        this.btn1Loading = false;
                        iziToast.error({
                            icon: 'ti-na',
                            title: 'Wow-wow,',
                            message: 'Something went wrong',
                        });
                    });
            },




            // func 2
            func2(){
                this.btn2Loading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/caches/config-clear',
                    method: 'GET',
                    data: {}
                }
                this.axios(options)
                    .then(() => {
                        this.btn2Loading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Config Cleared Successfully',
                        });
                    })
                    .catch(() => {
                        this.btn2Loading = false;
                        iziToast.error({
                            icon: 'ti-na',
                            title: 'Wow-wow,',
                            message: 'Something went wrong',
                        });
                    });
            },



            // func 3
            func3(){
                this.btn3Loading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/caches/view-clear',
                    method: 'GET',
                    data: {}
                }
                this.axios(options)
                    .then(() => {
                        this.btn3Loading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'View Cleared Successfully',
                        });
                    })
                    .catch(() => {
                        this.btn3Loading = false;
                        iziToast.error({
                            icon: 'ti-na',
                            title: 'Wow-wow,',
                            message: 'Something went wrong',
                        });
                    });
            },



            // func 4
            func4(){
                this.btn4Loading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/caches/route-cache',
                    method: 'GET',
                    data: {}
                }
                this.axios(options)
                    .then(() => {
                        this.btn4Loading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Route Cached Successfully',
                        });
                    })
                    .catch(() => {
                        this.btn4Loading = false;
                        iziToast.error({
                            icon: 'ti-na',
                            title: 'Wow-wow,',
                            message: 'Something went wrong',
                        });
                    });
            },




            // func 5
            func5(){
                this.btn5Loading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/caches/route-clear',
                    method: 'GET',
                    data: {}
                }
                this.axios(options)
                    .then(() => {
                        this.btn5Loading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Route Cleared Successfully',
                        });
                    })
                    .catch(() => {
                        this.btn5Loading = false;
                        iziToast.error({
                            icon: 'ti-na',
                            title: 'Wow-wow,',
                            message: 'Something went wrong',
                        });
                    });
            },

        },
    }
</script>
