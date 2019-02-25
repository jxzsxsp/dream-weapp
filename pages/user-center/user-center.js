import { $Page, $wx } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const data = {
  settingList: [
    { name: '关注店铺', icon: 'icon-shop', half: true },
    { name: '最近浏览', icon: 'icon-history', half: true },
    { name: '我的收藏', icon: 'icon-favorite', half: true },
    { name: '商品收藏', icon: 'icon-goods', half: true },
    { name: '推荐', icon: 'icon-recommendsupplier', half: false },
    { name: '我的申请', icon: 'icon-apply', half: false },
  ],
  userInfo: {},
  showShareImg: false,
  saveImgBtnHidden: false,
  openSettingBtnHidden: true,
  noticeNum: 0,
}

const privateMethod = {
  // 绘制图片
  drawShareImg: function () {
    const ctx = wx.createCanvasContext('shareImg');
    this.drawImg(ctx)
    ctx.draw()
  },
  // 绘制图片
  drawImg: function (ctx) {
    const unit = this.data.unit

    ctx.drawImage(this.data.shareQrcodeImgPath, 0, 0, 750 * unit, 975 * unit);

    // //这里很重要，主要就是布局
    // ctx.save();
    // //绘制头像
    // ctx.beginPath(); //开始绘制
    // //先画个圆，前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    // ctx.arc(116 * unit, 105 * unit, 50 * unit, 0, Math.PI * 2, false);
    // ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。
    // // 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
    // ctx.drawImage(this.data.avatarUrl, 66 * unit, 55 * unit, 100 * unit, 100 * unit);
    // ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图问下文即状态 还可以继续绘制

    // // ctx.drawImage(this.data.avatarUrl, 66 * unit, 55 * unit, 100 * unit, 100 * unit);
    // ctx.drawImage(this.data.qrcodeImgPath, 120 * unit, 230 * unit, 300 * unit, 300 * unit);
    // ctx.setFontSize(34 * unit)
    // ctx.setFillStyle('#000000')
    // ctx.fillText(this.data.userInfo.nickName, 192 * unit, 95 * unit)
    // ctx.setFontSize(24 * unit)
    // ctx.setFillStyle('#616161')
    // ctx.fillText('向您推荐小程序', 192 * unit, 133 * unit);
    // ctx.fillText('长按识别二维码，获取您的专属色彩管家', 48 * unit, 637 * unit);
  },

  //保存至相册
  saveShareImgToPhotosAlbum: function () {
    let _this = this
    const ctx = wx.createCanvasContext('shareImg');

    _this.drawImg(ctx)

    ctx.draw(false, function () {
      console.log('draw')
      // canvas画布转成图片
      wx.canvasToTempFilePath({
        canvasId: 'shareImg',
        success: function (res) {
          console.log(res);
          
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
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
  downloadAvatarImg: function() {
    let _this = this

    wx.downloadFile({
      url: $wx.app.globalData.userInfo.avatarUrl,
      success: function (res) {
        console.log(res.tempFilePath);
        _this.setData({
          avatarUrl: res.tempFilePath,
        })
      },
      fail: function (fres) {
      }
    })
  },
  getNoticeNum: function() {
    http.get(urls.messageUnreadNum, {
      mock: true,
    }).then(res => {
      this.setData({
        noticeNum: res.totalCount
      })
    })
  }

}

const lifecycle = {
  onLoad: function () {
    $wx.app.getAppUserInfo().then(res => {
      $wx.app.saveAuthInfo().then(res => {
        this.setData({
          userInfo: $wx.app.globalData.userInfo
        })
      })
    })
    this.getNoticeNum()
  },
  onReady: function() {
    let _this = this

    // this.downloadAvatarImg()
    
    wx.getImageInfo({
      src: '../../assets/xiaoxi_qrcode.jpg',
      success: function (res) {
        console.log(res)
        _this.setData({
          qrcodeImgPath: '../../' + res.path
        });
      }
    })

    wx.getImageInfo({
      src: '../../assets/share_back.png',
      success: function (res) {
        console.log(res)
        _this.setData({
          shareBackImgPath: '../../' + res.path
        });
      }
    })

    wx.getImageInfo({
      src: '../../assets/share_qrcode.jpg',
      success: function (res) {
        console.log(res)
        _this.setData({
          shareQrcodeImgPath: '../../' + res.path
        });
      }
    })

    //获取用户设备信息，屏幕宽度
    wx.getSystemInfo({
      success: res => {
        _this.setData({
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
      title: `推荐您进入蜥奇`,
      path: `/pages/index/index`,
      imageUrl: 'http://img50.lianshang.cn/data/user/c/20192/5/1550660549650_4618.jpg'
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
    } else if (d.index === 3) {
      // 商品收藏
      $wx.navigateTo($wx.router.itemFavorite)
    } else if (d.index === 4) {
      // 推荐供应商
      $wx.navigateTo($wx.router.recommendSupplier)
    } else if (d.index === 5) {
      // 我的申请
      $wx.navigateTo($wx.router.myApply)
    }
  },
  gotoNoticeList: function() {
    $wx.navigateTo($wx.router.noticeList)
  },
  callContact: function() {
    $wx.makePhoneCall({
      phoneNumber: '02161161196',
    })
  },
  showShareImg: function(d, v) {
    // this.drawShareImg();
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
    let _this = this

    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {//这里是用户同意授权后的回调
              _this.saveShareImgToPhotosAlbum()
              _this.closeShareImg()
            },
            fail() {//这里是用户拒绝授权后的回调
              _this.setData({
                saveImgBtnHidden: true,
                openSettingBtnHidden: false
              })
            }
          })
        } else {//用户已经授权过了
          _this.saveShareImgToPhotosAlbum()
          _this.closeShareImg()
        }
      }
    })
  },

  handleSetting: function (d, v) {
    let _this = this

    // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
    if (!v.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '若不打开授权，则无法将图片保存在相册中！',
        showCancel: false
      })
      _this.setData({
        saveImgBtnHidden: true,
        openSettingBtnHidden: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您已授权，赶紧将图片保存在相册中吧！',
        showCancel: false
      })
      _this.setData({
        saveImgBtnHidden: false,
        openSettingBtnHidden: true
      })
    }
  },
  getUserInfo () {
    $wx.app.bindPhone().then(res => {
      this.setData({
        userInfo: $wx.app.globalData.userInfo
      }, function() {
        this.downloadAvatarImg()
      })
    })
  },
}

$Page.register(null, data, lifecycle, privateMethod, viewAction)