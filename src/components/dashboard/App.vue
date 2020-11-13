<template>
    <div class="">
        <Header></Header>

        <main class="u-main">
            <Navigation :tenant="tenant_id"></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <div class="row">

                        <div class="col-12 mb-3">
                            <!-- Tenants -->
                            <div class="dropdown pull-right">
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
                            <!-- End Tenants -->

                            <!-- <button type="button"
                                @click="checkUpdate" 
                                class="pull-right btn btn-primary btn-sm btn-pill ui-mt-10 ui-mb-2 btn-with-icon">
                                <span v-if="!updateLoading" class="btn-icon ti-download mr-2"></span>
                                <span v-if="updateLoading">
                                    <div class="spinner-grow spinner-grow-sm mr-1" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </span>
                                <span v-html="(updateLoading) 
                                    ? ' Checking for updates...' 
                                    : ' No new updates available!' "></span>
                            </button> -->
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
                                                :class="(packageDays == '0') ? 'active' : ''"
                                                @click="fetchTotalPackages(0)">Today</span>
                                            <span class="dropdown-item "
                                                :class="(packageDays == '1') ? 'active' : ''"
                                                @click="fetchTotalPackages(1)">Yesterday</span>
                                            <span class="dropdown-item "
                                                :class="(packageDays == '7') ? 'active' : ''"
                                                @click="fetchTotalPackages(7)">Last 7 days</span>
                                            <span class="dropdown-item "
                                                :class="(packageDays == '28') ? 'active' : ''"
                                                @click="fetchTotalPackages(28)">Last 28 days</span>
                                            <span class="dropdown-item "
                                                :class="(packageDays == '90') ? 'active' : ''"
                                                @click="fetchTotalPackages(90)">Last 90 days</span>
                                            <span class="dropdown-item "
                                                :class="(packageDays == '180') ? 'active' : ''"
                                                @click="fetchTotalPackages(180)">Last 180 days</span>
                                            <span class="dropdown-item "
                                                :class="(packageDays == 'infinity') ? 'active' : ''"
                                                @click="fetchTotalPackages('infinity')">Last calendar year</span>
                                        </div>
                                    </div>
                                    <div class="media align-items-center py-2">
                                        <div class="media-body">
                                            <h5 class="h5 text-muted mb-2">Total Packages </h5>
                                            <span v-if="packageLoading">
                                                <div class="spinner-grow spinner-grow-sm mr-1" role="status">
                                                      <span class="sr-only">Loading...</span>
                                                </div>
                                            </span>
                                            <span v-if="!packageLoading" 
                                                class="h2 font-weight-normal mb-0">{{ packageTotal }}
                                            </span>
                                        </div>
                                        <div v-if="!packageLoading" 
                                            class="text-right ml-2" 
                                            style="max-width: 70px">
                                            <div class="mb-2"></div>
                                            <span class="text-success">{{ packagePercentage }}
                                                <span :class="packageArrow"></span>
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
                                                :class="(inquireDays == '0') ? 'active' : ''"
                                                @click="fetchTotalInquires(0)">Today</span>
                                            <span class="dropdown-item "
                                                :class="(inquireDays == '1') ? 'active' : ''"
                                                @click="fetchTotalInquires(1)">Yesterday</span>
                                            <span class="dropdown-item "
                                                :class="(inquireDays == '7') ? 'active' : ''"
                                                @click="fetchTotalInquires(7)">Last 7 days</span>
                                            <span class="dropdown-item "
                                                :class="(inquireDays == '28') ? 'active' : ''"
                                                @click="fetchTotalInquires(28)">Last 28 days</span>
                                            <span class="dropdown-item "
                                                :class="(inquireDays == '90') ? 'active' : ''"
                                                @click="fetchTotalInquires(90)">Last 90 days</span>
                                            <span class="dropdown-item "
                                                :class="(inquireDays == '180') ? 'active' : ''"
                                                @click="fetchTotalInquires(180)">Last 180 days</span>
                                            <span class="dropdown-item "
                                                :class="(inquireDays == 'infinity') ? 'active' : ''"
                                                @click="fetchTotalInquires('infinity')">Last calendar year</span>
                                        </div>
                                    </div>
                                    <div class="media align-items-center py-2">
                                        <div class="media-body">
                                            <h5 class="h5 text-muted mb-2">Total Inquires</h5>
                                            <span v-if="inquireLoading">
                                                <div class="spinner-grow spinner-grow-sm mr-1" role="status">
                                                      <span class="sr-only">Loading...</span>
                                                </div>
                                            </span>
                                            <span v-if="!inquireLoading" 
                                                class="h2 font-weight-normal mb-0">{{ inquireTotal }}
                                            </span>
                                        </div>
                                        <div v-if="!inquireLoading" 
                                            class="text-right ml-2" 
                                            style="max-width: 70px">
                                            <div class="mb-2"></div>
                                            <span class="text-success">{{ inquirePercentage }}
                                                <span :class="inquireArrow"></span>
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




                        <div class="col-md-8 mb-5">
                            <div class="card">
                                <header class="card-header d-flex align-items-center 
                                    justify-content-between">
                                    <h2 class="h4 card-header-title">Recent Packages</h2>
                                    <span v-if="!dataLoading" class="ti-reload cursor-pointer" 
                                        @click="fetchRecentPackages()">
                                    </span>
                                    <span v-if="dataLoading">
                                        <div class="spinner-grow spinner-grow-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </span>
                                </header>

                                <div class="card-body">
                                    <div v-if="dataLoading" class="text-center">
                                        <div class="spinner-grow" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    <div v-if="!dataLoading" class="table-responsive">
                                        <table class="table table-hover mb-0">
                                            <thead>
                                                <tr>
                                                    <th style="width:30%">Title</th>
                                                    <th class="text-center">Destination</th>
                                                     <th class="text-center">Views No.</th>
                                                    <th class="text-center">Date</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody v-if="!dataLoading && !rows.length">
                                                <tr>
                                                    <td colspan="4" class="text-center">
                                                        <span>No data found.</span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                            <tbody v-if="!dataLoading  && rows.length">
                                            <tr v-for="(row, index) in rows" 
                                                :key="index"
                                                class="f14">

                                                <!-- Title -->
                                                <td class="font-weight-semi-bold">
                                                <router-link 
                                                    :to="{ name:'edit-packages',
                                                    params:{id:row.encrypt_id}}" 
                                                    class="default-color text-decoration-hover">
                                                    {{ row.title }} 
                                                </router-link>
                                                </td>
                                                <!-- End Title -->

                                                <!-- Destination -->
                                                <td class="font-weight-semi-bold text-center">
                                                    <span v-if="!row.destination"></span>
                                                    <span v-if="row.destination" 
                                                        class="badge badge-md badge-pill 
                                                        badge-danger-soft">
                                                        {{ row.destination.title }}
                                                    </span>
                                                </td>
                                                <!-- End Destination -->

                                                <td class="font-weight-semi-bold text-center">
                                                    <span> 0 </span>
                                                </td>

                                                <!-- Date -->
                                                <td v-html="(row.deleted_at) ? row.deleted_at : 
                                                    (row.updated_at) ? row.updated_at : row.created_at"
                                                    class="font-weight-semi-bold text-center f12">
                                                </td>
                                                <!-- End Date -->
                                            </tr>

                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Title</th>
                                                    <th class="text-center">Destination</th>
                                                    <th class="text-center">Views No.</th>
                                                    <th class="text-center">Date</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Packages -->


                        <!-- Top Destination -->
                        <div class="col-md-4 mb-5 ui-mt-180">
                            <div class="card">
                                <header class="card-header d-flex align-items-center 
                                    justify-content-between">
                                    <h2 class="h4 card-header-title">Top Destinations</h2>
                                    <span v-if="!topLoading" class="ti-reload cursor-pointer" 
                                        @click="fetchTopDestinations()">
                                    </span>
                                    <span v-if="topLoading">
                                        <div class="spinner-grow spinner-grow-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </span>
                                </header>

                                <div class="card-body text-center">
                                    <span v-if="topLoading">
                                        <div class="spinner-grow" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </span>
                                    <apexchart class="mt-md-3 mt-xl-0"
                                                v-if="!topLoading"
                                                type=bar 
                                                :options="topOptions" 
                                                :series="destinations"  
                                                height="300" />
                                </div>
                            </div>
                        </div>

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
    import iziToast from 'izitoast';

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

                // Total Packages
                packageDays: 7,
                packageTotal: 0,
                packagePercentage: '',
                packageArrow: '',
                packageLoading: true,

                // Total Inquires
                inquireDays: 7,
                inquireTotal: 0,
                inquirePercentage: '',
                inquireArrow: '',
                inquireLoading: true,

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

                tenant_id: 0,
                tenant_name: 'All Tenants',
                tenantLoading: true,
                tenants: [],
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

            // Tenants
            if(localStorage.getItem('tenant_id')) {
                this.tenant_id = localStorage.getItem('tenant_id');
            }
            if(localStorage.getItem('tenant_name')) {
                this.tenant_name = localStorage.getItem('tenant_name');
            }

            this.fetchTenants(); // call tenants
            //this.fetchTotalVisitors(this.visitorDays, true);
        },
        methods: {

            changeTenant(id, name) {
                this.tenantLoading = true;

                this.visitorLoading = true;
                this.packageLoading = true;
                this.inquireLoading = true;
                this.userLoading = true;
                this.chartLoading = true;
                this.pieLoading = true;
                this.dataLoading = true;
                this.topLoading = true;

                this.tenant_id = id;
                this.tenant_name = name;
                localStorage.setItem('tenant_id', id);
                localStorage.setItem('tenant_name', name);
                this.fetchTotalVisitors(this.visitorDays, true);
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
                                localStorage.setItem('tenant_id', res.data.rows[0].id);
                                localStorage.setItem('tenant_name', res.data.rows[0].name);
                            }
                        }

                        this.fetchTotalVisitors(this.visitorDays, true);
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
                    params: {
                        tenant_id: this.tenant_id
                    }
                }
                this.axios(options, config)
                    .then(res => {
                        this.visitorLoading    = false;
                        this.visitorTotal      = res.data.total;
                        this.visitorPercentage = res.data.percentage;
                        this.visitorArrow      = res.data.arrow;

                        this.tenantLoading = false;

                        // Call Next Func
                        if(next) { this.fetchTotalPackages(this.packageDays, true); }
                    })
                    .catch(() => { });
            },


            // fetch TotalPackages
            fetchTotalPackages(days, next=false){
                this.packageLoading = true;
                this.packageDays = days;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/totalPackages/'+this.packageDays,
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id
                    }
                }
                this.axios(options, config)
                    .then(res => {
                        this.packageLoading    = false;
                        this.packageTotal      = res.data.total;
                        this.packagePercentage = res.data.percentage;
                        this.packageArrow      = res.data.arrow;

                        // Call Next Func
                        if(next) { this.fetchTotalInquires(this.inquireDays, true); }
                    })
                    .catch(() => { });
            },


            // fetch TotalInquire
            fetchTotalInquires(days, next=false){
                this.inquireLoading = true;
                this.inquireDays = days;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/totalInquires/'+this.inquireDays,
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id
                    }
                }
                this.axios(options, config)
                    .then(res => {
                        this.inquireLoading    = false;
                        this.inquireTotal      = res.data.total;
                        this.inquirePercentage = res.data.percentage;
                        this.inquireArrow      = res.data.arrow;

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
                    params: {
                        tenant_id: this.tenant_id
                    }
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
                    params: {
                        tenant_id: this.tenant_id
                    }
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
                    params: {
                        tenant_id: this.tenant_id
                    }
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

            // Fetch RecentPackages
            fetchRecentPackages(next=false){
                this.dataLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/recentPackages',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id
                    }
                }
                this.axios(options, config)
                    .then(res => {
                        this.dataLoading = false;
                        this.rows = res.data.rows;

                        // Call Next Func
                        if(next) { 
                            this.fetchTopDestinations(); 
                        }
                    })
                    .catch(() => {});
            },


            // Top Destinations
            fetchTopDestinations(){
                this.topLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                const options = {
                    url: window.baseURL+'/explore/topDestinations',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id
                    }
                }
                this.axios(options, config)
                    .then(res => {
                        this.topLoading = false;
                        this.topOptions = { xaxis: { categories: res.data.xaxis}};
                        this.destinations = [{ name:'Destinations', data: res.data.series }];
                    })
                    .catch(() => { });
            },

                
            checkUpdate(){
                this.updateLoading = true;
                setTimeout(() => {
                    iziToast.warning({
                        icon: 'ti-alert',
                        title: 'Wow-man,',
                        message: "There's no new updates available!"
                    });
                    this.updateLoading = false;
                },3000);
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

        },
    }
</script>
