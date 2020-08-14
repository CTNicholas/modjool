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
  // return ModjoolElementCreator(advanced, options)
  return whenPageReady(() => ModjoolElementCreator(advanced, options))
}

function ModjoolElementCreator (advanced, options) {
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
      if (advanced && !this.mj.alreadyConnected) {
        this.mj.alreadyConnected = true
        this.runConnectedCallback()
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
      if (advanced && this.mj.loaded && oldVal !== newVal) {
        mjGetAttributes(this, options)
        mjLifecycle(this, options, attrName, { oldVal, newVal })
        mjUpdate(this, options)
        if (mjLifecycle(this, options, 'js') !== null) {
          mjUpdate(this, options)
        }
      }
    }

    runConnectedCallback () {
      mjConnectedCallback(this, options)
      mjUpdateSlots(this, options)
      this.mj.instance.data = mjLifecycle(this, options, 'data') || {}
      mjLifecycle(this, options, 'ready')
      mjUpdate(this, options)
      if (options.unhide) {
        this.removeAttribute('hidden')
      }
      this.mj.loaded = true
      if (mjLifecycle(this, options, 'js') !== null) {
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

function whenPageReady (func) {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    func()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      func()
    })
  }
}
