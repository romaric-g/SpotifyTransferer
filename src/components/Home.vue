<template>
  <div class="flex justify-between">
    <div class="w-2/5 px-2">
      <AuthSpotify type="source" :token="sourceToken"/>
    </div>
    <div class="w-2/5 px-2">
      <AuthSpotify type="target" :token="targetToken"/>
    </div>
  </div>
</template>

<script>
import AuthSpotify from '@/components/AuthSpotify.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {AuthSpotify},
  created: function() {
    console.log(this)
  },
  computed: mapState(['sourceToken','targetToken']),
}
</script>

<style scoped>

</style>
