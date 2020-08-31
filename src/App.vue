<template>
  <div id="app" class="bg-gray-900 text-white min-h-screen">
    <div class="container mx-auto">
        <AuthSpotify msg="test" />
    </div>
  </div>
</template>

<script>
import AuthSpotify from './components/AuthSpotify.vue'

export default {
  name: 'App',
  components: {
    AuthSpotify
  },
  created: function() {
    // this.spotify.getUser('petteralexis')
    // .then(function(data) {
    //     console.log('Some information about this user', data.body);
    // }, function(err) {
    //     console.log('Something went wrong!', err);
    // })
  }
}
</script>

<style>
</style>
