<template>
  <div>
    <div class="list-item">
      {{text}}
      <div>{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text','message']
}
</script>

<style>
.list-item {
  padding: 10px;
}
</style>
