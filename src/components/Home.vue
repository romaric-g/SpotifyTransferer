<template>
  <div>
    <TransfertModal :state="transfertState" />
    <div class="flex flex-wrap justify-between">
      <div class="w-full md:w-1/2 px-2 mb-4">
        <AuthSpotify type="source" :token="sourceToken"/>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <AuthSpotify type="target" :token="targetToken"/>
      </div>
    </div>
    <div class="content px-2">
      <div class="py-6 md:px-10 bg-white text-black">
        <div id="menu" class="flex flex-wrap justify-between items-center my-2">
          <div id="filter" class="px-4">
            <label class="inline-flex items-center mr-8">
              <input type="checkbox" class="form-checkbox text-green" :disabled="transfertStart" :checked="allSelected" @input="event => setSelectAll(event)" />
              <span class="ml-2">Tout sélectionner</span>
            </label >
            <label class="inline-flex items-center mr-8">
              <input type="checkbox" class="form-checkbox text-green" :disabled="transfertStart" :checked="allTracksSelected" @input="event => setSelectAllArray(tracks,event)" />
              <span class="ml-2">Titres</span>
            </label >
            <label class="inline-flex items-center mr-8">
              <input type="checkbox" class="form-checkbox text-green" :disabled="transfertStart" :checked="allFollowingSelected" @input="event => setSelectAllArray(following,event)" />
              <span class="ml-2">Artistes suivis</span>
            </label >
            <label class="inline-flex items-center mr-8">
              <input type="checkbox" class="form-checkbox text-green" :disabled="transfertStart" :checked="allAlbumsSelected" @input="event => setSelectAllArray(albums,event)" />
              <span class="ml-2">Albums</span>
            </label >
          </div>
          <div id="transfert" class="flex-1 flex my-4 md:my-0 justify-center md:justify-end">
            <t-button @click="startTransfert">Transferer<i class="ml-2 fas fa-file-import"></i></t-button>
          </div>
        </div>
        <template v-if="following.length > 0">
          <hr class="border-solid border-lightgray">
          <div id="tracks">
            <HomeRow v-for="(track, index) in tracks" :key="index" :item="tracks[index]" :disabled="transfertStart" :dark="toggleAlternDarkRow()" />
          </div>
        </template>
        <template v-if="following.length > 0">
          <hr class="border-solid border-lightgray">
          <div id="following">
            <HomeRow v-for="(follow, index) in following" :key="index" :item="following[index]" :disabled="transfertStart" :dark="toggleAlternDarkRow()"/>
          </div>
        </template>
        <template v-if="albums.length > 0">
          <hr class="border-solid border-gray-100">
          <div id="albums">
            <HomeRow v-for="(album, index) in albums" :key="index" :item="albums[index]" :disabled="transfertStart" :dark="toggleAlternDarkRow()" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import AuthSpotify from '@/components/AuthSpotify.vue'
import HomeRow from '@/components/HomeRow.vue'
import TransfertModal from '@/components/TransfertModal.vue'
import axios from 'axios'
import { mapState } from 'vuex'

var alternDarkRow = false

export default {
  name: 'Home',
  components: {AuthSpotify,HomeRow,TransfertModal},
  data: function() {
    return {
      transfertStart: false,
      tracks: [],
      following: [],
      albums: [],
      transfertState: {open: false, max: 3, names: {1: 'Copie des titres', 2: 'Copie des artistes', 3: 'Copie des albums'}}
    }
  },
  mounted () {
    alternDarkRow = false
    if(this.sourceToken) {
      this.pulltracks()
      this.pullfollowing()
    }
    
  },
  updated: function () {
    alternDarkRow = false
  },
  methods: {
    toggleAlternDarkRow() {
      alternDarkRow = !alternDarkRow
      return alternDarkRow
    },
    setSelectAll: function(event) {
        var select = event.target.checked
        if(this.allSelected || select) {
          this.setSelectAllArray(this.tracks, event)
          this.setSelectAllArray(this.following, event)
          this.setSelectAllArray(this.albums, event)
        }

    },
    setSelectAllArray: function(array, event) {
      var select = event.target.checked
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
      this.transfertStart = true
      this.transfertState.open = true
      this.transfertState.current = {number: 0, progress: 0}
      this.nextTransfert()
    },
    nextTransfert: function() {
      this.transfertState.current.number = this.transfertState.current.number + 1;
      this.transfertState.current.progress = 0;
      switch(this.transfertState.current.number) {
        case 1: 
          this.pushtracks()
          break;
        case 2:
          this.pushfollowing()
          break;
        case 3:
          this.pushalbums()
          break;
        default:
          //end
      }
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
      this.pushToSpotify(start, 50, (start, end) => (
        "https://api.spotify.com/v1/me/albums?ids=" + this.albums.slice(start, end).filter(item => item.checked).map(e => e.id).join(",")
      ), this.albums, this.pushalbums);
    },
    pushfollowing: function(start = 0) {
      this.pushToSpotify(start, 50, (start, end) => (
        "https://api.spotify.com/v1/me/following?type=artist&ids=" + this.following.slice(start, end).filter(item => item.checked).map(e => e.id).join(",")
      ), this.following, this.pushfollowing);
    },
    pushtracks: function(start = 0) {
      this.pushToSpotify(start, 1, (start, end) => (
        "https://api.spotify.com/v1/me/tracks?ids=" + this.tracks.slice().reverse().slice(start, end).filter(item => item.checked).map(e => e.id).join(",")
      ), this.tracks, this.pushtracks);
    },
    pushToSpotify: function(start = 0, size, buildURL, value, nextPush) {
      if(!this.transfertStart)return;
      var end = start+size
      const next = () => {
        if (value.slice(end).length){
          setTimeout(() =>  nextPush(end), 1000);
          this.updateTransfereProgress(start, value.length);
        }
        else {
          this.nextTransfert()
        }
      }
      return axios({
        method: 'put',
        url: buildURL(start, end),
        headers: getHeader(this.targetToken)
      }).then(response => {
        next();
      }).catch(error => {
        next();
      })
    },
    updateTransfereProgress: function(current, max) {
      this.transfertState.current.progress = current / max * 100;
    }
  },
  computed: {
    allSelected: function() {
      let t = (
        this.allTracksSelected &&
        this.allFollowingSelected &&
        this.allAlbumsSelected
      )
      return t;
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
