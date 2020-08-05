<template>
  <div id="forbidden">
    
      <div class="container">
          <div class="row full-height align-items-center">
              <div class="col-md-7">
                <div class="m-t-15 m-l-20">
                  <h1 class="font-size-55 text-semibold">403</h1>
                  <h2 class="font-weight-light font-size-35">Forbidden</h2>
                  <p class="width-70 text-opacity m-t-25 font-size-16">
                    User does not have the permission.</p>
                  <div class="m-t-15">
                    <router-link :to="{ name: 'dashboard' }" 
                      class="btn btn-gradient-success btn-lg m-t-30">Go back
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-5 d-none d-md-block">
                <img class="img-fluid" src="/assets/images/others/img-33.png" alt="">
              </div>
          </div>
        </div>

  </div>
</template>

<script>

export default {
  name: 'forbidden'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
