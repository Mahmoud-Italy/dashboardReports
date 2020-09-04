<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Reviews

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
                                <router-link :to="{ name: 'reviews' }">Reviews</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Add New</li>
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
                        <div class="card">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabContent" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Content')"
                                            aria-expanded="false" 
                                            aria-controls="collapseContente" 
                                            data-toggle="collapse"
                                            data-target="#collapseContent">Review
                                            <span id="iconToggleContent" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseContent" 
                                        class="collapse show" 
                                        aria-labelledby="TabContent" 
                                        data-parent="#accordion">

                                <div class="col-12 pt-3">
                                    
                                

                                <div class="form-group col-12 row no-padding ui-ml-unset">

                                    <!-- Name -->
                                    <div class="form-group col-6 no-lpadding">
                                        <div class="form-group">
                                            <label for="input1">Name</label>
                                            <input class="form-control" 
                                                    id="input1" 
                                                    type="text" 
                                                    v-model="row.name">
                                        </div>
                                    </div>
                                    <!-- End Name -->

                                    <!-- Email Address -->
                                    <div class="form-group col-6 no-rpadding">
                                        <div class="form-group">
                                            <label for="inputText2">Email Address</label>
                                            <input class="form-control text-lowercase"
                                                    id="inputText2"  
                                                    type="text" 
                                                    v-model="row.email">
                                        </div>
                                    </div>
                                    <!-- End Email Address -->

                                    
                                        <!-- Stars -->
                                        <div class="col-4 no-lpadding">
                                            <div class="form-group">
                                                <label for="inputText2">Stars</label>
                                                <input class="form-control text-lowercase"
                                                        id="inputText2"  
                                                        type="text" 
                                                        v-model="row.stars">
                                            </div>
                                        </div>
                                        <!-- End Stars -->

                                        <!-- Review Numbers -->
                                        <div class="col-4">
                                            <div class="form-group">
                                                <label for="inputText2">Review Numbers</label>
                                                <input class="form-control text-lowercase"
                                                        id="inputText2"  
                                                        type="text" 
                                                        v-model="row.review_numbers">
                                            </div>
                                        </div>
                                        <!-- End Review Numbers -->

                                        <!-- Place -->
                                        <div class="col-4 no-rpadding">
                                            <div class="form-group">
                                                <label for="inputText2">Place</label>
                                                <input class="form-control text-lowercase"
                                                        id="inputText2"  
                                                        type="text" 
                                                        v-model="row.place">
                                            </div>
                                        </div>
                                        <!-- End Place -->

                                       
                                    </div>


                                     <!-- Slug -->
                                    <div class="form-group">
                                        <label for="inputText2">Title</label>
                                        <input class="form-control text-lowercase"
                                                id="inputText2"  
                                                type="text" 
                                                v-model="row.title">
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
                                                height: 300,
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

                        <!-- NavTwo -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavDestinations" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('Destinations')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavDestinations" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavDestinations">Destinations
                                            <span id="iconToggleDestinations" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavDestinationse" 
                                        class="collapse" 
                                        aria-labelledby="NavDestinations" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Destination -->
                                            <div class="form-group">
                                                <div v-if="destinationLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" aria-hidden="true">
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
                        <!-- End NavTwo -->

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
                                                <img v-if="row.image_preview" 
                                                    :src="row.image_preview" 
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
                                            <!-- End Status -->

                                            <!-- Status -->
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
                                <span v-if="!btnLoading"> Update Review</span>
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
                    name: '',
                    starts: '',
                    review_numbers: '',
                    place: '',
                    email: '',
                    title: '',
                    body: '',
                    sort: 1,

                    // navbar
                    destination_id: '',

                    // image
                    image_preview: '',
                    image_base64: '',
                    image_alt: '',
                    image_title: '',

                    // status & visiblity
                    status: 1,
                    view_in_home: 0,
                },
                editor: {
                    api_key: window.editor_apiKey,
                    menubar: window.editor_menubar,
                    plugins:[window.editor_plugins],
                    toolbar: window.editor_toolbar,
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
            
            

            // fetch Row
            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/reviews/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;
                    // row
                    this.row.name = res.data.row.name;
                    this.row.email = res.data.row.email;
                    this.row.stars = res.data.row.stars;
                    this.row.review_numbers = res.data.row.review_numbers;
                    this.row.place = res.data.row.place;
                    this.row.title = res.data.row.title;
                    this.row.body = res.data.row.body;

                    // navbar
                    this.row.destination_id = res.data.row.destination.id;

                    // image
                    this.row.image_preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_base64 = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.imgage_title : null;

                    // status & visiblity
                    this.row.status = res.data.row.status;
                    this.row.view_in_home = res.data.row.view_in_home;

                    this.fetchDestinations(); // call next func
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            fetchDestinations() {
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
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/reviews/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        // row
                        name: this.row.name,
                        email: this.row.email,
                        title: this.row.title,
                        body: this.row.body,
                        sort: this.row.sort,

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
                            message: 'Item Updated Successfully.',
                        });
                        this.$router.push({ name: 'reviews' })
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
                this.onSlugChange(this.row.title);
            },

            // on Paste
            onSlugPaste(){
                let str = this.row.slug;
                this.onSlugChange(str);
            },
            onSlugChange(str=''){
                if(!str) {
                    str = this.row.slug;
                }
                this.row.slug = str.replace(/\s+/g, '-');
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
                    this.$router.push({ name: 'reviews' });
                }
            },

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
