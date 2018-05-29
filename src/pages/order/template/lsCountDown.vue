<template>
  <div class="countdown-style">
    <p>剩余</p>
    <p v-if="day !== 0">{{ day }}天</p>
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
      timeLeft: Math.floor(this.seconds/1000),
      intervalId: 0,
      second: 0,
      minute: 0,
      hour: 0,
      day: 0,
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
    timeLeft () {
      this.day = Math.floor(this.timeLeft/86400)
      this.hour = Math.floor(this.timeLeft/3600 - this.day*24)
      this.minute = Math.floor(this.timeLeft/60 - this.day*24*60 - this.hour*60 )
      this.second = Math.floor(this.timeLeft - this.day*24*60*60 - this.hour* 60*60 - this.minute*60)
    }
  },
  onLoad () {
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
