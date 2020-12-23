<template>
  <div>
    
        <!-- bar Chart -->
        <div class="card">
            <header class="card-header d-flex align-items-center justify-content-between">
                <h2 class="h4 card-header-title">Top 10 banks has highest report score</h2>
                <span v-if="!dataLoading" 
                      class="ti-reload cursor-pointer" 
                      @click="fetchBarChart()">
                </span>
                <span v-if="dataLoading">
                    <div class="spinner-grow spinner-grow-sm" 
                        role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </span>
            </header>

            <div class="card-body text-center">
                <span v-if="dataLoading">
                    <div class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </span>
                
                <apexchart class="mt-md-3 mt-xl-0"
                          v-if="!dataLoading"
                          type=bar 
                          :options="dataOptions" 
                          :series="data"  
                          height="300" />
              </div>
        </div>

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
            dataOptions: {
              chart: { height: 280, zoom: { enabled: false }},
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
            this.fetchBarChart();
        },
        methods: {

            // fetch bar Chart
            fetchBarChart(){
                this.dataLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest' // security to prevent CSRF attacks
                };
                const options = {
                    url: window.baseURL+'/barChart',
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options)
                    .then(res => {
                        this.dataLoading = false;
                        this.dataOptions = { xaxis: { categories: res.data.items.xaxis}};
                        this.data = [{ name:'reportScore', data: res.data.items.series }];
                    })
                    .catch(() => { });
            },

        },
      }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>