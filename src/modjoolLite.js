/* global customElements, HTMLElement */
import createElement from './create.js'

export default { create }

function create (...options) {
  return createElement(modjoolLiteElement, options)    
}

function modjoolLiteElement (simple, elementName) {
  class ModjoolLiteElement extends HTMLElement {
    constructor (...args) {
      const polyfill = super(...args)
      return polyfill
    }
  }
  customElements.define(elementName, ModjoolLiteElement)
  return !!customElements.get(elementName)
}
