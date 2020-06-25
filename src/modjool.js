import ModjoolDefaults from './modjool-defaults.js'
import ModjoolState from './modjool-state.js'
import ModjoolElement from './modjool-element.js'
// import ModjoolSimpleElement from './modjool-simple-element.js'

export default class Modjool {
  constructor (options) {
    Modjool.create(options)
  }

  static createSingle (options) {
    const isString = typeof options === 'string' || options instanceof String
    return ModjoolElement(!isString, options)
  }

  static create (...options) {
    options = options.length === 1 ? options[0] : options
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
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(() => {
          resolve(Modjool.get(className))
        }, 0)
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(() => {
            resolve(Modjool.get(className))
          }, 10)
        })
      }
    })
  }
}
