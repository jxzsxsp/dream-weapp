// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import orderApi from '@/api/order.api.js'
Vue.use(Vuex)

let config = {
  pageNo: 1,
  pageSize: 10,
  isLockAddPageData: false
}
const store = new Vuex.Store({
  state: {
    isLoading: 0,
    status: -1,
    orderList: [],
    isPullDownRefresh: 0
  },
  mutations: {

  },
  actions: {
    getOrderList(context,payload){
      orderApi.getOrderList(payload).then(res => {
        var orderList = res.list;
        if(config.pageNo == 1){
          context.state.orderList = orderList;
          if(orderList.length == 0){
            context.state.isLoading = 2;
            config.isLockAddPageData = true;            
          }else if(orderList.length < config.pageSize){
            context.state.isLoading = 1;
            config.isLockAddPageData = true;
          }else{
            context.state.isLoading = 0;   
            config.isLockAddPageData = false; 
          }
        }else if(orderList.length < config.pageSize){
          context.state.isLoading = 1;
          config.isLockAddPageData = true;
          context.state.orderList.push(...orderList)
        }else{
          context.state.orderList.push(...orderList)
          config.isLockAddPageData = false;        
        }
        context.state.isPullDownRefresh++;
      },res => {
        config.isLockAddPageData = false;
        wx.showToast({
          title: res.message, //提示的内容,
          icon: 'none', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
      });
    },
    refresh(context,isPullDownRefresh){
      config.isLockAddPageData = false;
      config.pageNo = 1;
      let prama = {
        status: context.state.status,
        pageNo: config.pageNo,
        pageSize: config.pageSize
      }
      context.dispatch('getOrderList',prama)
    },
    reachBottom(context){
      if(config.isLockAddPageData) return false;
      config.isLockAddPageData = true;
      config.pageNo++;
      let prama = {
        status: status,
        pageNo: config.pageNo,
        pageSize: config.pageSize
      }
      context.dispatch('getOrderList',prama)
    },
    changeStatus(context,status){
      context.state.status = status;
      context.dispatch('refresh');
    },
    confirmReceipt (context,order){
      var data = {
        id: order.tradeInfo.tradeId
      }
      orderApi.confirmReceipt(data).then(res => {
        order.tradeInfo.showStatus = "已收货";
        order.tradeInfo.statusId = 4
        wx.showToast({
          title: '确认收货成功！', //提示的内容,
          icon: 'success', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
      }, res => {
        wx.showToast({
          title: '确认收货失败啦，请重新确认！', //提示的内容,
          icon: 'success', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
      })
    }
  }
})

export default store
