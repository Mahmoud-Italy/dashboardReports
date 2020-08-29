<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Inbox</h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'inbox' }">Inbox</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Show</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->

            <!-- Loading -->
            <div v-if="pgLoading" class="row h-100">
                <div class="container text-center">
                    <p><br/></p>
                    <div class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p><br/></p>
                </div>
            </div>
            <!-- End Loading -->

            <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">        


                <!-- ******* Card ******** -->
                <div class="col-md-12 mb-5">

                    <!-- Card About -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabInbox" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Inbox')"
                                        aria-expanded="false" 
                                        aria-controls="collapseInbox" 
                                        data-toggle="collapse"
                                        data-target="#collapseInbox">Inbox
                                        <span id="iconToggleInbox" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseInbox" 
                                    class="collapse show" 
                                    aria-labelledby="TabInbox" 
                                    data-parent="#accordion">

                                <div class="col-12 pt-3">
                                    
                                    <!-- Title -->
                                    <div class="form-group">
                                        <label for="input1">Name</label>
                                        <input class="form-control" 
                                                id="input1" 
                                                type="text" 
                                                v-model="row.name" 
                                                disabled="">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Slug -->
                                    <div class="form-group">
                                        <label for="input2">Email</label>
                                        <input class="form-control text-lowercase"
                                                id="input2"  
                                                type="text" 
                                                v-model="row.email"
                                                disabled="">
                                    </div>
                                    <!-- End Slug -->


                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="input3">Message</label>
                                        <editor
                                            id="input3"
                                            v-model="row.body"
                                            disabled=""
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
                    <!-- End Card Writer -->

                </div>
                <!-- ******* End Card ******** -->




                </div>
            </div>
            <!-- End Content -->


                <!-- Buttons -->
                <!-- <div class="col-md-12 row">
                    <div class="form-group">
                        <button type="button" class="btn btn-danger" 
                            :disabled="btnLoading" 
                            @click="cancel">
                            <span class="ti-close"></span>
                            <span> Cancel </span>
                        </button>
                    </div>
                </div> -->
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
    import iziToast from 'izitoast';
    
    export default {
        name: 'Show',
        components: {
            Header,
            Navigation,
            Footer,
            Editor
        },
        data(){
            return {
                auth: {
                    access_token: '',
                },
                row: {
                    status: 1,
                    preview: '',
                    name: '',
                    email: '',
                    body: '',
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
                pgLoading: true,
                btnLoading: false,
            }
        },
        mounted() {},
        computed: {},
        created() {
            // AccessToken & Role
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
                    url: window.baseURL+'/inbox/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;
                    //this.row.preview = res.data.row.image;
                    this.row.name = res.data.row.name;
                    this.row.email = res.data.row.email;
                    this.row.body = res.data.row.body;
                    })
                    .catch(err => {
                        this.btnLoading = false;
                        iziToast.warning({
                            icon: 'ti-alert',
                            title: 'Wow-man,',
                            message: (err.response) ? err.response.data.message : ''+err
                        });
                    })
                    .finally(() => {});
            },

            // editRow
            editRow(){
                //
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
                    this.$router.push({ name: 'inbox' });
                }
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
