// components/timeline/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    steps: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function previewImage(e) {
      let urls = e.currentTarget.dataset.urls;
      let imgUrls;

      if (urls instanceof Array) {
        imgUrls = urls;
      } else {
        imgUrls = [urls];
      }

      wx.previewImage({
        urls: imgUrls,
      })
    }
  }
})
