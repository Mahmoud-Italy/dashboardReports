<template>
    <div class="">

      <Header></Header>

        <div class="page-container">

            <!-- Content Wrapper START -->
            <div class="main-content">
              <div class="container-fluid">
                <div class="page-header">
                  
                  <h2 class="header-title">Categories</h2>
                  <router-link :to="{ name: 'create-categories' }" 
                      class="btn btn-primary btn-rounded btn-bold">Add New
                  </router-link>

                    <!-- Role -->
                    <label class="badge badge-success-soft badge-xl btn-rounded btn-bold pull-right">
                      {{ auth.role }}
                    </label>

                  <div class="clearfix"></div>
                  
                  <div class="pull-right">
                    <div class="dropdown">
                      <div class="dropdown">
                        <button type="button" data-toggle="dropdown" 
                            class="btn btn-danger dropdown-toggle btn-bold"
                            :disabled="bulkLoading">
                          <span v-if="!bulkLoading">Bulk Actions</span>
                          <span v-if="bulkLoading">
                            <div class="loader loader-xs"></div>
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
                        <button type="button" id="dropdownMenuButton" data-toggle="dropdown"
                            class="btn btn-info dropdown-toggle btn-bold">
                          <span>Export</span>
                        </button> 
                        <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
                          <div id="export_excel" class="dropdown-item cursor-pointer">Excel</div> 
                          <div id="export_csv" class="dropdown-item cursor-pointer">CSV</div> 
                          <a href="javascript:;" class="dropdown-item">Print</a>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                        
                  <!-- Breadcrumb -->
                  <nav class="breadcrumb breadcrumb-dash">
                    <router-link :to="{ name: 'dashboard' }" 
                          class="breadcrumb-item">
                          <i class="ti-home p-r-5"></i>Dashboard
                    </router-link>
                    <span class="breadcrumb-item active">Categories</span>
                  </nav>
                            
                </div>  

                <div class="card">

                  <!-- Status  -->
                  <div class="card-header">
                    <h5 class="card-title text-muted f14">

                      <router-link :to="{ name: 'categories' }"
                        :class="(this.status == '') ? 'active' : '' ">All</router-link> 
                      <span> ({{all}}) </span> <span class="obstacle"> | </span>

                      <router-link :to="{ name: 'status-categories', params:{ status:'active'} }"
                        :class="(this.status == 'active') ? 'active' : '' ">Active</router-link> 
                      <span> ({{active}}) </span> <span class="obstacle"> | </span>

                      <router-link :to="{ name: 'status-categories', params:{ status:'inactive'} }"
                        :class="(this.status == 'inactive') ? 'active' : '' ">Inactive</router-link> 
                      <span> ({{inactive}}) </span> <span class="obstacle"> | </span>

                      <router-link :to="{ name: 'status-categories', params:{ status:'trash'} }"
                        :class="(this.status == 'trash') ? 'active' : '' ">Trash</router-link> 
                      <span> ({{trash}}) </span>

                    </h5>

                    <!-- Show Entries -->
                    <div class="dropdown pull-right">

                      <div class="display-inline">
                        <button type="button" class="btn btn-light btn-sm dropdown-toggle" 
                              id="dropdownMenuButton4" data-toggle="dropdown">
                          <span>Show</span>
                          <span v-if="!showLoading"> {{ show }}</span>
                          <span v-if="showLoading">
                            <span class="spinner-grow spinner-grow-sm mr-1" 
                              role="status" aria-hidden="true"></span>
                          </span>
                        </button>
                        <div class="dropdown-menu ui-min-w120" aria-labelledby="dropdownMenuButton4">
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

                    </div>
                    <!-- End Show Entries -->

                    
                  </div>
                  
                  <div class="card-body">
                      <table class="table">
                        <thead>
                           <tr class="top-border-none">
                              <th scope="col" style="width: 5%">
                                <div class="checkbox">
                                  <input id="selectbl0" class="custom-control-input" 
                                         type="checkbox"
                                         v-model="selectAll" 
                                         @click="select">
                                  <label for="selectbl0"></label>
                                </div>
                              </th>
                              <th scope="col" style="width: 25%">Name</th>
                              <th scope="col" class="text-center" style="width: 15%">Parent</th>
                              <th scope="col" class="text-center" style="width: 15%">Projects No.</th>
                              <th scope="col" class="text-center" style="width: 20%">Author</th>
                              <th scope="col" class="text-center" style="width: 10%">Date</th>
                              <th scope="col" class="text-center" style="width: 10%">Actions</th>
                            </tr>
                        </thead>
                          
                          <!-- Loader -->
                          <tr v-if="dataLoading">
                            <td colspan="6" class="text-center">
                              <div class="loader loader-lg mtop20"></div>
                            </td>
                          </tr>

                          <!-- No data found -->
                          <tr v-if="!dataLoading && !rows.length">
                            <td colspan="6" class="text-center">
                                <span>No data found</span>
                            </td>
                          </tr>

                        <!-- Rows -->
                        <tbody v-if="!dataLoading && rows.length">
                          <tr v-for="(row, index) in rows" :key="index">

                            <td>
                              <div class="checkbox">
                                  <input :id="'selectbl'+row.id" class="custom-control-input" 
                                          type="checkbox" 
                                          v-model="selected" 
                                          :value="row.id">
                                  <label :for="'selectbl'+row.id"></label>
                              </div>
                            </td>

                            <td>{{ row.name }}</td>

                            <td class="text-center">
                              <label class="badge badge-danger-soft badge-xl btn-rounded">No Parent</label>
                            </td>

                            <td class="text-center">0</td>

                            <td>
                              <div class="list-media">
                                <div class="list-item">
                                  <div class="media-img">
                                    <img src="/assets/images/avatars/thumb-13.jpg" alt="">
                                  </div>
                                  <div class="info">
                                    <span class="title">Marshall Nichols</span>
                                    <span class="sub-title">Super admin</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            
                            
                            <td class="text-center">{{ row.dateForHumans }}</td>

                            <td class="text-center">
                              <div class="dropdown">
                                <a href="" data-toggle="dropdown" class="text-black f20">
                                  <span v-if="!row.loading" class="ti-more"></span> 
                                  <div v-if="row.loading" class="loader loader-xs" style="margin-top: -15px;margin-left: -12px"></div>
                                </a>
                                <div class="dropdown-menu ui-min-w120">
                                  <a v-if="!row.trash" href="javascript:;" 
                                        @click="editRow(row)"
                                        class="dropdown-item">Edit
                                  </a>
                                  <a v-if="!row.trash && row.status" 
                                      @click="row.loading = true; activate(row.id)"
                                      class="dropdown-item" href="javascript:;">Inactive
                                  </a>
                                  <a v-if="!row.trash && !row.status" 
                                      @click="row.loading = true; inactivate(row.id)"
                                      class="dropdown-item" href="javascript:;">Active
                                  </a>
                                  <a v-if="!row.trash" 
                                      @click="row.loading = true; moveToTrash(row.id)"
                                      class="dropdown-item" href="javascript:;">Move to Trash
                                  </a>
                                  <a v-if="row.trash" 
                                      @click="row.loading = true; restoreFromTrash(row.id)"
                                      class="dropdown-item" href="javascript:;">Restore
                                  </a>
                                  <a v-if="row.trash" 
                                      @click="row.loading = true; deletePermanently(row.id)"
                                      class="dropdown-item" href="javascript:;"> Delete Permanently
                                  </a>
                                </div>
                              </div>
                            </td>

                          </tr>
                        </tbody>

                      </table>

                      <nav  v-if="rows.length !== 0" aria-label="Page navigation example ui-mt20">
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
                            <p class="pull-right ui-mt-30 f13">
                                <i>Page {{ pagination.current_page }} or {{ pagination.last_page }}</i>
                            </p>
                      </nav>


                    </div>


                    
                </div>
              </div>
            </div>

          <Footer></Footer>
        </div>

  </div>
</template>

<script>
  import Header from '../layouts/Header.vue';
  import Footer from '../layouts/Footer.vue';
  import iziToast from 'izitoast';

  export default {
    name: 'List',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        // auth
        auth: {
          role: 'Super admin',
          access_token: '',
        },
        // headers
        all: 0,
        active: 0,
        inactive: 0,
        trash: 0,

        // extra
        selectAll: false,
        selected: [],
        plural: '',
        status: '',
        show: 10,
        rows: [],
        total_rows: 0,
        pagination: {},
        showLoading: false,
        bulkLoading: false,
        dataLoading: true,
        somethingWrong: false,
        //
      }
    },
    mounted() {},
    watch: {
      $route() {
        // status By
        if(this.$route.params.status) {
          this.status = this.$route.params.status;
        } else {
          this.status = '';
        }

        //
        this.fetchData('', true);
      }
    },
    computed: {},
    created() {
      // access_token & Role
      if(localStorage.getItem('access_token')) {
        this.auth.access_token = localStorage.getItem('access_token');
      }
      if(localStorage.getItem('role')) {
        this.auth.role = localStorage.getItem('role');
      }

      // status By
      if(this.$route.params.status) {
        this.status = this.$route.params.status;
      } else {
        this.status = '';
      }

      //
      this.fetchData('', true);
    },
    methods: {
      //

      fetchData(page_url, loading=false) {
          if(loading) {
            this.dataLoading = true;
          }

          this.somethingWrong = false;
          this.plural = '',
          this.selectAll = false;
          this.selected = [];

          this.axios.defaults.headers.common = {
              'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
              'Authorization': `Bearer ` + this.auth.access_token,
          };
          const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
          const options = {
              url: page_url || window.baseURL+'/categories',
              method: 'GET',
              data: {},
              params: {
                status: this.status,
                search: this.search,
                paginate: this.show,
                order_by: this.order_by,
              },
          }
          let vm = this;
          this.axios(options, config)
              .then(res => {
                  this.dataLoading = false;
                  this.sortLoading = false;
                  this.bulkLoading = false;
                  this.showLoading = false;
                  this.orderLoading = false;

                  // headers
                  this.all = res.data.all;
                  this.active = res.data.active;
                  this.inactive = res.data.inactive;
                  this.trash = res.data.trash;

                  // rows & paginate
                  this.rows = res.data.rows;
                  if(res.data.paginate.total) {
                    this.total_rows = res.data.paginate.total;
                    vm.makePagination(res.data.paginate)
                  }

              })
              .catch(err => {

                  // 403 Forbidden
                  if(err.response && err.response.status == 403) {
                    this.removeLocalStorage()
                    this.$router.push({ name: 'forbidden' })

                  } else {
                    this.dataLoading = false;
                    this.somethingWrong = true;

                    iziToast.warning({
                      icon: 'ti-ban',
                      title: 'Wow, man',
                      message: 'Slow down, '+err,
                    });
                  }

              })
              .finally(() => { })
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

            onSearchSubmit(value) {
                this.search = value;
                this.fetchData('', true);
            },

            onShow(show){
                this.showLoading = true;
                this.show = show;
                this.fetchData('', true);
            },

            onOrderBy(){
                this.orderLoading = true;
                if(this.order_by == 'DESC') {
                    this.order_by = 'ASC';
                } else {
                    this.order_by = 'DESC';
                }
                this.fetchData('', true);
            },

            removeLocalStorage() {
              localStorage.removeItem('access_token');
              localStorage.removeItem('role_id');
              localStorage.removeItem('username');
              localStorage.removeItem('avatar');
              localStorage.removeItem('id');
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
                  url: window.baseURL+'/categories/active/'+id,
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
                  url: window.baseURL+'/categories/inactive/'+id,
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
                  url: window.baseURL+'/categories/trash/'+id,
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
                  url: window.baseURL+'/categories/restore/'+id,
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
                        url: window.baseURL+'/categories/'+id,
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



      // Before Enter...
      // beforeRouteEnter (to, from, next) { 
      //   next(vm => { 
      //     next();
      //   }) 
      // },

      // Before Leaving..
      // beforeRouteLeave(to, from, next) { 
      //   if(this.row.title && !this.isSubmit) {
      //     const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      //       if (answer) {
      //         next()
      //       } else {
      //         next(false)
      //       }
      //   } else { next() }
      // },

  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
</style>