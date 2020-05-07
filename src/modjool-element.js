/* global customElements, HTMLElement */
import mjConstructor from './functions/constructor.js'

export default function (options) {
  class ModjoolElement extends HTMLElement {
    constructor (...args) {
      const forPolyfill = super(...args)
      mjConstructor(this, options)
      return forPolyfill
    }

    connectedCallback () {

    }
  }

  customElements.define(options.name, ModjoolElement)
  return new ModjoolElement()
}
