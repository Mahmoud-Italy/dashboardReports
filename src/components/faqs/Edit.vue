<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize">{{ refs }}

                        <!-- Tenants -->
                        <div class="pull-right ui-mt-15">
                            <span class="btn btn-dark btn-sm">
                                <span class="btn-icon ti-home mr-2"></span>
                                <span> {{ tenant_name }} </span>
                            </span>
                        </div>
                        <!-- End Tenants -->

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
                    <div class="col-md-8 mb-5">


                        <!-- CardDest -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="Tabfaq" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('faq')"
                                            aria-expanded="false" 
                                            aria-controls="collapsefaq" 
                                            data-toggle="collapse"
                                            data-target="#collapsefaq">FAQ
                                            <span id="iconTogglefaq" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapsefaq" 
                                        class="collapse show" 
                                        aria-labelledby="Tabfaq" 
                                        data-parent="#accordion">

                                <div class="col-12 pt-3">
                                    
                                    <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputText1">Title</label>
                                        <input class="form-control" 
                                                id="inputText1" 
                                                type="text" 
                                                v-model="row.title">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Slug -->
                                    <div class="form-group">
                                        <label for="inputText2">Sort</label>
                                        <input class="form-control"
                                                id="inputText2"  
                                                type="number"
                                                min="0" 
                                                v-model.number="row.sort">
                                    </div>
                                    <!-- End Slug -->


                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputText3">Body</label>
                                        <editor
                                            id="inputText3"
                                            v-model="row.body"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 600,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Body -->

                                </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End CardDest -->


                </div>





                    <!-- ******* SideNavbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- Nav Destination -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavDestination" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Destination')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavDestination" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavDestination">Destination
                                            <span id="iconToggleDestination" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavDestination" 
                                        class="collapse" 
                                        aria-labelledby="NavDestination" 
                                        data-parent="#accordionNav">
                                        
                                    <div class="col-12 pt-3">
                                        <!-- Destinations -->
                                        <div class="form-group">
                                            <div v-if="destinationLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <select class="form-control custom-select"
                                                    v-if="!destinationLoading" 
                                                    v-model="row.destination_id">
                                                    <option value="">Select Destination</option>
                                                    <optgroup v-for="(region, index) in destinations" 
                                                            :key="index"
                                                            :label="region.title">
                                                        <option v-for="(destination,idx) in region.destinations"
                                                            :key="idx"
                                                            :value="destination.id">
                                                            {{ destination.title }}
                                                        </option>
                                                    </optgroup>
                                            </select>
                                        </div>
                                        <!-- End Destination -->
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Destination -->

                        <!-- NavTwo -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavImage" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('Image')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavImage" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavImage">Featued Image
                                            <span id="iconToggleImage" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavImage" 
                                        class="collapse" 
                                        aria-labelledby="NavImage" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Image -->
                                            <div class="form-group">
                                                <label>Image</label>
                                                <img v-if="row.preview" 
                                                    :src="row.preview" 
                                                    class="mb-2 custom-image">
                                                <input type="file" 
                                                    class="form-control" 
                                                    ref="myDropify" 
                                                    v-on:change="onImageChange"
                                                    accept="image/*">
                                            </div>
                                            <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_alt">
                                            </div>
                                            <div class="form-group">
                                                <label>Image title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_title">
                                            </div>
                                            <!-- Image -->
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

                                            <!-- View Home -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch2" 
                                                        :checked="row.view_in_home"
                                                        @click="onHome">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch2"
                                                        v-html="(row.view_in_home) 
                                                            ? 'View In Home' : 'Hide In Home'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Home -->
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
                                <span v-if="!btnLoading"> Update FAQ</span>
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
    import Editor from '@tinymce/tinymce-vue';
    import iziToast from 'izitoast';
    
    export default {
        name: 'Edit',
        components: {
            Header,
            Navigation,
            Footer,
            Editor
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
                    title: '',
                    sort: 0,
                    body: '',

                    // navbar
                    destination_id: '',

                    // image
                    preview: '',
                    image_base64: '',
                    image_alt: '',
                    image_title: '',

                    // status & visibility
                    status: 1,
                    view_in_home: 0,
                },
                editor: {
                    api_key: window.editor_apiKey,
                    menubar: window.editor_menubar,
                    plugins:[window.editor_plugins],
                    toolbar: window.editor_toolbar,
                },
                // destination
                destinations: [],
                destinationLoading: true,

                pgLoading: true,
                btnLoading: false,

                // Tenants
                tenant_id: 0,
                tenant_name: '',
                refs: 'faqs'
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

            // Tenants
            if(localStorage.getItem('tenant_id')) {
                this.tenant_id = localStorage.getItem('tenant_id');
            }
            if(localStorage.getItem('tenant_name')) {
                this.tenant_name = localStorage.getItem('tenant_name');
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
                    this.row.title = res.data.row.title;
                    this.row.sort = res.data.row.sort;
                    this.row.body = res.data.row.body;
                    
                    // navbar
                    this.row.destination_id = (res.data.row.destination) ? res.data.row.destination.id : null;

                    // image
                    this.row.preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_base64 = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.image_title : null;

                    // status & visibility
                    this.row.status = res.data.row.status;
                    this.row.view_in_home = res.data.row.view_in_home;

                    this.fetchDestinations(); // call next func
                    })
                    .catch(() => {})
                    .finally(() => {});
            },
            
            // fetch Destinations
            fetchDestinations(){
                this.destinationLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/regions',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.destinationLoading = false;
                        this.destinations = res.data.rows;
                    })
                    .catch(() => {})
                    .finally(() => {});
            },



            // edit Row
            editRow(){
                if(this.tenant_id == 0) {
                    
                    iziToast.warning({
                        icon: 'ti-alert',
                        title: 'Wow-man,',
                        message: 'No tenany selected.'
                    });

                } else {
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
                            tenant_id: this.tenant_id,
                            // row
                            title: this.row.title,
                            sort: this.row.sort,
                            body: this.row.body,

                            // navbar
                            destination_id: this.row.destination_id,

                            // image
                            image_base64: this.row.image_base64,
                            image_alt: this.row.image_alt,
                            image_title: this.row.image_title,

                            // status & visibility
                            status: this.row.status,
                            view_in_home: this.row.view_in_home,
                        }
                    }
                    this.axios(options, config)
                        .then(() => {
                            this.btnLoading = false;
                            iziToast.success({
                                icon: 'ti-check',
                                title: 'Great job,',
                                message: 'Item Udpated Successfully.',
                            });
                            this.$router.push({ name: this.refs });
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
                }
            },



            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
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
            onHome(){
                if(this.row.view_in_home)
                    this.row.view_in_home = 0;
                else
                    this.row.view_in_home = 1;
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
