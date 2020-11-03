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
 * @returns {Object} - The defined class, tag, and options
 */
function modjoolLiteElement (elementName) {
  // noinspection JSUnusedLocalSymbols
  class ModjoolLiteElement extends HTMLElement {
    constructor (...args) {
      // noinspection all
      return super(...args)
    }
  }
  return {
    tag: elementName,
    options: elementName,
    class: ModjoolLiteElement
  }
}
