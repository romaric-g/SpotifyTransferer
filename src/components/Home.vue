<template>
  <div>
    <div class="flex justify-between mb-4">
      <div class="w-2/5 px-2">
        <AuthSpotify type="source" :token="sourceToken"/>
      </div>
      <div class="w-2/5 px-2">
        <AuthSpotify type="target" :token="targetToken"/>
      </div>
    </div>
    <div class="content px-2">
      <template v-if="tracks.length > 0">
        <div class="bg-white shadow-md rounded px-8 py-6 ">
            <div v-for="(track, index) in tracks" :key="index" class="flex items-center my-1">
              <t-checkbox class="mx-4" v-model="track.checked" /><p class="mx-4 flex-1">{{track.name}}</p>
            </div>
        </div>
      </template>
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
    console.log(this)
    if(this.sourceToken) {
      this.pulltracks()
    }
    
  },
  methods: {
    pulltracks: function(url = 'https://api.spotify.com/v1/me/tracks?limit=50') {
      return axios({
        method: 'get',
        url,
        headers: {
          'Authorization': `Bearer ${this.sourceToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(response => {
        var body = response.data
        for (let i of body.items) {
          i.track.checked = true
          this.tracks.push(i.track)
        } 
        if (body.next)
          this.pulltracks(body.next)
      })
    }
  },
  computed: mapState(['sourceToken','targetToken']),
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
    var body = response.data
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
