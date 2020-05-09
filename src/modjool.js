import ModjoolDefaults from './modjool-defaults.js'
import ModjoolState from './modjool-state.js'
import ModjoolElement from './modjool-element.js'

export default class Modjool {
  constructor (options) {
    Modjool.create(options)
  }

  static create (options) {
    options = { ...ModjoolDefaults, ...options }
    const success = ModjoolElement(options)
    console.log('ELL SUCCESS:', options.name, success, ModjoolState.elements)
    if (success) {
      return options.name
    } else {
      return false
    }
  }

  static default (defaults) {
    Object.assign(ModjoolDefaults, defaults)
  }

  static get (className = false) {
    return ModjoolState.getElements(className)
  }

  static getAsync (className) {
    return new Promise((resolve, reject) => {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          resolve(Modjool.get(className))
        }, 0)
      })
    })
    // return ModjoolState.elements.filter(el => className ? el.mj.name === className : true)
  }
}
