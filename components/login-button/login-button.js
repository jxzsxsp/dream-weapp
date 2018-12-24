Component({
  externalClasses: ['button-class'],
  properties: {
    index: Number
  },
  methods: {
    getUserInfo: function () {
      if (!!getApp().bindPhone) {
        getApp().bindPhone().then(() => {
          this.triggerEvent('loginsuccess', this.data)
        })
      } else {
        this.triggerEvent('loginsuccess', this.data)
      }
    }
  },
})