<template>
    <div class="">
        <Header></Header>

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
                            <li class="breadcrumb-item text-capitalize">
                                <router-link :to="{ name: refs }">{{ refs }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Add New</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


        <form @submit.prevent="addNew" enctype="multipart/form-data" class="h-100">

            
            <!-- Content -->
            <div class="tab-content">
                <div class="row">        

                    <!-- ******* Cards ******** -->
                    <div class="col-md-8 mb-5">


                        <!-- Card Role -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabRole" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Role')"
                                            aria-expanded="false" 
                                            aria-controls="collapseRole" 
                                            data-toggle="collapse"
                                            data-target="#collapseRole">Role
                                            <span id="iconToggleRole" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseRole" 
                                        class="collapse show" 
                                        aria-labelledby="TabRole" 
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
                        <!-- End Card Role -->


                        <!-- Loading -->
                        <div class="col-12 text-center">
                            <div v-if="permissionLoading" class="form-group">
                                <div class="mt-5 mb-5 spinner-grow" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <!-- End Loading -->

                        <!-- Card Permissions -->
                        <div class="card mt-5" v-if="!permissionLoading">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Permissions')"
                                            aria-expanded="false" 
                                            aria-controls="collapsePermissions" 
                                            data-toggle="collapse"
                                            data-target="#collapsePermissions">Permissions
                                            <span id="iconTogglePermissions" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapsePermissions" 
                                        class="collapse" 
                                        aria-labelledby="collapsePermissions" 
                                        data-parent="#accordion">

                                        <!-- Permissions -->
                                        <div class="col-12 pt-3">
                                            <div class="form-group"
                                                v-for="(permission, index) in permissions"
                                                :key="index">
                                                <h4 class="mb-3 mt-5 ucfirst">{{ index }} </h4>
                                                <div class="row col-12 text-center">
                                                    <div v-for="(item, idx) in permission.length" 
                                                        :key="idx"
                                                        class="custom-control custom-switch col-3">
                                                        <input type="checkbox" 
                                                            class="custom-control-input" 
                                                            @change="isChecked($event, permission[idx].id)"
                                                            :id="permission[idx].id"
                                                            :value="permission[idx].id">
                                                        <label class="custom-control-label" 
                                                            :for="permission[idx].id">
                                                            {{ permission[idx].name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Permissions -->

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card Tenants -->
                    </div>
                    <!-- ******* End Cards ******** -->


                    <!-- ******* SideNavbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- NavStatus -->
                        <div class="card">
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

                    

                    <div class="col-md-12 row">
                        <div class="form-group mr-2">
                            <button class="btn btn-primary" :disabled="btnLoading">
                                <span v-if="btnLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true">
                                    </span>Loading...
                                </span>
                                <span v-if="!btnLoading" class="ti-check-box"></span>
                                <span v-if="!btnLoading"> Create {{ refs }}</span>
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

                    // navbar
                    authority: 1,
                    permissions_ids: [],

                    // status & visiblity
                    status: 1,
                },
                editor: {
                    api_key: window.editor_apiKey,
                    menubar: window.editor_menubar,
                    plugins:[window.editor_plugins],
                    toolbar: window.editor_toolbar,
                },

                permissions: [],
                permissionLoading: true,

                pgLoading: false,
                btnLoading: false,

                refs: 'roles',
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

            this.fetchPermissions();
        },
        methods: {
            

            // fetch Permissions
            fetchPermissions() {
                this.tenantLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/permissions',
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                .then(res => {
                    this.permissionLoading = false;
                    this.permissions = res.data.rows;
                })
                .catch(() => {})
                .finally(() => {});
            },


            // Add New
            addNew(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/'+this.refs,
                    method: 'POST',
                    data: {
                        // row
                        name: this.row.name,

                        // navbar
                        authority: this.row.authority,
                        permissions_ids: this.row.permissions_ids,

                        // status & visiblity
                        status: this.row.status,
                    }
                }
                this.axios(options, config)
                    .then(() => {
                        this.btnLoading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Item Added Successfully.',
                        });
                        this.$router.push({ name: this.refs })
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
                                message: err.response.data.message
                            });
                        }
                    })
                    .finally(() => {})
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
                    this.row.permissions_ids.push(id)
                } else {
                    this.row.permissions_ids.splice(this.row.permissions_ids.indexOf(id), 1)
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
