<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Categories
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
                                <router-link :to="{ name: 'categories' }">Categories</router-link>
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

                    <!-- Card Meta -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabMeta" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Meta')"
                                        aria-expanded="false" 
                                        aria-controls="collapseMeta" 
                                        data-toggle="collapse"
                                        data-target="#collapseMeta">Meta
                                        <span id="iconToggleMeta" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseMeta" 
                                    class="collapse show" 
                                    aria-labelledby="TabMeta" 
                                    data-parent="#accordion">

                                <div class="col-12 pt-3">

                                    <!-- Meta title -->
                                    <div class="form-group">
                                        <div class="pull-right f12" 
                                            v-if="row.meta_title"
                                            v-text="(row.meta_title.length)">
                                        </div>
                                        <label for="inputMeta1">Meta title</label>
                                        <input class="form-control"
                                            id="inputMeta1"  
                                            type="text" 
                                            v-model="row.meta_title">
                                    </div>
                                    <!-- End Meta title -->
                                            
                                    <!-- Meta keywords -->
                                    <div class="form-group">
                                        <div class="pull-right f12"
                                            v-if="row.meta_keywords" 
                                            v-text="(row.meta_keywords.length)">
                                        </div>
                                        <label for="inputInput2">Meta keywords</label>
                                        <textarea class="form-control"
                                                id="inputInput2" 
                                                rows="5"  
                                                v-model="row.meta_keywords">
                                        </textarea>
                                    </div>
                                    <!-- End Meta keywords -->

                                    <!-- Meta description -->
                                    <div class="form-group">
                                        <div class="pull-right f12" 
                                            v-if="row.meta_description" 
                                            v-text="(row.meta_description.length)">
                                        </div>
                                        <label for="inputMeta3">Meta description</label>
                                        <textarea class="form-control" 
                                                id="inputMeta3" 
                                                rows="5" 
                                                v-model="row.meta_description">
                                        </textarea>
                                    </div>
                                    <!-- End Meta description -->

                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Meta -->


                    <!-- Card Category -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabCategory" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Category')"
                                        aria-expanded="false" 
                                        aria-controls="collapseCategory" 
                                        data-toggle="collapse"
                                        data-target="#collapseCategory">Category
                                        <span id="iconToggleCategory" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseCategory" 
                                    class="collapse" 
                                    aria-labelledby="TabCategory" 
                                    data-parent="#accordion">

                                <div class="col-12 pt-3">
                                    
                                    <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputRow1">Title</label>
                                        <input class="form-control" 
                                                id="inputRow1" 
                                                type="text" 
                                                v-model="row.title" 
                                                @keyup="onTitleChange">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Slug -->
                                    <div class="form-group">
                                        <label for="inputRow2">Slug</label>
                                        <input class="form-control text-lowercase"
                                                id="inputRow2"  
                                                type="text" 
                                                v-model="row.slug" 
                                                @keydown.space.prevent 
                                                @paste="onSlugPaste"
                                                @change="onSlugChange(false)">
                                    </div>
                                    <!-- End Slug -->

                                    <div class="col-12 row no-padding ui-ml-unset">
                                        <!-- Sort -->
                                        <div class="col-8 no-lpadding">
                                            <div class="form-group">
                                                <label for="inputRow3">Sort</label>
                                                <input class="form-control" 
                                                    id="inputRow3" 
                                                    type="number" 
                                                    min="0"
                                                    v-model.number="row.sort">
                                            </div>
                                        </div>
                                        <!-- End Sort -->

                                        <!-- Color -->
                                        <div class="col-4 no-rpadding">
                                            <div class="form-group">
                                                <label for="inputRow4">Color</label>
                                                <input class="form-control ui-h45" 
                                                        id="inputRow4" 
                                                        type="color"
                                                        v-model="row.color">
                                            </div>
                                        </div>
                                        <!-- End Color -->
                                    </div>

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputEditor1">Body</label>
                                        <editor
                                            id="inputEditor1"
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
                    <!-- End Card Category -->


                </div>
                <!-- ********* End Cards ********** -->


                <!-- ******* Navbar ******** -->
                <div class="col-md-4 mb-5">

                    <!-- Nav Destination -->
                    <div class="card">
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

                    <!-- Nav Image -->
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
                                                <img :src="row.image_preview" 
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
                    <!-- End Nav Image -->


                    <!-- Nav Icon -->
                    <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavIcon" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('Icon')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavIcon" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavIcon">Featued Icon
                                            <span id="iconToggleIcon" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavIcon" 
                                        class="collapse" 
                                        aria-labelledby="NavIcon" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Icon -->
                                            <div class="form-group">
                                                <label>Icon</label>
                                                <img :src="row.icon_preview" 
                                                    class="mb-2 custom-image">
                                                <input type="file" 
                                                    class="form-control" 
                                                    ref="myDropify" 
                                                    v-on:change="onIconChange">
                                            </div>
                                            <div class="form-group">
                                                <label>Icon alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.icon_alt">
                                            </div>
                                            <div class="form-group">
                                                <label>Icon title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.Icon_title">
                                            </div>
                                            <!-- End Icon -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Icon -->

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
                                <span v-if="!btnLoading"> Create Category</span>
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
        name: 'Create',
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
                    // meta
                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',

                    // row
                    slug: '',
                    title: '',
                    sort: 0,
                    color: '',
                    body: '',

                    // navbar
                    destination_id: '',
                    parent_id: '',

                    // image & icon
                    image_preview: '',
                    image_base64: '',
                    image_alt: '',
                    image_title: '',

                    icon_preview: '',
                    icon_base64: '',
                    icon_alt: '',
                    icon_title: '',

                    // status & visibility
                    status: 1,
                },
                editor: {
                    api_key: window.editor_apiKey,
                    menubar: window.editor_menubar,
                    plugins:[window.editor_plugins],
                    toolbar: window.editor_toolbar,
                },

                destinations: [],
                destinationLoading: true,

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

            this.fetchDestinations();
        },
        methods: {
            
            // Fetch Destinations
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


            // Add New
            addNew(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/categories',
                    method: 'POST',
                    data: {
                        // meta
                        meta_title: this.row.meta_title,
                        meta_keywords: this.row.meta_keywords,
                        meta_description: this.row.meta_description,

                        // row
                        title: this.row.title,
                        slug: this.row.slug,
                        sort: this.row.sort,
                        color: this.row.color,
                        body: this.row.body,

                        // navbar
                        destination_id: this.row.destination_id,
                        parent_id: this.row.parent_id,

                        // image & icon
                        image_base64: this.row.image_base64,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title,

                        icon_base64: this.row.icon_base64,
                        icon_alt: this.row.icon_alt,
                        icon_title: this.row.icon_title,

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
                            message: 'Item Added Successfully.',
                        });
                        this.$router.push({ name: 'categories' })
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
            onIconChange(e){
                const file = e.target.files[0];
                this.row.icon_preview = URL.createObjectURL(file);
                this.createBase64Icon(file);
            },
            createBase64Icon(fileObject){
                const reader = new FileReader();
                reader.readAsDataURL(fileObject);
                reader.onload = e =>{
                    this.row.icon_base64 = e.target.result;
                };
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
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
                    this.$router.push({ name: 'categories' });
                }
            },

        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
