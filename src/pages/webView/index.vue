<template>
  <div class="container">
    <web-view :src="url"></web-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
     
    }
  },
  computed: {
    url: function () {
      return this.$root.$mp.query.url
    }
  },
  methods: {
    
  }
}

</script>
<style>

</style>
