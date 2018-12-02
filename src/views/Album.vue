<template lang="pug">
  div
    .container(v-if="album")
      .row.py-4
        .col-12.col-md-8
          router-link(:to="'/artist/' + artist.id")
            h3 {{ artist.name }}
          h1 {{ album.name}}
          h3 Total play time {{ totalTime | timeConvert }}
        .col-12.col-md-4
           div(v-if="album.images.length>0")
            img(:src="album.images[0].url" width="100%")
      .row
        .col
          b-table(:items="album.tracks.items" :fields="fields")
            template(slot="name" slot-scope="data")
              h3 {{data.value}}
            template(slot="duration_ms" slot-scope="data")
              p {{data.value | timeConvert}}
            template(slot="preview_url" slot-scope="data")
              audio-player(:file="data.value")
</template>

<script>
import AudioPlayer from "@/components/audio.vue"
export default {
  components:{
    AudioPlayer
  },
  mounted(){
    this.$store.dispatch('getAlbum',this.$route.params.albumId)
  },
  computed:{
    album(){
      return this.$store.state.album
    },
    totalTime(){
      var total = 0;
      for(var i=0;i<this.$store.state.album.tracks.items.length;i++){
        total+=this.$store.state.album.tracks.items[i].duration_ms
      }
      return total
    },
    artist(){
      // return this.$store.state.album.artists[0]
      
      if(this.$store.state.album != null){
        
        return this.$store.state.album.artists[0]
      } 
      return {
          id:'678',
          name:'hello'
        }
      
    },
    fields(){
      return [
        {
          key:'preview_url',
          label:'Preview'
        },
        {
          key:'track_number',
          label:"Number"
        },
        {
          key:'name',
          label:"Track name"
        },
        {
          key:'duration_ms',
          label:'Duration'
        }
      ]
    }
  }
  
}
</script>

<style>

</style>
