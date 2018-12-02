<template lang="pug">
  .container-fluid.p-0
    .row.no-gutters
      .col
        site-header
    .row.no-gutters
      .col
        .container(v-if="refreshToken")
          router-view
        div(v-else)
          div.text-center
            p You must authorise the app to use the API
            b-btn(variant="primary" @click="openAuth") Authorise
    .row.no-gutters
      .col
        site-footer
    
  //- <div id="app">
  //-   <div id="nav">
  //-     <router-link to="/">Home</router-link> |
  //-     <router-link to="/about">About</router-link>
  //-   </div>
  //-   <router-view/>
  //- </div>
</template>
<script>
import '@/assets/scss/style.scss'

import cookie from 'js-cookie'

import SiteHeader from "@/components/site/Header.vue"
import SiteFooter from "@/components/site/Footer.vue"

export default {
  components:{
    SiteHeader,
    SiteFooter
  },
  mounted(){
    if(this.$route.query.code)
    {
      this.$store.dispatch('login',this.$route.query.code)
    }
    if(typeof cookie.get('refreshToken') !=='undefined'){
      this.$store.commit("SET_TOKENS",{refreshToken:cookie.get('refreshToken'),accessToken:''})
    }
    console.log(this);
    
    // this.$store.dispatch('login')
  },
  methods:{
    openAuth(){
      const redirect_uri = "http://localhost:8080"
      var authUrl = 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + process.env.VUE_APP_SPOTIFY_ID + 
        '&redirect_uri=' + encodeURIComponent(redirect_uri)
      window.location = authUrl
    }
  },
  computed:{
    refreshToken(){
      if(this.$store.state.refreshToken){
        return this.$store.state.refreshToken
      }
      return null
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
