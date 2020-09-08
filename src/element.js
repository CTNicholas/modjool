/* global customElements, HTMLElement */
import state from './state.js'
import whenReady from './whenready.js'
import { updateBody, updateSlots } from './methods/update.js'

import CONSTRUCTOR from './methods/constructor.js'
import CONNECTED from './methods/connected.js'
import DISCONNECTED from './methods/disconnected.js'
import OBSERVE from './methods/observe.js'
import CHANGED from './methods/changed.js'

export default function (advanced, options) {
  if (advanced) {
    options = { ...state.config, ...options }
  }
  // return elementCreator(advanced, options)
  return whenReady(() => elementCreator(advanced, options))
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
      return OBSERVE[elementType](this, options)
    }
    
    attributeChangedCallback (attrName, oldVal, newVal) {
      CHANGED[elementType](this, options, { attrName, oldVal, newVal })
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
