<template>
    <div class="">
        
        <!-- Main -->
        <main class="d-flex flex-column u-hero u-hero--end mnh-100vh" 
            style="background-image: url(/assets/img-temp/bg/bg-1.png)">

            <div class="container py-7 my-auto">
                <div class="d-flex align-items-center justify-content-center">

                    <!-- Card -->
                    <div class="card my-7" style="width: 460px; max-width: 100%;">
                        <div class="card-body p-4 p-lg-7">
                            <h2 class="text-center mb-4">Reset your password</h2>

                            <!-- Frogot Form -->
                            <form @submit.prevent="rest">
                                <!-- Token -->
                                <div class="form-group">
                                    <label for="token">Token</label>
                                    <input id="token" 
                                        class="form-control" 
                                        type="text" 
                                        v-model="token" 
                                        placeholder="">
                                </div>
                                <!-- End Token -->

                                <!-- New Password -->
                                <div class="form-group">
                                    <label for="new_password">New Password</label>
                                    <input id="new_password" 
                                        class="form-control" 
                                        type="password" 
                                        autocomplete="off" 
                                        v-model="new_password" 
                                        placeholder="">
                                </div>
                                <!-- End New Password -->

                                <!-- Confirm New Password -->
                                <div class="form-group">
                                    <label for="new_password">Confirm New Password</label>
                                    <input id="new_password" 
                                        class="form-control" 
                                        type="password" 
                                        autocomplete="off" 
                                        v-model="new_password_confirmation" 
                                        placeholder="">
                                </div>
                                <!-- End Confirm New Password -->


                                <div class="my-4">
                                    <button type="submit" 
                                        class="btn btn-block btn-wide btn-primary text-uppercase" 
                                        :disabled="btnLoading">
                                        <span v-if="btnLoading">
                                            <span class="spinner-grow spinner-grow-sm mr-1"
                                                role="status" aria-hidden="true"></span>Loading...
                                        </span>
                                        <span v-if="!btnLoading">Reset Password</span>
                                    </button>
                                </div>

                            </form>
                            <!-- End Forgot Form -->
                        </div>
                    </div>
                    <!-- End Card -->

                </div>
            </div>

            <Footer></Footer>
        </main>
        <!-- End Main -->

    </div>
</template>

<script>
    import Footer from '../layouts/Footer.vue';
    import iziToast from 'izitoast';

    export default {
        name: 'Forget',
        components: {
            Footer
        },
        data(){
            return {
                token: '',
                new_password: '',
                new_password_confirmation: '',

                email: '',
                btnLoading: false,
            }
        },
        mounted() {},
        created() {
            if(localStorage.getItem('forget_email')) {
                this.email = localStorage.getItem('forget_email');
            }
        },
        methods: {
            //
            reset(){
                this.btnLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                };
                const options = {
                  url: window.baseURL + "/auth/password/reset",
                  method: "POST",
                  data: {
                    token: this.token,
                    email: this.email,
                    new_password: this.new_password,
                    new_password_confirmation: this.new_password_confirmation,
                  },
                };
                this.$axios(options)
                .then(() => {
                    this.btnLoading = false;

                    iziToast.success({
                        icon: 'ti-check',
                        title: 'Great job,',
                        message: 'Password Updated Successfully.',
                    });

                    localStorage.removeItem("forget_email");
                    this.$router.push({ name: "login" });
                })
                .catch((err) => {
                    this.btnLoading = false;
                    iziToast.error({
                        icon: 'ti-na',
                        title: 'Wow-wow,',
                        message: (err.response) ? err.response.data.error : ''+err
                    });
                });
            },

        },
    }
</script>
