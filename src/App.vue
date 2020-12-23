<template>
  <div id="app">
    <Header></Header>

        <main class="u-main">
          <Navigation></Navigation>
            <div class="u-content">
                
                <router-view/>

              <Footer></Footer>
            </div>
        </main>
      
  </div>
</template>

<script>
  import Header from './components/layouts/Header'
  import Navigation from './components/layouts/Navigation'
  import Footer from './components/layouts/Footer'

  export default {
    name: 'App',
    components: {
      Header,
      Navigation,
      Footer
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
