<template>
    <div class="">
        
      <Header></Header>

        <div class="page-container">

            <!-- Content Wrapper START -->
            <div class="main-content">
                <div class="container-fluid">
                    <div class="page-header">
                        <!-- Title -->
                        <h2 class="header-title">Categories</h2>
                        <router-link :to="{ name: 'categories' }" 
                            class="btn btn-primary btn-rounded btn-bold btn-opacity">Back
                        </router-link>

                        <!-- Role -->
                        <label class="badge badge-success-soft badge-xl btn-rounded btn-bold pull-right">
                            {{ auth.role }}
                        </label>

                        <div class="clearfix"></div>
                        <!-- Breadcrumb -->
                        <nav class="breadcrumb breadcrumb-dash">
                            <router-link :to="{ name: 'dashboard' }" 
                                class="breadcrumb-item">
                                <i class="ti-home p-r-5"></i>Dashboard
                            </router-link>
                            <router-link :to="{ name: 'categories' }" 
                                class="breadcrumb-item">Categories
                            </router-link>
                            <span class="breadcrumb-item active">Edit</span>
                        </nav>
                       
                    </div>  

                        
                    <form @submit.prevent="editRow" enctype="multipart/form-data"> 

                        <div class="row">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="row">
                                    

                        <div class="card-body">
                            <div class="row">

                                <div v-if="pgLoading" class="col-md-11 ml-auto mr-auto text-center">
                                    <div class="loader mt50 ml-25"></div>  
                                </div>

                                <div v-if="!pgLoading" class="col-md-11 ml-auto mr-auto">

                                    <div class="tab-danger">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li class="nav-item">
                                                <a href="#tab-english" 
                                                    class="nav-link active show" 
                                                    role="tab" 
                                                    data-toggle="tab" 
                                                    aria-selected="false">English</a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#tab-arabic" 
                                                    class="nav-link" 
                                                    role="tab" 
                                                    data-toggle="tab" 
                                                    aria-selected="true">Arabic</a>
                                            </li>
                                        </ul>

                                        <div class="tab-content">
                                            <div role="tabpanel" 
                                                class="tab-pane fade active show" 
                                                id="tab-english">

                                                <div class=" p-v-20">
                                                    <div class="form-group">
                                                        <label class="control-label">Slug</label>
                                                        <input type="text" 
                                                            class="form-control" 
                                                            v-model="row.slug_en">
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label">Name</label>
                                                        <input type="text"
                                                            class="form-control" 
                                                            v-model="row.name_en">
                                                    </div>
                                                </div>

                                            </div>

                                            <div role="tabpanel" 
                                                class="tab-pane fade in" 
                                                id="tab-arabic">
                                                
                                                <div class=" p-v-20">
                                                    <div class="form-group">
                                                        <label class="control-label">Slug</label>
                                                        <input type="text" 
                                                            class="form-control" 
                                                            v-model="row.slug_ar">
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label">Name</label>
                                                        <input type="text"
                                                            class="form-control" 
                                                            v-model="row.name_ar">
                                                    </div>
                                                </div>

                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div class="row p-t-20">
                                        <div class="form-group col-6">
                                            <label class="control-label">Parent</label>
                                            <select class="form-control" 
                                                    v-model="row.parent_id">
                                                <option value="null">No Parent</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-6">
                                            <label class="control-label">Position</label>
                                            <input type="number"
                                                    class="form-control" 
                                                    v-model="row.position">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="m-b-10">  
                                           <label class="control-label">Status</label>
                                        </div>   
                                        <div class="radio d-inline m-r-15">
                                            <input id="statusRadio1" 
                                                   type="radio"
                                                   v-model="row.status" 
                                                   value="true"
                                                   :checked="row.status">
                                            <label for="statusRadio1">Active</label>
                                        </div>
                                        <div class="radio d-inline m-r-15">
                                            <input id="statusRadio2" 
                                                   type="radio"
                                                   v-model="row.status" 
                                                   value="false"
                                                   :checked="row.status">
                                            <label for="statusRadio2">Inactive</label>
                                        </div>
                                    </div>
                                                     
                                    <div class="form-group p-t-20">
                                        <button class="btn btn-dark btn-size" :disabled="btnLoading">
                                            <span v-if="btnLoading">
                                                <div class="loader loader-xs loader-center"></div>
                                            </span>
                                            <span v-if="!btnLoading">Update</span>
                                        </button>
                                        <router-link :to="{ name: 'categories' }" :disabled="btnLoading"
                                            class="btn btn-default">Cancel
                                        </router-link>
                                    </div>                 
                                                   

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                    <div class="col-md-4">
                        <div class="card">

                            <div v-if="pgLoading" class="card-body text-center">
                                <div class="loader mt50 ml-25"></div>  
                            </div>

                            <div v-if="!pgLoading" class="card-body">
                                <div class="form-group">
                                    <label class="control-label">Image</label>
                                    <img src="" style="width: 100%;height: 200px">
                                    <input type="file" class="form-control border-0 p-l-0">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>


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
    name: 'Create',
    components: {
      Header,
      Footer
    },
    mounted() {},
    data() {
      return {
        //
        auth: {
            role: '',
            access_token: ''
        },
        row: {
            image: '',
            preview: '',

            slug_en: '',
            name_en: '',

            slug_ar: '',
            name_ar: '',
            status: false
        },

        btnLoading: false,
        pgLoading: false,
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

      this.fetchRow();
      //
    },
    methods: {
      //

      fetchRow(){
        this.pgLoading = true;
        this.axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
            'Authorization': `Bearer ` + this.auth.access_token,
        };
        const options = {
            url: window.baseURL+'/categories/'+this.$route.params.id,
            method: 'GET',
            data: {}
        }
        this.$axios(options)
            .then(res => {
                this.pgLoading = false;
                this.row.preview = res.data.row.image;
                            
                this.row.slug_en = res.data.row.en.slug;
                this.row.name_en = res.data.row.en.name;
                this.row.slug_ar = res.data.row.ar.slug;
                this.row.name_ar = res.data.row.ar.name;

                this.row.status  = res.data.row.status;
            })
            .catch(err => {
                // 403 Forbidden
                if(err.response && err.response.status == 403) {
                    this.removeLocalStorage()
                    this.$router.push({ name: 'forbidden' })
                } else {
                    this.pgLoading = false;
                    this.somethingWrong = true;
                }
            })
            .finally(() => {});
      },


      editRow() {
        this.btnLoading = true;
        this.axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
            'Authorization': `Bearer `,
        };
        const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
        const options = {
            url: window.baseURL+'/categories/store',
            method: 'POST',
            data: {
                // en
                en: {
                    slug: this.row.slug_en,
                    name: this.row.name_en
                },
                // ar
                ar: {
                    slug: this.row.slug_ar,
                    name: this.row.name_ar,
                },
                
                status: this.row.status
            }
        }
        
        this.$axios(options, config)
            .then(() => {
                this.btnLoading = false;
                iziToast.success({
                    icon: 'ti-check',
                    title: 'Great job,',
                    message: 'Item Added Successfully',
                });
                this.$router.push({ name: 'categories' })

            })
            .catch(err => {
                this.btnLoading = false;
                iziToast.warning({
                    icon: 'ti-alert',
                    title: 'Wow-man,',
                    message: 'Something went wrong '+err,
                });

            })
            .finally(() => { })
        },


        removeLocalStorage() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('role_id');
            localStorage.removeItem('username');
            localStorage.removeItem('avatar');
            localStorage.removeItem('id');
        },


    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
</style>