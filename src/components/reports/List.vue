<template>
    <div class="">
   
        <div class="u-body">
            <h1 class="h2 mb-2 text-capitalize"> Reports</h1>

                <!-- Breadcrumb -->
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'reports' }">Home</router-link>
                        </li>
                        <li class="breadcrumb-item text-capitalize active" aria-current="page">
                            Reports
                        </li>
                    </ol>
                </nav>
                <!-- End Breadcrumb -->


                <!-- Card -->
                <div class="card">


                    <!-- StatusBar -->
                    <header class="card-header">
                        <h2 class="h4 card-header-title">
                            <span class="pg-hd no-decoration f14"> All 
                                <span v-if="!dataLoading"> ( {{ total }} )</span>
                                <span v-if="dataLoading" 
                                        class="spinner-grow spinner-grow-sm mr-1" 
                                        role="status" 
                                        aria-hidden="true">
                                </span>
                            </span>


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


                            <div class="row filter" style="margin-top: 20px">
                                
                                <div class="col-md-2">
                                    <input type="text" 
                                            class="form-control" 
                                            placeholder="Search Bank Name"
                                            v-model="filter.bankName"
                                            v-on:keyup.enter="onSearch()">
                                </div>
                                <div class="col-md-2">
                                    <input type="text" 
                                            class="form-control" 
                                            placeholder="Search bank BICs"
                                            v-model="filter.bankBIC"
                                            v-on:keyup.enter="onSearch(1)">
                                </div>
                                <div class="col-md-2">
                                    <input type="text" 
                                            class="form-control" 
                                            placeholder="Score from"
                                            v-model="filter.score_from"
                                            v-on:keyup.enter="onSearch(1)">
                                </div>
                                <div class="col-md-2">
                                    <input type="text" 
                                            class="form-control" 
                                            placeholder="Score to"
                                            v-model="filter.score_to"
                                            v-on:keyup.enter="onSearch(1)">
                                </div>
                                <div class="col-md-2">
                                    <select class="form-control"
                                        v-model="filter.type"
                                        v-on:change="onSearch(1)">
                                        <option value="">Select Type</option>
                                        <option value="extended">Extended</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="primary">Primary</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <select class="form-control"
                                        v-model="filter.published"
                                        v-on:change="onSearch()">
                                        <option value="">Select Publish</option>
                                        <option value="1">Published</option>
                                        <option value="2">Not published yet</option>
                                    </select>
                                </div>
                                
                            </div>

                        </h2>
                    </header>
                    <!-- End StatusBar -->

                    

                    <!-- Body -->
                    <div class="card-body pt-0">
                        <div class="table-responsive">
                            <table id="printMe" class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">#</th>
                                        <th style="width: 10%">Bank Name
                                            <span v-if="!sortLoading"
                                                @click="sortBy('bankName')"
                                                class="cursor-pointer " 
                                                :class="(sort == 'DESC' && sort_by == 'bankName') 
                                                    ? 'ti-arrow-down' 
                                                    :(sort == 'ASC' && sort_by == 'bankName') 
                                                        ? 'ti-arrow-up'
                                                        : 'ti-exchange-vertical'">
                                            </span>
                                            <span v-if="sortLoading && sort_by == 'bankName'">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true"></span>
                                            </span>
                                        </th>
                                        <th class="text-center" style="width: 10%">Bank BIC
                                            <span v-if="!sortLoading"
                                                @click="sortBy('bankBIC')"
                                                class="cursor-pointer " 
                                                :class="(sort == 'DESC' && sort_by == 'bankBIC') 
                                                    ? 'ti-arrow-down' 
                                                    :(sort == 'ASC' && sort_by == 'bankBIC') 
                                                        ? 'ti-arrow-up'
                                                        : 'ti-exchange-vertical'">
                                            </span>
                                            <span v-if="sortLoading && sort_by == 'bankBIC'">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true"></span>
                                            </span>
                                        </th>
                                        <th class="text-center" style="width: 10%">Report Score
                                            <span v-if="!sortLoading"
                                                @click="sortBy('reportScore')"
                                                class="cursor-pointer " 
                                                :class="(sort == 'DESC' && sort_by == 'reportScore') 
                                                    ? 'ti-arrow-down' 
                                                    :(sort == 'ASC' && sort_by == 'reportScore') 
                                                        ? 'ti-arrow-up'
                                                        : 'ti-exchange-vertical'">
                                            </span>
                                            <span v-if="sortLoading && sort_by == 'reportScore'">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true"></span>
                                            </span>
                                        </th>
                                        <th class="text-center" style="width: 10%">Type
                                            <span v-if="!sortLoading"
                                                @click="sortBy('type')"
                                                class="cursor-pointer " 
                                                :class="(sort == 'DESC' && sort_by == 'type') 
                                                    ? 'ti-arrow-down' 
                                                    :(sort == 'ASC' && sort_by == 'type') 
                                                        ? 'ti-arrow-up'
                                                        : 'ti-exchange-vertical'">
                                            </span>
                                            <span v-if="sortLoading && sort_by == 'type'">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true"></span>
                                            </span>
                                        </th>
                                        <th class="text-center" style="width: 10%">Created at
                                            <span v-if="!sortLoading"
                                                @click="sortBy('createdAt')"
                                                class="cursor-pointer" 
                                                :class="(sort == 'DESC' && sort_by == 'createdAt') 
                                                    ? 'ti-arrow-down' 
                                                    :(sort == 'ASC' && sort_by == 'createdAt') 
                                                        ? 'ti-arrow-up'
                                                        : 'ti-exchange-vertical'">
                                            </span>
                                            <span v-if="sortLoading && sort_by == 'createdAt'">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" aria-hidden="true"></span>
                                            </span>
                                        </th>
                                        <th class="text-center" style="width: 10%">Published at
                                            <span v-if="!sortLoading"
                                                @click="sortBy('publishedAt')"
                                                class="cursor-pointer " 
                                                :class="(sort == 'DESC' && sort_by == 'publishedAt') 
                                                    ? 'ti-arrow-down' 
                                                    :(sort == 'ASC' && sort_by == 'publishedAt') 
                                                        ? 'ti-arrow-up'
                                                        : 'ti-exchange-vertical'">
                                            </span>
                                            <span v-if="sortLoading && sort_by == 'publishedAt'">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                </span>
                                            </span>
                                        </th>
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
                                        :key="index">
                                    
                                    <td class="font-weight-semi-bold">
                                        {{ index+1 }}
                                    </td>

                                    <td class="font-weight-semi-bold">
                                        {{ row.body.bankName }}
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        <label class="badge badge-primary btn-sm" 
                                            v-for="(bic, idx) in row.body.bankBIC"
                                            :key="idx">
                                            {{ bic }}
                                        </label>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        {{ row.body.reportScore }}
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        <span class="badge badge-danger btn-sm">
                                            {{ row.body.type }}
                                        </span>
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        {{ row.createdAt  | moment("DD-MM-YYYY \r HH:mm:ss") }}
                                    </td>

                                    <td class="font-weight-semi-bold text-center">
                                        {{ row.publishedAt | moment("DD-MM-YYYY \r HH:mm:ss") }}
                                    </td>

                                </tr>
                                
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Bank Name</th>
                                        <th class="text-center">Bank BIC</th>
                                        <th class="text-center">Report Score</th>
                                        <th class="text-center">Type</th>
                                        <th class="text-center">Created at</th>
                                        <th class="text-center">Published at</th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>

                        <!-- Paginate -->
                        <paginate v-if="!dataLoading && rows.length !== 0"
                            :page-count="pageCount"
                            :prev-text="'Prev'"
                            :next-text="'Next'"
                            :container-class="'pagination'"
                            :click-handler="fetchPaginate">
                        </paginate>
                        <!-- End Paginate -->

                    </div>
                </div>
            


                <div class="row" style="margin-top:30px">

                    <div class="col-md-8 mb-5">
                        <lineChart></lineChart>
                    </div>
                    <div class="col-md-4 mb-5">
                        <pieChart></pieChart>
                    </div>

                    <div class="col-md-12 mb-5">
                        <barChart></barChart>
                    </div>

                </div>

        </div>
        <!-- End Content Body -->

       
    </div>
</template>

<script>
    import iziToast from 'izitoast'

    export default {
        name: 'List',
        components: {
            pieChart:  () => import('./pieChart.vue'),
            lineChart: () => import('./lineChart.vue'),
            barChart:  () => import('./barChart.vue')
        },
        data(){
            return {

                // filter..
                filter: {
                    bankName: '',
                    bankBIC: '',
                    score_from: '',
                    score_to: '',
                    type: '',
                    published: '',
                },

                //
                sort: '',
                sort_by: '',
                dataLoading: true,
                showLoading: false,
                sortLoading: false,
                rows: [],
                show: 10,
                pageCount: 10,
                total: 0,
            }
        },
        mounted() {},
        watch: {},
        created() {
            //
            this.fetchData();
        },
        methods: {

            onSearch() {
                this.dataLoading = true;
                this.fetchData();
            },

            onShow(show){
                this.showLoading = true;
                this.show = show;
                this.pageCount = show;
                this.fetchData();
            },

            sortBy(column) {
                this.sortLoading = true;
                this.sort_by = column;
                if(this.sort == 'ASC') {
                    this.sort = 'DESC';
                } else {
                    this.sort = 'ASC';
                }
                this.fetchData();
            },

            fetchPaginate(page) {
                this.fetchData(page);
            },

        
            // Fetch Data
            fetchData(page=1, loading=false) {
                if(loading) {
                    this.dataLoading = true;
                }
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest' // security to prevent CSRF attacks
                };
                const options = {
                    url: window.baseURL+'/reports',
                    method: 'GET',
                    data: {},
                    params: {
                        page: page,
                        perPage: this.show,
                        bankName: this.filter.bankName,
                        bankBIC: this.filter.bankBIC,
                        type: this.filter.type,
                        score_from: this.filter.score_from,
                        score_to: this.filter.score_to,
                        published: this.filter.published,
                        sort: this.sort,
                        sort_by: this.sort_by
                    },
                }
                this.axios(options)
                    .then(res => {
                        this.dataLoading = false;
                        this.showLoading = false;
                        this.sortLoading = false;
                        this.rows = res.data.items;
                        
                        if(res.data.paginate.total) {
                            this.total = res.data.paginate.total;
                            this.pageCount = Math.ceil(res.data.paginate.total / res.data.paginate.per_page);
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
            }


        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table tr td { font-size: 13px !important }
.pagination { margin-top: 25px }
.filter input,select { font-size: 14px !important }
</style>