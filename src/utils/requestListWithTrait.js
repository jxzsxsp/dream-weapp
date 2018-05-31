import Http from './http'

/**
 * 列表请求封装
 * 
 * 返回数据类型为{dataList, loadingStatus}
 * 外部无需关注 pageNo, dataList处理, hasMore处理, 上拉刷新处理
 * 
 * 提供 traitName, 当请求数据时此属性对应值变化，立刻刷新列表。适用于一个页面多个列表。
 * 
 * @export
 * @class RequestListWithTrait
 */
export default class RequestListWithTrait {
  constructor (props) {
    this.trait = null 
    this.pageNo = 0
    this.hasMore = true
    this.dataList = []
    this.totalCount = 0
    this.pageSize = props.pageSize || 10
    this.url = props.url
    this.isLoading = props.isLoading || true
    this.traitName = props.traitName
    this.opt = props.opt
  }

  postWithTrait (data) {
    // 特征变化的时候立刻重新请求
    if (this.traitName && data[this.traitName] !== this.trait) {
      this.pageNo = 0
      this.dataList = []
      this.totalCount = 0
      this.hasMore = true
      return this._postWithData(data)
    } else {
      // 特征没变化的时候，即还在当前列表的时候，判断是否到底，到底直接返回缓存数据，否则调用网络请求。
      if (this.hasMore === false) {
        return new Promise((resolve, reject) => {
          let loadingStatus = this._loadingStatus()
          resolve({loadingStatus, dataList: this.dataList, totalCount: this.totalCount})
        })
      } else {
        return this._postWithData(data)
      }
    }
  }

  _postWithData (data) {
    let requestParam = Object.assign({}, data, { pageNo: this.pageNo+1, pageSize: this.pageSize })
    return Http.post(this.url, requestParam, this.isLoading, this.opt).then((res) => {
      if (!res.hasMore) {
        this.hasMore = false
      } 
      this.pageNo++
      if (this.traitName) {
        this.trait = res.requestParam[this.traitName]
      }
      res.list.map((item) => {
        this.dataList.push(item)
      })
      this.totalCount = res.count
      return {dataList: this.dataList, loadingStatus: this._loadingStatus(), totalCount: this.totalCount}
    })
  }

  _loadingStatus () {
    // 配合 list-bottom-loading 2 为没有，1 为没有更多，0 为加载中
    if (this.dataList.length === 0) {
      return 2
    } else if (this.hasMore === false) {
      return 1
    } else {
      return 0
    }
  }
}

