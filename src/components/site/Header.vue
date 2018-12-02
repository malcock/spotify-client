<template lang="pug">
  header.site-header
    b-navbar(toggleable="md" type="dark" variant="dark")
      .container
        b-navbar-brand(href="/") 
          h1 Spotify Thing
        b-navbar-toggle(target="nav_collapse") 
        b-collapse#nav_collapse(is-nav)
          b-navbar-nav.ml-auto
            search

</template>

<script>
import Search from '@/components/Search.vue'
export default {
  components:{
    Search
  }
}
</script>

<style>

</style>
