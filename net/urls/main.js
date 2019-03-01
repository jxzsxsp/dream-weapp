export default {
  bannerList: '/public/banner-resources', // 轮播图
  applyFacility: '/device/trial-apply', // 申请设备
  colorLibraryDetail: '/library-color/list', // 色库详情
  labelList: '/library-color/label-list', // 该用户名下颜色标签列表
  setLabel: '/library-color/set-label', // 颜色设置标签
  isInFavorite: '/library-color/is-in-favorites', // 通过颜色的id 和 类型 判断是否已经收藏了
  addFavorite: '/library-color/add-favorite-color', // 添加收藏接口
  cancelFavorite: '/library-color/cancel-favorite-color', // 取消收藏接口
  deleteColor: '/library-color/delete', // 颜色库中颜色删除
  colorLibraryList: '/color-library/list', // 颜色库列表接口
  colorLibrarySave: '/color-library/save', // 添加/编辑颜色库接口
  addColor: '/library-color/add-color', // 颜色保存（复制）至颜色库接口
  addSingleColor: '/library-color/add-single-color', // 单个颜色保存(复制)到颜色库接口
  moveColor: '/library-color/move-to-library', // 移动颜色到特定库
  deleteColorLibrary: '/color-library/delete', // 颜色库删除接口
  addColorFromLibrary: '/library-color/add-favorite-color-library', // 添加一个库的颜色到另一个库
  recommendSupplier: '/shop/recommend', // 获取推荐的供应商列表
  followSupplier: '/shop/follow', // 关注供应商接口
  unfollowSupplier: '/shop/unfollow', // 取消关注供应商接口
  followList: '/shop/followList', // 关注供应商店铺列表接口
  browseHistory: '/shop/browseHistory', // 最近浏览店铺列表接口
  shopDetail: '/shop/detail', // 店铺详情接口
  personDetail: '/shop/business-card', // 个人名片接口
  bindCustomer: '/shop/bind-customer', // 添加客户关系记录（到店码，浏览）
  itemDetail: '/item/detail', // 商品详情接口 GET
  addItemFavorite: '/item/item-add-favorite', // 商品添加收藏 POST
  cancelItemFavorite: '/item/item-cancel-favorite', // 商品取消收藏 POST
  tradeCreate: '/trade/create', // 剪米样/拿色卡提交接口 POST
  shopSimpleDetail: '/shop/simple-detail', // 店铺信息 GET
  messageUnreadNum: '/message/unread-num', // 未读通知数 GET
  applyList: '/trade/apply-list', // 我的调样申请列表接口 GET
  itemFavoriteList: '/item/item-favorite-list', // 我的商品收藏列表 GET
  messageList: '/message/list', // 通知列表 GET
  messageDetail: '/message/biz-detail', // 消息通知跳调样详情接口 GET
  confirmReceived: '/trade/confirm-received', // 确认收货接口 POST
  getItemListByPosition: '/item/get-by-position', // 根据位置显示商品列表接口 GET
  shareItemList: '/item/qrcode-item-list', // 根据分享的id获取商品列表接口 GET
  homeItemList: '/item/items-for-home-page-chame', // 店铺首页各个区域商品列表接口 GET
  setRead: '/message/set-read', // 消息通知已读接口 GET
}
