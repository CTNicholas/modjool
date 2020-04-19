/* global customElements, HTMLElement */
function newModjoolElement ({ options, html, css }) {
  class ModjoolElement extends HTMLElement {
    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.shadow.appendChild(document.createElement('style'))
      this.updateStyle()
      this.updateTemplate()
    }

    updateStyle () {
      const cssContent = css({ WIDTH: '400px' })
      this.shadow.querySelector('style').textContent = cssContent
      this.lastStyle = cssContent
    }

    updateTemplate () {
      this.shadow.innerHTML = html({ FRUIT: 'ss', AMOUNT: '3' })
      this.shadow.appendChild(document.createElement('style')).textContent = this.lastStyle
    }
  }

  return ModjoolElement
}

/* eslint-disable-next-line */
function Modjool (elementSettings) {
  const newElementClass = newModjoolElement(elementSettings)
  /* Define as new custom element on the page */
  const elName = elementSettings.options.name
  customElements.define(elName, newElementClass)
  // const el = document.querySelector(elementSettings.options.name)
  console.log(`${elName} defined?`, !!customElements.get(elName))
  return newElementClass
}
