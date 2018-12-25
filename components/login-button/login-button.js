Component({
  externalClasses: ['button-class'],
  properties: {
    type: Number
  },
  methods: {
    getUserInfo: function () {
      if (!!getApp().bindPhone) {
        getApp().bindPhone(this.data.type).then(() => {
          this.triggerEvent('loginsuccess', this.data)
        })
      } else {
        this.triggerEvent('loginsuccess', this.data)
      }
    }
  },
})