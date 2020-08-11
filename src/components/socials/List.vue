<template>
    <div class="">
        <Header v-on:headerToChild="onSearchSubmit"></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">

                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Articles
                       <!--  v-if="permission.hasCreate"  -->
                        <router-link 
                            :to="{ name: 'create-destinations' }" 
                            class="btn btn-primary btn-sm btn-pill ui-mt-10 ui-mb-2">
                            <span>Add New</span>
                        </router-link>

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
                            <li class="breadcrumb-item active" aria-current="page">
                                Destinations 
                                <!-- <span v-if="dataLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true">
                                    </span>
                                </span>
                                <span v-if="!dataLoading && rows.length" class="f12">
                                    {{rows.length}}
                                </span> -->
                            </li>
                        </ol>
                    
                    <!-- Build Action button -->
                    <div class="pull-rights ui-mt-50 pull-right ">
                        <div class="dropdown display-flex-inline">
                            <div class="dropdown ui-mr5">
                                <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" :disabled="bulkLoading">
                                    <span v-if="!bulkLoading">Bulk Actions</span>
                                    <span v-if="bulkLoading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true"></span>Loading...
                                    </span>
                                </button>
                                <div class="dropdown-menu">
                                    <a v-if="status == 'inactive' || status == ''"
                                        @click="multiActive()"
                                        class="dropdown-item" href="javascript:;">Active
                                    </a>
                                    <a v-if="status == 'active' || status == ''"
                                        @click="multiInactive()"
                                        class="dropdown-item" href="javascript:;">Inactive
                                    </a>
                                    <!--  && permission.hasDestroy" -->
                                    <a v-if="status != 'trash'"
                                        @click="multiMoveToTrash()"
                                        class="dropdown-item" href="javascript:;">Move to Trash
                                    </a>

                                    <a v-if="status == 'trash'"
                                        @click="multiRestoreFromTrash()"
                                        class="dropdown-item" href="javascript:;">Restore
                                    </a>
                                    <a v-if="status == 'trash'"
                                        @click="multiDeletePermanently()"
                                        class="dropdown-item" href="javascript:;">Delete Permanently
                                    </a>
                                </div>
                            </div>

                            <div class="dropdown">
                                <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                                    :disabled="exportLoading"><span v-if="!exportLoading">Export</span>
                                    <span v-if="exportLoading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true"></span>Loading...
                                    </span>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <download-excel
                                        class = "dropdown-item cursor-pointer"
                                        :fetch = "fetchExport"
                                        :fields = "exp.json_fields"
                                        :before-generate = "startDownload"
                                        :before-finish = "finishDownload"
                                        worksheet = "Destinations"
                                        name = "Destinations.xls">Excel
                                    </download-excel>
                                    <download-excel
                                        class = "dropdown-item cursor-pointer"
                                        :fetch = "fetchExport"
                                        :fields = "exp.json_fields"
                                        :before-generate = "startDownload"
                                        :before-finish = "finishDownload"
                                        type = "csv"
                                        worksheet = "Destinations"
                                        name = "Destinations.xls">CSV
                                    </download-excel>
                                    <a class="dropdown-item" href="javascript:;" v-print="'#printMe'">Print</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <!-- End Breadcrumb -->

                <!-- Card -->
                <div class="card">
                    <header class="card-header">
                        <h2 class="h4 card-header-title">
                            <router-link class="pg-hd"
                                :to="{ name: 'destinations' }"
                                :class="(this.status == '') ? 'active' : '' ">All</router-link> 
                            <span class="pg-hd no-decoration f14"> ({{count_all}}) </span> &nbsp;|&nbsp; 

                            <router-link class="pg-hd"
                                :to="{ name: 'status-destinations', params:{status: 'active'} }" 
                                :class="(this.status == 'active') ? 'active' : '' ">Active</router-link>
                            <span class="pg-hd no-decoration f14"> ({{count_active}}) </span> &nbsp;|&nbsp; 

                            <router-link class="pg-hd"
                                :to="{ name: 'status-destinations', params:{status: 'inactive'} }" 
                                :class="(this.status == 'inactive') ? 'active' : '' ">Inactive</router-link>
                            <span class="pg-hd no-decoration f14"> ({{count_inactive}}) </span> &nbsp;|&nbsp; 

                            <router-link class="pg-hd"
                                :to="{ name: 'status-destinations', params:{status: 'trash'} }" 
                                :class="(this.status == 'trash') ? 'active' : '' ">Trash</router-link>
                            <span class="pg-hd no-decoration f14"> ({{count_trash}}) </span>


                            <!-- Show Entries -->
                            <div class="dropdown pull-right ui-mt-10">
                                <button type="button" class="btn btn-light btn-sm dropdown-toggle" 
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span>Show</span>
                                    <span v-if="!showLoading"> {{ show }}</span>
                                    <span v-if="showLoading">
                                        <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true"></span>
                                    </span>
                                </button>
                                <div class="dropdown-menu ui-min-w100" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item cursor-pointer"
                                        :class="(this.show == 10) ? 'active' : ''"
                                        @click="onShow(10)">10
                                    </a>
                                    <a class="dropdown-item cursor-pointer"
                                        :class="(this.show == 25) ? 'active' : ''"
                                        @click="onShow(25)">25
                                    </a>
                                    <a class="dropdown-item cursor-pointer"
                                        :class="(this.show == 50) ? 'active' : ''"
                                        @click="onShow(50)">50
                                    </a>
                                    <a class="dropdown-item cursor-pointer"
                                        :class="(this.show == 100) ? 'active' : ''"
                                        @click="onShow(100)">100
                                    </a>
                                </div>
                            </div>
                            <!-- End Show Entries -->

                        </h2>
                    </header>
                    <!-- End Card Header -->

                    <!-- Crad Body -->
                    <div class="card-body pt-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">
                                            <div class="custom-control custom-checkbox">
                                                <input id="expBox0" class="custom-control-input" type="checkbox"
                                                    v-model="selectAll" @click="select">
                                                <label class="custom-control-label" for="expBox0"></label>
                                            </div>
                                        </th>
                                        <th style="width:30%">Title
                                            <span v-if="!orderLoading"
                                                @click="onOrderBy('title')"
                                                class="cursor-pointer " 
                                                :class="(this.order == 'DESC') 
                                                        ? 'ti-arrow-down' 
                                                        :(this.order == 'ASC') ? 'ti-arrow-up'
                                                        : 'ti-exchange-vertical'">
                                            </span>
                                            <span v-if="orderLoading">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true"></span>
                                            </span>
                                        </th>
                                        <th class="text-center" style="width: 10%">Destination</th>
                                        <th class="text-center" style="width: 20%">Author</th>
                                        <th class="text-center" style="width: 15%">No. Packages</th>
                                        <th class="text-center" style="width: 15%">Date</th>
                                        <th class="text-center" style="width: 10%">Actions</th>
                                    </tr>
                                </thead>

                                <tbody v-if="dataLoading">
                                    <tr>
                                        <td colspan="7" class="text-center">
                                            <div class="spinner-grow" role="status">
                                              <span class="sr-only">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                                <tbody v-if="!dataLoading && !rows.length">
                                    <tr>
                                        <td colspan="7" class="text-center">
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
                                        <!-- v-if="permission.hasEdit"  -->
                                        <router-link 
                                                :to="{ name: 'edit-destinations', params:{id: row.id} }" 
                                                class="default-color text-decoration-hover">
                                            {{ row.title }} 
                                        </router-link>
                                        <!-- <span v-if="!permission.hasEdit">{{ row.title }}</span> -->
                                    </td>

                                
                                    <td class="font-weight-semi-bold text-center">
                                        <router-link :to="{ name: 'filter-destination', 
                                            params:{filter_by: 'region', 'filter':row.region} }" 
                                            class="text-decoration-hover">
                                            <span class="badge badge-md badge-pill badge-danger-soft">
                                                {{ row.region.title }}
                                            </span>
                                        </router-link>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        <span v-if="!row.user" class="text-center"> - </span>
                                        <router-link v-if="row.user" 
                                            :to="{ name: 'filter-destination', 
                                                params:{filter_by: 'author', 'filter':row.user.id}}" 
                                            class="text-decoration-hover black">
                                            <div v-if="row.user" class="align-items-center">
                                                <img class="u-avatar-xs rounded-circle mr-2"
                                                    src="/assets/img/default_avatar.png">
                                                <span class="media-body">{{ row.user.name }}</span>
                                            </div>
                                        </router-link>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        <span> 0 </span>
                                    </td>

                                    <td v-html="(row.deleted_at) ? row.deleted_at : 
                                                (row.updated_at) ? row.updated_at : row.created_at"
                                        class="font-weight-semi-bold text-center f12">
                                    </td>

                                    <td class="text-center">
                                        <div class="dropdown">
                                            <a id="tableWithImage1MenuInvoker" class="u-icon-sm link-muted" 
                                                href="javascript:;" role="button" aria-haspopup="true" aria-expanded="false"
                                                data-toggle="dropdown"
                                                data-offset="8">
                                                <span v-if="!row.loading" class="ti-more"></span>
                                                <span v-if="row.loading" class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true">
                                                </span>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right" style="width: 150px">
                                                <div class="card border-0 p-3">
                                                    <ul class="list-unstyled mb-0">
                                                        <li v-if="!row.trash">
                                                            <!-- v-if="permission.hasEdit" -->
                                                            <router-link 
                                                                class="d-block link-dark"
                                                                :to="{ name: 'edit-destinations', 
                                                                params:{id: row.id}}">
                                                                Edit
                                                            </router-link>
                                                        </li>
                                                        <li v-if="!row.trash">
                                                            <a @click="row.loading = true; 
                                                                inactivate(row.id)"
                                                                v-html="(row.status) ? 'Inactive' : ''"
                                                                class="d-block link-dark" href="javascript:;">
                                                            </a>
                                                        </li>
                                                        <li v-if="!row.trash">
                                                            <a @click="row.loading = true; 
                                                                activate(row.id)"
                                                                v-html="(!row.status) ? 'Active' : ''"
                                                                class="d-block link-dark" href="javascript:;">
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <!-- permission.hasDestroy -->
                                                            <a v-if="row.trash == 0" 
                                                                @click="row.loading = true; 
                                                                moveToTrash(row.id)"
                                                                class="d-block link-dark" href="javascript:;">Move to Trash
                                                            </a>
                                                            <a v-if="row.trash == 1" 
                                                                @click="row.loading = true; 
                                                                restoreFromTrash(row.id)"
                                                                class="d-block link-dark" href="javascript:;">Restore
                                                            </a>
                                                            <a v-if="row.trash == 1" 
                                                                @click="row.loading = true; 
                                                                deletePermanently(row.id)"
                                                                class="d-block link-dark" href="javascript:;">Delete Permanently
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
                                        <th class="text-center">Destination</th>
                                        <th class="text-center">Author</th>
                                        <th class="text-center">No. Packages</th>
                                        <th class="text-center">Date</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>

                        <nav  v-if="rows.length !== 0" aria-label="Page navigation example ui-mt20">
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
                        'title': 'title',
                        'body': 'body',
                        'created_at': 'created_at',
                    }, 
                    json_data: [],
                    json_meta: [
                        [
                            {
                                'key': 'charset',
                                'value': 'utf-8'
                            }
                        ]
                    ],
                },
                auth: { 
                    role: '',
                    access_token: '',
                },
                permission: {
                    hasCreate: '',
                    hasEdit: '',
                    hasDestroy: '',
                },
                //
                count_all: 0,
                count_active: 0,
                count_inactive: 0,
                count_trash: 0,

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
                bulkLoading: false,
                exportLoading: false,
                sortLoading: false,
                showLoading: false,
                orderLoading: false,
                something_went_wrong: false,
                rows: [],
                show: 10,
                pagination: {},
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

            this.fetchData('', true);
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
                if(this.order == 'DESC') {
                    this.order = 'ASC';
                } else {
                    this.order = 'DESC';
                }
                this.fetchData('', true);
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
                    url: page_url || window.baseURL+'/destinations',
                    method: 'GET',
                    data: {},
                    params: {
                        status: this.status,
                        filter_by: this.filter_by,
                        filter: this.filter,
                        search: this.search,
                        show: this.show,
                        order: this.order,
                        order_by: this.order_by
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.dataLoading = false;
                        this.bulkLoading = false;
                        this.showLoading = false;
                        this.orderLoading = false;

                        this.count_all = res.data.all;
                        this.count_active = res.data.active;
                        this.count_inactive = res.data.inactive;
                        this.count_trash = res.data.trash;

                        this.rows = res.data.rows;
                        if(res.data.pagiante.total) {
                            this.total_data = res.data.pagiante.total;
                            vm.makePagination(res.data.pagiante)
                        }
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
                    this.axios.post(window.baseURL+'/destinations/export?id='+this.selected);
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
                  url: window.baseURL+'/destinations/active/'+id,
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
                  url: window.baseURL+'/destinations/inactive/'+id,
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
                  url: window.baseURL+'/destinations/trash/'+id,
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
                  url: window.baseURL+'/destinations/restore/'+id,
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
                        url: window.baseURL+'/destinations/'+id,
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
