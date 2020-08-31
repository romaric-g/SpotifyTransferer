<template>
  <div class="auth-spotify">
    <t-button variant="funny" v-on:click="auth">Example button</t-button>
  </div>
</template>

<script>
export default {
  name: 'AuthSpotify',
  props: {
    msg: String
  },
  methods: {
    auth: function () {
      var scopes = ['user-read-private', 'user-read-email']
      var state = 'some-state-of-my-choice'

      const spotifyApi = this.spotify
      const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
      
      console.log(authorizeURL)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.auth-spotify {

}
</style>
