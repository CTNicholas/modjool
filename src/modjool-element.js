/* global customElements, HTMLElement */
import ModjoolDefaults from './modjool-defaults.js'
import ModjoolState from './modjool-state.js'

import mjConstructor from './functions/constructor.js'
import mjConnectedCallback from './functions/connectedCallback.js'
import mjUpdateSlots from './functions/updateSlots.js'
import mjUpdate from './functions/update.js'
import mjLifecycle from './functions/lifecycle.js'
import mjGetAttributes from './functions/getAttributes.js'

const KEYWORDS = ['html', 'js', 'css', 'tag', 'inherit', 'attributes', 'enter', 'ready', 'leave', 'loaded', 'data']

export default function (advanced, options) {
  if (advanced) {
    options = { ...ModjoolDefaults, ...options }
  }
  class ModjoolElement extends HTMLElement {
    constructor (...args) {
      const polyfill = super(...args)
      if (advanced) {
        mjConstructor(this, options)
        mjLifecycle(this, options, 'enter')
      }
      return polyfill
    }

    // Originally skipped event if (this.innerHTML !== '')
    // Changed for consistency
    connectedCallback () {
      if (advanced) {
        console.log('Loading', options.tag, this.mj.id, this)
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
          console.log(this.mj.id, 'body ready')
          this.runConnectedCallback()
        } else {
          document.addEventListener('DOMContentLoaded', () => {
            console.log(this.mj.id, 'waiting for body')
            this.runConnectedCallback()
          })
        }
      } else {
        this.mj = {}
        this.mj.tag = options.tag
        ModjoolState.addElement(this)
      }
    }

    disconnectedCallback () {
      if (advanced) {
        mjLifecycle(this, options, 'leave')
      }
    }

    static get observedAttributes () {
      if (advanced && options.attributes !== undefined) {
        return options.attributes.map(attr => {
          attr = attr.toLowerCase()
          if (!KEYWORDS.includes(attr)) {
            return attr
          } else {
            console.error(`ERROR: Modjool keyword used as element attribute name [${attr}]`)
          }
        })
      } else if (advanced) { return [] }
    }

    attributeChangedCallback (attrName, oldVal, newVal) {
      if (advanced && oldVal !== newVal) {
        mjGetAttributes(this, options)
        mjLifecycle(this, options, attrName)
        if (this.mj.loaded) {
          mjUpdate(this, options)
        }
      }
    }

    runConnectedCallback () {
      mjConnectedCallback(this, options)
      mjUpdateSlots(this, options)
      this.mj.instance.data = mjLifecycle(this, options, 'data') || {}
      if (mjLifecycle(this, options, 'ready') === null) {
        mjLifecycle(this, options, 'js')
      }
      mjUpdate(this, options)
      this.mj.loaded = true
      if (!mjLifecycle(this, options, 'loaded') === null) {
        mjUpdate(this, options)
      }
      ModjoolState.addElement(this)
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
  if (advanced) {
    customElements.define(options.tag, ModjoolElement)
    return !!customElements.get(options.tag)
  } else {
    customElements.define(options, ModjoolElement)
    return !!customElements.get(options)
  }
}
