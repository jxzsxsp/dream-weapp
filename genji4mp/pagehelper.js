function isObject (key, obj) {
  if (typeof obj !== 'object') {
    throw new Error(`${key} 必须是一个对象`)
  }
}

export default function (pageInstance) {
  // 要传给 page 的对象
  let pageObject = {}
  Object.keys(pageInstance).forEach((key) => {
    if (key === 'lifeCycle') {
      isObject(key, pageInstance[key])
      pageObject = Object.assign(pageObject, {...pageInstance[key]})
    } else if (key === 'viewAction') {
      isObject(key, pageInstance[key])
      // 原始的 actions 对象
      let actions = pageInstance[key]
      // 修改后的 actions 对象
      let actionsObject = {}
      Object.keys(actions).forEach((key) => {
        // 原始的某一个 action 方法
        let action = actions[key]
        actionsObject[key] = function (e) {
          action(e.currentTarget.dataset || {}, e.detail.value || {})
        }
      })
      pageObject = Object.assign(pageObject, actionsObject)
    } else {
      pageObject = Object.assign(pageObject, {[key]: pageInstance[key]})
    }
  })
  console.log(pageObject)
  Page(pageObject)
}