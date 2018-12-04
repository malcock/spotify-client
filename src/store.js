import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import querystring from 'querystring'
import cookie from 'js-cookie'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artists: [],
    artist: null,
    albums: [],
    album: null,
    playTrack: null,
    refreshToken: null,
    accessToken:null
  },
  mutations: {
    SET_TOKENS: function(state, data){
      state.refreshToken = data.refreshToken
      state.accessToken = data.accessToken
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
      cookie.set('refreshToken',state.refreshToken)
    },
    SET_ARTISTS:function(state,data){
      console.log(data)
      state.artists = data.artists.items
    },
    SET_ARTIST:function(state,artist){
      state.artist = artist
    },
    SET_ALBUMS:function(state,albums){
      state.albums = albums
    },
    SET_ALBUM:function(state,album){
      state.album = album
    }
  },
  actions: {
    async login({commit},code){
      axios.get(`${process.env.VUE_APP_API_ENDPOINT}/login?code=${code}`)
      .then(res=>{
        console.log(res)
        commit("SET_TOKENS",res.data)
      })
      .catch(error=>{
        console.log(error)
      })
      
    },
    async search({commit},term){
      axios.get("https://api.spotify.com/v1/search?" + querystring.stringify({
          q:term,
          type: "artist"
        })).then(res=>{
          console.log(res)
          commit("SET_ARTISTS",res.data)
        })
      
    },
    async getArtist({commit},id){
      axios.get(`https://api.spotify.com/v1/artists/${id}`)
      .then(res=>{
        commit("SET_ARTIST",res.data)
      })
    },
    async getAlbums({commit},id){
      axios.get(`https://api.spotify.com/v1/artists/${id}/albums?` + querystring.stringify({
        include_groups:'album',
        market:'GB',
        limit:50,
        offset:0
      }))
      .then(res=>{
        commit("SET_ALBUMS",res.data)
      })
    },
    async getAlbum({commit},id){
      axios.get(`https://api.spotify.com/v1/albums/${id}?` + querystring.stringify({
        market:'GB'
      }))
      .then(res=>{
        commit("SET_ALBUM",res.data)
      })
    }
  }
})
