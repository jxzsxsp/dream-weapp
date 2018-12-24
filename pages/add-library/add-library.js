import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  maxTitleTextNum: 8,
  maxDescTextNum: 140,
  canSave: false,
  id: '',
  name: '',
  desc: '',
  libraryDetail: {},
}

const lifecycle = {
  onLoad: function (query) {
    if(query.libraryDetail && query.libraryDetail.name) {
      if (query.libraryDetail.id > 0) {
        $wx.setNavigationBarTitle({
          title: '编辑颜色库',
        })
      }
      
      this.setData({
        id: query.libraryDetail.id,
        name: query.libraryDetail.name,
        desc: query.libraryDetail.description,
        libraryDetail: query.libraryDetail,
      })
    }
  },
  onShow: function() {
    this.checkCanSave()
  },
}

const viewAction = {
  save: function () {

    if(this.data.canSave) {
      this.createColorLibrary().then(res => {
        console.log(res)
        let libraryDetail = this.data.libraryDetail
        libraryDetail.id = this.data.id
        libraryDetail.name = this.data.name
        libraryDetail.description = this.data.desc
        $wx.navigateBack(1, {
          libraryDetail: libraryDetail
        })
      })
    }

  },
  nameChange: function (d, v) {
    
    this.setData({
      name: v
    })

    this.checkCanSave()

  },
  descChange: function (d, v) {

    this.setData({
      desc: v
    })

    this.checkCanSave()

  },
}

const privateMethods = {
  isNotEmpty: function(str) {
    return !!str && str.length > 0
  },
  checkCanSave: function () {
    if (this.isNotEmpty(this.data.name) && this.isNotEmpty(this.data.desc)) {
      this.setData({
        canSave: true
      })
    } else {
      this.setData({
        canSave: false
      })
    }
  },
  createColorLibrary: function () {
    return http.post(urls.colorLibrarySave, {
      // mock: true,
      id: this.data.id,
      name: this.data.name,
      description: this.data.desc
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)