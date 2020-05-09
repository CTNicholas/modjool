/* global customElements, HTMLElement */
import ModjoolState from './modjool-state.js'

import mjConstructor from './functions/constructor.js'
import mjConnectedCallback from './functions/connectedCallback.js'
import mjUpdateSlots from './functions/updateSlots.js'
import mjUpdate from './functions/update.js'
import mjLifecycle from './functions/lifecycle.js'
import mjGetAttributes from './functions/getAttributes.js'

const KEYWORDS = ['html', 'js', 'css', 'name', 'inherit', 'attributes', 'enter', 'ready', 'leave']

export default function (options) {
  class ModjoolElement extends HTMLElement {
    constructor (...args) {
      const polyfill = super(...args)
      mjConstructor(this, options)
      mjLifecycle(this, options, 'enter')
      console.log('est')
      return polyfill
    }

    // Originally skipped event if (this.innerHTML !== '')
    // Changed for consistency
    connectedCallback () {
      document.addEventListener('DOMContentLoaded', () => {
        this.runConnectedCallback()
      })
    }

    runConnectedCallback () {
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

    static get observedAttributes () {
      if (options.attributes !== undefined) {
        return options.attributes.map(attr => {
          attr = attr.toLowerCase()
          if (!KEYWORDS.includes(attr)) {
            return attr
          } else {
            console.error(`ERROR: Modjool keyword used as element attribute name [${attr}]`)
          }
        })
      } else return []
    }

    attributeChangedCallback (attrName, oldVal, newVal) {
      if (oldVal !== newVal) {
        mjGetAttributes(this, options)
        mjLifecycle(this, options, attrName)
        mjUpdate(this, options)
      }
    }

    update () {
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
  if (customElements.get(options.name)) {
    return true
  } else {
    return false
  }
}
