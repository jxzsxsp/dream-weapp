function isObject (key, obj) {
  if (typeof obj !== 'object') {
    throw new Error(`${key} 必须是一个对象`)
  }
}

/**
 * 生成Page的方法
 * @param {object} props 不影响UI对象
 * @param {object} data 影响UI对象
 * @param {object} lifeCycle 生命周期对象
 * @param {object} privateMethod 私有方法对象
 * @param {object} viewAction UI点击事件对象
 */
export default function (props = {}, data = {}, lifeCycle = {}, privateMethod = {}, viewAction = {}) {
  isObject('props', props) && isObject('data', data) && isObject('lifeCycle', lifeCycle) && isObject('privateMethod', privateMethod) && isObject('viewAction', viewAction)

  let lifeCycleObject = {}
  !!lifeCycle && Object.keys(lifeCycle).forEach(function (key) {
    lifeCycleObject[key] = lifeCycle[key]
  })

  let privateMethodObject = {}
  !!privateMethod && Object.keys(privateMethod).forEach(function (key) {
    privateMethodObject[key] = privateMethod[key]
  })

  let actionsObject = {}
  !!actionsObject && Object.keys(viewAction).forEach(function (key) {
    let action = viewAction[key]
    actionsObject[key] = function (e) {
      action.call(this, e.currentTarget.dataset || {}, e.detail.value || {})
    }
  })

  const pageObject = {props, data, ...privateMethodObject, ...actionsObject, ...lifeCycleObject}

  Page(pageObject)
}