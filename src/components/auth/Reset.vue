<template>
  <div class="">
    
    <div class="layout" style="background: url('/assets/images/bg/login.png')">
        <div class="container">
            <div class="row full-height align-items-center">
                <div class="col-md-5 mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <div class="p-15">

                                <div class="m-b-30 text-center">
                                  <router-link :to="{ name: 'login' }">
                                    <img class="img-responsive inline-block" 
                                          src="/assets/images/logo/dc-logo.png" 
                                          style="width: 150px" 
                                          alt="dc">
                                  </router-link>
                                </div>
                                    
                                <form @submit.prevent="reset">
                                    <div class="form-group">
                                        <label class="control-label">New Password</label>
                                        <input type="password" 
                                                class="form-control" 
                                                v-model="row.password"
                                                autocomplete="off"
                                                required="">
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label">Confirm New Password</label>
                                        <input type="password" 
                                                class="form-control" 
                                                v-model="row.confirm_password"
                                                autocomplete="off"
                                                required="">
                                    </div>

                                    <div class="m-t-30 text-left">
                                        <button class="btn btn-dark login-size f16">
                                            <span v-if="btnLoading">
                                                <div class="loader loader-xs loader-center"></div>
                                            </span>
                                            <span v-if="!btnLoading">Submit</span>
                                        </button>
                                    </div>
                                
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'forget',
  data () {
    return {
      row: {
        password: '',
        confirm_password: ''
      },

      btnLoading: false,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>