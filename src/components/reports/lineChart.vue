<template>
  <div>
    
      <!-- Line Chart -->
      <div class="card ui-h-480">
            
            <header class="card-header d-flex align-items-center justify-content-between">
                <h2 class="h4 card-header-title">Banks created at during the calendar</h2>
                                    
                    <!-- Dropdown -->
                    <span class="ti-more pull-right cursor-pointer"
                          id="dropMenuCharts" 
                          data-toggle="dropdown" 
                          aria-haspopup="true" 
                          aria-expanded="false"></span>
                    <div class="dropdown-menu" 
                          aria-labelledby="dropMenuCharts">
                        <span class="dropdown-item "
                              :class="(dataType == 'monthly') ? 'active' : ''"
                              @click="fetchLineChart('monthly')">Monthly
                        </span>
                        <span class="dropdown-item "
                              :class="(dataType == 'yearly') ? 'active' : ''"
                              @click="fetchLineChart('yearly')">Yearly
                        </span>
                    </div>
                    <!-- End Dropdown -->

            </header>

            <div class="card-body pt-0 text-center">
                  <span v-if="dataLoading">
                      <div class="spinner-grow spinner-grow-md mr-1 ui-mt150" 
                            role="status">
                            <span class="sr-only">Loading...</span>
                      </div>
                  </span>
                  <apexchart v-if="!dataLoading" 
                            class="mt-md-3 mt-xl-0"
                            type=area 
                            :options="dataOption" 
                            :series="data"  
                            height="380" />
            </div>

      </div>
      <!-- End Line Chart -->

  </div>
</template>

<script>
    export default {
      name: 'lineChart',
      data(){
        return {
            //
            data: [],
            dataLoading: true,
            dataType: 'monthly',
            dataOption: {
                chart: { height: 450, zoom: { enabled: false }},
                animations: { enabled: true },
                dataLabels: {  enabled: false },
                stroke: {  curve: 'straight' },
                title: { text: '', align: 'center' },
                grid: {  row: { colors: ['#f3f3f3', 'transparent'],  opacity: 0.5 }},
                markers: { size: 5, align:top,  hover: {  sizeOffset: 5  }},
            },

          }
        },
        created() {
            //
            this.fetchLineChart(this.dataType);
        },
        methods: {

            // fetch lineChart
            fetchLineChart(type){
                this.dataLoading = true;
                this.dataType = type;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest' // security to prevent CSRF attacks
                };
                const options = {
                    url: window.baseURL+'/lineChart/'+this.dataType,
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options)
                    .then(res => {
                        this.dataLoading = false;
                        this.data = [{name:'Banks', data: res.data.items.series}];
                        this.dataOption.xaxis = {categories: res.data.items.xaxis};
                    })
                    .catch(() => {});
            },


        },
      }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>