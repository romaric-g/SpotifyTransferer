<template>
  <div></div>
</template>

<script>

import {SET_TOKEN} from './../store/mutation-types'

export default {
  name: 'AuthCallback',
  methods: {
    
  },
  beforeCreate: function() {
    var { type } = this.$attrs
    const route = this.$route
    console.log(route)
    const params = new URLSearchParams(route.hash.replace("#", ""))

    const access_token = params.get("access_token")

    this.$store.commit(SET_TOKEN, {name: `${type}Token`, value: access_token})
    this.$router.push("/")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
