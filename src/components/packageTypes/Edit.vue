<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Package Types

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
                                <router-link :to="{ name: 'packageTypes' }">Package Types</router-link>
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

                         <!-- Card packageType -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabType" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Type')"
                                            aria-expanded="false" 
                                            aria-controls="collapseMeta" 
                                            data-toggle="collapse"
                                            data-target="#collapseType">Package Type
                                            <span id="iconToggleType" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseType" 
                                        class="collapse show" 
                                        aria-labelledby="TabType" 
                                        data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- Title -->
                                        <div class="form-group">
                                            <label for="inputText1">Name</label>
                                            <input class="form-control" 
                                                    id="inputText1" 
                                                    type="text" 
                                                    v-model="row.name" 
                                                    @keyup="onTitleChange">
                                        </div>
                                        <!-- End Title -->

                                        <!-- Slug -->
                                        <div class="form-group">
                                            <label for="inputText2">Slug</label>
                                            <input class="form-control text-lowercase"
                                                    id="inputText2"  
                                                    type="text" 
                                                    v-model="row.slug" 
                                                    @keydown.space.prevent 
                                                    @paste="onSlugPaste"
                                                    @change="onSlugChange">
                                        </div>
                                        <!-- End Slug -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card packageType -->

                </div>





                    <!-- ******* SideNavbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- Nav Category -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavCategory" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Category')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavCategory" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavCategory">Parent
                                            <span id="iconToggleCategory" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavCategory" 
                                        class="collapse" 
                                        aria-labelledby="NavCategory" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Category -->
                                            <div class="form-group">
                                                <div v-if="parentLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <select class="form-control custom-select"
                                                    v-if="!parentLoading" 
                                                    v-model="row.parent_id">
                                                    <option value="">Select Parent</option>
                                                    <option value="">No Parent</option>
                                                    <option v-for="(parent, index) in parents" 
                                                            :key="index"
                                                            :value="parent.id">
                                                            {{ parent.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- End Region -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavOne -->
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
                                                <img :src="row.preview" 
                                                    class="mb-2 h200 custom-image">
                                                <input type="file" 
                                                    class="form-control" 
                                                    ref="myDropify" 
                                                    v-on:change="onImageChange">
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
                                            <!-- Status -->

                                            <!-- Header -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch2" 
                                                        :checked="row.view_in_header"
                                                        @click="onHeader">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch2"
                                                        v-html="(row.view_in_header) 
                                                            ? 'View In Header' 
                                                            : 'Hide In Header'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Header -->

                                            <!-- Footer -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch3" 
                                                        :checked="row.view_in_footer"
                                                        @click="onFooter">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch3"
                                                        v-html="(row.view_in_footer) 
                                                            ? 'View In Footer' 
                                                            : 'Hide In Footer'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Footer -->
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
                                <span v-if="!btnLoading"> Update Package Type</span>
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
                    parent_id: '',
                    status: 1,
                    view_in_header: 0,
                    view_in_footer: 0,

                    preview: '',
                    image: '',
                    image_alt: '',
                    image_title: '',
                    
                    slug: '',
                    name: '',

                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',
                },
                parnets: [],
                parentLoading: true,

                pgLoading: true,
                btnLoading: false,
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
                    url: window.baseURL+'/packageTypes/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;

                    this.row.parent_id = (res.data.row.parent) ? res.data.row.parent.id : null;
                    this.row.status = res.data.row.status;
                    this.row.view_in_header = res.data.row.view_in_header;
                    this.row.view_in_footer = res.data.row.view_in_footer;

                    this.row.preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.age_title : null;
                        
                    this.row.slug = res.data.row.slug;
                    this.row.name = res.data.row.name;

                this.row.meta_title = (res.data.row.meta) ? res.data.row.meta.meta_title : null;
                this.row.meta_keywords = (res.data.row.meta) ? res.data.row.meta.meta_keywords : null;
                this.row.meta_description = (res.data.row.meta) ? res.data.row.meta.meta_description : null;

                    this.fetchParents();
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

             // Fetch fetchParents
            fetchParents(){
                this.parentLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/packageTypes',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        parent_id: false,
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.parentLoading = false;
                        this.parents = res.data.rows;
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
                this.row.image = file;
            },


            // Add New
            editRow(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/packageTypes/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        parent_id: this.row.parent_id,
                        status: this.row.status,
                        view_in_header: this.row.view_in_header,
                        view_in_footer: this.row.view_in_footer,

                        name: this.row.name,
                        slug: this.row.slug,
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
                        this.$router.push({ name: 'packageTypes' })
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

            // Title
            onTitleChange() {
                this.onSlugChange(this.row.name);
            },

            // on Paste
            onSlugPaste(){
                let str = this.row.slug;
                this.onSlugChange(str);
            },
            onSlugChange(str){
                this.row.slug = str.replace(/\s+/g, '-');
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
            },
             // active view_in_header
            onHeader(){
                if(this.row.view_in_header)
                    this.row.view_in_header = 0;
                else
                    this.row.view_in_header = 1;
            },
             // active view_in_footer
            onFooter(){
                if(this.row.view_in_footer)
                    this.row.view_in_footer = 0;
                else
                    this.row.view_in_footer = 1;
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: 'packageTypes' });
                }
            },

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
