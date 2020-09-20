<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize"> {{ refs }}
                        
                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item text-capitalize">
                                <router-link :to="{ name: refs }">{{ refs }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->

            <div v-if="pgLoading" class="row h-100">
                <div class="container text-center">
                    <div class="spinner-grow mt-5" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>

            <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">        

                    <!-- ******* Cards ******** -->
                    <div class="col-md-8 mb-5">

                        <!-- Card Tenant -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabTenant" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Tenant')"
                                            aria-expanded="false" 
                                            aria-controls="collapseTenant" 
                                            data-toggle="collapse"
                                            data-target="#collapseTenant">Tenant
                                            <span id="iconToggleTenant" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseTenant" 
                                        class="collapse show" 
                                        aria-labelledby="TabTenant" 
                                        data-parent="#accordion">

                                        <div class="col-12 pt-3">

                                            <!-- Name -->
                                            <div class="form-group">
                                                <label for="input1">Name</label>
                                                <input class="form-control"
                                                        id="input1"  
                                                        type="text" 
                                                        v-model="row.name">
                                            </div>
                                            <!-- End Name -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card Tenant -->

                        <!-- Card Applications -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabApplications" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Applications')"
                                            aria-expanded="false" 
                                            aria-controls="collapseApplications" 
                                            data-toggle="collapse"
                                            data-target="#collapseApplications">Applications
                                            <span id="iconToggleApplications" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseApplications" 
                                        class="collapse" 
                                        aria-labelledby="TabApplications" 
                                        data-parent="#accordion">

                                        <!-- Loading -->
                                        <div class="col-12 pt-3 text-center">
                                            <div v-if="applicationsLoading" class="form-group">
                                                <div class="mt-5 mb-5 spinner-grow" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Loading -->

                                        <!-- Applications -->
                                        <div v-if="!applicationsLoading" class="row col-12 pt-3 ui-ml10">
                                            <div class="form-group custom-switch col-4 mt-3"
                                                v-for="(application, index) in applications"
                                                :key="index">
                                                <input type="checkbox" 
                                                    class="custom-control-input" 
                                                    @change="isChecked($event, application.id)"
                                                    :id="application.id"
                                                    :value="application.id"
                                                    :checked="(row.applications_ids.indexOf(application.id) !== -1) ? true : ''">
                                                <label class="custom-control-label" 
                                                    :for="application.id">
                                                    {{ application.name }}
                                                </label>
                                            </div>
                                        </div>
                                        <!-- End Applications -->
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card Applications -->

                    </div>
                    <!-- ******* End Cards ******** -->


                    <!-- ******* SideNavbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- NavDomain -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavDomain" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Domain')"
                                            aria-expanded="false" 
                                            aria-controls="collapseNavDomain" 
                                            data-toggle="collapse"
                                            data-target="#collapseNavDomain">Domain
                                            <span id="iconToggleDomain" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavDomain" 
                                        class="collapse" 
                                        aria-labelledby="NavDomain" 
                                        data-parent="#accordionNav">

                                        <div class="col-12 pt-3">

                                            <!-- Domains -->
                                            <div class="form-group">
                                                <input type="text" 
                                                        class="form-control"
                                                        v-model="row.domain">
                                            </div>
                                            <!-- End Domains -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavDomains -->

                        <!-- NavStatus -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavStatus" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Status')"
                                            aria-expanded="false" 
                                            aria-controls="collapseNavStatus" 
                                            data-toggle="collapse"
                                            data-target="#collapseNavStatus">Status & Visibility
                                            <span id="iconToggleStatus" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavStatus" 
                                        class="collapse" 
                                        aria-labelledby="NavStatus" 
                                        data-parent="#accordionNav">

                                        <div class="col-12 pt-3">

                                            <!-- Status -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch1" 
                                                        :checked="row.status"
                                                        @click="onStatus">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch1"
                                                        v-html="(row.status) ? 'Active' : 'Inactive'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Status -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavStatus -->

                    </div>
                    <!-- ******* End SideNavbar ******** -->

                </div>
            </div>
            <!-- End Content -->

                    
                    <!-- Button -->
                    <div class="col-md-12 row">
                        <div class="form-group mr-2">
                            <button class="btn btn-primary" :disabled="btnLoading">
                                <span v-if="btnLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" aria-hidden="true">
                                    </span>Loading...
                                </span>
                                <span v-if="!btnLoading" class="ti-check-box"></span>
                                <span v-if="!btnLoading" class="text-capitalize"> Update {{ refs }}</span>
                            </button>
                        </div>

                        <div class="form-group">
                            <button type="button" class="btn btn-danger" 
                                :disabled="btnLoading" 
                                @click="cancel">
                                <span class="ti-close"></span>
                                <span> Cancel </span>
                            </button>
                        </div>
                    </div>
                    <!-- End Button -->


            </form>
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
        name: 'Create',
        components: {
            Header,
            Navigation,
            Footer
        },
        data(){
            return {
                //
                auth: {
                    role: '',
                    access_token: '',
                },
                row: {
                    // row
                    name: '',

                    // apps
                    applications_ids: [],

                    // domain
                    domain: [],

                    // status & visiblity
                    status: 1,                    
                },
                editor: {
                    api_key: window.editor_apiKey,
                    menubar: window.editor_menubar,
                    plugins:[window.editor_plugins],
                    toolbar: window.editor_toolbar,
                },

                pgLoading: true,
                btnLoading: false,

                applications: [],
                applicationsLoading: true,

                refs: 'tenants',
            }
        },
        mounted() {},
        computed: {},
        created() {
            // AccessToken & Role
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }

            this.fetchRow();
        },
        methods: {

            // fetch Row
            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/'+this.refs+'/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;

                    // row
                    this.row.name = res.data.row.name;
                    
                    // apps
                    this.row.applications_ids = res.data.row.applications_ids;

                    //this.isChecked('', 1);

                    // domain
                    this.row.domain = res.data.row.domains.domain;

                    // status & visiblity
                    this.row.status = res.data.row.status; 

                        this.fetchApplications(); // call func
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // fetch Applications
            fetchApplications() {
                this.applicationsLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/applications',
                    method: 'GET',
                    data: {},
                    params: {
                        status: true,
                        paginate: 100
                    },
                }
                this.axios(options)
                .then(res => {
                    this.applicationsLoading = false;
                    this.applications = res.data.rows;
                })
                .catch(() => {})
                .finally(() => {});
            },

            // edit Row
            editRow() {
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/'+this.refs+'/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        // row
                        name: this.row.name,

                        // applications ids
                        applications_ids: this.row.applications_ids,

                        // domain
                        domain: this.row.domain,

                        // status & visibility
                        status: this.row.status,
                    }
                }
                this.axios(options, config)
                    .then(() => {
                        this.btnLoading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Item Updated Successfully.',
                        });
                        this.$router.push({ name: this.refs })
                    })
                    .catch(err => {
                        // 403 Forbidden
                        if(err.response && err.response.status == 403) {
                            this.removeLocalStorage();
                            this.$router.push({ name: 'forbidden' });
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

            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.image_preview = URL.createObjectURL(file);
                this.createBase64Image(file);
            },
            createBase64Image(fileObject){
                const reader = new FileReader();
                reader.readAsDataURL(fileObject);
                reader.onload = e =>{
                    this.row.image_base64 = e.target.result;
                };
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
            },

            // get id from Box Checked
            isChecked($event, id){
                if($event.target.checked) {
                    this.row.applications_ids.push(id)
                } else {
                    this.row.applications_ids.splice(this.row.applications_ids.indexOf(id), 1)
                }
            },

            // remove sessions
            removeLocalStorage() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_image');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
                localStorage.removeItem('tenant_id');
            },

            // toggleCollapse
            collapseToggle(div) {
                let el = document.querySelector("span#iconToggle"+div);
                if(el.classList.contains('ti-angle-down')) {
                    el.classList.remove('ti-angle-down');
                    el.classList.add('ti-angle-up');
                } else {
                    el.classList.remove('ti-angle-up');
                    el.classList.add('ti-angle-down');
                }
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: this.refs });
                }
            },

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
