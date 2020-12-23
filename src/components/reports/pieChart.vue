<template>
  <div>
    
      <!-- Pie Chart -->
      <div class="card ui-h-300">
          
          <header class="card-header d-flex align-items-center justify-content-between">
              <h2 class="h4 card-header-title">Bank types</h2>
              <span v-if="!dataLoading" 
                    class="ti-reload cursor-pointer" 
                    @click="fetchPieChart()">
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
                  <div class="spinner-grow spinner-grow-md ui-mt50 mr-1" 
                        role="status">
                        <span class="sr-only">Loading...</span>
                  </div>    
              </span>
              <apexchart v-if="!dataLoading" 
                      class="mt-md-3 mt-xl-0"
                      type=pie 
                      :options="dataOptions" 
                      :series="data"  
                      height="190" />
          </div>

      </div>
      <!-- End Pie Chart -->

  </div>
</template>

<script>
    export default {
      name: 'pieChart',
      data(){
        return {
            //
            data: [],
            dataLoading: true,
            dataOptions: {
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
            }

          }
        },
        created() {
            //
            this.fetchPieChart();
        },
        methods: {

            // fetch pieChart
            fetchPieChart() {
                this.dataLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                };
                const options = {
                    url: window.baseURL+'/pieChart',
                    method: 'GET',
                    data: {},
                    params: {}
                }
                this.axios(options)
                    .then(res => {
                        this.dataLoading = false;
                        this.data = res.data.items.total;
                        this.dataOptions.labels = res.data.items.lables;
                    })
                    .catch(() => { });
            },

        },
      }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>