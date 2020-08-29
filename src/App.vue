<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}

        // Before Enter..
        //beforeRouteEnter (to, from, next) { 
          // next(vm => { 
          //   //next();
          // }) 
        //},

        // Before Leaving.. 
        // beforeRouteLeave(to, from, next) { 
        //     if(this.row.title && !this.isSubmit) {
        //         const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        //         if (answer) {
        //             next()
        //         } else {
        //             next(false)
        //         }
        //     } else { next() }
        // },
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
