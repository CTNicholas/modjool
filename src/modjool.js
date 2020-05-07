import ModjoolDefaults from './modjool-defaults.js'
import ModjoolState from './modjool-state.js'
import ModjoolElement from './modjool-element.js'

export default class Modjool {
  constructor (options) {
    Modjool.create(options)
  }

  static create (options) {
    options = { ...ModjoolDefaults, ...options }
    const element = ModjoolElement(options)
    ModjoolState.addClass(element)
    return ModjoolState.getElements(element.mj.name)
  }

  static default (defaults) {
    Object.assign(ModjoolDefaults, defaults)
  }

  static get (className = false) {
    return ModjoolState.getElements(className)
  }
}
