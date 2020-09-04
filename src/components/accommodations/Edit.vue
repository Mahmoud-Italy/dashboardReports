<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2">Accommodations
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
                                <router-link :to="{ name: 'accommodations' }">Accommodations</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


            <div v-if="pgLoading" class="row h-100">
                <div class="container text-center">
                    <div class="spinner-grow mt-5" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>

            <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

                <!-- Content -->
                <div class="tab-content">
                    <div class="row">    

                    <!-- ******* Cards ******* -->  
                    <div class="col-md-8 mb-5">

                        <!-- Card Accommodation -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabAccommodation" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Accommodation')"
                                            aria-expanded="false" 
                                            aria-controls="collapseAccommodation" 
                                            data-toggle="collapse"
                                            data-target="#collapseAccommodation">Accommodation
                                            <span id="iconToggleAccommodation" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    
                                    <div id="collapseAccommodation" 
                                            class="collapse show" 
                                            aria-labelledby="TabAccommodation" 
                                            data-parent="#accordion">

                                        <div class="col-12 pt-3">

                                            <!-- Name -->
                                            <div class="form-group">
                                                <label for="inputText1">Name</label>
                                                <input class="form-control"
                                                        id="inputText1"  
                                                        type="text" 
                                                        v-model="row.name">
                                            </div>
                                            <!-- Name -->
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card Accommodation -->


                        <!-- Card Prices -->
                        <div class="card mt-5">
                            <div class="card-body">
                                <div id="accordion" class="accordion">
                                    <div id="TabPrices" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Prices')"
                                            aria-expanded="false" 
                                            aria-controls="collapsePrices" 
                                            data-toggle="collapse"
                                            data-target="#collapsePrices">Prices
                                            <span id="iconTogglePrices" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapsePrices" 
                                        class="collapse" 
                                        aria-labelledby="TabPrices" 
                                        data-parent="#accordion">

                                        <div class="col-12 pt-3">

                                            <!-- For Loop -->
                                            <div v-for="i in row.price_key" 
                                                :key="i" 
                                                :id="'frm_'+i"
                                                class="ui-for-div">

                                                 <!-- Remove -->
                                                <div class="pull-right ui-mt-10">
                                                    <button v-if="i != 0"
                                                        type="button" 
                                                        class="btn btn-danger btn-circle btn-with-icon btn-sm"
                                                        @click="removeOption(i)">
                                                        <span class="btn-icon ti-close font-bold"></span>
                                                     </button>
                                                </div>
                                                <!-- End Remove -->

                                                <!-- Price Name -->
                                                <div class="form-group">
                                                    <label :for="'iInput'+i">Price Name</label>
                                                    <input class="form-control" 
                                                            :id="'iInput'+i" 
                                                            type="text" 
                                                            v-model="row.price_names[i]">
                                                </div>
                                                <!-- End Price Name -->

                                                
                                                <!-- Price Items -->
                                                <div v-for="x in 10" 
                                                    :key="x" 
                                                    :class="((prices_items_length[i-1])
                                                             ? x > prices_items_length[i-1]
                                                             : x > 1 )
                                                            ? 'hidden' : ''"
                                                    :id="'sub_'+i+'_'+x">

                                                    <div class="row col-12 ui-ml-unset">
                                                        <div class="form-group col-1"></div>
                                                        <div class="form-group col-5">
                                                            <label :for="'pvInput'+i+'_'+x">
                                                            Price Value</label>
                                                            <input class="form-control" 
                                                                :id="'pvInput'+i+'_'+x" 
                                                                type="text" 
                                                                v-model="row.price_item_values[i+'_'+x]">
                                                        </div>
                                                        <div class="form-group col-5">
                                                            <label :for="'pcInput'+i+'_'+x">Content</label>
                                                            <input class="form-control" 
                                                                :id="'pcInput'+i+'_'+x" 
                                                                type="text" 
                                                                v-model="row.price_item_body[i+'_'+x]">
                                                        </div>
                                                        <div class="form-group col-1">
                                                            <button type="button" 
                                                                v-if="x != 0"
                                                                @click="removeSubOption(i,x)"
                                                                class="btn btn-circle btn-with-icon ui-mt30">
                                                                <span class="btn-icon ti-close font-bold"></span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                                <!-- End Price Items -->

                                                <!-- Price add more -->
                                                <div class="form-group col-1">
                                                    <button type="button" 
                                                        @click="opnSub(i)"
                                                        class="btn btn-secondary btn-circle btn-with-icon ui-mt30 ui-ml-20">
                                                        <span class="btn-icon ti-plus font-bold"></span>
                                                    </button>
                                                </div>
                                                <!-- End Price add more -->

                                            </div>

                                            <!-- Add more -->
                                            <div class="row pull-right">
                                                <button type="button" 
                                                    class="btn btn-dark btn-circle btn-with-icon"
                                                    @click="opnFrm()">
                                                    <span class="btn-icon ti-plus font-bold"></span>
                                                </button>
                                            </div>
                                            <!-- End more -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Card Prices -->

                    </div>
                    <!-- ******* End Cards ******* -->  



                    <!-- ******* Navbar ******** -->
                    <div class="col-md-4 mb-5">

                        <!-- Nav Hotels -->
                        <div class="card">
                            <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavHotels" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Hotels')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavHotels" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavHotels">Multiple Hotels
                                            <span id="iconToggleHotels" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>

                                    <div id="collapseNavHotels" 
                                        class="collapse" 
                                        aria-labelledby="NavHotels" 
                                        data-parent="#accordionNav">

                                        <div class="col-12 pt-3">
                                            <div class="form-group">
                                                <div v-if="hotelLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <multiselect v-if="!hotelLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.hotelsValues" 
                                                    :options="hotelsOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search hotels"
                                                    :preselect-first="false">
                                                </multiselect>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Nav Hotels -->

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
                    <!-- ******* End Navbar ******** -->

                    </div>
                </div>
                <!-- End Content -->
                    
                    <!-- Button -->
                    <div class="col-md-12 row">
                        <div class="form-group mr-2">
                            <button class="btn btn-primary" :disabled="btnLoading">
                                <span v-if="btnLoading">
                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" aria-hidden="true">
                                    </span>Loading...
                                </span>
                                <span v-if="!btnLoading" class="ti-check-box"></span>
                                <span v-if="!btnLoading"> Update Accommodation</span>
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
                    <!-- Button -->

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
    import Multiselect from 'vue-multiselect';
    import iziToast from 'izitoast';
    
    export default {
        name: 'Edit',
        components: {
            Header,
            Navigation,
            Footer,
            Multiselect
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
                    name: '',

                    // prices & items
                    price_key: 0,
                    prices: [],
                    items: [],
                    item_key: [],
                    price_names: [],
                    price_item_values: [],
                    price_item_body: [],

                    // hotels
                    hotelsValues: [],

                    // status & visibility
                    status: 1,
                },
                hotelsOptions: [],
                hotelLoading: true,

                prices_length: [],
                prices_items_length: [],

                pgLoading: true,
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

            this.fetchRow();
        },
        methods: {

            // fetchRow
            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/accommodations/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;

                    // row
                    this.row.name = res.data.row.name;

                    // price & items
                    this.prices_length = res.data.row.prices;
                    this.row.price_key = this.prices_length.length;
                    if(this.prices_length) {
                        for(let i = 1; i <= this.prices_length.length; i++) {
                            let x = i-1;
                            this.row.price_names[i] = res.data.row.prices[x].name;
                            this.row.item_key[i] = res.data.row.prices[x].items.length;
                            
                            this.prices_items_length[x] = res.data.row.prices[x].items.length;
                            for( let y = 1; y <= res.data.row.prices[x].items.length; y++) {
                                let z = y-1;
                                this.row.price_item_values[i+'_'+y] 
                                        = res.data.row.prices[x].items[z].price_value;
                                this.row.price_item_body[i+'_'+y] 
                                        = res.data.row.prices[x].items[z].body;
                            }
                        }
                    }

                    // hotels
                    this.row.hotelsValues = (res.data.row.hotelsValues) ? res.data.row.hotelsValues : null;

                    // status & visiblity
                    this.row.status = res.data.row.status;

                    // call fetchHotels func                    
                    this.fetchHotels();
                    })
                    .catch((err) => { console.log('err' + err) })
                    .finally(() => {});
            },

            // fetchHotels
            fetchHotels(){
                this.hotelLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/hotels',
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                        this.hotelLoading = false;
                        this.hotelsOptions = res.data.hotels;
                    })
                    .catch(() => {})
                    .finally(() => {});
            },


            // editRow
            editRow(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };

                // Multi dimension array
                for( let i = 1; i < this.row.price_names.length; i++ ) {
                        for( let x = 1; x <= 10; x++) {
                        let item_value = this.row.price_item_values[i+'_'+x];
                        let item_body  = this.row.price_item_body[i+'_'+x];
                        if(item_value) {
                            this.row.items[x] = {
                                'item_value' : item_value,
                                'item_body'  : item_body
                            }
                        }
                    }
                    this.row.prices[i] = {
                        'price_name' : this.row.price_names[i],
                        'items'      : this.row.items
                    }
                    this.row.items = []; // clear array
                }
                
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/accommodations/'+this.$route.params.id,
                    method: 'PUT',
                    data: {
                        // row
                        name: this.row.name,

                        // price & items
                        prices: this.row.prices,

                        // hotels
                        hotels: this.row.hotelsValues,

                        // status & visibility
                        status: this.row.status,
                    }
                }
                this.axios(options, config)
                    .then(() => {
                        this.btnLoading = false;
                        iziToast.success({
                            icon: 'ti-check',
                            title: 'Great job,',
                            message: 'Item Updated Successfully.',
                        });
                        this.$router.push({ name: 'accommodations' })
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

            // add more
            opnFrm() {
                this.row.price_key++;
                this.row.item_key[this.row.price_key] = 0;
            },
            removeOption(i) {
                document.querySelector('#frm_'+i).remove();
                this.row.price_names[i] = '';
                this.row.item_key[i] = '';
                // this.row.price_key--; // makes issue

                // clear all sub
                let n = [1,2,3,4,5,6,7,8,9,10];
                n.forEach(x => {
                    this.row.price_item_values[i+'_'+x] = '';
                    this.row.price_item_body[i+'_'+x] = '';
                });
            },
            opnSub(i) {
                if(this.row.item_key[i] == 0) {
                    this.row.item_key[i] = 2; // default in case new element...
                } else {
                    this.row.item_key[i] += 1;
                }
                document.querySelector('#sub_'+i+'_'+this.row.item_key[i]).classList.remove('hidden');
            },
            removeSubOption(i,x) {
                document.querySelector('#sub_'+i+'_'+x).classList.add('hidden');
                this.row.price_item_values[i+'_'+x] = '';
                this.row.price_item_body[i+'_'+x] = '';
                this.row.item_key[i] -= 1;
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
            },

            // remove sessions
            removeLocalStorage() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_image');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
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
                    this.$router.push({ name: 'accommodations' });
                }
            },

        },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
