<template>
  <div class="container">
    <web-view :src="url"></web-view>
  </div>
</template>

<script>
/**
 * 选择支付方式的 webView 
 */
export default {
  data () {
    return ({
      url: ''
    })
  },
  onLoad () {
    this.url = decodeURIComponent(this.$root.$mp.query.url)
    console.log(this.url)
  }
}
</script>
<style>

</style>
