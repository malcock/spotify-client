<template lang="pug">
  b-table(:items="items" :fields="fields" striped)
    template(slot="images" slot-scope="data")
      div(v-if="data.value.length>0")
        img.avatar(:src="data.value[data.value.length-1].url" width="64")
      div(v-else)
        div.avatar.avatar_none
          span No Image
    template(slot="name" slot-scope="data")
      router-link(:to="'/artist/' + data.item.id")
        h4 {{data.value}}
    template(slot="followers" slot-scope="data")
      span {{data.value.total | formatNumber}} 
        i.fa.fa-users 
    template(slot="popularity" slot-scope="data")
      div.pop
        div.pop-meter(:style="'right:' + (100-data.value) +'%'")
      
</template>

<script>
export default {
  data(){
    return {
      fields:[
        {
          key:"images",
          label:"Image"
        },
        {
          key:"name",
          label:"Name",
          sortable:true
        },
        {
          key:"followers",
          label:"Followers",
          sortable:true
        },
        {
          key:"popularity",
          label:"Popularity",
          sortable:true
        }
        
      ]

    }
  },
  props:{
    items:{
      type:Array,
      required:true,
      default(){
        return []
      }
    },
  }
}
</script>

<style>

</style>
