<template>
<div class="PageWrapper">
    <img src="../assets/logo.png">
    <div class="tips">{{msg}}</div>
</div>
</template>

<script>
export default {
  name: 'notFoundPage',
  data () {
    return {
      msg: 'Oh! 404,工程师们正在努力为你找回页面~~'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PageWrapper{
  text-align: center;
  font-size: 20px;
  padding: 20px;
}
.tips{
  padding: 20px;
}
</style>
