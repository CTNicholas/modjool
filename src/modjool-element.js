/* global customElements, HTMLElement */
import mjConstructor from './functions/constructor.js'
import mjConnectedCallback from './functions/connectedCallback.js'
import mjUpdateSlots from './functions/updateSlots.js'
import mjUpdate from './functions/update.js'

export default function (options) {
  let createdElement
  class ModjoolElement extends HTMLElement {
    constructor (...args) {
      const forPolyfill = super(...args)
      createdElement = this
      mjConstructor(this, options)
      return forPolyfill
    }

    connectedCallback () {
      mjConnectedCallback(this, options)
      mjUpdateSlots(this, options)
      mjUpdate(this, options)
    }

    html (newHtml) {
      this.mj.bodyContent = newHtml
      mjUpdateSlots(this, options)
      mjUpdate(this, options)
    }

    css (newCss) {
      this.mj.styleContent = newCss
      mjUpdateSlots(this, options)
      mjUpdate(this, options)
    }
  }

  customElements.define(options.name, ModjoolElement)
  return createdElement
}
