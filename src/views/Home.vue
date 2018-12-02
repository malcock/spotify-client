<template lang="pug">
  div
    artists(v-if="items.length>0" :items="items")
    .container.py-4(v-else)
      .row.justify-content-center
        .col.col-md-6.bg-dark.p-4
          p Please search for an artist
          search
          h3.py-4 Or try these searches
          b-list-group
            b-list-group-item
              a(href="/?q=bonobo" @click.prevent="search('bonobo')") Bonobo
            b-list-group-item
              a(href="/?q=crazy p" @click.prevent="search('crazy p')") Crazy P
            b-list-group-item
              a(href="/?q=la roux" @click.prevent="search('la roux')") La Roux
            b-list-group-item
              a(href="/?q=evil nine" @click.prevent="search('evil nine')") Evil Nine
            b-list-group-item
              a(href="/?q=yotto" @click.prevent="search('yotto')") Yotto


</template>

<script>
// @ is an alias to /src
import Artists from '@/components/lists/Artists.vue'
import Search from "@/components/Search.vue"
export default {
  name: 'home',
  mounted(){
    if(this.$route.query.q){
      this.$store.dispatch('search',this.$route.query.q)
    }
  },
  components: {
    Artists,
    Search
  },
  methods:{
    search(q){
      this.$store.dispatch('search',q)
    }
  },
  computed:{
    items(){
      return this.$store.state.artists
    }
    
    
  }
}
</script>
