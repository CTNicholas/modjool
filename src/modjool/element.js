import state from './state.js'

import CONSTRUCTOR from './methods/constructor.js'
import OBSERVE from './methods/observe.js'
import ADOPTED from './methods/adopted.js'
import CHANGED from './methods/changed.js'
import CONNECTED from './methods/connected.js'
import DISCONNECTED from './methods/disconnected.js'

/**
 * Creates a ModjoolElement class, and returns the class.
 * All methods call either an advanced or simple function, depending on type.
 * @param {Object|String} options - Options for this element, a tag name string if simple
 * @param {Boolean} advancedApi - True if advanced API used, false if not
 * @returns {Object} - The defined class, tag, and options
 */
function elementCreator (options, advancedApi) {
  const elementType = advancedApi ? 'advanced' : 'simple'
  
  // noinspection JSUnusedGlobalSymbols
  class ModjoolElement extends HTMLElement {
    // Invoked instantly
    constructor (...args) {
      // noinspection all
      const polyfill = super(...args)
      this.mj = {}
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
      this.mj = {}
    }
  }

  // noinspection JSUnresolvedVariable
  return {
    tag: advancedApi ? options.tag : options,
    options: options,
    class: ModjoolElement
  }
}

/**
 * Combines options with default, waits until page is ready, then runs elementCreator
 * @param {Boolean} advancedApi - True if advanced API used, false if not
 * @param {Object|String} options - Options for this element, a tag name string if simple
 * @returns {Object} - The defined class, tag, and options
 */
export default function (options, advancedApi) {
  if (advancedApi) {
    options = { ...state.config, ...options }
  }
  return elementCreator(options, advancedApi)
}
