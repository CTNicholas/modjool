/* global customElements, HTMLElement */
import createElement from './create.js'

export default { create }

/**
 * Creates one or more ModjoolLite elements, using the ModjoolLite API
 * @param  {...Array|String} options - One of two inputs:
 *   1. An array of strings for the simple API
 *   2. A single string for the simple API
 * @returns {Boolean} - True if successful, false if not
 */
function create (...options) {
  return createElement(modjoolLiteElement, options)    
}

/**
 * Creates and defines a ModjoolLite element
 * @param {String} elementName - The tag of the custom element
 * @returns {Boolean} - True if successful, false if not
 */
function modjoolLiteElement (elementName) {
  class ModjoolLiteElement extends HTMLElement {
    constructor (...args) {
      const polyfill = super(...args)
      return polyfill
    }
  }
  customElements.define(elementName, ModjoolLiteElement)
  return !!customElements.get(elementName)
}
