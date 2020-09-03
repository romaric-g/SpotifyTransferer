<template>
  <div>
    <div class="flex justify-between">
      <div class="w-2/5 px-2">
        <AuthSpotify type="source" :token="sourceToken"/>
      </div>
      <div class="w-2/5 px-2">
        <AuthSpotify type="target" :token="targetToken"/>
      </div>
    </div>
    <div class="border-t-4 bg-white shadow-md rounded">
      <div v-for="(track, index) in tracks" :key="index">
        <p>{{track.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AuthSpotify from '@/components/AuthSpotify.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {AuthSpotify},
  data: function() {
    return {
      tracks: [],
      following: []
    }
  },
  mounted () {
    pulltracks(this.$store)
  },
  computed: mapState(['sourceToken','targetToken']),
}

function pulltracks(store, url = 'https://api.spotify.com/v1/me/tracks?limit=50') {
    axios({
      method: 'get',
      url,
      headers: {
        'Authorization': `Bearer ${store.state.sourceToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log("Pull tracks", response.offset + "/" + response.total)
      for (let i of response.items)
        tracks.push(i.track.id)
      if (response.next)
        pulltracks(store, response.next)
    })
}


function pullfollowing(store, url = "https://api.spotify.com/v1/me/following?type=artist&limit=50") {
	axios({
    method: "GET",
    url,
		headers: {
			'Authorization': `Bearer ${store.state.sourceToken}`,
			"Accept": "application/json",
			"Content-Type": "application/json"
		}
	}).then(response => {
		console.log("Pull following", count + "/" + response.artists.total)
		count +=50
		for (let i of response.artists.items)
		following.push(i.id)
		if (response.artists.next)
			pullfollowing(store, response.artists.next)
	})
}


</script>

<style scoped>

</style>
