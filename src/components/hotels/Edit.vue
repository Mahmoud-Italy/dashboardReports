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


                <!-- ******* Cards ******* -->  
                <div class="col-md-8 mb-5">

                    <!-- Card Hotel -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabHotel" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Hotel')"
                                        aria-expanded="false" 
                                        aria-controls="collapseHotel" 
                                        data-toggle="collapse"
                                        data-target="#collapseHotel">Hotel
                                        <span id="iconToggleHotel" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseHotel" 
                                    class="collapse show" 
                                    aria-labelledby="TabHotel" 
                                    data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- Title -->
                                        <div class="form-group">
                                            <label for="inputText1">Title</label>
                                            <input class="form-control" 
                                                    id="inputText1" 
                                                    type="text" 
                                                    v-model="row.title" 
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
                                                    @change="onSlugChange(false)">
                                        </div>
                                        <!-- End Slug -->

                                        <!-- Link -->
                                        <div class="form-group">
                                            <label for="inputText3">Link</label>
                                            <input class="form-control"
                                                    id="inputText3"  
                                                    type="text" 
                                                    v-model="row.link">
                                        </div>
                                        <!-- End Link -->


                                        <div class="row">
                                            <!-- Sort -->
                                            <div class="form-group col-6">
                                                <label for="inputText4">Sort</label>
                                                <input class="form-control"
                                                        id="inputTex4"  
                                                        type="number"
                                                        min="0" 
                                                        max="5" 
                                                        v-model.number="row.sort">
                                            </div>
                                            <!-- End Stars -->

                                            <!-- Stars -->
                                            <div class="form-group col-6">
                                                <label for="inputText5">Stars</label>
                                                <input class="form-control"
                                                        id="inputTex5"  
                                                        type="number"
                                                        min="0" 
                                                        v-model.number="row.stars">
                                            </div>
                                            <!-- End Stars -->
                                        </div>
                                        

                                        <!-- Body -->
                                        <div class="form-group">
                                            <label for="inputEditor1">Body</label>
                                            <editor
                                                id="inputEditor1"
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
                    <!-- End Card Hotel -->

                </div>
                 <!-- ******* End Cards ******** -->


                <!-- ******* Navbar ******** -->
                <div class="col-md-4 mb-5">

                    <!-- Nav Image -->
                    <div class="card">
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
                                        <!-- End Image -->

                                        <!-- Image alt -->
                                        <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_alt">
                                        </div>
                                        <!-- End Image alt -->

                                        <!-- Image title -->
                                        <div class="form-group">
                                            <label>Image title</label>
                                            <input type="text" 
                                                class="form-control"
                                                v-model="row.image_title">
                                        </div>
                                        <!-- End Image title -->
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Image -->

                    <!-- Nav Status -->
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
                    <!-- End Nav Status -->

                </div>
                <!-- ******* End Navbar ******** -->


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
                                <span v-if="!btnLoading"> Update Hotel</span>
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
    import Editor from '@tinymce/tinymce-vue';
    import iziToast from 'izitoast';
    
    export default {
        name: 'Edit',
        components: {
            Header,
            Navigation,
            Editor,
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
                    link: '',
                    stars: '',
                    sort: 0,
                    title: '',
                    slug: '',
                    body: '',

                    // image
                    preview: '',
                    image_base: '',
                    image_alt: '',
                    image_title: '',

                    // status & visibility
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

                // Tenants
                tenant_id: 0,
                tenant_name: '',
                refs: 'hotels'
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

            // fetchRow
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
                    this.row.link = res.data.row.link;
                    this.row.stars = res.data.row.stars;
                    this.row.sort = res.data.row.sort;
                    this.row.title = res.data.row.title;
                    this.row.slug = res.data.row.slug;
                    this.row.body = res.data.row.body;

                    // image
                    this.row.preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_base64 = (res.data.row.image ) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.image_title : null;

                    // status & visibility
                    this.row.status= res.data.row.status;

                    this.fetchRegions();
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // editRow
            editRow(){
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
                        link: this.row.link,
                        stars: this.row.stars,
                        sort: this.row.sort,
                        title: this.row.title,
                        slug: this.row.slug,
                        body: this.row.body,

                        // image
                        image_base64: this.row.image_base64,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title,

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
                            message: 'Item Updated Successfully.',
                        });
                        this.$router.push({ name: this.refs });
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
                                message: (err.response) ? err.response.data.message : ''+err
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
            onSlugChange(str){
                if(!str) {
                   let str = this.row.slug;
                   this.row.slug = str.replace(/\s+/g, '-');
                } else {
                    this.row.slug = str.replace(/\s+/g, '-');
                }
            },

            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
                //this.row.image = file;
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
