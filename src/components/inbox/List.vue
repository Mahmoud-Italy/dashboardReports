<template>
    <div class="">
        <Header v-on:headerToChild="onSearchSubmit"></Header>

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
                            <li class="breadcrumb-item active" aria-current="page">Inbox</li>
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
                                        class="dropdown-item" href="javascript:;">Seen
                                    </a>
                                    <a v-if="status == 'active' || status == ''"
                                        @click="multiInactive()"
                                        class="dropdown-item" href="javascript:;">Unseen
                                    </a>
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
                                <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" 
                                    id="dropdownMenuButton"
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
                                        worksheet = "Inbox"
                                        name = "Inbox.xls">Excel
                                    </download-excel>
                                    <download-excel
                                        class = "dropdown-item cursor-pointer"
                                        :fetch = "fetchExport"
                                        :fields = "exp.json_fields"
                                        :before-generate = "startDownload"
                                        :before-finish = "finishDownload"
                                        type = "csv"
                                        worksheet = "Inbox"
                                        name = "Inbox.xls">CSV
                                    </download-excel>
                                    <a class="dropdown-item" href="javascript:;" v-print="'#printMe'">Print</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <!-- End Breadcrumb -->

                <!-- Card -->
            <div class="row">
              <div class="col-md-12 mb-5">
                <div class="card">
                    <header class="card-header">
                        <h2 class="h4 card-header-title">
                            <router-link class="pg-hd"
                                :to="{ name: 'inbox' }"
                                :class="(status == '') ? 'active' : '' ">All</router-link> 
                            <span class="pg-hd no-decoration f14"> ({{statusBar.all}}) </span> &nbsp;|&nbsp; 

                            <router-link class="pg-hd"
                                :to="{ name: 'status-inbox', params:{status: 'active'} }" 
                                :class="(status == 'active') ? 'active' : '' ">Seen</router-link>
                            <span class="pg-hd no-decoration f14"> ({{statusBar.active}}) </span> &nbsp;|&nbsp; 

                            <router-link class="pg-hd"
                                :to="{ name: 'status-inbox', params:{status: 'inactive'} }" 
                                :class="(status == 'inactive') ? 'active' : '' ">Unseen</router-link>
                            <span class="pg-hd no-decoration f14"> ({{statusBar.inactive}}) </span> &nbsp;|&nbsp; 

                            <router-link class="pg-hd"
                                :to="{ name: 'status-inbox', params:{status: 'trash'} }" 
                                :class="(status == 'trash') ? 'active' : '' ">Trash</router-link>
                            <span class="pg-hd no-decoration f14"> ({{statusBar.trash}}) </span>


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
                                        <th style="width:20%">Name
                                            <span v-if="!orderLoading"
                                                @click="onOrderBy('name')"
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
                                        <th style="width: 20%">Email</th>
                                        <th class="text-center" style="width: 15%">Date</th>
                                        <th class="text-center" style="width: 10%">Actions</th>
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
                                        <router-link 
                                            :to="{ name:'show-inbox',params:{id:row.encrypt_id}}" 
                                            class="default-color text-decoration-hover">
                                            {{ row.name }} 
                                        </router-link>
                                    </td>

                                    <td class="font-weight-semi-bold">
                                        {{ row.email }}
                                    </td>

                                    <td v-html="(row.deleted_at) ? row.deleted_at : 
                                                (row.updated_at) ? row.updated_at : row.created_at"
                                        class="font-weight-semi-bold text-center f12">
                                    </td>

                                    <td class="text-center">
                                        <div class="dropdown">
                                            <a id="tableWithImage1MenuInvoker" 
                                                class="u-icon-sm link-muted" 
                                                href="javascript:;" role="button" aria-haspopup="true" aria-expanded="false"
                                                data-toggle="dropdown"
                                                data-offset="8">
                                                <span v-if="!row.loading" class="ti-more"></span>
                                                <span v-if="row.loading" class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true">
                                                </span>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right" 
                                                style="width: 150px">
                                                <div class="card border-0 p-3">
                                                    <ul class="list-unstyled mb-0">
                                                        <li v-if="!row.trash">
                                                            <router-link 
                                                                class="d-block link-dark"
                                                                :to="{ name: 'show-inbox', 
                                                                params:{id: row.encrypt_id}}">
                                                                Show
                                                            </router-link>
                                                        </li>
                                                        <li v-if="!row.trash">
                                                            <a @click="row.loading = true; 
                                                                inactivate(row.id)"
                                                                v-html="(row.status) ? 'Unseen' : ''"
                                                                class="d-block link-dark" href="javascript:;">
                                                            </a>
                                                        </li>
                                                        <li v-if="!row.trash">
                                                            <a @click="row.loading = true; 
                                                                activate(row.id)"
                                                                v-html="(!row.status) ? 'Seen' : ''"
                                                                class="d-block link-dark" href="javascript:;">
                                                            </a>
                                                        </li>
                                                        <li>
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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th class="text-center">Date</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>

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

                    </div>
                </div>
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
                        'name': 'name',
                        'email': 'email',
                        'body' : 'body',
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
                    access_token: '',
                },
                statusBar: {
                    all: 0,
                    active: 0,
                    inactive: 0,
                    trash: 0
                },
                //
                search: '',
                status: '',
                order: '',
                order_by: '',

                selected: [],
                selectAll: false,
                plural: '',

                dataLoading: true,
                bulkLoading: false,
                exportLoading: false,
                showLoading: false,
                orderLoading: false,
                btnLoading: false,
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

            this.fetchData('', true);
          }
        },
        created() {
            // AccessToken & Role
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }

            // Status By
            if(this.$route.params.status) {
                this.status = this.$route.params.status;
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
                if(this.order == 'ASC') {
                    this.order = 'DESC';
                } else {
                    this.order = 'ASC';
                }
                this.fetchData('', true);
            },

            // Fetch Data
            fetchData(page_url, loading=false) {
                if(loading) { this.dataLoading = true; }
                this.plural = '',
                this.selectAll = false;
                this.selected = [];

                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                let vm = this;
                const options = {
                    url: page_url || window.baseURL+'/inbox',
                    method: 'GET',
                    data: {},
                    params: {
                        status: this.status,
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

                        this.statusBar.all = res.data.statusBar.all;
                        this.statusBar.active = res.data.statusBar.active;
                        this.statusBar.inactive = res.data.statusBar.inactive;
                        this.statusBar.trash = res.data.statusBar.trash;

                        this.rows = res.data.rows;
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

            // Fetch Export to Excel, CSV
            async fetchExport(){
                const res = await 
                    this.axios.post(window.baseURL+'/inbox/export?id='+this.selected);
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
                  url: window.baseURL+'/inbox/active/'+id,
                  method: 'POST',
                  data: {},
              }
              this.axios(options)
                .then(() => {
                    this.fetchData();
                    iziToast.success({
                        icon: 'ti-check',
                        title: 'Great job,',
                        message: 'Item'+this.plural+' Seen Successfully'
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
                  url: window.baseURL+'/inbox/inactive/'+id,
                  method: 'POST',
                  data: {},
              }
              this.axios(options)
                .then(() => {
                    this.fetchData();
                    iziToast.success({
                        icon: 'ti-check',
                        title: 'Great job,',
                        message: 'Item'+this.plural+' Unseen Successfully'
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
                  url: window.baseURL+'/inbox/trash/'+id,
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
                  url: window.baseURL+'/inbox/restore/'+id,
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
                        url: window.baseURL+'/inbox/'+id,
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
