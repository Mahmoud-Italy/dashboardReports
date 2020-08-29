<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Roles

                        <!-- Role -->
                        <div class="pull-rights ui-mt-15 pull-right ">
                            <div class="dropdown">
                                <span class="badge badge-md badge-pill badge-secondary-soft">
                                    {{ auth.role }}
                                </span>
                            </div>
                        </div>
                        <!-- End Role -->

                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'roles' }">Roles</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


        <div v-if="pgLoading" class="row h-100">
            <div class="container text-center">
                <p><br/></p>
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <p><br/></p>
            </div>
        </div>

        <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">        
                    <div class="col-md-8 mb-5">


                    <!-- Card Content -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabContent" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Content')"
                                            aria-expanded="false" 
                                            aria-controls="collapseContent" 
                                            data-toggle="collapse"
                                            data-target="#collapseContent">Content
                                            <span id="iconToggleContent" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseContent" 
                                        class="collapse show" 
                                        aria-labelledby="TabContent" 
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
                    <!-- End Card Content -->

                    <!-- Card Permissions -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabPermissions" class="card-header">
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
                                        aria-labelledby="TabPermissions" 
                                        data-parent="#accordion">

                                    <!-- Loading -->
                                    <div class="col-12 pt-3 text-center">
                                        <div v-if="permissionLoading" class="form-group">
                                            <div class="mt-5 mb-5 spinner-grow" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- End Loading -->

                                    <!-- Permissions -->
                                    <div v-if="!permissionLoading" class="col-12 pt-3">
                                        <div class="form-group"
                                            v-for="(permission, index) in permissions"
                                            :key="index">
                                            <h4 class="mt-5 mb-3">{{ permission[0].parent }}</h4>
                                            <div class="row col-12 text-center">
                                                <div v-for="(item, idx) in permission.length" 
                                                    :key="idx"
                                                    class="custom-control custom-switch col-3">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        @change="isChecked($event, permission[idx].id)"
                                                        :id="permission[idx].id"
                                                        :value="permission[idx].id"
                                                        :checked="(row.permissions_ids.indexOf(permission[idx].id) !== -1) ? true : ''">
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
                    <!-- End Card Permissions -->

                </div>



                    <!-- ******* SideNavbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- NavOne -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavAuthority" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('Authority')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavAuthority" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavAuthority">Authority
                                            <span id="iconToggleAuthority" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavAuthority" 
                                        class="collapse" 
                                        aria-labelledby="NavAuthority" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">

                                        <!-- Authority -->
                                        <div class="form-group">
                                            <select class="form-control custom-select"
                                                v-model="row.authority">
                                                <option value="">Select Authority</option>
                                                <option value="1">High Authority</option>
                                                <option value="0">Low Authority</option>
                                            </select>
                                        </div>
                                        <!-- Authority -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavTwo -->


                        <!-- NavThree -->
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
                        <!-- End NavThree -->

                        </div>

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
                                <span v-if="!btnLoading"> Update Role</span>
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
        name: 'Edit',
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
                    authority: 1,
                    status: true,
                    name: '',
                    permissions_ids: [],
                },
                editor: {
                    api_key: 'xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b',
                    menubar: 'file edit view insert format tools table tc help',
                    plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                              alignleft aligncenter alignright alignjustify | \
                              bullist numlist outdent indent | removeformat | help',
                },
                permissions: [],
                permissionLoading: true,
                btnLoading: false,
                pgLoading: true,
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

            // fetch Row
            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/roles/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                .then(res => {
                this.pgLoading = false;

                this.row.status = res.data.row.status;
                this.row.name = res.data.row.name;
                this.row.authority = res.data.row.authority;
                this.row.permissions_ids = res.data.permissions_ids;
                this.fetchPermissions();
                })
                .catch(() => {})
                .finally(() => {});
            },


            // fetchPermission
            fetchPermissions() {
                this.permissionLoading = true;
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


            // edtiRow
            editRow(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/roles/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        name: this.row.name,
                        status: this.row.status,
                        authority: this.row.authority,
                        permissions_ids: this.row.permissions_ids
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
                        this.$router.push({ name: 'roles' })
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

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = false;
                else
                    this.row.status = true;
            },

            // get id from Box Checked
            isChecked($event, id){
                if($event.target.checked) {
                    this.row.permissions_ids.push(id)
                } else {
                    this.row.permissions_ids.splice(this.row.permissions_ids.indexOf(id), 1)
                }
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: 'roles' });
                }
            },

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
