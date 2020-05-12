/* global customElements, HTMLElement */
export default function (elementName) {
  class ModjoolSimpleElement extends HTMLElement {
    constructor (...args) {
      const polyfill = super(...args)
      return polyfill
    }
  }
  customElements.define(elementName, ModjoolSimpleElement)
  return !!customElements.get(elementName)
}
