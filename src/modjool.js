import ModjoolDefaults from './modjool-defaults.js'
import ModjoolState from './modjool-state.js'
import ModjoolElement from './modjool-element.js'
import ModjoolSimpleElement from './modjool-simple-element.js'

export default class Modjool {
  constructor (options) {
    Modjool.create(options)
  }

  static createSingle (options) {
    if (typeof options === 'string' || options instanceof String) {
      return ModjoolSimpleElement(options)
    } else {
      options = { ...ModjoolDefaults, ...options }
      return ModjoolElement(options)
    }
  }

  static create (options) {
    if (Array.isArray(options)) {
      for (const option of options) {
        if (!Modjool.createSingle(option)) {
          return false
        }
      }
      return options
    } else {
      return Modjool.createSingle(options) ? options.tag : false
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
