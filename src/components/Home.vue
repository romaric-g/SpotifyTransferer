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
      <div class="bg-white shadow-md rounded px-8 py-6 ">
        <div id="menu" class="flex justify-between items-center my-2">
          <div id="filter">
            <label  class="mr-8">
              <t-checkbox :disabled="transfertStart" :checked="allSelected" @change="setSelectAll" />
              <span class="ml-1">Tout sélectionner</span>
            </label >
            <label class="mr-8">
              <t-checkbox :disabled="transfertStart" :checked="allTracksSelected" @change="select => setSelectAllArray(tracks,select)" />
              <span class="ml-1">Titres</span>
            </label >
            <label class="mr-8">
              <t-checkbox :disabled="transfertStart" :checked="allFollowingSelected" @change="select => setSelectAllArray(following,select)" />
              <span class="ml-1">Artistes suivis</span>
            </label >
            <label class="mr-8">
              <t-checkbox :disabled="transfertStart" :checked="allAlbumsSelected" @change="select => setSelectAllArray(albums,select)" />
              <span class="ml-1">Albums</span>
            </label >
          </div>
          <div id="transfert">
            <t-button @click="startTransfert">Transferer</t-button>
          </div>
        </div>
        <hr class="border-solid">
        <div id="tracks">
          <div v-for="(track, index) in tracks" :key="index" class="flex items-center my-1">
            <t-checkbox :disabled="transfertStart" class="mr-4" v-model="track.checked" /><p class="mx-4 flex-1">{{track.name}}</p>
          </div>
        </div>
        <hr class="border-solid">
        <div id="following">
          <div v-for="(follow, index) in following" :key="index" class="flex items-center my-1">
            <t-checkbox :disabled="transfertStart" class="mr-4" v-model="follow.checked" /><p class="mx-4 flex-1">{{follow.name}}</p>
          </div>
        </div>
        <hr class="border-solid">
        <div id="albums">
          <div v-for="(album, index) in albums" :key="index" class="flex items-center my-1">
            <t-checkbox :disabled="transfertStart" class="mr-4" v-model="album.checked" /><p class="mx-4 flex-1">{{album.name}}</p>
          </div>
        </div>
        <hr class="border-solid">
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
      transfertStart: false,
      tracks: [],//[{name: "Track 1", checked: true},{name: "Track 2", checked: true},{name: "Track 3", checked: true}],
      following: [],//[{name: "following 1", checked: true},{name: "following 2", checked: true},{name: "following 3", checked: true}],
      albums: [],//[{name: "Album 1", checked: true},{name: "Album 2", checked: true},{name: "Album 3", checked: true}],
    }
  },
  mounted () {
    console.log(this)
    if(this.sourceToken) {
      this.pulltracks()
      this.pullfollowing()
    }
    
  },
  methods: {
    setSelectAll: function(select) {
        if(this.allSelected || select) {
          this.setSelectAllArray(this.tracks, select)
          this.setSelectAllArray(this.following, select)
          this.setSelectAllArray(this.albums, select)
        }

    },
    setSelectAllArray: function(array, select) {
      if(this.allIsSelected(array) || select) {
        array.forEach(element => {
          element.checked = select
        });
      }
    },
    allIsSelected: function(array) {
      return !array.some(e => e.checked === false)
    },
    startTransfert: function() {
      console.log("TRANSFER...")
      this.transfertStart = true
      this.pushalbums()
      this.pushfollowing()
      this.pushtracks()
    },
    pulltracks: function(url = 'https://api.spotify.com/v1/me/tracks?limit=50') {
      return axios({
        method: 'get',
        url,
        headers: getHeader(this.sourceToken)
      }).then(response => {
        var body = response.data
        for (let i of body.items) {
          i.track.checked = true
          this.tracks.push(i.track)
        } 
        if (body.next)
          this.pulltracks(body.next)
      })
    },
    pullfollowing: function(url = 'https://api.spotify.com/v1/me/following?type=artist&limit=50') {
      return axios({
        method: 'get',
        url,
        headers: getHeader(this.sourceToken)
      }).then(response => {
        var body = response.data
        for (let i of body.artists.items) {
          i.checked = true
		      this.following.push(i)
        }
          
		    if (body.artists.next)
          this.pullfollowing(body.artists.next)
      })
    },
    pullalbums: function(url = 'https://api.spotify.com/v1/me/albums?limit=50') {
      return axios({
        method: 'get',
        url,
        headers: getHeader(this.sourceToken)
      }).then(response => {
        var body = response.data
        for (let i of body.items) {
          i.album.checked = true
          this.albums.push(i.album)
        }
        if (body.next)
          this.pullalbums(body.next)
      })
    },
    pushalbums: function(start = 0) {
      var end = start+50
      return axios({
        method: 'put',
        url: "https://api.spotify.com/v1/me/albums?ids=" + this.albums.slice(start, end).map(e => e.id).join(","),
        headers: getHeader(this.targetToken)
      }).then(response => {
        if (albums.slice(end).length)
          this.pushalbums(end)
      })
    },
    pushfollowing: function(start = 0) {
      var end = start+50
      return axios({
        method: 'put',
        url: "https://api.spotify.com/v1/me/following?type=artist&ids=" + this.following.slice(start, end).map(e => e.id).join(","),
        headers: getHeader(this.targetToken)
      }).then(response => {
        if (following.slice(end).length)
          this.pushfollowing(end)
      })
    },
    pushtracks: function(start = 0) {
      var end = start+50
      return axios({
        method: 'put',
        url: "https://api.spotify.com/v1/me/tracks?ids=" + this.tracks.slice(start, end).map(e => e.id).join(","),
        headers: getHeader(this.targetToken)
      }).then(response => { 
        if (tracks.slice(end).length)
          this.pushtracks(end)
      })
    },
  },
  computed: {
    allSelected: function() {
      return (
        this.allTracksSelected &&
        this.allFollowingSelected &&
        this.allAlbumsSelected
      )
    },
    allTracksSelected: function() { return this.allIsSelected(this.tracks) },
    allFollowingSelected: function() { return this.allIsSelected(this.following) },
    allAlbumsSelected: function() { return this.allIsSelected(this.albums) },
    ...mapState(['sourceToken','targetToken'])
  },
}

function getHeader(token) {
  return  {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
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
