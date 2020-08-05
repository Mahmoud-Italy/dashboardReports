<template>
  <div id="not-found">
    
      <div class="container">
        <div class="row full-height align-items-center">
          <div class="col-12">
            <div class="text-center p-t-50">
              <h1 class="font-size-170 text-secondary font-weight-light text-opacity ls-2">404</h1>
              <h2 class="font-weight-light font-size-30">Whoops! Looks like you got lost</h2>
              <p class="lead">We couldnt find what you were looking for.</p>
              <router-link :to="{ name: 'dashboard' }" 
                  class="btn btn-gradient-success btn-lg m-t-30">Go back
              </router-link>
            </div>
          </div>
          <div class="col-12 align-self-end ">
            <div class="text-center p-b-20 font-size-13">
              <span>Copyright © 2020. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>

export default {
  name: 'not-found'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
