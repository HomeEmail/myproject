<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <transition name="fade" mode="out-in"> -->
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    <!-- </transition> -->
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
