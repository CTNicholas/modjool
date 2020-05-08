/* global customElements, HTMLElement */
import ModjoolState from './modjool-state.js'

import mjConstructor from './functions/constructor.js'
import mjConnectedCallback from './functions/connectedCallback.js'
import mjUpdateSlots from './functions/updateSlots.js'
import mjUpdate from './functions/update.js'
import mjLifecycle from './functions/lifecycle.js'

export default function (options) {
  class ModjoolElement extends HTMLElement {
    constructor (...args) {
      const polyfill = super(...args)
      mjConstructor(this, options)
      mjLifecycle(this, options, 'enter')
      return polyfill
    }

    connectedCallback () {
      mjConnectedCallback(this, options)
      mjUpdateSlots(this, options)
      mjLifecycle(this, options, 'ready')
      mjLifecycle(this, options, 'js')
      mjUpdate(this, options)
      ModjoolState.addElement(this)
    }

    disconnectedCallback () {
      mjLifecycle(this, options, 'leave')
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
  if (customElements.get(options.name)) {
    return true
  } else {
    return false
  }
}
