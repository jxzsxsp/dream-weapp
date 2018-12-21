import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
  loadingState: http.defaultLoadingState(),
}

const data = {
  colorLibraryList: [],
  defaultColorLibrary: {},
}

const lifecycle = {
  onLoad: function (query) {
    this.getColorLibraryList().then(res => {
      console.log(res)

      this.setData({
        colorLibraryList: res
      })

      for(let i = 0; i < res.length; i++) {
        if(res[i].type === 0) {
          this.setData({
            defaultColorLibrary: res[i]
          })
          break
        }
      }
    })
  },
  onShow: function () {
  }
}

const viewAction = {
}

const privateMethods = {
  getColorLibraryList: function () {
    return http.getList(urls.colorLibraryList, this.props.loadingState, {
      mock: true,
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)