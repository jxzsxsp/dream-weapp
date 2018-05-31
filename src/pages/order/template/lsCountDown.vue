<template>
  <div class="countdown-style" v-if="seconds">
    <p>剩余</p>
    <p v-if="hour !== 0">{{ hour }}小时</p>
    <p v-if="minute !== 0">{{ minute }}分钟</p>
    <p v-if="second !== 0">{{ second }}秒</p>
  </div>
</template>

<script>
export default {
  props: ["seconds","fontSize"],
  data () {
    return ({
      timeLeft: 0,
      intervalId: 0,
      second: 0,
      minute: 0,
      hour: 0,
    })
  },
  methods: {
    _countDown () {
      return setInterval(() => {
        if (this.timeLeft > 0 ) {
          this.timeLeft--
        } 
      }, 1000);
    }
  },
  watch: {
    seconds () {
      this.timeLeft = Math.floor(this.seconds/1000)
    },
    timeLeft () {
      this.hour = Math.floor(this.timeLeft/3600)
      this.minute = Math.floor(this.timeLeft/60 - this.hour*60 )
      this.second = Math.floor(this.timeLeft - this.hour* 60*60 - this.minute*60)
    }
  },
  onLoad (options) {
    // 开启定时
    this.intervalId = this._countDown()
  },
  onUnload () {
    clearInterval(this.intervalId)
  }

}
</script>

<style>
.countdown-style {
  display: flex;
  font-size: 24rpx;
}
</style>
