<template lang="pug">
  b-form.form-inline(@submit.prevent="search")
    b-input(type="search" v-model="searchTerm" placeholder="Search for an artist")
    b-btn(type="submit" variant="link")
      i.fa.fa-search
</template>

<script>
export default {
  data(){
    return {
      searchTerm:''
    }
  },
  methods:{
      search(){
        if(this.searchTerm.length<1){
          this.$toasted.error("You must enter a search term!",{icon:"exclamation-circle"})
        } else {
          this.$store.dispatch('search',this.searchTerm)
          this.$router.push('/')
        }
        
      }
  }
}
</script>

<style>

</style>
