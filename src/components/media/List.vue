<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize">Media

                        <div class="pull-rights ui-mt-15 pull-right ">
                            <div class="dropdown">
                                <span class="badge badge-md badge-pill badge-secondary-soft">
                                    {{ auth.role }}
                                </span>
                            </div>
                        </div>
                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Media</li>
                        </ol>
                    <!-- End Breadcrumb -->
                </nav>
                

            <!-- Content  -->
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-rights ui-mt-50 pull-right ">
                        <div class="dropdown ui-mr5">
                            <span class="badge badge-md badge-pill badge-danger-soft">
                                File Size 
                                <span v-if="dataLoading">
                                    <div class="spinner-grow spinner-grow-sm mr-1" role="status">
                                          <span class="sr-only">Loading...</span>
                                    </div>
                                </span>
                                <span v-if="!dataLoading">{{fileSize}}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-md-8 mb-5">
                    <div class="card">

                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="printMe" class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>File</th>
                                        <th class="text-center">Path</th>
                                        <th class="text-center">mimeType</th>
                                        <th class="text-center">Size</th>
                                    </tr>
                                </thead>
                                
                                <tbody v-if="dataLoading">
                                    <tr>
                                        <td colspan="5" class="text-center">
                                            <div class="spinner-grow" role="status">
                                              <span class="sr-only">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && !rows.length">
                                    <tr>
                                        <td colspan="5" class="text-center">
                                            <span>No data found</span>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && rows.length">
                                    <tr v-for="(row, index) in rows" 
                                        :key="index" 
                                        class="f14">

                                    <td class="font-weight-semi-bold">{{index+1}}</td>

                                    <td class="font-weight-semi-bold">
                                        <a :href="row.image" target="_blank">
                                            <img :src="row.image" 
                                                style="width:92px">
                                        </a>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        <a href="javascript:;" 
                                            title="Copy to clipboard"
                                            v-clipboard:copy="row.image"
                                            v-clipboard:success="onCopy"
                                            v-clipboard:error="onError">
                                            Copy to clipboard
                                        </a>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        <span class="badge badge-md badge-pill badge-danger-soft">
                                            {{ row.mime_type }}
                                        </span>
                                    </td>
                                    <td class="font-weight-semi-bold text-center">{{ row.size }}</td>
                                </tr>
                                
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>File</th>
                                        <th class="text-center">Path</th>
                                        <th class="text-center">mimeType</th>
                                        <th class="text-center">Size</th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                        <nav  v-if="rows.length !== 0" aria-label="Page navigation example ui-mt20" 
                            style="margin-top: 20px">
                            <ul class="pagination">
                                <li v-bind:class="[{disabled: !pagination.prev_page_url}]" class="page-item">
                                    <a class="page-link" href="javascript:" 
                                        @click="fetchData(pagination.prev_page_url)">Previous</a>
                                </li>
                                <li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item">
                                    <a class="page-link" href="javascript:" 
                                        @click="fetchData(pagination.next_page_url)">Next</a>
                                </li>
                            </ul>
                            <p class="pull-right ui-mt-50 f13">
                                <i>Page {{ pagination.current_page }} or {{ pagination.last_page }}</i>
                            </p>
                        </nav>

                    </div>
                </div>
            </div>



            <div class="col-md-4 mb-5">
                <div class="card">
                    <header class="card-header">
                        <h2 class="h4 card-header-title">Add New</h2>
                    </header>

                <form @submit.prevent="addNew" enctype="multipart/form-data">
                    <div class="card-body pt-0">
                        
                        <div class="form-group">
                            <img v-if="row.preview" 
                                :src="row.preview" 
                                style="width: 100%;max-height: 300px;padding:10px">
                            <input class="form-control" 
                                    type="file"
                                    ref="myDropify" 
                                    v-on:change="onImageChange" 
                                    required="">
                        </div>
                        
                        
                        <div class="form-group">
                            <button class="btn btn-primary" :disabled="btnLoading">
                                <span v-if="btnLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true">
                                    </span>Uploading...
                                </span>
                                <span v-if="!btnLoading" class="ti-upload"></span>
                                <span v-if="!btnLoading"> Upload to AWS</span>
                            </button>
                        </div>

                    </div>
                </form>

                </div>
            </div>

            </div>
        </div>
        <!-- End Content Body -->

            <Footer></Footer>
        </div>

        </main>
        <!-- End Main -->
        
    </div>
</template>

<script src="vue.min.js"></script>
<script src="dist/vue-clipboard.min.js"></script>
<script>
    import Header from '../layouts/Header.vue';
    import Navigation from '../layouts/Navigation';
    import Footer from '../layouts/Footer.vue';
    import iziToast from 'izitoast';

    export default {
        name: 'Media',
        components: {
            Header,
            Navigation,
            Footer,
        },
        data(){
            return {
                auth: { 
                    role: '',
                    access_token: '',
                },
                row: {
                    preview: '',
                    image: '',
                    base64Image: '',
                },
                //
                fileSize: '',
                dataLoading: true,
                btnLoading: false,
                something_went_wrong: false,
                rows: [],
                pagination: {},
            }
        },
        mounted() {},
        created() {
            // AccessToken & Role
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('access_token')) {
                this.auth.accessToken = localStorage.getItem('access_token');
            }

            this.fetchData('', true);
        },
        methods: {

            // Fetch Data
            fetchData(page_url, loading=false) {
                if(loading) { this.dataLoading = true; }
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                let vm = this;
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/media',
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options, config)
                    .then(res => {
                        this.dataLoading = false;
                        this.rows = res.data.rows;
                        this.fileSize = res.data.fileSize;
                        if(res.data.paginate.total) {
                            vm.makePagination(res.data.paginate)
                        }
                    })
                    .catch(err => {
                        this.btnLoading = false;
                        iziToast.warning({
                            icon: 'ti-alert',
                            title: 'Wow-man,',
                            message: (err.response) ? err.response.data.message : ''+err
                        });
                    })
                    .finally(() => {})
            },

            // Pagination
            makePagination(meta) {
                let pagination = {
                    current_page: meta.current_page,
                    last_page: meta.last_page,
                    next_page_url: meta.next_page_url,
                    prev_page_url: meta.prev_page_url
                }
                this.pagination = pagination;
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
                    this.row.base64Image = e.target.result;
                };
            },

            // Add Or Update Category
            addNew(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'application/json' }};  
                const options = {
                    url: window.baseURL+'/media',
                    method: 'POST',
                    data: {
                        file: this.row.base64Image
                    }
                }
                this.axios(options, config)
                    .then(res => {
                        this.btnLoading = false;
                        this.row.preview = '';
                        this.row.base64Image = '';
                        this.fetchData('', true);

                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'File Uploaded Successfully',
                        });
                })
                .catch(err => {
                    this.btnLoading = false;
                    iziToast.error({
                        icon: 'ti-na',
                        title: 'Wow-wow,',
                        message: (err.response) ? err.response.data.message : ''+err
                    });
                });
            },


            // Edit
            editRow(row) {
                //this.edit = true;
                //this.row.id = row.id;
                //this.row.preview = row.preview;
            },

            // Copy to Clipboard
            onCopy: function (e) {
                iziToast.success({
                    icon: 'ti-check',
                    title: 'Great job,',
                    message: 'Copy to Clipboard Successfully',
                });
            },
            onError: function (e) {
                iziToast.error({
                    icon: 'ti-na',
                    title: 'Wow-wow,',
                    message: 'Something went wrong, try again',
                });
            },
    
        },
    }
</script>

