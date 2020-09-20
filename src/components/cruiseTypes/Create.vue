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
                            <li class="breadcrumb-item active" aria-current="page">Add New</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


            <form @submit.prevent="addNew" enctype="multipart/form-data" class="h-100">

                <!-- Content -->
                <div class="tab-content">
                    <div class="row">      


                    <!-- ********** Cards ******* -->
                    <div class="col-md-8 mb-5">

                        <!-- Card Cruise Type -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabType" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Type')"
                                            aria-expanded="false" 
                                            aria-controls="collapseType" 
                                            data-toggle="collapse"
                                            data-target="#collapseType">Cruise Type
                                            <span id="iconToggleType" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseType" 
                                        class="collapse show" 
                                        aria-labelledby="TabType" 
                                        data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- Title -->
                                        <div class="form-group">
                                            <label for="input1">Title</label>
                                            <input class="form-control" 
                                                    id="input1" 
                                                    type="text" 
                                                    v-model="row.title" 
                                                    @keyup="onTitleChange">
                                        </div>
                                        <!-- End Title -->

                                        <!-- Slug -->
                                        <div class="form-group">
                                            <label for="input2">Slug</label>
                                            <input class="form-control text-lowercase"
                                                    id="input2"  
                                                    type="text" 
                                                    v-model="row.slug" 
                                                    @keydown.space.prevent 
                                                    @paste="onSlugPaste"
                                                    @change="onSlugChange(false)">
                                        </div>
                                        <!-- End Slug -->

                                        <!-- Sort -->
                                        <div class="form-group">
                                            <label for="input3">Sort</label>
                                            <input class="form-control" 
                                                    id="input3" 
                                                    type="number"
                                                    min="0" 
                                                    v-model.number="row.sort">
                                        </div>
                                        <!-- End Title -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card Cruise Type -->

                    </div>
                    <!-- ********** End Cards ******* -->


                    <!-- ******* Navbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- Nav Category -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavCategory" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Category')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavCategory" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavCategory">Parent
                                            <span id="iconToggleCategory" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavCategory" 
                                        class="collapse" 
                                        aria-labelledby="NavCategory" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Category -->
                                            <div class="form-group">
                                                <div v-if="parentLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <select class="form-control custom-select"
                                                    v-if="!parentLoading" 
                                                    v-model="row.parent_id">
                                                    <option>Select Parent</option>
                                                    <option value="">No Parent</option>
                                                    <option v-for="(parent, index) in parents" 
                                                            :key="index"
                                                            :value="parent.id">
                                                            {{ parent.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- End Category -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Category -->

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

                                            <!-- Header -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch2" 
                                                        :checked="row.view_in_header"
                                                        @click="onHeader">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch2"
                                                        v-html="(row.view_in_header) 
                                                            ? 'View In Header' 
                                                            : 'Hide In Header'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Header -->

                                            <!-- Footer -->
                                            <div class="form-group">
                                                <div class="custom-control custom-switch mb-2">
                                                    <input type="checkbox" 
                                                        class="custom-control-input" 
                                                        id="customSwitch3" 
                                                        :checked="row.view_in_footer"
                                                        @click="onFooter">
                                                    <label class="custom-control-label" 
                                                        for="customSwitch3"
                                                        v-html="(row.view_in_footer) 
                                                            ? 'View In Footer' 
                                                            : 'Hide In Footer'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End Footer -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End NavThree -->

                    </div>
                    <!-- ******* End Navbar ******** -->
                    
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
                                <span v-if="!btnLoading"> Create Cruise Type</span>
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
    import iziToast from 'izitoast';
    
    export default {
        name: 'Create',
        components: {
            Header,
            Navigation,
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
                    title: '',
                    slug: '',
                    sort: 0,

                    // navbar
                    parent_id: '',

                    // status & visibility
                    status: 1,
                    view_in_header: 0,
                    view_in_footer: 0,
                },
                parnets: [],
                parentLoading: true,

                pgLoading: false,
                btnLoading: false,

                // Tenants
                tenant_id: 0,
                tenant_name: '',
                refs: 'cruisetypes'
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

            this.fetchParents();
        },
        methods: {
            

            // Fetch Parents
            fetchParents(){
                this.parentLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/'+this.refs,
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: true,
                        parent_id: false,
                        paginate: 100,
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.parentLoading = false;
                        this.parents = res.data.rows;
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
                    url: window.baseURL+'/'+this.refs,
                    method: 'POST',
                    data: {
                        tenant_id: this.tenant_id,
                        // row
                        title: this.row.title,
                        slug: this.row.slug,
                        sort: this.row.sort,

                        // navbar
                         parent_id: this.row.parent_id,

                        // status & visibility
                        status: this.row.status,
                        view_in_header: this.row.view_in_header,
                        view_in_footer: this.row.view_in_footer,
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
            onSlugChange(str=''){
                if(!str) {
                    str = this.row.slug;
                }
                this.row.slug = str.replace(/\s+/g, '-');
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
            },
             // active view_in_header
            onHeader(){
                if(this.row.view_in_header)
                    this.row.view_in_header = 0;
                else
                    this.row.view_in_header = 1;
            },
             // active view_in_footer
            onFooter(){
                if(this.row.view_in_footer)
                    this.row.view_in_footer = 0;
                else
                    this.row.view_in_footer = 1;
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
