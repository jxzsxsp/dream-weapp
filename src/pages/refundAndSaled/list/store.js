// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import refundAndSaledApi from '@/api/refundAndSaled.api.js'
Vue.use(Vuex)

let config = {
  pageNo: 1,
  pageSize: 10,
  isLockAddPageData: false
}
const store = new Vuex.Store({
  state: {
    isLoading: 0,
    status: 1,
    list: [],
    isPullDownRefresh: 0
  },
  mutations: {

  },
  actions: {
    getList(context,payload){


      function httpSuccess (res){
        var list = res.list;
        if(config.pageNo == 1){
          context.state.list = list;
          if(list.length == 0){
            context.state.isLoading = 2;
          }else if(list.length < config.pageSize){
            context.state.isLoading = 1;
          }
        }else if(list.length < config.pageSize){
          context.state.isLoading = 1;
          context.state.list.push(...list)
        }else{
          context.state.list.push(...list)
          config.isLockAddPageData = false;        
        }
        context.state.isPullDownRefresh++;
      }

      function httpError (res){
        config.isLockAddPageData = false;
        wx.showToast({
          title: res.message, //提示的内容,
          icon: 'none', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
      }

      if(context.state.status == 1){
        refundAndSaledApi.getRefundList(payload).then(res => {
          httpSuccess(res);
        },res => {
          httpError(res);
        });
      }else{
        refundAndSaledApi.getSaledList(payload).then(res => {
          httpSuccess(res);
        },res => {
          httpError(res);
        });
      }

      
    },
    refresh(context,isPullDownRefresh){
      config.isLockAddPageData = false;
      config.pageNo = 1;
      let prama = {
        status: context.state.status,
        pageNo: config.pageNo,
        pageSize: config.pageSize
      }
      context.dispatch('getList',prama)
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
      context.dispatch('getList',prama)
    },
    changeStatus(context,status){
      context.state.status = status;
      context.dispatch('refresh');
    }
  }
})

export default store
