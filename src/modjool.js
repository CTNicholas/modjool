/* global customElements */
import ModjoolDefaults from './modjool-defaults.js'
import ModjoolElement from './modjool-element.js'

export default class Modjool {
  constructor (options) {
    Modjool.create(options)
  }

  static create (options) {
    options = { ...ModjoolDefaults, ...options }
    const element = ModjoolElement(options)
    console.log('element: ', element)

    const elementName = options.name
    console.log(`${elementName} defined?`, !!customElements.get(elementName))

    return element
  }

  static default (defaults) {
    Object.assign(ModjoolDefaults, defaults)
  }
}
