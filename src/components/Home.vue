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

function pulltracks(store, url = 'https://api.coindesk.com/v1/bpi/currentprice.json') {
    axios({
      method: 'get',
      url,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${store.state.sourceToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      body = JSON.parse(response.data)
      console.log("Pull tracks", body.offset + "/" + body.total)
      for (let i of body.items)
        tracks.push(i.track.id)
      if (body.next)
        pulltracks(store, body.next)
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
		body = JSON.parse(response.data)
		console.log("Pull following", count + "/" + body.artists.total)
		count +=50
		for (let i of body.artists.items)
		following.push(i.id)
		if (body.artists.next)
			pullfollowing(store, body.artists.next)
	})
}


</script>

<style scoped>

</style>
