<template lang="pug">
  div
    audio(:src="file" ref="audio")
    b-btn(v-if="!isPlaying" variant="link" @click="playAudio")
      i.fa.fa-play
    b-btn(v-else variant="link" @click="pauseAudio")
      i.fa.fa-pause

</template>

<script>
export default {
  data(){
    return {
      isPlaying:false
    }
  },
  props:['file'],
  methods:{
    playAudio(){
      this.$refs.audio.play()
      this.isPlaying=true
    },
    pauseAudio(){
      this.$refs.audio.pause()
      this.isPlaying=false
    }
  }
  
}
</script>

<style>

</style>
