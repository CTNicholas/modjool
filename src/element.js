/* global customElements, HTMLElement */
import config from './config.js'
import { updateBody, updateSlots } from './methods/update.js'

import CONSTRUCTOR from './methods/constructor.js'
import CONNECTED from './methods/connected.js'
import DISCONNECTED from './methods/disconnected.js'
import OBSERVE from './methods/observe.js'
import CHANGED from './methods/changed.js'

export default function (advanced, options) {
  if (advanced) {
    options = { ...config, ...options }
  }
  // return elementCreator(advanced, options)
  return whenPageReady(() => elementCreator(advanced, options))
}

function elementCreator (advanced, options) {
  const elementType = advanced ? 'advanced' : 'simple'
  
  class ModjoolElement extends HTMLElement {
    constructor (...args) {
      const polyfill = super(...args)
      CONSTRUCTOR[elementType](this, options)
      return polyfill
    }

    connectedCallback () {
      CONNECTED[elementType](this, options)
    }
    
    disconnectedCallback () {
      DISCONNECTED[elementType](this, options)
    }
    
    static get observedAttributes () {
      OBSERVE[elementType](this, options)
    }
    
    attributeChangedCallback (attrName, oldVal, newVal) {
      CHANGED[elementType](this, options)
    }

    update () {
      updateSlots(this, options)
      updateBody(this, options)
    }

    html (newHtml) {
      this.mj.bodyContent = newHtml
      updateSlots(this, options)
      updateBody(this, options)
    }

    css (newCss) {
      this.mj.styleContent = newCss
      updateSlots(this, options)
      updateBody(this, options)
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
    return func()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      return func()
    })
  }
}
