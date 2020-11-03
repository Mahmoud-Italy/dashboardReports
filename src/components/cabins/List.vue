<template>
    <div class="">
        <Header v-on:headerToChild="onSearchSubmit"></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation :tenant="tenant_id"></Navigation>

            <div class="u-content">

                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize">{{ refs }}
                        <router-link v-if="permissions.add && tenant_id != 0"
                            :to="{ name: 'create-'+refs }" 
                            class="btn btn-primary btn-sm btn-pill ui-mt-10 ui-mb-2">
                            <span>Add New</span>
                        </router-link>

                        <!-- Tenants -->
                        <div class="pull-rights ui-mt-15 pull-right">
                            <div class="dropdown">
                                <button type="button" 
                                    class="btn btn-dark btn-sm dropdown-toggle" 
                                    data-toggle="dropdown"
                                    aria-haspopup="true" 
                                    aria-expanded="false" 
                                    :disabled="tenantLoading">
                                    <span class="btn-icon ti-home mr-2"></span>
                                    <span v-if="!tenantLoading" class="ui-mr5"> {{ tenant_name }}</span>
                                    <span v-if="tenantLoading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" 
                                            aria-hidden="true">
                                        </span>Loading...
                                    </span>
                                </button>
                                <div class="dropdown-menu">
                                    <a v-if="auth.role == 'root'"
                                        class="dropdown-item dropdown-pad" 
                                        href="javascript:;"
                                        @click="changeTenant(0, 'All Tenants')"> All Tenants
                                    </a>
                                    <a class="dropdown-pad dropdown-item" 
                                        href="javascript:;"
                                        v-for="(tenant, index) in tenants"
                                        :key="index"
                                        :class="(tenant.authority) ? '' : 'hidden'"
                                        @click="changeTenant(tenant.id, tenant.name)"> 
                                           &nbsp; {{ tenant.name }} &nbsp;
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- End Tenants -->
                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item text-capitalize active" aria-current="page">
                                {{ refs }}
                            </li>
                        </ol>
                    
                        <!-- Bulk Action -->
                        <div class="pull-rights ui-mt-50 pull-right">
                            <div class="dropdown display-flex-inline">
                                <div class="dropdown ui-mr5">
                                    <button type="button" 
                                        class="btn btn-danger btn-sm dropdown-toggle" 
                                        data-toggle="dropdown"
                                        aria-haspopup="true" 
                                        aria-expanded="false" 
                                        :disabled="bulkLoading">
                                        <span v-if="!bulkLoading">Bulk Actions</span>
                                        <span v-if="bulkLoading">
                                            <span class="spinner-grow spinner-grow-sm mr-1" 
                                                role="status" aria-hidden="true"></span>Loading...
                                        </span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a v-if="(permissions.edit) && (status == 'inactive' || status == '')"
                                            @click="multiActive()"
                                            class="dropdown-item" href="javascript:;">Active
                                        </a>
                                        <a v-if="(permissions.edit) && (status == 'active' || status == '')"
                                            @click="multiInactive()"
                                            class="dropdown-item" href="javascript:;">Inactive
                                        </a>

                                        <a v-if="permissions.delete && status != 'trash'"
                                            @click="multiMoveToTrash()"
                                            class="dropdown-item" href="javascript:;">Move to Trash
                                        </a>

                                        <a v-if="permissions.delete && status == 'trash'"
                                            @click="multiRestoreFromTrash()"
                                            class="dropdown-item" href="javascript:;">Restore
                                        </a>
                                        <a v-if="permissions.delete && status == 'trash'"
                                            @click="multiDeletePermanently()"
                                            class="dropdown-item" href="javascript:;">Delete Permanently
                                        </a>
                                    </div>
                                </div>

                                <div class="dropdown">
                                    <button type="button" 
                                        class="btn btn-secondary btn-sm dropdown-toggle" 
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false" 
                                        :disabled="exportLoading">
                                        <span v-if="!exportLoading">Export</span>
                                        <span v-if="exportLoading">
                                            <span class="spinner-grow spinner-grow-sm mr-1" 
                                            role="status" aria-hidden="true"></span>Loading...
                                        </span>
                                    </button>
                                    <div class="dropdown-menu" 
                                        aria-labelledby="dropdownMenuButton">
                                        <download-excel
                                            class = "dropdown-item cursor-pointer"
                                            :fetch = "fetchExport"
                                            :fields = "exp.json_fields"
                                            :before-generate = "startDownload"
                                            :before-finish = "finishDownload"
                                            :worksheet = "refs"
                                            :name = "refs+'.xls'">Excel
                                        </download-excel>
                                        <download-excel
                                            class = "dropdown-item cursor-pointer"
                                            :fetch = "fetchExport"
                                            :fields = "exp.json_fields"
                                            :before-generate = "startDownload"
                                            :before-finish = "finishDownload"
                                            type = "csv"
                                            :worksheet = "refs"
                                            :name = "refs+'.xls'">CSV
                                        </download-excel>
                                        <a class="dropdown-item" 
                                            href="javascript:;" 
                                            v-print="'#printMe'">Print
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Bulk Action -->
                    </nav>
                    <!-- End Breadcrumb -->


                <!-- Card -->
                <div class="card">
                    <!-- StatusBar -->
                    <header class="card-header">
                        <h2 class="h4 card-header-title">
                            <router-link class="pg-hd"
                                :to="{ name: refs }"
                                :class="(status == '') ? 'active' : '' ">All</router-link> 
                            <span class="pg-hd no-decoration f14"> ({{statusBar.all}}) </span>&nbsp;|&nbsp; 

                            <router-link class="pg-hd"
                                :to="{ name: 'status-'+refs, params:{status: 'active'} }" 
                                :class="(status == 'active') ? 'active' : '' ">Active</router-link>
                           <span class="pg-hd no-decoration f14"> ({{statusBar.active}}) </span>&nbsp;|&nbsp; 

                            <router-link class="pg-hd"
                                :to="{ name: 'status-'+refs, params:{status: 'inactive'} }" 
                                :class="(status == 'inactive') ? 'active' : '' ">Inactive</router-link>
                            <span class="pg-hd no-decoration f14"> ({{statusBar.inactive}}) </span>&nbsp;|&nbsp;  

                            <router-link class="pg-hd"
                                :to="{ name: 'status-'+refs, params:{status: 'trash'} }" 
                                :class="(status == 'trash') ? 'active' : '' ">Trash</router-link>
                            <span class="pg-hd no-decoration f14"> ({{statusBar.trash}}) </span>


                            <!-- Show Entries -->
                            <div class="dropdown pull-right ui-mt-10">
                                <button type="button" 
                                    class="btn btn-light btn-sm dropdown-toggle" 
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false">
                                    <span>Show</span>
                                    <span v-if="!showLoading"> {{ show }}</span>
                                    <span v-if="showLoading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true"></span>
                                    </span>
                                </button>
                                <div class="dropdown-menu ui-min-w100" 
                                    aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item cursor-pointer"
                                        :class="(show == 10) ? 'active' : ''"
                                        @click="onShow(10)">10
                                    </a>
                                    <a class="dropdown-item cursor-pointer"
                                        :class="(show == 25) ? 'active' : ''"
                                        @click="onShow(25)">25
                                    </a>
                                    <a class="dropdown-item cursor-pointer"
                                        :class="(show == 50) ? 'active' : ''"
                                        @click="onShow(50)">50
                                    </a>
                                    <a class="dropdown-item cursor-pointer"
                                        :class="(show == 100) ? 'active' : ''"
                                        @click="onShow(100)">100
                                    </a>
                                </div>
                            </div>
                            <!-- End Show Entries -->

                        </h2>
                    </header>
                    <!-- End StatusBar -->

                    <!-- Body -->
                    <div class="card-body pt-0">
                        <div class="table-responsive">
                            <table id="printMe" class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">
                                            <div class="custom-control custom-checkbox">
                                                <input id="expBox0" 
                                                    class="custom-control-input" 
                                                    type="checkbox"
                                                    v-model="selectAll" 
                                                    @click="select">
                                                <label class="custom-control-label" for="expBox0"></label>
                                            </div>
                                        </th>
                                        <th style="width:25%">Title
                                            <span v-if="!orderLoading"
                                                @click="onOrderBy('title')"
                                                class="cursor-pointer " 
                                                :class="(order == 'DESC') 
                                                    ? 'ti-arrow-down' 
                                                    :(order == 'ASC') ? 'ti-arrow-up'
                                                    : 'ti-exchange-vertical'">
                                            </span>
                                            <span v-if="orderLoading">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true"></span>
                                            </span>
                                        </th>
                                        <th class="text-center" style="width: 20%">Author
                                            <span v-if="!authorLoading && filter_by=='author'"
                                                @click="removeFilter()"
                                                class="cursor-pointer ti-close">
                                            </span>
                                            <span v-if="authorLoading">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true"></span>
                                            </span>
                                        </th>
                                        <th class="text-center" style="width: 10%">Cruises No.</th>
                                        <th class="text-center" style="width: 15%">Date</th>
                                        <th class="text-center" style="width: 10%">Actions</th>
                                    </tr>
                                </thead>

                                <tbody v-if="dataLoading">
                                    <tr>
                                        <td colspan="6" class="text-center">
                                            <div class="spinner-grow" role="status">
                                              <span class="sr-only">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && !rows.length">
                                    <tr>
                                        <td colspan="6" class="text-center">
                                            <span>No results found.</span>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && rows.length">
                                    <tr v-for="(row, index) in rows" 
                                        :key="index" 
                                        class="f14">
                                    
                                    <td class="font-weight-semi-bold">
                                        <div class="custom-control custom-checkbox">
                                            <input :id="'expBox'+row.id" 
                                                class="custom-control-input" 
                                                type="checkbox" 
                                                v-model="selected" :value="row.id">
                                            <label class="custom-control-label" :for="'expBox'+row.id">
                                            </label>
                                        </div>
                                    </td>

                                    <td class="font-weight-semi-bold">
                                        <router-link v-if="permissions.edit"
                                            :to="{ name: 'edit-'+refs, 
                                                params:{id:row.encrypt_id} }" 
                                            class="default-color text-decoration-hover">
                                            {{ row.title }} 
                                        </router-link>
                                        <span v-if="!permissions.edit">{{ row.title }}</span>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        <span v-if="!row.user" class="text-center"> - </span>
                                        <router-link v-if="row.user" 
                                            :to="{ name: 'filter-'+refs, 
                                                params:{filter_by:'author', filter:row.user.encrypt_id}}" 
                                            class="text-decoration-hover black">
                                            <div v-if="row.user" class="align-items-center">
                                                <img class="u-avatar-xs rounded-circle mr-2"
                                                    :src="row.user.image.image_url">
                                                <span class="media-body">{{ row.user.name }}</span>
                                            </div>
                                        </router-link>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        {{ row.cruises_no }}
                                    </td>

                                    <td v-html="(row.deleted_at) ? row.deleted_at : 
                                                (row.updated_at) ? row.updated_at : row.created_at"
                                        class="font-weight-semi-bold text-center f12">
                                    </td>

                                    <td class="text-center">
                                        <div class="dropdown">
                                            <a id="tableWithImage1MenuInvoker" 
                                                class="u-icon-sm link-muted" 
                                                href="javascript:;" 
                                                role="button" 
                                                aria-haspopup="true" 
                                                aria-expanded="false"
                                                data-toggle="dropdown"
                                                data-offset="8">
                                                <span v-if="!row.loading" class="ti-more"></span>
                                                <span v-if="row.loading" 
                                                    class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true">
                                                </span>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right" 
                                                style="width: 150px">
                                                <div class="card border-0 p-3">
                                                    <ul class="list-unstyled mb-0">
                                                        <li v-if="permissions.edit && !row.trash">
                                                            <router-link
                                                                class="d-block link-dark"
                                                                :to="{ name: 'edit-'+refs, 
                                                                params:{id: row.encrypt_id}}">
                                                                Edit
                                                            </router-link>
                                                        </li>
                                                        <li v-if="permissions.edit && !row.trash">
                                                            <a @click="row.loading = true; 
                                                                inactivate(row.id)"
                                                                v-html="(row.status) ? 'Inactive' : ''"
                                                                class="d-block link-dark" 
                                                                href="javascript:;">
                                                            </a>
                                                        </li>
                                                        <li v-if="permissions.delete && !row.trash">
                                                            <a @click="row.loading = true; 
                                                                activate(row.id)"
                                                                v-html="(!row.status) ? 'Active' : ''"
                                                                class="d-block link-dark" 
                                                                href="javascript:;">
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a v-if="permissions.delete && row.trash == 0" 
                                                                @click="row.loading = true; 
                                                                moveToTrash(row.id)"
                                                                class="d-block link-dark" href="javascript:;">Move to Trash
                                                            </a>
                                                            <a v-if="permissions.delete && row.trash == 1" 
                                                                @click="row.loading = true; 
                                                                restoreFromTrash(row.id)"
                                                                class="d-block link-dark" 
                                                                href="javascript:;">Restore
                                                            </a>
                                                            <a v-if="permissions.delete && row.trash == 1" 
                                                                @click="row.loading = true; 
                                                                deletePermanently(row.id)"
                                                                class="d-block link-dark" 
                                                                href="javascript:;">Delete Permanently
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>
                                            <div class="custom-control custom-checkbox">
                                                <input id="expBox0" class="custom-control-input" type="checkbox"
                                                    v-model="selectAll" @click="select">
                                                <label class="custom-control-label" for="expBox0"></label>
                                            </div>
                                        </th>
                                        <th>Title</th>
                                        <th class="text-center">Author</th>
                                        <th class="text-center">Cruises No.</th>
                                        <th class="text-center">Date</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>

                    <!-- Paginate -->
                    <nav  v-if="rows.length !== 0" aria-label="Page navigation example ui-mt20" 
                        style="margin-top: 20px">
                        <ul class="pagination">
                            <li v-bind:class="[{disabled: !pagination.prev_page_url}]" class="page-item">
                                <a class="page-link" href="javascript:" 
                                    @click="fetchData(pagination.prev_page_url, true)">Previous</a>
                            </li>
                            <li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item">
                                <a class="page-link" href="javascript:" 
                                    @click="fetchData(pagination.next_page_url, true)">Next</a>
                            </li>
                        </ul>
                        <p class="pull-right ui-mt-50 f13">
                            <i>Page {{ pagination.current_page }} or {{ pagination.last_page }}</i>
                        </p>
                    </nav>
                    <!-- End Paginate -->

                    </div>
                </div>
            </div>
            <!-- End Content Body -->

            <Footer></Footer>
        </div>
        <!-- Content -->

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
        name: 'List',
        components: {
            Header,
            Navigation,
            Footer
        },
        data(){
            return {
                exp: {
                   json_fields: {
                        'id': 'id',
                        'slug' : 'slug',
                        'title': 'title',
                        'body': 'body',
                        'timestamp': 'timestamp',
                    }, 
                    json_data: [],
                    json_meta: [
                        [{
                            'key': 'charset',
                            'value': 'utf-8'
                        }]
                    ],
                },
                auth: { 
                    role: '',
                    access_token: '',
                },
                permissions: {
                    add: false,
                    edit: false,
                    delete: false
                },
                statusBar: {
                    all: 0,
                    active: 0,
                    inactive: 0,
                    trash: 0,
                },
                //
                search: '',
                status: '',
                filter_by: '',
                filter: '',
                order: '',
                order_by: '',

                selected: [],
                selectAll: false,
                plural: '',

                dataLoading: true,
                bulkLoading: true,
                exportLoading: true,
                authorLoading: false,
                showLoading: false,
                orderLoading: false,
                something_went_wrong: false,
                rows: [],
                show: 10,
                pagination: {},

                // Tenants
                tenant_id: 0,
                tenant_name: 'All Tenants',
                tenantLoading: true,
                tenants: [],

                refs: 'cabins'
            }
        },
        mounted() {},
        watch: {
          $route() {
            // Status By
            if(this.$route.params.status) {
                this.status = this.$route.params.status;
            } else {
                this.status = '';
            }

            // Filters by
            if(this.$route.params.filter_by) {
                this.filter_by = this.$route.params.filter_by;
            }
            if(this.$route.params.filter) {
                this.filter = this.$route.params.filter;
            }

            this.fetchData('', true);
          }
        },
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

            // Status By
            if(this.$route.params.status) {
                this.status = this.$route.params.status;
            }

            // Filters by
            if(this.$route.params.filter_by) {
                this.filter_by = this.$route.params.filter_by;
            }
            if(this.$route.params.filter) {
                this.filter = this.$route.params.filter;
            }

            this.fetchTenants();
        },
        methods: {

            onSearchSubmit(value) {
                this.search = value;
                this.fetchData('', true);
            },

            onShow(show){
                this.showLoading = true;
                this.show = show;
                this.fetchData('', true);
            },

            onOrderBy(column){
                this.orderLoading = true;
                this.order_by = column;
                if(this.order == 'ASC') {
                    this.order = 'DESC';
                } else {
                    this.order = 'ASC';
                }
                this.fetchData('', true);
            },

            removeFilter(){
                this.authorLoading = true;
                this.filter = '';
                this.filter_by = '';
                this.$router.push({ name: this.refs });
            },

            changeTenant(id, name) {
                this.tenantLoading = true;
                this.tenant_id = id;
                this.tenant_name = name;
                localStorage.setItem('tenant_id', id);
                localStorage.setItem('tenant_name', name);
                this.fetchData('', true);
            },

            fetchTenants(){
                this.tenantLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/tenants',
                    method: 'GET',
                    data: {},
                    params: {
                        status: 'active',
                        paginate: 100
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.tenantLoading = false;
                        this.tenants = res.data.rows;

                        if(this.auth.role != 'root') {
                            if(!localStorage.getItem('tenant_id')) {
                                this.tenant_id = res.data.rows[0].id;
                                this.tenant_name = res.data.rows[0].name;
                            }
                        }
                        this.fetchData('', true); // fetch data
                    })
                    .catch(err => {
                        // 403 Forbidden
                        if(err.response && err.response.status == 401) {
                            this.removeLocalStorage();
                            this.$router.push({ name: 'login' });
                        } else if(err.response && err.response.status == 403) {
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

            // Fetch Data
            fetchData(page_url, loading=false) {
                if(loading) { this.dataLoading = true; }
                this.something_went_wrong = false;
                this.plural = '',
                this.selectAll = false;
                this.selected = [];

                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                let vm = this;
                const options = {
                    url: page_url || window.baseURL+'/'+this.refs,
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: this.status,
                        filter_by: this.filter_by,
                        filter: this.filter,
                        search: this.search,
                        paginate: this.show,
                        order: this.order,
                        order_by: this.order_by
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.dataLoading = false;
                        this.bulkLoading = false;
                        this.exportLoading = false;
                        this.showLoading = false;
                        this.orderLoading = false;
                        this.authorLoading = false;
                        this.tenantLoading = false;

                        this.statusBar.all = res.data.statusBar.all;
                        this.statusBar.active = res.data.statusBar.active;
                        this.statusBar.inactive = res.data.statusBar.inactive;
                        this.statusBar.trash = res.data.statusBar.trash;

                        this.permissions.add = res.data.permissions.add;
                        this.permissions.edit = res.data.permissions.edit;
                        this.permissions.delete = res.data.permissions.delete;

                        this.rows = res.data.rows;
                        if(res.data.paginate.total) {
                            vm.makePagination(res.data.paginate);
                        }

                        // Exception for 403
                        if(!res.data.permissions.view) {
                            this.$router.push({ name: 'forbidden' });
                        }
                    })
                    .catch(err => {
                        // 403 Forbidden
                        if(err.response && err.response.status == 401) {
                            this.removeLocalStorage();
                            this.$router.push({ name: 'login' });
                        } else if(err.response && err.response.status == 403) {
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

            // Fetch Export to Excel, CSV
            async fetchExport(){
                const res = await 
                    this.axios.post(window.baseURL+'/'+this.refs+'/export?id='+this.selected+'&tenant_id='+this.tenant_id);
                return res.data.rows;
            },
            startDownload(){
                this.exportLoading = true;
            },
            finishDownload(){
                this.exportLoading = false;
                iziToast.success({
                    icon: 'ti-check',
                    title: 'Great job,',
                    message: 'File Generated Successfully',
                });
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
        


        /** Bulk Actions **/
          // ON Select
          select() {
            this.selected = [];
              if (!this.selectAll) {
                for (let i in this.rows) {
                  this.selected.push(this.rows[i].id);
                }
              }
            },

            // Multi Update Status
            multiActive(){
                if(this.selected.length == 0) {
                    alert('No item(s) selected');
                } else {
                    this.plural = '(s)';
                    this.bulkLoading = true;
                    this.activate(this.selected.join());
                }
            },

            multiInactive(){
                if(this.selected.length == 0) {
                    alert('No item(s) selected');
                } else {
                    this.plural = '(s)';
                    this.bulkLoading = true;
                    this.inactivate(this.selected.join());
                }
            },

            // Update Status
            activate(id){
              this.axios.defaults.headers.common = {
                  'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                  'Authorization': `Bearer `+this.auth.access_token,
              };
              const options = {
                  url: window.baseURL+'/'+this.refs+'/active/'+id,
                  method: 'POST',
                  data: {},
              }
              this.axios(options)
                .then(() => {
                    this.fetchData();
                    iziToast.success({
                        icon: 'ti-check',
                        title: 'Great job,',
                        message: 'Item'+this.plural+' Activated Successfully'
                    });

                })
                .catch(() => {
                    this.fetchData();
                    iziToast.error({
                        icon: 'ti-na',
                        title: 'Wow-wow,',
                        message: 'Something went wrong',
                    });

                })
                .finally(() => {});
            },


            inactivate(id){
              this.axios.defaults.headers.common = {
                  'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                  'Authorization': `Bearer `+this.auth.access_token,
              };
              const options = {
                  url: window.baseURL+'/'+this.refs+'/inactive/'+id,
                  method: 'POST',
                  data: {},
              }
              this.axios(options)
                .then(() => {
                    this.fetchData();
                    iziToast.success({
                        icon: 'ti-check',
                        title: 'Great job,',
                        message: 'Item'+this.plural+' Inactivated Successfully'
                    });

                })
                .catch(() => {
                    this.fetchData();
                    iziToast.error({
                        icon: 'ti-na',
                        title: 'Wow-wow,',
                        message: 'Something went wrong',
                    });

                })
                .finally(() => {});
            },


            // Multi Move to Trash
            multiMoveToTrash(){
                if(this.selected.length == 0) {
                    alert('No item(s) selected');
                } else {
                    this.plural = '(s)';
                    this.bulkLoading = true;
                    this.moveToTrash(this.selected.join());
                }
            },
            // Move to Trash
            moveToTrash(id){
              this.axios.defaults.headers.common = {
                  'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                  'Authorization': `Bearer `+this.auth.access_token,
              };
              const options = {
                  url: window.baseURL+'/'+this.refs+'/trash/'+id,
                  method: 'POST',
                  data: {},
              }
              this.axios(options)
                .then(() => {
                    this.fetchData(); 
                    iziToast.success({
                        icon: 'ti-check',
                        title: 'Great job,',
                        message: 'Item'+this.plural+' Moved To Trash Successfully',
                    });
                  
                })
                .catch(() => {
                    this.fetchData(); 
                    iziToast.error({
                        icon: 'ti-na',
                        title: 'Wow-wow,',
                        message: 'Something went wrong',
                    });

                })
                .finally(() => {});
            },



            // Multi Restore from Trash
            multiRestoreFromTrash(){
                if(this.selected.length == 0) {
                    alert('No item(s) selected');
                } else {
                    this.plural = '(s)';
                    this.bulkLoading = true;
                    this.restoreFromTrash(this.selected.join());
                }
            },
            // Restore from Trash
            restoreFromTrash(id){
              this.axios.defaults.headers.common = {
                  'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                  'Authorization': `Bearer `+this.auth.access_token,
              };
              const options = {
                  url: window.baseURL+'/'+this.refs+'/restore/'+id,
                  method: 'POST',
                  data: {},
              }
              this.axios(options)
                .then(() => {
                  this.fetchData(); 
                  iziToast.success({
                      icon: 'ti-check',
                      title: 'Great job,',
                      message: 'Item'+this.plural+' Restored From Trash Successfully',
                  });
                })
                .catch(() => {
                    this.fetchData(); 
                    iziToast.error({
                        icon: 'ti-na',
                        title: 'Wow-wow,',
                        message: 'Something went wrong',
                    });
                })
                .finally(() => {});
            },



            // Multi Delete Permanently
            multiDeletePermanently(){
                if(this.selected.length == 0) {
                    alert('No item(s) selected');
                } else {
                    this.plural = '(s)';
                    this.bulkLoading = true;
                    this.deletePermanently(this.selected.join());
                }
            },

            // Delete Permanently
            deletePermanently(id) {
                if(confirm('Are You Sure?')) {
                    this.axios.defaults.headers.common = {
                        'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                        'Authorization': `Bearer `+this.auth.access_token,
                    };
                    const options = {
                        url: window.baseURL+'/'+this.refs+'/'+id,
                        method: 'DELETE',
                        data: {},
                    }
                  this.axios(options)
                    .then(() => {
                      this.fetchData(); 
                      iziToast.success({
                          icon: 'ti-check',
                          title: 'Great job,',
                          message: 'Item'+this.plural+' Deleted Permanently Successfully',
                      });
                        
                    })
                    .catch(() => {
                        this.fetchData(); 
                        iziToast.error({
                            icon: 'ti-na',
                            title: 'Wow-wow,',
                            message: 'Something went wrong',
                        });
                    })
                    .finally(() => {});
                } else { 
                    // In case Cancel Alert
                    this.fetchData(); 
                }
            },
        /** END Bulk Actions **/

        },
    }
</script>
