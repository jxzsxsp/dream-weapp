import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

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
    console.log(query)

    this.setData({
      ...query,
    })

    if (query.libraryDetail && query.libraryDetail.name) {
      if (query.type !== constant.ColorLibraryActionType.SaveLibrary) {
        if (query.libraryDetail.id > 0) {
          $wx.setNavigationBarTitle({
            title: '编辑颜色库',
          })
        }
        
        this.setData({
          id: query.libraryDetail.id,
          name: query.libraryDetail.name,
          desc: query.libraryDetail.description,
        })
      } else {
        this.setData({
          name: query.libraryDetail.name,
          desc: query.libraryDetail.description,
        })
      }
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
        this.setData({
          libraryId: res.data
        })
        
        let libraryDetail = this.data.libraryDetail
        libraryDetail.id = res.data
        libraryDetail.name = this.data.name
        libraryDetail.description = this.data.desc

        if (this.data.type === constant.ColorLibraryActionType.Move_Single
          || this.data.type === constant.ColorLibraryActionType.Move_Multiple) {
          this.moveColorToLibrary().then(res => {
            $wx.navigateBack(2, {
              type: this.data.type,
              libraryDetail: libraryDetail
            })
          }, '已移动到 ' + libraryDetail.name)
        } else if (this.data.type === constant.ColorLibraryActionType.Add_Single
          || this.data.type === constant.ColorLibraryActionType.Add_Multiple
          || this.data.type === constant.ColorLibraryActionType.SaveColor
          ) {
          this.addColorToLibrary().then(res => {
            $wx.navigateBack(2, {
              type: this.data.type,
              libraryDetail: libraryDetail
            }, '已加入到 ' + libraryDetail.name)
          })
        } else {
          $wx.navigateBack(1, {
            type: this.data.type,
            libraryDetail: libraryDetail
          })
        }
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
    if (this.isNotEmpty(this.data.name)) {
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
  addColorToLibrary: function () {
    return http.post(urls.addColor, {
      // mock: true,
      libraryId: this.data.libraryId,
      libraryColorIdList: this.data.libraryColorIdList,
    })
  },
  moveColorToLibrary: function () {
    return http.post(urls.moveColor, {
      // mock: true,
      libraryId: this.data.libraryId,
      libraryColorIdList: this.data.libraryColorIdList,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)