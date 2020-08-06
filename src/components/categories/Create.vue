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
                    <div class="col-md-8 mb-5">


                    <!-- CardMeta -->
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
                                            <label for="inputText4">Meta title</label>
                                            <input class="form-control"
                                                    id="inputText4"  
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
                                            <label for="inputText5">Meta keywords</label>
                                            <textarea class="form-control"
                                                    id="inputText5" 
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
                                            <label for="inputText6">Meta description</label>
                                            <textarea class="form-control" 
                                                    id="inputText6" 
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
                        <!-- End CarDMeta -->


                        <!-- CardDest -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabDest" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Dest')"
                                            aria-expanded="false" 
                                            aria-controls="collapseDest" 
                                            data-toggle="collapse"
                                            data-target="#collapseDest">Category
                                            <span id="iconToggleDest" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseDest" 
                                        class="collapse" 
                                        aria-labelledby="TabDest" 
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


                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputText3">Body</label>
                                        <editor
                                            id="inputText3"
                                            v-model="row.body"
                                            api-key="xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b"
                                            :init="{
                                                height: 600,
                                                menubar: 'file edit view insert format tools table tc help',
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | \
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help'
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

                        <!-- NavOne -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavOne" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('NavOne')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavOne" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavOne">Destination
                                            <span id="iconToggleNavOne" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavOne" 
                                        class="collapse" 
                                        aria-labelledby="NavOne" 
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
                        <!-- End NavOne -->

                        <!-- NavTwo -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavTwo" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('NavTwo')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavTwo" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavTwo">Featued Image
                                            <span id="iconToggleNavTwo" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavTwo" 
                                        class="collapse" 
                                        aria-labelledby="NavTwo" 
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

                        <!-- NavTwo -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavTwo2" class="card-header">
                                        <h2 class="h4 card-header-title"
                                            @click="collapseToggle('NavTwo2')"  
                                            aria-expanded="false" 
                                            aria-controls="collapseNavTwo2" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavTwo2">Featued Icon
                                            <span id="iconToggleNavTwo2" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavTwo2" 
                                        class="collapse" 
                                        aria-labelledby="NavTwo2" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Icon -->
                                            <div class="form-group">
                                                <img :src="row.icon_preview" 
                                                    class="mb-2 h150 custom-image">
                                                <input type="file" 
                                                    class="form-control" 
                                                    ref="myDropify2" 
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
                                                    v-model="row.icon_title">
                                            </div>
                                            <!-- Icon -->
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
                                    <div id="NavThree" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('NavThree')"
                                            aria-expanded="false" 
                                            aria-controls="collapseNavThree" 
                                            data-toggle="collapse"
                                            data-target="#collapseNavThree">Status & Visibility
                                            <span id="iconToggleNavThree" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavThree" 
                                        class="collapse" 
                                        aria-labelledby="NavThree" 
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
                    destination_id: '',
                    status: true,
                    preview: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e",
                    image: '',
                    image_alt: '',
                    image_title: '',

                    icon_preview: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e",
                    icon: '',
                    icon_alt: '',
                    icon_title: '',
                    
                    slug: '',
                    title: '',
                    body: '',

                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',
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

            // Fetch Destinations
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
                        paginate: 25,
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

            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
                this.row.image = file;
            },

            // Upload Featured Icon
            onIconChange(e){
                const file = e.target.files[0];
                this.row.icon_preview = URL.createObjectURL(file);
                this.row.icon = file;
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
                        destination_id: this.row.destination_id,
                        status: this.row.status,

                        image_url: this.row.image,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title,

                        icon_url: this.row.icon,
                        icon_alt: this.row.icon_alt,
                        icon_title: this.row.icon_title,

                        title: this.row.title,
                        slug: this.row.slug,
                        body: this.row.body,

                        meta_title: this.row.meta_title,
                        meta_keywords: this.row.meta_keywords,
                        meta_description: this.row.meta_description
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
                    let slug = this.row.slug;
                    this.row.slug = slug.replace(/\s+/g, '-');
                } else {
                    this.row.slug = str.replace(/\s+/g, '-');
                }
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = false;
                else
                    this.row.status = true;
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: 'categories' });
                }
            },

        },

        // Before Enter..
        //beforeRouteEnter (to, from, next) { 
          // next(vm => { 
          //   //next();
          // }) 
        //},

        // Before Leaving.. 
        // beforeRouteLeave(to, from, next) { 
        //     if(this.row.title && !this.isSubmit) {
        //         const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        //         if (answer) {
        //             next()
        //         } else {
        //             next(false)
        //         }
        //     } else { next() }
        // },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
