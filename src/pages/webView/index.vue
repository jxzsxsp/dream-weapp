<template>
  <div class="container">
    <web-view :src="url"></web-view>
  </div>
</template>

<script>

export default {
  computed: {
    url: function () {
      return this.$root.$mp.query.url
    }
  }
}
</script>
<style>

</style>
