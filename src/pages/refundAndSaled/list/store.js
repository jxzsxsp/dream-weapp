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
        var hasMore = res.hasMore;
        if(config.pageNo == 1){
          context.state.list = list;
        }else{
          context.state.list.push(...list)
        }
        if(hasMore){
          context.state.isLoading = 0;
          config.isLockAddPageData = false;  
        }else{
          config.isLockAddPageData = true;    
          context.state.isLoading = (list.length == 0 && config.pageNo == 1)?2:1;
        }
        
        context.state.isPullDownRefresh++;
      }
      function httpError (res){
        config.isLockAddPageData = false;
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
      config.isLockAddPageData = true;
      config.pageNo = 1;
      let prama = {
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
