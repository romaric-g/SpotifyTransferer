<template>
  <div class="border-t-4 bg-white px-8 pt-6 pb-8" :class="token ? 'border-green' : 'border-red-400'">
    <div class="flex justify-between flex-wrap">
      <p class="text-xl mb-4">{{title}}</p>
      <t-button class="mb-4" @click="auth">Connexion<i class="ml-2 fab fa-spotify"></i></t-button>
    </div>
    <input readonly class="appearance-none border border-lightgray rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="username" type="text" placeholder="Token" :value="token">
  </div>
</template>

<script>
export default {
  name: 'AuthSpotify',
  props: ['type','token'],
  methods: {
    auth: function(event) {
      var origin = new URL(location.href).origin
      
      var scopes = "user-library-read user-library-modify playlist-read-private playlist-modify-private user-follow-read user-follow-modify";
      window.location = ("https://accounts.spotify.com/authorize?response_type=token" +
          "&client_id=" + this.client_id +
          "&scope=" + encodeURIComponent(scopes) +
          "&redirect_uri=" + encodeURIComponent(origin + "/callback/" + this.type ));
    }
  },
  data: function() {
    return {
      title: this.type === "source" ? "Compte source" : "Compte cible"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
