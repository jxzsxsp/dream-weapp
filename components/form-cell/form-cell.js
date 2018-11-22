Component({
  options: {
    multipleSlots: true
  },
  properties: {
    isLast: {
      type: Boolean,
      value: false
    },
    hasDetail: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onTap: function () {
      this.triggerEvent('formclick', {})
    }
  }


})