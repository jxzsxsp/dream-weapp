
<template>
  <div class="cloth">
    <a href='/pages/order/clothReport/main'>{{text}}</a>
    <web-view :src="src"></web-view>
  </div>
</template>

<script>
export default {
  props: ['src','text']
}
</script>
<style>

</style>
