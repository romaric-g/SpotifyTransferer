<template>
  <div>
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
            <!-- <div v-for="(track, index) in tracks" :key="index" class="flex items-center my-1">
              <t-checkbox :disabled="transfertStart" class="mr-4" v-model="track.checked" /><p class="mx-4 flex-1">{{track.name}}</p>
            </div> -->
            <HomeRow v-for="(track, index) in tracks" :key="index" :item="tracks[index]" :disabled="transfertStart" :dark="toggleAlternDarkRow()" />
          </div>
        </template>
        <template v-if="following.length > 0">
          <hr class="border-solid border-lightgray">
          <div id="following">
            <!-- <div v-for="(follow, index) in following" :key="index" class="flex items-center my-1">
              <t-checkbox :disabled="transfertStart" class="mr-4" v-model="follow.checked" /><p class="mx-4 flex-1">{{follow.name}}</p>
            </div> -->
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
import axios from 'axios'
import { mapState } from 'vuex'

var alternDarkRow = false

export default {
  name: 'Home',
  components: {AuthSpotify,HomeRow},
  data: function() {
    return {
      transfertStart: false,
      tracks: [
        {checked: true, "album":{"album_type":"single","artists":[{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3UV0wVQkft6lKLDGioqnyO"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3UV0wVQkft6lKLDGioqnyO","id":"3UV0wVQkft6lKLDGioqnyO","name":"Coopex","type":"artist","uri":"spotify:artist:3UV0wVQkft6lKLDGioqnyO"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/619CzMJPPWrCeZwx5qw6ko"},"href":"https:\/\/api.spotify.com\/v1\/artists\/619CzMJPPWrCeZwx5qw6ko","id":"619CzMJPPWrCeZwx5qw6ko","name":"Besomorph","type":"artist","uri":"spotify:artist:619CzMJPPWrCeZwx5qw6ko"}],"available_markets":["AD","AE","AL","AR","AT","AU","BA","BE","BG","BH","BO","BR","BY","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","DZ","EC","EE","EG","ES","FI","FR","GB","GR","GT","HK","HN","HR","HU","ID","IE","IL","IN","IS","IT","JO","JP","KW","KZ","LB","LI","LT","LU","LV","MA","MC","MD","ME","MK","MT","MX","MY","NI","NL","NO","NZ","OM","PA","PE","PH","PL","PS","PT","PY","QA","RO","RS","RU","SA","SE","SG","SI","SK","SV","TH","TN","TR","TW","UA","US","UY","VN","XK","ZA"],"external_urls":{"spotify":"https:\/\/open.spotify.com\/album\/0p1b4G5MinMunzsf4MAS3M"},"href":"https:\/\/api.spotify.com\/v1\/albums\/0p1b4G5MinMunzsf4MAS3M","id":"0p1b4G5MinMunzsf4MAS3M","images":[{"height":640,"url":"https:\/\/i.scdn.co\/image\/ab67616d0000b273fca8bfa00a37e25717e5bf48","width":640},{"height":300,"url":"https:\/\/i.scdn.co\/image\/ab67616d00001e02fca8bfa00a37e25717e5bf48","width":300},{"height":64,"url":"https:\/\/i.scdn.co\/image\/ab67616d00004851fca8bfa00a37e25717e5bf48","width":64}],"name":"On the Line","release_date":"2019-06-28","release_date_precision":"day","total_tracks":1,"type":"album","uri":"spotify:album:0p1b4G5MinMunzsf4MAS3M"},"artists":[{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3UV0wVQkft6lKLDGioqnyO"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3UV0wVQkft6lKLDGioqnyO","id":"3UV0wVQkft6lKLDGioqnyO","name":"Coopex","type":"artist","uri":"spotify:artist:3UV0wVQkft6lKLDGioqnyO"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/619CzMJPPWrCeZwx5qw6ko"},"href":"https:\/\/api.spotify.com\/v1\/artists\/619CzMJPPWrCeZwx5qw6ko","id":"619CzMJPPWrCeZwx5qw6ko","name":"Besomorph","type":"artist","uri":"spotify:artist:619CzMJPPWrCeZwx5qw6ko"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3GQj08iHefTniyhHjCVBov"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3GQj08iHefTniyhHjCVBov","id":"3GQj08iHefTniyhHjCVBov","name":"Galvanic","type":"artist","uri":"spotify:artist:3GQj08iHefTniyhHjCVBov"}],"available_markets":["AD","AE","AL","AR","AT","AU","BA","BE","BG","BH","BO","BR","BY","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","DZ","EC","EE","EG","ES","FI","FR","GB","GR","GT","HK","HN","HR","HU","ID","IE","IL","IN","IS","IT","JO","JP","KW","KZ","LB","LI","LT","LU","LV","MA","MC","MD","ME","MK","MT","MX","MY","NI","NL","NO","NZ","OM","PA","PE","PH","PL","PS","PT","PY","QA","RO","RS","RU","SA","SE","SG","SI","SK","SV","TH","TN","TR","TW","UA","US","UY","VN","XK","ZA"],"disc_number":1,"duration_ms":185200,"explicit":false,"external_ids":{"isrc":"GBKPL1951597"},"external_urls":{"spotify":"https:\/\/open.spotify.com\/track\/7pS9bOFyI75UZNoxPNC94v"},"href":"https:\/\/api.spotify.com\/v1\/tracks\/7pS9bOFyI75UZNoxPNC94v","id":"7pS9bOFyI75UZNoxPNC94v","is_local":false,"name":"On the Line","popularity":39,"preview_url":"https:\/\/p.scdn.co\/mp3-preview\/61de864a07b6958566aca35187efd5c6ee3257e7?cid=bb2b7c9972734a27b963920645abc5b7","track_number":1,"type":"track","uri":"spotify:track:7pS9bOFyI75UZNoxPNC94v"},
        {checked: true, "album":{"album_type":"single","artists":[{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3UV0wVQkft6lKLDGioqnyO"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3UV0wVQkft6lKLDGioqnyO","id":"3UV0wVQkft6lKLDGioqnyO","name":"Coopex","type":"artist","uri":"spotify:artist:3UV0wVQkft6lKLDGioqnyO"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/619CzMJPPWrCeZwx5qw6ko"},"href":"https:\/\/api.spotify.com\/v1\/artists\/619CzMJPPWrCeZwx5qw6ko","id":"619CzMJPPWrCeZwx5qw6ko","name":"Besomorph","type":"artist","uri":"spotify:artist:619CzMJPPWrCeZwx5qw6ko"}],"available_markets":["AD","AE","AL","AR","AT","AU","BA","BE","BG","BH","BO","BR","BY","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","DZ","EC","EE","EG","ES","FI","FR","GB","GR","GT","HK","HN","HR","HU","ID","IE","IL","IN","IS","IT","JO","JP","KW","KZ","LB","LI","LT","LU","LV","MA","MC","MD","ME","MK","MT","MX","MY","NI","NL","NO","NZ","OM","PA","PE","PH","PL","PS","PT","PY","QA","RO","RS","RU","SA","SE","SG","SI","SK","SV","TH","TN","TR","TW","UA","US","UY","VN","XK","ZA"],"external_urls":{"spotify":"https:\/\/open.spotify.com\/album\/0p1b4G5MinMunzsf4MAS3M"},"href":"https:\/\/api.spotify.com\/v1\/albums\/0p1b4G5MinMunzsf4MAS3M","id":"0p1b4G5MinMunzsf4MAS3M","images":[{"height":640,"url":"https:\/\/i.scdn.co\/image\/ab67616d0000b273fca8bfa00a37e25717e5bf48","width":640},{"height":300,"url":"https:\/\/i.scdn.co\/image\/ab67616d00001e02fca8bfa00a37e25717e5bf48","width":300},{"height":64,"url":"https:\/\/i.scdn.co\/image\/ab67616d00004851fca8bfa00a37e25717e5bf48","width":64}],"name":"On the Line","release_date":"2019-06-28","release_date_precision":"day","total_tracks":1,"type":"album","uri":"spotify:album:0p1b4G5MinMunzsf4MAS3M"},"artists":[{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3UV0wVQkft6lKLDGioqnyO"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3UV0wVQkft6lKLDGioqnyO","id":"3UV0wVQkft6lKLDGioqnyO","name":"Coopex","type":"artist","uri":"spotify:artist:3UV0wVQkft6lKLDGioqnyO"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/619CzMJPPWrCeZwx5qw6ko"},"href":"https:\/\/api.spotify.com\/v1\/artists\/619CzMJPPWrCeZwx5qw6ko","id":"619CzMJPPWrCeZwx5qw6ko","name":"Besomorph","type":"artist","uri":"spotify:artist:619CzMJPPWrCeZwx5qw6ko"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3GQj08iHefTniyhHjCVBov"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3GQj08iHefTniyhHjCVBov","id":"3GQj08iHefTniyhHjCVBov","name":"Galvanic","type":"artist","uri":"spotify:artist:3GQj08iHefTniyhHjCVBov"}],"available_markets":["AD","AE","AL","AR","AT","AU","BA","BE","BG","BH","BO","BR","BY","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","DZ","EC","EE","EG","ES","FI","FR","GB","GR","GT","HK","HN","HR","HU","ID","IE","IL","IN","IS","IT","JO","JP","KW","KZ","LB","LI","LT","LU","LV","MA","MC","MD","ME","MK","MT","MX","MY","NI","NL","NO","NZ","OM","PA","PE","PH","PL","PS","PT","PY","QA","RO","RS","RU","SA","SE","SG","SI","SK","SV","TH","TN","TR","TW","UA","US","UY","VN","XK","ZA"],"disc_number":1,"duration_ms":185200,"explicit":false,"external_ids":{"isrc":"GBKPL1951597"},"external_urls":{"spotify":"https:\/\/open.spotify.com\/track\/7pS9bOFyI75UZNoxPNC94v"},"href":"https:\/\/api.spotify.com\/v1\/tracks\/7pS9bOFyI75UZNoxPNC94v","id":"7pS9bOFyI75UZNoxPNC94v","is_local":false,"name":"On the Line","popularity":39,"preview_url":"https:\/\/p.scdn.co\/mp3-preview\/61de864a07b6958566aca35187efd5c6ee3257e7?cid=bb2b7c9972734a27b963920645abc5b7","track_number":1,"type":"track","uri":"spotify:track:7pS9bOFyI75UZNoxPNC94v"},
        {checked: true, "album":{"album_type":"single","artists":[{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3UV0wVQkft6lKLDGioqnyO"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3UV0wVQkft6lKLDGioqnyO","id":"3UV0wVQkft6lKLDGioqnyO","name":"Coopex","type":"artist","uri":"spotify:artist:3UV0wVQkft6lKLDGioqnyO"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/619CzMJPPWrCeZwx5qw6ko"},"href":"https:\/\/api.spotify.com\/v1\/artists\/619CzMJPPWrCeZwx5qw6ko","id":"619CzMJPPWrCeZwx5qw6ko","name":"Besomorph","type":"artist","uri":"spotify:artist:619CzMJPPWrCeZwx5qw6ko"}],"available_markets":["AD","AE","AL","AR","AT","AU","BA","BE","BG","BH","BO","BR","BY","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","DZ","EC","EE","EG","ES","FI","FR","GB","GR","GT","HK","HN","HR","HU","ID","IE","IL","IN","IS","IT","JO","JP","KW","KZ","LB","LI","LT","LU","LV","MA","MC","MD","ME","MK","MT","MX","MY","NI","NL","NO","NZ","OM","PA","PE","PH","PL","PS","PT","PY","QA","RO","RS","RU","SA","SE","SG","SI","SK","SV","TH","TN","TR","TW","UA","US","UY","VN","XK","ZA"],"external_urls":{"spotify":"https:\/\/open.spotify.com\/album\/0p1b4G5MinMunzsf4MAS3M"},"href":"https:\/\/api.spotify.com\/v1\/albums\/0p1b4G5MinMunzsf4MAS3M","id":"0p1b4G5MinMunzsf4MAS3M","images":[{"height":640,"url":"https:\/\/i.scdn.co\/image\/ab67616d0000b273fca8bfa00a37e25717e5bf48","width":640},{"height":300,"url":"https:\/\/i.scdn.co\/image\/ab67616d00001e02fca8bfa00a37e25717e5bf48","width":300},{"height":64,"url":"https:\/\/i.scdn.co\/image\/ab67616d00004851fca8bfa00a37e25717e5bf48","width":64}],"name":"On the Line","release_date":"2019-06-28","release_date_precision":"day","total_tracks":1,"type":"album","uri":"spotify:album:0p1b4G5MinMunzsf4MAS3M"},"artists":[{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3UV0wVQkft6lKLDGioqnyO"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3UV0wVQkft6lKLDGioqnyO","id":"3UV0wVQkft6lKLDGioqnyO","name":"Coopex","type":"artist","uri":"spotify:artist:3UV0wVQkft6lKLDGioqnyO"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/619CzMJPPWrCeZwx5qw6ko"},"href":"https:\/\/api.spotify.com\/v1\/artists\/619CzMJPPWrCeZwx5qw6ko","id":"619CzMJPPWrCeZwx5qw6ko","name":"Besomorph","type":"artist","uri":"spotify:artist:619CzMJPPWrCeZwx5qw6ko"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3GQj08iHefTniyhHjCVBov"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3GQj08iHefTniyhHjCVBov","id":"3GQj08iHefTniyhHjCVBov","name":"Galvanic","type":"artist","uri":"spotify:artist:3GQj08iHefTniyhHjCVBov"}],"available_markets":["AD","AE","AL","AR","AT","AU","BA","BE","BG","BH","BO","BR","BY","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","DZ","EC","EE","EG","ES","FI","FR","GB","GR","GT","HK","HN","HR","HU","ID","IE","IL","IN","IS","IT","JO","JP","KW","KZ","LB","LI","LT","LU","LV","MA","MC","MD","ME","MK","MT","MX","MY","NI","NL","NO","NZ","OM","PA","PE","PH","PL","PS","PT","PY","QA","RO","RS","RU","SA","SE","SG","SI","SK","SV","TH","TN","TR","TW","UA","US","UY","VN","XK","ZA"],"disc_number":1,"duration_ms":185200,"explicit":false,"external_ids":{"isrc":"GBKPL1951597"},"external_urls":{"spotify":"https:\/\/open.spotify.com\/track\/7pS9bOFyI75UZNoxPNC94v"},"href":"https:\/\/api.spotify.com\/v1\/tracks\/7pS9bOFyI75UZNoxPNC94v","id":"7pS9bOFyI75UZNoxPNC94v","is_local":false,"name":"On the Line","popularity":39,"preview_url":"https:\/\/p.scdn.co\/mp3-preview\/61de864a07b6958566aca35187efd5c6ee3257e7?cid=bb2b7c9972734a27b963920645abc5b7","track_number":1,"type":"track","uri":"spotify:track:7pS9bOFyI75UZNoxPNC94v"},
        {checked: true, "album":{"album_type":"single","artists":[{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3UV0wVQkft6lKLDGioqnyO"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3UV0wVQkft6lKLDGioqnyO","id":"3UV0wVQkft6lKLDGioqnyO","name":"Coopex","type":"artist","uri":"spotify:artist:3UV0wVQkft6lKLDGioqnyO"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/619CzMJPPWrCeZwx5qw6ko"},"href":"https:\/\/api.spotify.com\/v1\/artists\/619CzMJPPWrCeZwx5qw6ko","id":"619CzMJPPWrCeZwx5qw6ko","name":"Besomorph","type":"artist","uri":"spotify:artist:619CzMJPPWrCeZwx5qw6ko"}],"available_markets":["AD","AE","AL","AR","AT","AU","BA","BE","BG","BH","BO","BR","BY","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","DZ","EC","EE","EG","ES","FI","FR","GB","GR","GT","HK","HN","HR","HU","ID","IE","IL","IN","IS","IT","JO","JP","KW","KZ","LB","LI","LT","LU","LV","MA","MC","MD","ME","MK","MT","MX","MY","NI","NL","NO","NZ","OM","PA","PE","PH","PL","PS","PT","PY","QA","RO","RS","RU","SA","SE","SG","SI","SK","SV","TH","TN","TR","TW","UA","US","UY","VN","XK","ZA"],"external_urls":{"spotify":"https:\/\/open.spotify.com\/album\/0p1b4G5MinMunzsf4MAS3M"},"href":"https:\/\/api.spotify.com\/v1\/albums\/0p1b4G5MinMunzsf4MAS3M","id":"0p1b4G5MinMunzsf4MAS3M","images":[{"height":640,"url":"https:\/\/i.scdn.co\/image\/ab67616d0000b273fca8bfa00a37e25717e5bf48","width":640},{"height":300,"url":"https:\/\/i.scdn.co\/image\/ab67616d00001e02fca8bfa00a37e25717e5bf48","width":300},{"height":64,"url":"https:\/\/i.scdn.co\/image\/ab67616d00004851fca8bfa00a37e25717e5bf48","width":64}],"name":"On the Line","release_date":"2019-06-28","release_date_precision":"day","total_tracks":1,"type":"album","uri":"spotify:album:0p1b4G5MinMunzsf4MAS3M"},"artists":[{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3UV0wVQkft6lKLDGioqnyO"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3UV0wVQkft6lKLDGioqnyO","id":"3UV0wVQkft6lKLDGioqnyO","name":"Coopex","type":"artist","uri":"spotify:artist:3UV0wVQkft6lKLDGioqnyO"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/619CzMJPPWrCeZwx5qw6ko"},"href":"https:\/\/api.spotify.com\/v1\/artists\/619CzMJPPWrCeZwx5qw6ko","id":"619CzMJPPWrCeZwx5qw6ko","name":"Besomorph","type":"artist","uri":"spotify:artist:619CzMJPPWrCeZwx5qw6ko"},{"external_urls":{"spotify":"https:\/\/open.spotify.com\/artist\/3GQj08iHefTniyhHjCVBov"},"href":"https:\/\/api.spotify.com\/v1\/artists\/3GQj08iHefTniyhHjCVBov","id":"3GQj08iHefTniyhHjCVBov","name":"Galvanic","type":"artist","uri":"spotify:artist:3GQj08iHefTniyhHjCVBov"}],"available_markets":["AD","AE","AL","AR","AT","AU","BA","BE","BG","BH","BO","BR","BY","CA","CH","CL","CO","CR","CY","CZ","DE","DK","DO","DZ","EC","EE","EG","ES","FI","FR","GB","GR","GT","HK","HN","HR","HU","ID","IE","IL","IN","IS","IT","JO","JP","KW","KZ","LB","LI","LT","LU","LV","MA","MC","MD","ME","MK","MT","MX","MY","NI","NL","NO","NZ","OM","PA","PE","PH","PL","PS","PT","PY","QA","RO","RS","RU","SA","SE","SG","SI","SK","SV","TH","TN","TR","TW","UA","US","UY","VN","XK","ZA"],"disc_number":1,"duration_ms":185200,"explicit":false,"external_ids":{"isrc":"GBKPL1951597"},"external_urls":{"spotify":"https:\/\/open.spotify.com\/track\/7pS9bOFyI75UZNoxPNC94v"},"href":"https:\/\/api.spotify.com\/v1\/tracks\/7pS9bOFyI75UZNoxPNC94v","id":"7pS9bOFyI75UZNoxPNC94v","is_local":false,"name":"On the Line","popularity":39,"preview_url":"https:\/\/p.scdn.co\/mp3-preview\/61de864a07b6958566aca35187efd5c6ee3257e7?cid=bb2b7c9972734a27b963920645abc5b7","track_number":1,"type":"track","uri":"spotify:track:7pS9bOFyI75UZNoxPNC94v"},
      ],
      following: [{name: "following 1", checked: true},{name: "following 2", checked: true},{name: "following 3", checked: true}],
      albums: [],//[{name: "Album 1", checked: true},{name: "Album 2", checked: true},{name: "Album 3", checked: true}],
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
        console.log("select: " + select)
        console.log("allSelected: " + this.allSelected)
        if(this.allSelected || select) {
          this.setSelectAllArray(this.tracks, event)
          this.setSelectAllArray(this.following, event)
          this.setSelectAllArray(this.albums, event)
        }

    },
    setSelectAllArray: function(array, event) {
      var select = event.target.checked
      console.log("All selected for array: " + this.allIsSelected(array))
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
        url: "https://api.spotify.com/v1/me/albums?ids=" + this.albums.slice(start, end).filter(item => item.checked).map(e => e.id).join(","),
        headers: getHeader(this.targetToken)
      }).then(response => {
        if (this.albums.slice(end).length)
          this.pushalbums(end)
      })
    },
    pushfollowing: function(start = 0) {
      var end = start+50
      return axios({
        method: 'put',
        url: "https://api.spotify.com/v1/me/following?type=artist&ids=" + this.following.slice(start, end).filter(item => item.checked).map(e => e.id).join(","),
        headers: getHeader(this.targetToken)
      }).then(response => {
        if (this.following.slice(end).length)
          this.pushfollowing(end)
      })
    },
    pushtracks: function(start = 0) {
      var end = start+1
      return axios({
        method: 'put',
        url: "https://api.spotify.com/v1/me/tracks?ids=" + this.tracks.slice(start, end).filter(item => item.checked).map(e => e.id).join(","),
        headers: getHeader(this.targetToken)
      }).then(response => { 
        if (this.tracks.slice(end).length)
          this.pushtracks(end)
      })
    },
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
