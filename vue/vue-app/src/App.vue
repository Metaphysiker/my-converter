<template>
  <InfoCard></InfoCard>
  <UploadController></UploadController>
</template>

<script>
import InfoCard from './components/InfoCard.vue'
import UploadController from './components/UploadController.vue'

export default {
  name: 'App',
  components: {
    InfoCard,
    UploadController
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
