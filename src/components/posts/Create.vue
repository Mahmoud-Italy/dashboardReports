<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Posts

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
                            <li class="breadcrumb-item"><router-link :to="{ name: 'dashboard' }">Home</router-link></li>
                            <li class="breadcrumb-item"><router-link :to="{ name: 'posts' }">Posts</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">Add New</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->

                <form @submit.prevent="addNew" enctype="multipart/form-data" class="h-100">

                
                <!-- Content -->
                <div class="tab-content">

                    <div class="row">        
                        <div class="col-md-8 mb-5">

                        <!-- CardOne -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabOne" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle(13)"
                                            aria-expanded="false" 
                                            aria-controls="collapseOne" 
                                            data-toggle="collapse"
                                            data-target="#collapseOne">Article
                                            <span id="iconToggle13" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                    pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseOne" 
                                        class="collapse show" 
                                        aria-labelledby="TabOne" 
                                        data-parent="#accordion">

                                        <div class="col-12 py-3">
                                            <!-- Title -->
                                    <div class="form-group">
                                        <div class="pull-right f12"
                                            v-if="row.title.length"
                                            v-text="(row.title.length)">
                                        </div>
                                        <label for="inputText1">Title</label>
                                        <input class="form-control" 
                                                id="inputText1" 
                                                type="text" 
                                                v-model="row.title" 
                                                required="">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Slug -->
                                    <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.slug.length"
                                                v-text="(row.slug.length)">
                                            </div>
                                            <label for="inputText2">Slug</label>
                                            <input class="form-control text-lowercase"
                                                    id="inputText2"  
                                                    type="text" 
                                                    v-model="row.slug" 
                                                    @keydown.space.prevent 
                                                    @paste="onPaste"
                                                    v-on:change="onSlugChange"
                                                    required="">
                                    </div>
                                    <!-- End Slug -->


                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputText6">Short body</label>
                                        <editor
                                            id="inputText67"
                                            v-model="row.body"
                                            api-key="xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b"
                                            :init="{
                                                height: 300,
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
                                    <!-- End Short Body -->

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputText6">Body</label>
                                        <editor
                                            id="inputText6"
                                            v-model="row.body"
                                            api-key="xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b"
                                            :init="{
                                                height: 800,
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




                        <!-- CardTwo -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabTwo" class="card-header">
                                            <h2 class="h4 card-header-title" 
                                                @click="collapseToggle(14)"
                                                aria-expanded="false" 
                                                aria-controls="collapseTwo" 
                                                data-toggle="collapse"
                                                data-target="#collapseTwo">Meta
                                                <span id="iconToggle14" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                                </span>
                                            </h2>

                                    </div>
                                    <div id="collapseTwo" 
                                        class="collapse" 
                                        aria-labelledby="TabTwo" 
                                        data-parent="#accordion">

                                        <div class="col-12 py-3">
                                            

                                             <!-- Meta title -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="inputText3">Meta title</label>
                                            <input class="form-control"
                                                    id="inputText3"  
                                                    type="text" 
                                                    v-model="row.meta_title" 
                                                    required="">
                                        </div>
                                        <!-- End Meta title -->
                                            
                                        <!-- Meta keywords -->
                                        <div class="form-group">
                                            <div class="pull-right f12"
                                                v-if="row.meta_keywords" 
                                                v-text="(row.meta_keywords.length)">
                                            </div>
                                            <label for="inputText4">Meta keywords</label>
                                            <textarea class="form-control"
                                                    id="inputText4" 
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
                                            <label for="inputText5">Meta description</label>
                                            <textarea class="form-control" 
                                                    id="inputText5" 
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




                        <!-- CardTwo -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion3" class="accordion">
                                    <div id="TabThird" class="card-header">
                                            <h2 class="h4 card-header-title" 
                                                @click="collapseToggle(14)"
                                                aria-expanded="false" 
                                                aria-controls="collapseThird" 
                                                data-toggle="collapse"
                                                data-target="#collapseThird">Descriptions
                                                <span id="iconToggle14" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                                </span>
                                            </h2>

                                    </div>
                                    <div id="collapseThird" 
                                        class="collapse" 
                                        aria-labelledby="TabThird" 
                                        data-parent="#accordion3">

                                        <div class="col-12 py-3">
                                            

                                        
                                            
                                            <!-- Body -->
                                    <div class="form-group">
                                        <label for="inputText6">Content</label>
                                        <editor
                                            id="inputText673"
                                            v-model="row.body"
                                            api-key="xahz1dg338xnac8il0tkxph26xcaxqaewi3bd9cw9t4e6j7b"
                                            :init="{
                                                height: 300,
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
                                    <!-- End Short Body -->

                                         <!-- Meta title -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="inputText3">Iframe Link</label>
                                            <input class="form-control"
                                                    id="inputText3"  
                                                    type="text" 
                                                    v-model="row.meta_title" 
                                                    required="">
                                        </div>
                                        <!-- End Meta title -->


                                    <div class="row">
                                             <!-- Meta title -->
                                        <div class="col-6 form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="inputText3">Image alt</label>
                                            <input class="form-control"
                                                    id="inputText3"  
                                                    type="text" 
                                                    v-model="row.meta_title" 
                                                    required="">
                                        </div>
                                        <!-- End Meta title -->

                                             <!-- Meta title -->
                                        <div class="col-6 form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="inputText3">Image title</label>
                                            <input class="form-control"
                                                    id="inputText3"  
                                                    type="text" 
                                                    v-model="row.meta_title" 
                                                    required="">
                                        </div>
                                        <!-- End Meta title -->
                                    </div>
                                             <!-- Meta title -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="inputText3">Image</label>
                                            <input class="form-control"
                                                    id="inputText3"  
                                                    type="file" 
                                                    required="">
                                        </div>
                                        <!-- End Meta title -->


                                        <button type="button" class="btn btn-success" 
                                                :disabled="btnLoading" 
                                                @click="cancel">
                                                <span>Add More</span>
                                            </button>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                    <div class="col-md-4 mb-5">

                        <!-- CardOne -->
                        <div class="card">
                            <div class="card-body">

                                <!-- Accordion -->
                                <div id="accordionNav" class="accordion">
                                <!-- cardOne -->
                                    <div id="NavOne" class="card-header">
                                            <h2 class="h4 card-header-title" 
                                                @click="collapseToggle(1)"
                                                aria-expanded="false" 
                                                aria-controls="collapseNavOne" 
                                                data-toggle="collapse"
                                                data-target="#collapseNavOne">Status & Visibility
                                                <span id="iconToggle1" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                                </span>
                                            </h2>

                                    </div>

                                    <div id="collapseNavOne" 
                                        class="collapse" 
                                        aria-labelledby="NavOne" 
                                        data-parent="#accordionNav">

                                        <div class="col-12 py-3">
                                            <div class="form-group">
                                                <label for="exampleInputText2_1">Visibility</label>
                                                <select id="exampleInputText2_1" class="form-control ui-h50">
                                                    <option>Public</option>
                                                    <option>Private</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>



                        <!-- CardTwo -->
                        <div class="card mt-5">
                            <div class="card-body">

                                <div id="accordionNav" class="accordion">
                                <!-- cardOne -->
                                    <div id="NavOne2" class="card-header">
                                            <h2 class="h4 card-header-title" 
                                                aria-expanded="false" 
                                                aria-controls="collapseNavOne2" 
                                                data-toggle="collapse" 
                                                @click="collapseToggle(2)" 
                                                data-target="#collapseNavOne2">Image
                                                <span id="iconToggle2" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                                </span>
                                            </h2>
                                    </div>

                                    <div id="collapseNavOne2" 
                                        class="collapse" 
                                        aria-labelledby="NavOne2" 
                                        data-parent="#accordionNav">

                                        <div class="col-12 py-3">
                                            <div class="form-group">
                                                <label for="exampleInputText2_1">Visibility</label>
                                                <select id="exampleInputText2_1" class="form-control ui-h50">
                                                    <option>Public</option>
                                                    <option>Private</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        
                        
                    </div>




                    </div>
                </div>
                <!-- End Content -->

                        
                   
                    

                    <div class="col-md-12 row">
                        <div class="form-group">

                            <button class="btn btn-primary" :disabled="btnLoading">
                                <span v-if="btnLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true">
                                    </span>Loading...
                                </span>
                                <span v-if="!btnLoading" class="ti-save"></span>
                                <span v-if="!btnLoading"> Create Post</span>
                            </button>

                            <button type="button" class="btn btn-warning" 
                                :disabled="btnLoading" 
                                @click="cancel">
                                <span class="ti-back-left"></span>
                                <span>Cancel</span>
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
    //import iziToast from 'izitoast';
    //import Multiselect from 'vue-multiselect';

    export default {
        name: 'CreatePost',
        components: {
            Header,
            Navigation,
            Footer,
            Editor,
           // Multiselect
        },
        data(){
            return {
                //
                auth: {
                    role: '',
                    accessToken: '',
                },
                row: {
                    cat_id: '',
                    subcat_id: '',
                    preview: '',
                    image: '',

                    title: '',
                    slug: '',
                    body: '',
                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',
                },
                //selected: null,
                tagsValue: [],
                tagsOptions: [],

                categories: [],
                subCategories: [],

                catLoading: true,
                subcatLoading: false,
                tagLoading: true,
                btnLoading: false,
                isSubmit: false,
            }
        },
        mounted() {},
        computed: {},
        created() {
            // AccessToken & Role
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('accessToken')) {
                this.auth.accessToken = localStorage.getItem('accessToken');
            }

            //this.fetchCategories();
        },
        methods: {
            
            collapseToggle(divid) {
                let el = document.querySelector("span#iconToggle"+divid);
                if(el.classList.contains('ti-angle-down')) {
                    el.classList.remove('ti-angle-down');
                    el.classList.add('ti-angle-up');
                } else {
                    el.classList.remove('ti-angle-up');
                    el.classList.add('ti-angle-down');
                }
                //el.classList.add('ti-angle-down');
            },
            // Fetch Categories
            // fetchCategories(){
            //     this.catLoading = true;
            //     axios.defaults.headers.common = {
            //         'X-Requested-With': 'XMLHttpRequest',
            //         'X-CSRF-TOKEN': window.csrf_token,
            //         'accesstoken': this.auth.accessToken,
            //         'permission': 'admin.categories.index'
            //     };
            //     const config = { headers: { 'Content-Type': 'application/json' }};
            //     let params = {};
            //     params['api_key'] = window.api_key;
            //     params['status'] = 'active';
            //     axios.get('/api/v1/dashboard/categories', {params:params}, config)
            //         .then(res => {
            //             this.catLoading = false;
            //             this.categories = res.data.data.rows;
            //             this.fetchTags();
            //         })
            //         .catch(err => {});
            // },

            // // On Category Change
            // onCategoryChange() {
            //     this.fetchSubCategories();
            // },

            // // Fetch SubCategories
            // fetchSubCategories(){
            //     this.subcatLoading = true;
            //     axios.defaults.headers.common = {
            //         'X-Requested-With': 'XMLHttpRequest',
            //         'X-CSRF-TOKEN': window.csrf_token,
            //         'accesstoken': this.auth.accessToken,
            //         'permission': 'admin.categories.index'
            //     };
            //     const config = { headers: { 'Content-Type': 'application/json' }};
            //     let params = {};
            //     params['api_key'] = window.api_key;
            //     params['status'] = 'active';
            //     axios.get('/api/v1/dashboard/categories/sub/show/'+this.row.cat_id, {params:params}, config)
            //         .then(res => {
            //             this.subcatLoading = false;
            //             this.subCategories = res.data.data.rows;
            //         })
            //         .catch(err => {});
            // },

            // // Fetch Tags
            // fetchTags(){
            //     this.tagLoading = true;
            //     axios.defaults.headers.common = {
            //         'X-Requested-With': 'XMLHttpRequest',
            //         'X-CSRF-TOKEN': window.csrf_token,
            //         'accesstoken': this.auth.accessToken,
            //         'permission': 'admin.tags.index'
            //     };
            //     const config = { headers: { 'Content-Type': 'application/json' }};
            //     let params = {};
            //     params['api_key'] = window.api_key;
            //     params['status'] = 'active';
            //     axios.get('/api/v1/dashboard/tags', {params:params}, config)
            //         .then(res => {
            //             this.tagsOptions = res.data.data.tags;
            //         })
            //         .catch(err => {});
            // },

            // // Add New Tags
            // addTag (tagName) {
            //     this.tagsOptions.push(tagName);
            //     this.tagsValue.push(tagName);

            //     // Then insert it
            //     axios.defaults.headers.common = {
            //         'X-Requested-With': 'XMLHttpRequest',
            //         'X-CSRF-TOKEN': window.csrf_token,
            //         'accesstoken': this.auth.accessToken,
            //         'permission': 'admin.tags.create'
            //     };
            //     const config = { headers: { 'Content-Type': 'application/json' }};  
            //     let formData = new FormData();
            //     formData.append('api_key', window.api_key);
            //     formData.append('locale','en');
            //     formData.append('tag',tagName);
            //     axios.post('/api/v1/dashboard/tags', formData, config)
            //     .then(res => {
            //         if (res.data.statusCode == 401) {
            //             izitoast.warning({
            //                 icon: 'ti-alert',
            //                 title: 'Wow, man',
            //                 message: 'Slow down, '+res.data.errors,
            //             });
            //         }
            //     })
            //     .catch(err => {
            //         izitoast.warning({
            //             icon: 'ti-alert',
            //             title: 'Wow, man',
            //             message: 'Slow down, '+res.data.errors,
            //         });
            //     });
            // },

            // // Upload Featured image
            // onImageChange(e){
            //   const file = e.target.files[0];
            //   this.row.preview = URL.createObjectURL(file);
            //   this.row.image = file;
            // },


            // // Add New
            // addNew(){
            //     this.btnLoading = true;
            //     axios.defaults.headers.common = {
            //         'X-Requested-With': 'XMLHttpRequest',
            //         'X-CSRF-TOKEN': window.csrf_token,
            //         'accesstoken': this.auth.accessToken,
            //         'permission': 'admin.posts.create'
            //     };
            //     const config = { headers: { 'Content-Type': 'multipart/form-data' }};
            //     let formData = new FormData();
            //     formData.append('api_key', window.api_key);
            //     formData.append('cat_id', this.row.cat_id);
            //     formData.append('subcat_id', this.row.subcat_id);
            //     formData.append('image', this.row.image);
            //     formData.append('tags', this.tagsValue);
            //     formData.append('locale', 'en');
            //     formData.append('title', this.row.title);
            //     formData.append('body', this.row.body);
            //     formData.append('slug', this.row.slug);
            //     formData.append('meta_title', this.row.meta_title);
            //     formData.append('meta_keywords', this.row.meta_keywords);
            //     formData.append('meta_description', this.row.meta_description);
            //         // fell free to add any new scope

            //     axios.post('/api/v1/dashboard/posts', formData, config)
            //     .then(res => {
            //         this.btnLoading = false;
            //         this.isSubmit = true;

            //         if(res.data.statusCode == 201) {
            //             izitoast.success({
            //                 icon: 'ti-check',
            //                 title: 'Great job,',
            //                 message: 'Post Added Successfully',
            //             });
            //             this.$router.push({ name: 'posts' });

            //         } else if(res.data.statusCode == 200) {
            //             izitoast.success({
            //                 icon: 'ti-check',
            //                 title: 'Great job,',
            //                 message: 'Post Updated Successfully',
            //             });
            //             this.$router.push({ name: 'posts' });
                        
            //         } else {
            //             izitoast.warning({
            //                 icon: 'ti-alert',
            //                 title: 'Wow, man',
            //                 message: 'Slow down, '+res.data.errors,
            //             });
            //         }
            //     })
            //     .catch(err => {
            //         this.btnLoading = false;
            //         izitoast.error({
            //             icon: 'ti-na',
            //             title: 'Wow-wow,',
            //             message: 'Something went wrong',
            //         });
            //     });
            // },

            // // On Paste
            // onPaste(evt){
            //     this.onSlugChange();
            // },

            // onSlugChange(){
            //     let str = this.row.slug;
            //     this.row.slug = str.replace(/\s+/g, '-');
            // },

            // // Cancel
            // cancel(){
            //     if(confirm('Are You Sure?')) {
            //         this.$router.push({ name: 'posts' });
            //         this.isSubmit = true;
            //     }
            // },
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
.accordion .card { border-top: none !important }
.accordion .card-header { padding: 0.5rem 0 !important }
.black { color: #000 }
</style>
