<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Wikis

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
                                <router-link :to="{ name: 'wikis' }">Wikis</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Add New</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->

            <form @submit.prevent="addNew" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">        


                <!-- ******* Card ******** -->
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
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                            pull-right black">
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
                                            <label for="inputMeta2">Meta keywords</label>
                                            <textarea class="form-control"
                                                    id="inputMeta2" 
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

                    <!-- Card Wiki -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabWiki" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Wiki')"
                                        aria-expanded="false" 
                                        aria-controls="collapseWiki" 
                                        data-toggle="collapse"
                                        data-target="#collapseWiki">Wiki
                                        <span id="iconToggleWiki" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseWiki" 
                                    class="collapse" 
                                    aria-labelledby="TabWiki" 
                                    data-parent="#accordion">

                                <div class="col-12 pt-3">
                                    
                                     <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputWiki1">Title</label>
                                        <input class="form-control" 
                                                id="inputWiki1" 
                                                type="text" 
                                                v-model="row.title" 
                                                @keyup="onTitleChange">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Slug -->
                                    <div class="form-group">
                                        <label for="inputWiki2">Slug</label>
                                        <input class="form-control text-lowercase"
                                                id="inputWiki2"  
                                                type="text" 
                                                v-model="row.slug" 
                                                @keydown.space.prevent 
                                                @paste="onSlugPaste"
                                                @change="onSlugChange(false)">
                                    </div>
                                    <!-- End Slug -->

                                    <!-- Short Body -->
                                    <div class="form-group">
                                        <label for="inputWiki3">Short body</label>
                                        <editor
                                            id="inputWiki3"
                                            v-model="row.short_body"
                                           :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Short Body -->

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputWiki4">Body</label>
                                        <editor
                                            id="inputWiki4"
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
                    <!-- End Card Wiki -->


                    <!-- Card Wiki Items -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabItems" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Items')"
                                        aria-expanded="false" 
                                        aria-controls="collapseItems" 
                                        data-toggle="collapse"
                                        data-target="#collapseItems">Items
                                        <span id="iconToggleItems" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseItems" 
                                    class="collapse" 
                                    aria-labelledby="TabItems" 
                                    data-parent="#accordion">

                                <div class="col-12 pt-3">
                                
                                <!-- For Loop -->
                                <div v-for="i in 10" 
                                    :key="i" 
                                    :ref="'frm_'+i" 
                                    :class="(i != 1) ? 'hidden' : '' " 
                                    :id="'frm_'+i">

                                    <!-- Remove -->
                                    <div class="pull-right ui-mt-10">
                                        <button v-if="i != 1"
                                            type="button" 
                                            class="btn btn-danger btn-circle btn-with-icon btn-sm" 
                                            @click="removeOption(i)">
                                            <span class="btn-icon ti-close font-bold"></span>
                                        </button>
                                    </div>
                                    <!-- End Remove -->

                                    <!-- Title -->
                                    <div class="form-group">
                                        <label :for="'inputItems'+i">Title</label>
                                        <input class="form-control" 
                                                :id="'inputItems'+i" 
                                                type="text" 
                                                v-model="row.items_title[i]">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Order -->
                                    <div class="form-group">
                                        <label :id="'inputItems'+i" >Order</label>
                                        <input class="form-control" 
                                                :id="'inputItems'+i" 
                                                type="number" 
                                                v-model.number="row.items_order[i]">
                                    </div>
                                    <!-- End Order -->

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label :for="'editorItems'+i">Body</label>
                                        <editor
                                            :id="'editorItems'+i"
                                            v-model="row.items_body[i]"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Short Body -->

                                    <!-- image alt -->
                                    <div class="form-group">
                                        <label :for="'inputImageAlt'+i">Image alt</label>
                                        <input class="form-control" 
                                                :id="'inputImageAlt'+i" 
                                                type="text" 
                                                v-model="row.items_image_alt[i]">
                                    </div>
                                    <!-- End image alt -->

                                    <!-- image title -->
                                    <div class="form-group">
                                        <label :for="'inputImageTitle'+i">Image title</label>
                                        <input class="form-control" 
                                                :id="'inputImageTitle'+i" 
                                                type="text" 
                                                v-model="row.items_image_title[i]">
                                    </div>
                                    <!-- End image title -->

                                    <!-- image -->
                                    <div class="form-group">
                                        <label :for="'inputImage'+i">Image</label>
                                        <img v-if="row.items_preview[i]" 
                                            :src="row.items_preview[i]">
                                        <input class="form-control" 
                                                :id="'inputImage'+i" 
                                                type="file">
                                    </div>
                                    <!-- End image -->
                                    
                                    <!-- Button -->
                                    <div class="row pull-right ui-mt15" :ref="'btn_'+i" :id="'btn_'+i">
                                        <button type="button" 
                                            class="btn btn-dark btn-circle btn-with-icon"
                                            @click="opnFrm(i+1)">
                                            <span class="btn-icon ti-plus font-bold"></span>
                                        </button>
                                    </div>
                                    <!-- End Button -->

                                    <div class="form-group">
                                        <br/><hr><br/>
                                    </div>
                                </div>
                                <!-- End Loop -->

                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                    <!-- End Card Items -->


                </div>
                <!-- ******* End Card ******** -->


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

                    <!-- Nav Packages -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavPackages" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('NavPackages')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavPackages" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavPackages">Related Packages
                                        <span id="iconToggleNavPackages" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                            pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavPackages" 
                                    class="collapse" 
                                    aria-labelledby="NavPackages" 
                                    data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        
                                        <!-- Packages -->
                                        <div class="form-group">
                                                <div v-if="packageLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <multiselect v-if="!packageLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="packagesValue" 
                                                    :options="packagesOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search packages"
                                                    :preselect-first="true">
                                                </multiselect>
                                            </div>
                                        <!-- End Packages -->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Packages -->

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
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                            pull-right black">
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
                                                class="mb-2 h200 custom-image">
                                            <input type="file" 
                                                class="form-control" 
                                                ref="myDropify" 
                                                v-on:change="onImageChange">
                                        </div>
                                        <!-- End Image -->

                                        <!-- Image Alt -->
                                        <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_alt">
                                        </div>
                                        <!-- End Image Alt -->

                                        <!-- Image Title -->
                                        <div class="form-group">
                                                <label>Image title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_title">
                                        </div>
                                        <!-- End Image Title -->
                                        
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
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                            pull-right black">
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

                                        <!-- View in home -->
                                        <div class="form-group">
                                            <div class="custom-control custom-switch mb-2">
                                                <input type="checkbox" 
                                                    class="custom-control-input" 
                                                    id="customSwitch2" 
                                                    :checked="row.view_in_home"
                                                    @click="onViewInHome">
                                                <label class="custom-control-label" 
                                                    for="customSwitch2"
                                                    v-html="(row.view_in_home) 
                                                        ? 'Show In Home' 
                                                        : 'Hide In Home'">
                                                </label>
                                            </div>
                                        </div>
                                        <!-- End View in home -->
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Status -->

                </div>
                <!-- ******* SideNavbar ******** -->


                </div>
            </div>
            <!-- End Content -->


                <!-- Buttons -->
                <div class="col-md-12 row">
                    <div class="form-group mr-2">
                        <button class="btn btn-primary" :disabled="btnLoading">
                            <span v-if="btnLoading">
                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                    role="status" aria-hidden="true">
                                </span>Loading...
                            </span>
                            <span v-if="!btnLoading" class="ti-check-box"></span>
                            <span v-if="!btnLoading"> Create Wiki</span>
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
                <!-- End Buttons -->


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
    import Multiselect from 'vue-multiselect';
    import iziToast from 'izitoast';
    
    export default {
        name: 'Create',
        components: {
            Header,
            Navigation,
            Footer,
            Multiselect,
            Editor
        },
        data(){
            return {
                auth: {
                    role: '',
                    access_token: '',
                },
                row: {
                    status: 1,
                    view_in_home: 0,

                    destination_id: '',

                    preview: '',
                    image: '',
                    image_alt: '',
                    image_title: '',
                    
                    slug: '',
                    title: '',
                    body: '',
                    short_body: '',

                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',

                    items: [],
                    items_id: 1,
                    items_title: [],
                    items_order: [],
                    items_body: [],
                    items_preview: [],
                    items_image_url: [],
                    items_image_alt: [],
                    items_image_title: [],
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
                packagesValue: [],
                packagesOptions: [],

                destinations: [],
                packages: [],

                destinationLoading: true,
                packageLoading: true,
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
            
            // fetch Destinations
            fetchDestinations(){
                this.destinationLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/destinations',
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
                        this.fetchPackages();
                    })
                    .catch(() => {})
                    .finally(() => {});
            },

            // Fetch Packages
            fetchPackages(){
                this.packageLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/packages',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.packageLoading = false;
                        this.packagesOptions = res.data.packages;
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

                // items
                for( let i = 1; i < this.row.items_title.length; i++ ) {
                    this.row.items[i] = {
                        'title' : this.row.items_title[i],
                        'body' : this.row.items_body[i],
                        'order' : this.row.items_order[i]
                    }
                }

                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/wikis',
                    method: 'POST',
                    data: {
                        status: this.row.status,
                        view_in_home: this.row.view_in_home,
                        destination_id: this.row.destination_id,
                        packages_id: [],

                        image_url: this.row.image,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title,

                        title: this.row.title,
                        slug: this.row.slug,
                        body: this.row.body,
                        short_body: this.row.short_body,
                        order: 0,

                        meta_title: this.row.meta_title,
                        meta_keywords: this.row.meta_keywords,
                        meta_description: this.row.meta_description,

                        items: this.row.items
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
                        this.$router.push({ name: 'wikis' })
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
                this.row.image = file;
            },
            onItemsImageChange(e) {
                const file = e.target.files[0];
                this.row.items_preview = URL.createObjectURL(file);
                this.row.items_image_url = file;
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = false;
                else
                    this.row.status = true;
            },
            // view in home
            onViewInHome(){
                if(this.row.view_in_home)
                    this.row.view_in_home = 0;
                else
                    this.row.view_in_home = 1;
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

            // items add more
            opnFrm(i) {
                let prev = i - 1;
                let pvt = document.querySelector('#btn_'+prev);
                let frm = document.querySelector('#frm_'+i);
                pvt.classList.add('hidden');
                frm.classList.remove('hidden');
            },
            removeOption(i) {
                let prev = i - 1;
                let pvt = document.querySelector('#btn_'+prev);
                let frm = document.querySelector('#frm_'+i);
                frm.classList.add('hidden');
                pvt.classList.remove('hidden');
                this.row.items_title[i] = '';
                this.row.items_order[i] = '';
                this.row.items_body[i] = '';
                this.row.items_image_url[i] = '';
                this.row.items_image_alt[i] = '';
                this.row.items_image_title[i] = '';
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: 'wikis' });
                }
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
