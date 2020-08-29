<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">FAQs

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
                                <router-link :to="{ name: 'faqs' }">FAQs</router-link>
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


                        <!-- CardDest -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabPage" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Page')"
                                            aria-expanded="false" 
                                            aria-controls="collapsePage" 
                                            data-toggle="collapse"
                                            data-target="#collapsePage">FAQ
                                            <span id="iconTogglePage" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapsePage" 
                                        class="collapse show" 
                                        aria-labelledby="TabPage" 
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
                                        <label for="inputText2">Order</label>
                                        <input class="form-control text-lowercase"
                                                id="inputText2"  
                                                type="text" 
                                                v-model="row.order">
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
                                                height: 900,
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
                    <div class="card">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavDestination" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('NavDestination')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavDestination" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavDestination">Destination
                                        <span id="iconToggleNavDestination" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                            pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                
                                <div id="collapseNavDestination" 
                                    class="collapse" 
                                    aria-labelledby="NavDestination" 
                                    data-parent="#accordionNav">

                                    <div class="col-12 pt-3">
                                        
                                        <!-- Destination -->
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
                                                    <option v-for="(destination, index) in destinations" 
                                                            :key="index"
                                                            :value="destination.id">
                                                            {{ destination.title }}
                                                    </option>
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
                        <div class="card5 mt-5">
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
                                                    class="mb-2 custom-image">
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
                    view_in_home: 0,
                    status: 1,
                    preview: '',
                    image: '',
                    image_alt: '',
                    image_title: '',
                    
                    title: '',
                    body: '',
                    order: 0,

                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',
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
                destinationLoading: true,
                destinations: [],

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
                    url: window.baseURL+'/faqs/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;

                    this.row.status = res.data.row.status;
                    this.row.view_in_home = res.data.row.view_in_home;

                    this.row.destination_id = (res.data.row.destination) ? res.data.row.destination.id : null;

                    this.row.preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.age_title : null;
                        
                    this.row.title = res.data.row.title;
                    this.row.body = res.data.row.body;
                    this.row.order = res.data.row.order;

                    this.fetchDestinations();
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
                    url: window.baseURL+'/faqs/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        destination_id: this.row.destination_id,
                        status: this.row.status,
                        view_in_home: this.row.view_in_home,

                        image_url: this.row.image,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title,

                        title: this.row.title,
                        body: this.row.body,
                        order: this.row.order
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
                        this.$router.push({ name: 'faqs' })
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

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: 'faqs' });
                }
            },

        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
