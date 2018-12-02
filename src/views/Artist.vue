<template lang="pug">
  div
    .container(v-if="artist")
      .row.py-4
        .col-12.col-md-8
          h1 {{artist.name}}
        .col-12.col-md-4
          div(v-if="artist.images.length>0")
            img(:src="artist.images[0].url" width="100%")
      .row
        .col-12
          b-table(:items="albums" :fields="fields")
            template(slot="images" slot-scope="data")
              div(v-if="data.value.length>0")
                img.avatar(:src="data.value[data.value.length-1].url" width="64")
              div(v-else)
                div.avatar.avatar_none
                  span No Image
            template(slot="name" slot-scope="data")
              router-link(:to="'/artist/' + artist.id + '/album/' + data.item.id")
                h4 {{ data.value }}
            template(slot="total_tracks" slot-scope="data")
              p {{ data.value }}
            template(slot="release_date" slot-scope="data")
              p(v-if="data.item.release_date_precision=='day'") {{ data.value | moment('DD MMM YYYY') }}
              p(v-else) {{ data.value }}

</template>

<script>
export default {
  mounted(){
    if(this.$store.state.artists.length<1){
      this.$store.dispatch('getArtist',this.$route.params.id)
    }
    this.$store.dispatch('getAlbums',this.$route.params.id)
  },
  computed:{
    artist(){
      if(this.$store.state.artists.length>0){
        this.$store.commit("SET_ARTIST",this.$store.state.artists.find(x=>x.id==this.$route.params.id))
        return this.$store.state.artist
      } else if(this.$store.state.artist){
        return this.$store.state.artist
      } else {
        return null
      }
    },
    fields(){
      return [
        {
          key:'images',
          label:'Image'
        },
        {
          key:'name',
          label:'Name',
          sortable:true
        },
        {
          key:'total_tracks',
          label:"Tracks",
          sortable:true
        },
        {
          key:'release_date',
          label:'Released',
          sortable:true
        }
      ]
      
    },
    albums(){
      return this.$store.state.albums.items
    }
  }
}
</script>

<style>

</style>
