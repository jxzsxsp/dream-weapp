<template>
  <div class="container">
    <web-view :src="url"></web-view>
  </div>
</template>

<script>

export default {
  data() {
    return ({
      url: ''
    })
  },
  onShow () {
    this.url = this.$root.$mp.query.url
  }
}
</script>
<style>

</style>
