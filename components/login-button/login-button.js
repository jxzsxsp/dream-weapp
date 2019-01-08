Component({
  externalClasses: ['button-class'],
  properties: {
    loginCallbackType: {
      type: Number,
      value: -1
    }
  },
  methods: {
    getUserInfo: function () {
      if (!!getApp().bindPhone) {
        getApp().bindPhone(this.data.loginCallbackType).then(() => {
          this.triggerEvent('loginsuccess', this.data)
        })
      } else {
        this.triggerEvent('loginsuccess', this.data)
      }
    }
  },
})