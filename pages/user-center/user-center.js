import {$Page, $wx} from '../../genji4mp/index'

const data = {
  settingList: [
    { name: '关注店铺', icon: 'icon-shop', half: true },
    { name: '最近浏览', icon: 'icon-history', half: true },
    { name: '我的收藏', icon: 'icon-favorite', half: false },
  ],
  userInfo: {},
  showShareImg: false,
}

const privateMethod = {
  // 绘制图片
  drawShareImg: function () {
    const unit = this.data.unit
    const ctx = wx.createCanvasContext('shareImg');

    this.drawImg(ctx)

    ctx.draw()
  },
  // 绘制图片
  drawImg: function (ctx) {
    const unit = this.data.unit

    ctx.drawImage(this.data.shareBackImgPath, 0, 0, 540 * unit, 720 * unit);

    //这里很重要，主要就是布局
    ctx.save();
    //绘制头像
    ctx.beginPath(); //开始绘制
    //先画个圆，前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    ctx.arc(116 * unit, 105 * unit, 50 * unit, 0, Math.PI * 2, false);
    ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。
    // 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
    ctx.drawImage(this.data.avatarUrl, 66 * unit, 55 * unit, 100 * unit, 100 * unit);
    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图问下文即状态 还可以继续绘制

    // ctx.drawImage(this.data.avatarUrl, 66 * unit, 55 * unit, 100 * unit, 100 * unit);
    ctx.drawImage(this.data.qrcodeImgPath, 120 * unit, 230 * unit, 300 * unit, 300 * unit);
    ctx.setFontSize(34 * unit)
    ctx.setFillStyle('#000000')
    ctx.fillText(this.data.userInfo.nickName, 192 * unit, 95 * unit)
    ctx.setFontSize(24 * unit)
    ctx.setFillStyle('#616161')
    ctx.fillText('向您推荐小程序', 192 * unit, 133 * unit);
    ctx.fillText('长按识别二维码，获取您的专属色彩管家', 48 * unit, 637 * unit);
  },

  //保存至相册
  saveShareImgToPhotosAlbum: function () {
    console.log('saveShareImgToPhotosAlbum')
    let that = this
    const ctx = wx.createCanvasContext('shareImg');

    this.drawImg(ctx)

    ctx.draw(false, function () {
      console.log('draw')
      // canvas画布转成图片
      wx.canvasToTempFilePath({
        canvasId: 'shareImg',
        success: function (res) {
          console.log(res);
          that.setData({
            shareImgSrc: res.tempFilePath
          })
          
          wx.saveImageToPhotosAlbum({
            filePath: that.data.shareImgSrc,
            success(res) {
              console.log(res);
            }
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    });
  },
}

const lifecycle = {
  onLoad: function () {
  },
  onReady: function() {
    let that = this

    wx.downloadFile({
      url: $wx.app.globalData.userInfo.avatarUrl,
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          avatarUrl: res.tempFilePath,
        })
      }, 
      fail: function (fres) {
      }
    })
    
    wx.getImageInfo({
      src: '../../assets/xiaoxi_qrcode.jpg',
      success: function (res) {
        console.log(res)
        that.setData({
          qrcodeImgPath: '../../' + res.path
        });
      }
    })

    wx.getImageInfo({
      src: '../../assets/share_back.png',
      success: function (res) {
        console.log(res)
        that.setData({
          shareBackImgPath: '../../' + res.path
        });
      }
    })

    //获取用户设备信息，屏幕宽度
    wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth,
          unit: res.screenWidth / 750,
        })
      }
    })
  },

  onShow: function () {
    if ($wx.app.isBinded()) {
      this.setData({
        userInfo: $wx.app.globalData.userInfo
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: `小蜥取色`,
      path: `/pages/index/index`,
      imageUrl: 'http://img50.lianshang.cn/data/share.jpg'
    }
  },
}

const viewAction = {
  itemClicked (d, v) {
    if (d.index === 0) {
      // 关注店铺
      $wx.navigateTo($wx.router.followShop)
    } else if (d.index === 1) {
      // 最近浏览 
      $wx.navigateTo($wx.router.latestView)
    } else if (d.index === 2) {
      // 我的收藏
      $wx.navigateTo($wx.router.favoriteLibrary)
    }
  },
  callContact: function() {
    $wx.makePhoneCall({
      phoneNumber: '02161161196',
    })
  },
  showShareImg: function(d, v) {
    this.drawShareImg();
    this.setData({
      showShareImg: true
    })
  },
  closeShareImg: function (d, v) {
    this.setData({
      showShareImg: false
    })
  },
  saveImg: function() {
    this.saveShareImgToPhotosAlbum()
    this.closeShareImg()
  },
  getUserInfo () {
    $wx.app.bindPhone().then(res => {
      this.setData({
        userInfo: $wx.app.globalData.userInfo
      })
    })
  },
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)