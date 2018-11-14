import {$wx, $Page} from '../../genji4mp/index'

const data = {
  verifyCodeArr: [{num: '', focus: false},{num: '', focus: false},{num: '', focus: false},{num: '', focus: false},{num: '', focus: false},{num: '', focus: false}],
  test: '',
}

const privateMethods = {
  getVerifyCode () {
    return this.data.verifyCodeArr.reduce((preCode, item) => {
      return preCode + item.num
    }, '')
  }
}

const viewAction = {
  nextStepClicked () {
    
    this.getVerifyCode()
  },
  codeInputed (data, value) {
    // 删除的情况
    if (typeof(value) === "object") {
      this.data.verifyCodeArr[data.index].num = ''
      // 第一个输入框，不设置 focus，其余切换 focus
      if (data.index !== 0) {
        this.data.verifyCodeArr.forEach((code, index) => {
          if (index === data.index - 1) {
            code.focus = true 
          } else {
            code.focus = false
          }
        });
      } 
      this.setData({
        verifyCodeArr: this.data.verifyCodeArr
      }) 
      return
    }

    // 输入的情况
    if (data.index !== 5) {
      this.data.verifyCodeArr.forEach((code, index) => {
        if (index === data.index + 1) {
          code.focus = true 
        } else {
          code.focus = false
        }
      });
    }
    this.data.verifyCodeArr[data.index].num = value
    this.setData({
      verifyCodeArr: this.data.verifyCodeArr
    })
  }
}

$Page(null,data,null, privateMethods, viewAction)