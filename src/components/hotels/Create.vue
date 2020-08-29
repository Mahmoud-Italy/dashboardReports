<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Hotels

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
                                <router-link :to="{ name: 'hotels' }">Hotels</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Add New</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


        <form @submit.prevent="addNew" enctype="multipart/form-data" class="h-100">

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

                                   
                                    <div class="row">
                                         <!-- Link -->
                                        <div class="form-group col-8">
                                            <label for="inputText1">Link</label>
                                            <input class="form-control"
                                                    id="inputText1"  
                                                    type="text" 
                                                    v-model="row.name">
                                        </div>
                                        <!-- End Link -->

                                        <!-- Stars -->
                                        <div class="form-group col-4">
                                            <label for="inputText2">Stars</label>
                                            <input class="form-control"
                                                    id="inputTex2"  
                                                    type="number" 
                                                    v-model.number="row.stars">
                                        </div>
                                        <!-- End Stars -->
                                    </div>
                                        

                                         <!-- Title -->
                                        <div class="form-group">
                                            <label for="inputText3">Title</label>
                                            <input class="form-control"
                                                    id="inputText3"  
                                                    type="text" 
                                                    v-model="row.title">
                                        </div>
                                        <!-- End Title -->

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



                <!-- ******* SideNavbar ******** -->
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
                                                <img v-if="row.preview" 
                                                    :src="row.preview" 
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
                                <span v-if="!btnLoading"> Create Hotel</span>
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
                    status: true,
                    name: '',
                    link: '',
                    stars: '',

                    preview: '',
                    image_url: '',
                    image_alt: '',
                    image_title: '',
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

            // Add New
            addNew(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/hotels',
                    method: 'POST',
                    data: {
                        status: this.row.status,
                        name: this.row.name,
                        link: this.row.link,
                        stars: this.row.starts,

                        image_url: this.row.image_url,
                        image_alt: this.row.image_alt,
                        image_title: this.row.image_title
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
                        this.$router.push({ name: 'hotels' })
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

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = false;
                else
                    this.row.status = true;
            },

            // Upload Featured image
            onImageChange(e){
                const file = e.target.files[0];
                this.row.preview = URL.createObjectURL(file);
                this.row.image_url = file;
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: 'hotels' });
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
