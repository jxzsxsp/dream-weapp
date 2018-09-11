<template>
  <div class="container">
  </div>
</template>

<script>
/**
 * 支付页面用来,在此调用微信小程序支付api
 */
export default {
  data () {
    return ({
      url: ''
    })
  },
  onLoad (params) {
    console.log(params)
    // wx.requestPayment({
    //   'success': function (res) {
    //     wx.rediretTo({url: ''})
    //   },
    //   'fail': function (res) {
    //     wx.redirectTo({url: ''})
    //   },
    //   'complete': function (res) {

    //   }
    // })
  }
}
</script>
<style>

</style>
