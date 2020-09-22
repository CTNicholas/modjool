import state from './state.js'
import whenReady from './whenready.js'
import { updateBody, updateSlots } from './methods/update.js'

import CONSTRUCTOR from './methods/constructor.js'
import OBSERVE from './methods/observe.js'
import ADOPTED from './methods/adopted.js'
import CHANGED from './methods/changed.js'
import CONNECTED from './methods/connected.js'
import DISCONNECTED from './methods/disconnected.js'

/**
 * Creates a ModjoolElement class, and defines it.
 * All methods call either an advanced or simple function, depending on type.
 * @param {Boolean} advancedApi - True if advanced API used, false if not
 * @param {Object|String} options - Options for this element, a tag name string if simple
 * @returns {Boolean} - True if element successfully defined, false if not
 */
function elementCreator (advancedApi, options) {
  const elementType = advancedApi ? 'advanced' : 'simple'
  
  class ModjoolElement extends HTMLElement {
    // Invoked instantly
    constructor (...args) {
      const polyfill = super(...args)
      CONSTRUCTOR[elementType](this, options)
      return polyfill
    }

    // Invoked directly after constructor
    static get observedAttributes () {
      return OBSERVE[elementType](this, options)
    }

    // Invoked when observed attribute is changed
    attributeChangedCallback (attrName, oldVal, newVal) {
      CHANGED[elementType](this, options, { attrName, oldVal, newVal })
    }

    // Invoked when element added to DOM
    connectedCallback () {
      CONNECTED[elementType](this, options)
    }

    // Invoked when element moved to new document
    adoptedCallback () {
      ADOPTED[elementType](this, options)
    }

    // Invoked when element removed from DOM
    disconnectedCallback () {
      DISCONNECTED[elementType](this, options)
    }
  }

  try {
    if (elementType === 'advanced') {
      // If advanced element, define element with options.tag
      customElements.define(options.tag, ModjoolElement)
      return !!customElements.get(options.tag)
    } else {
      // If simple element, define element with options (the tag name string)
      customElements.define(options, ModjoolElement)
      return !!customElements.get(options)
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * Combines options with default, waits until page is ready, then runs elementCreator
 * @param {Boolean} advancedApi - True if advanced API used, false if not
 * @param {Object|String} options - Options for this element, a tag name string if simple
 * @returns {Boolean} - True if element successfully defined, false if not
 */
export default function (advancedApi, options) {
  if (advancedApi) {
    options = { ...state.config, ...options }
  }
  // return elementCreator(advanced, options)
  return whenReady(() => elementCreator(advancedApi, options))
}
