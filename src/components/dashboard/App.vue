<template>
    <div class="">
        <Header></Header>

        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <div class="row">
                        <div class="col-12 mb-3">
                            
                            <!-- Role -->
                            <div class="pull-rights ui-mt-15 pull-right">
                                <span class="badge badge-md badge-pill badge-success-soft text-lowercase">
                                    {{ auth.role }}
                                </span>
                            </div>
                            <!-- End Role -->

                        </div>
                        <!-- End Check Update -->


                        <!-- Total Visitors -->
                        <div class="col-sm-6 col-xl-3 mb-5">
                            <div class="card">
                                <div class="card-body">
                                    <div class="dropdown show">
                                        <span class="ti-more pull-right cursor-pointer" 
                                            id="dropMenuPosts" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"></span>
                                        <div class="dropdown-menu" aria-labelledby="dropMenuPosts">
                                            <span class="dropdown-item " 
                                                :class="(visitorDays == '0') ? 'active' : ''"
                                                @click="fetchTotalVisitors(0)">Today</span>
                                            <span class="dropdown-item "
                                                :class="(visitorDays == '1') ? 'active' : ''"
                                                @click="fetchTotalVisitors(1)">Yesterday</span>
                                            <span class="dropdown-item "
                                                :class="(visitorDays == '7') ? 'active' : ''"
                                                @click="fetchTotalVisitors(7)">Last 7 days</span>
                                            <span class="dropdown-item "
                                                :class="(visitorDays == '28') ? 'active' : ''"
                                                @click="fetchTotalVisitors(28)">Last 28 days</span>
                                            <span class="dropdown-item "
                                                :class="(visitorDays == '90') ? 'active' : ''"
                                                @click="fetchTotalVisitors(90)">Last 90 days</span>
                                            <span class="dropdown-item "
                                                :class="(visitorDays == '180') ? 'active' : ''"
                                                @click="fetchTotalVisitors(180)">Last 180 days</span>
                                            <span class="dropdown-item "
                                                :class="(visitorDays == 'infinity') ? 'active' : ''"
                                                @click="fetchTotalVisitors('infinity')">Last calendar year</span>
                                        </div>
                                    </div>
                                    <div class="media align-items-center py-2">
                                        <div class="media-body">
                                            <h5 class="h5 text-muted mb-2">Total Visitors</h5>
                                            <span v-if="visitorLoading">
                                                <div class="spinner-grow spinner-grow-sm mr-1" role="status">
                                                      <span class="sr-only">Loading...</span>
                                                </div>
                                            </span>
                                            <span v-if="!visitorLoading" 
                                                class="h2 font-weight-normal mb-0">{{ visitorTotal }}
                                            </span>
                                        </div>
                                        <div v-if="!visitorLoading" 
                                                class="text-right ml-2" 
                                                style="max-width: 70px">
                                            <div class="mb-2"></div>
                                            <span class="text-success">{{ visitorPercentage }}
                                                <span :class="visitorArrow"></span>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- End Total Visitors -->




                        <!-- Total Packages -->
                        <div class="col-sm-6 col-xl-3 mb-5">
                            <div class="card">
                                <div class="card-body">
                                    <div class="dropdown show">
                                        <span class="ti-more pull-right cursor-pointer" 
                                            id="dropMenuPosts" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"></span>
                                        <div class="dropdown-menu" aria-labelledby="dropMenuPosts">
                                            <span class="dropdown-item " 
                                                :class="(pageDays == '0') ? 'active' : ''"
                                                @click="fetchTotalPages(0)">Today</span>
                                            <span class="dropdown-item "
                                                :class="(pageDays == '1') ? 'active' : ''"
                                                @click="fetchTotalPages(1)">Yesterday</span>
                                            <span class="dropdown-item "
                                                :class="(pageDays == '7') ? 'active' : ''"
                                                @click="fetchTotalPages(7)">Last 7 days</span>
                                            <span class="dropdown-item "
                                                :class="(pageDays == '28') ? 'active' : ''"
                                                @click="fetchTotalPages(28)">Last 28 days</span>
                                            <span class="dropdown-item "
                                                :class="(pageDays == '90') ? 'active' : ''"
                                                @click="fetchTotalPages(90)">Last 90 days</span>
                                            <span class="dropdown-item "
                                                :class="(pageDays == '180') ? 'active' : ''"
                                                @click="fetchTotalPages(180)">Last 180 days</span>
                                            <span class="dropdown-item "
                                                :class="(pageDays == 'infinity') ? 'active' : ''"
                                                @click="fetchTotalPages('infinity')">Last calendar year</span>
                                        </div>
                                    </div>
                                    <div class="media align-items-center py-2">
                                        <div class="media-body">
                                            <h5 class="h5 text-muted mb-2">Total Pages </h5>
                                            <span v-if="pageLoading">
                                                <div class="spinner-grow spinner-grow-sm mr-1" role="status">
                                                      <span class="sr-only">Loading...</span>
                                                </div>
                                            </span>
                                            <span v-if="!pageLoading" 
                                                class="h2 font-weight-normal mb-0">{{ pageTotal }}
                                            </span>
                                        </div>
                                        <div v-if="!pageLoading" 
                                            class="text-right ml-2" 
                                            style="max-width: 70px">
                                            <div class="mb-2"></div>
                                            <span class="text-success">{{ pagePercentage }}
                                                <span :class="pageArrow"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Total Packages -->



                        <!-- Total Inquires -->
                        <div class="col-sm-6 col-xl-3 mb-5">
                            <div class="card">
                                <div class="card-body">
                                    <div class="dropdown show">
                                        <span class="ti-more pull-right cursor-pointer" 
                                            id="dropMenuPosts" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"></span>
                                        <div class="dropdown-menu" aria-labelledby="dropMenuPosts">
                                            <span class="dropdown-item " 
                                                :class="(messageDays == '0') ? 'active' : ''"
                                                @click="fetchTotalMessages(0)">Today</span>
                                            <span class="dropdown-item "
                                                :class="(messageDays == '1') ? 'active' : ''"
                                                @click="fetchTotalMessages(1)">Yesterday</span>
                                            <span class="dropdown-item "
                                                :class="(messageDays == '7') ? 'active' : ''"
                                                @click="fetchTotalMessages(7)">Last 7 days</span>
                                            <span class="dropdown-item "
                                                :class="(messageDays == '28') ? 'active' : ''"
                                                @click="fetchTotalMessages(28)">Last 28 days</span>
                                            <span class="dropdown-item "
                                                :class="(messageDays == '90') ? 'active' : ''"
                                                @click="fetchTotalMessages(90)">Last 90 days</span>
                                            <span class="dropdown-item "
                                                :class="(messageDays == '180') ? 'active' : ''"
                                                @click="fetchTotalMessages(180)">Last 180 days</span>
                                            <span class="dropdown-item "
                                                :class="(messageDays == 'infinity') ? 'active' : ''"
                                                @click="fetchTotalMessages('infinity')">Last calendar year</span>
                                        </div>
                                    </div>
                                    <div class="media align-items-center py-2">
                                        <div class="media-body">
                                            <h5 class="h5 text-muted mb-2">Total Messages</h5>
                                            <span v-if="messageLoading">
                                                <div class="spinner-grow spinner-grow-sm mr-1" role="status">
                                                      <span class="sr-only">Loading...</span>
                                                </div>
                                            </span>
                                            <span v-if="!messageLoading" 
                                                class="h2 font-weight-normal mb-0">{{ messageTotal }}
                                            </span>
                                        </div>
                                        <div v-if="!messageLoading" 
                                            class="text-right ml-2" 
                                            style="max-width: 70px">
                                            <div class="mb-2"></div>
                                            <span class="text-success">{{ messagePercentage }}
                                                <span :class="messageArrow"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Total Inquires -->



                        <!-- Total Users -->
                        <div class="col-sm-6 col-xl-3 mb-5">
                            <div class="card">
                                <div class="card-body">
                                    <div class="dropdown show">
                                        <span class="ti-more pull-right cursor-pointer" 
                                            id="dropMenuPosts" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"></span>
                                        <div class="dropdown-menu" aria-labelledby="dropMenuPosts">
                                            <span class="dropdown-item " 
                                                :class="(userDays == '0') ? 'active' : ''"
                                                @click="fetchTotalUsers(0)">Today</span>
                                            <span class="dropdown-item "
                                                :class="(userDays == '1') ? 'active' : ''"
                                                @click="fetchTotalUsers(1)">Yesterday</span>
                                            <span class="dropdown-item "
                                                :class="(userDays == '7') ? 'active' : ''"
                                                @click="fetchTotalUsers(7)">Last 7 days</span>
                                            <span class="dropdown-item "
                                                :class="(userDays == '28') ? 'active' : ''"
                                                @click="fetchTotalUsers(28)">Last 28 days</span>
                                            <span class="dropdown-item "
                                                :class="(userDays == '90') ? 'active' : ''"
                                                @click="fetchTotalUsers(90)">Last 90 days</span>
                                            <span class="dropdown-item "
                                                :class="(userDays == '180') ? 'active' : ''"
                                                @click="fetchTotalUsers(180)">Last 180 days</span>
                                            <span class="dropdown-item "
                                                :class="(userDays == 'infinity') ? 'active' : ''"
                                                @click="fetchTotalUsers('infinity')">Last calendar year</span>
                                        </div>
                                    </div>

                                    <div class="media align-items-center py-2">
                                        <div class="media-body">
                                            <h5 class="h5 text-muted mb-2">Total Users</h5>
                                            <span v-if="userLoading">
                                                <div class="spinner-grow spinner-grow-sm mr-1" role="status">
                                                      <span class="sr-only">Loading...</span>
                                                </div>
                                            </span>
                                            <span v-if="!userLoading" 
                                                class="h2 font-weight-normal mb-0">{{ userTotal }}
                                            </span>
                                        </div>
                                        <div v-if="!userLoading" 
                                            class="text-right ml-2" 
                                            style="max-width: 70px">
                                            <div class="mb-2"></div>
                                            <span class="text-success">{{ userPercentage }}
                                                <span :class="userArrow"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Total Users -->
                        
                    </div>






                    <div class="row">
                        <!-- Line Chart -->
                        <div class="col-md-8 mb-5">
                            <div class="card ui-h-480">
                                <header class="card-header 
                                        d-flex align-items-center justify-content-between">
                                    <h2 class="h4 card-header-title">Visitors During the year</h2>
                                    
                                    <!-- Dropdown -->
                                    <span class="ti-more pull-right cursor-pointer"
                                            id="dropMenuCharts" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"></span>
                                     <div class="dropdown-menu" aria-labelledby="dropMenuCharts">
                                        <span class="dropdown-item " 
                                                :class="(lineType == 'weekly') ? 'active' : ''"
                                                @click="fetchLineChart('weekly')">Weekly
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(lineType == 'monthly') ? 'active' : ''"
                                                @click="fetchLineChart('monthly')">Monthly
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(lineType == 'quarter') ? 'active' : ''"
                                                @click="fetchLineChart('quarter')">Quarter
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(lineType == 'yearly') ? 'active' : ''"
                                                @click="fetchLineChart('yearly')">Yearly
                                        </span>
                                    </div>
                                    <!-- End Dropdown -->
                                </header>

                                <div class="card-body pt-0 text-center">
                                    <span v-if="chartLoading">
                                        <div class="spinner-grow spinner-grow-md mr-1 ui-mt150" 
                                            role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </span>
                                    <apexchart v-if="!chartLoading" 
                                            class="mt-md-3 mt-xl-0"
                                            type=area 
                                            :options="chartOption" 
                                            :series="charts"  
                                            height="380" />
                                </div>
                            </div>
                        </div>
                        <!-- End Line Chart -->





                        <!-- Pie Chart -->
                        <div class="col-md-4 mb-5">
                            <div class="card ui-h-300">
                                <header class="card-header  
                                    d-flex align-items-center justify-content-between">
                                    <h2 class="h4 card-header-title">Where your visitors located</h2>

                                    <!-- Dropdown -->
                                    <a class="link-muted d-flex pull-right" 
                                            role="button" 
                                            id="dropMenuCountries" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"
                                            data-toggle="dropdown">
                                            <span class="ti-more pull-right cursor-pointer"></span>
                                   </a>
                                    <div class="u-header-dropdown__menu dropdown-menu dropdown-menu-right" 
                                            aria-labelledby="dropMenuCountries">
                                        <span class="dropdown-item " 
                                                :class="(pieDays == '0') ? 'active' : ''"
                                                @click="fetchPieChart(0)">Today
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(pieDays == '1') ? 'active' : ''"
                                                @click="fetchPieChart(1)">Yesterday
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(pieDays == '7') ? 'active' : ''"
                                                @click="fetchPieChart(7)">Last 7 days
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(pieDays == '28') ? 'active' : ''"
                                                @click="fetchPieChart(28)">Last 28 days
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(pieDays == '90') ? 'active' : ''"
                                                @click="fetchPieChart(90)">Last 90 days
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(pieDays == '180') ? 'active' : ''"
                                                @click="fetchPieChart(180)">Last 180 days
                                        </span>
                                        <span class="dropdown-item "
                                                :class="(pieDays == 'infinity') ? 'active' : ''"
                                                @click="fetchPieChart('infinity')">Last calendar year
                                        </span>
                                    </div>
                                    <!-- End Dropdown -->

                                </header>

                                <div class="card-body text-center">
                                    <span v-if="pieLoading">
                                        <div class="spinner-grow spinner-grow-md ui-mt50 mr-1" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>    
                                    </span>
                                    <apexchart v-if="!pieLoading" 
                                            class="mt-md-3 mt-xl-0"
                                            type=pie 
                                            :options="pieOptions" 
                                            :series="pies"  
                                            height="190" />
                                </div>
                            </div>
                        </div>
                        <!-- End Pie Chart -->




                    </div>
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
    // import iziToast from 'izitoast';

    export default {
        name: 'App',
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

                // Total Visitors
                visitorDays: 7,
                visitorTotal: 0,
                visitorPercentage: '',
                visitorArrow: '',
                visitorLoading: true,

                // Total Pages
                pageDays: 7,
                pageTotal: 0,
                pagePercentage: '',
                pageArrow: '',
                pageLoading: true,

                // Total Messages
                messageDays: 7,
                messageTotal: 0,
                messagePercentage: '',
                messageArrow: '',
                messageLoading: true,

                // Total User
                userDays: 7,
                userTotal: 0,
                userPercentage: '',
                userArrow: '',
                userLoading: true,

                // line Chart
                charts: [],
                lineType: 'monthly',
                chartLoading: true,
                chartOption: {
                    chart: { height: 450, zoom: { enabled: false }},
                    animations: { enabled: true },
                    dataLabels: {  enabled: false },
                    stroke: {  curve: 'straight' },
                    title: { text: '', align: 'center' },
                    grid: {  row: { colors: ['#f3f3f3', 'transparent'],  opacity: 0.5 }},
                    markers: { size: 5, align:top,  hover: {  sizeOffset: 5  }},
                },

                // Pie
                pieDays: 7,
                pies: [],
                pieLoading: true,
                pieOptions: {
                    chart: {
                      width: 380,
                      type: 'pie',
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                              width: 200
                            },
                        legend: {
                            position: 'bottom'
                        }
                      }
                    }]
                },

                // Recent Packages
                rows: [],
                dataLoading: true,

                // Top Destinations
                tops: [],
                topLoading: true,
                topOptions: {
                    chart: { height: 280, zoom: { enabled: false }},
                    animations: { enabled: true },
                    dataLabels: {  enabled: false },
                    stroke: {  curve: 'straight' },
                    title: { text: '', align: 'center' },
                    grid: {  row: { colors: ['#f3f3f3', 'transparent'],  opacity: 0.5 }},
                    markers: { size: 5, align:top,  hover: {  sizeOffset: 5  }},
                },
                
                updateLoading: false,
            }
        },
        mounted() {},
        created() {

            // AccessToken & Roles
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }

            this.fetchTotalVisitors(this.visitorDays, true);
        },
        methods: {


            // fetch TotalVisitors
            fetchTotalVisitors(days, next=false){
                this.visitorLoading = true;
                this.visitorDays = days;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/totalVisitors/'+this.visitorDays,
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options, config)
                    .then(res => {
                        this.visitorLoading    = false;
                        this.visitorTotal      = res.data.total;
                        this.visitorPercentage = res.data.percentage;
                        this.visitorArrow      = res.data.arrow;

                        // Call Next Func
                        if(next) { this.fetchTotalPages(this.pageDays, true); }
                    })
                    .catch(() => { });
            },


            // fetch TotalPackages
            fetchTotalPages(days, next=false){
                this.pageLoading = true;
                this.pageDays = days;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/totalPages/'+this.packageDays,
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options, config)
                    .then(res => {
                        this.pageLoading    = false;
                        this.pageTotal      = res.data.total;
                        this.pagePercentage = res.data.percentage;
                        this.pageArrow      = res.data.arrow;

                        // Call Next Func
                        if(next) { this.fetchTotalMessages(this.messageDays, true); }
                    })
                    .catch(() => { });
            },


            // fetch TotalMessages
            fetchTotalMessages(days, next=false){
                this.messageLoading = true;
                this.messageDays = days;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/totalMessages/'+this.messageDays,
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options, config)
                    .then(res => {
                        this.messageLoading    = false;
                        this.messageTotal      = res.data.total;
                        this.messagePercentage = res.data.percentage;
                        this.messageArrow      = res.data.arrow;

                        // Call Next Func
                        if(next) { this.fetchTotalUsers(this.userDays, true); }
                     })
                    .catch(() => { });
            },


            // fetch TotalUsers
            fetchTotalUsers(days, next=false){
                this.userLoading = true;
                this.userDays = days;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/totalUsers/'+this.userDays,
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options, config)
                    .then(res => {
                        this.userLoading    = false;
                        this.userTotal      = res.data.total;
                        this.userPercentage = res.data.percentage;
                        this.userArrow      = res.data.arrow;

                        // Call Next Func
                        if(next) { this.fetchLineChart(this.lineType, true); }
                    })
                    .catch(() => { });
            },


            // fetch LineChart
            fetchLineChart(type, next=false){
                this.chartLoading = true;
                this.lineType = type;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/lineChart/'+this.lineType,
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options, config)
                    .then(res => {
                        this.chartLoading = false;
                        this.charts = [{name:'Views', data: res.data.rows.series}];
                        this.chartOption.xaxis = {categories: res.data.rows.xaxis};

                        // Call Next Func
                        if(next) { this.fetchPieChart(this.pieDays, true); }
                           
                    })
                    .catch(() => {});
            },

            // fetch PieChart
            fetchPieChart(days, next=false){
                this.pieLoading = true;
                this.pieDays = days;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/pieChart/'+this.pieDays,
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options, config)
                    .then(res => {
                        this.pieLoading = false;
                        this.pies = res.data.rows.total;
                        this.pieOptions.labels = res.data.rows.countries;

                        // Call Next Func
                        if(next) { 
                            this.fetchRecentPackages(true); 
                        }
                    })
                    .catch(() => { });
            },



            // remove sessions
            removeLocalStorage() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_image');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
            },

        },
    }
</script>
