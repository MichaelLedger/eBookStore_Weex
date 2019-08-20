<template>
  <div class="app-wrapper">
    <main-tab-page></main-tab-page>
  </div>
</template>

<style>
  body{
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color:#333;
  }
</style>

<style scoped>
  .app-wrapper{
    background-color: #f4f4f4;
  }
</style>

<script>
  import util from './css/config.js'
  import MainTabPage from './widget/MainTabPage.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      MainTabPage
    },
    created () {
      util.initIconFont()
    }
  }
</script>
