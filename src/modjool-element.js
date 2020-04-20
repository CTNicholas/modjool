/* global customElements, HTMLElement */
import defaultOptions from './modjool-config.js'

export default function newModjoolElement ({ options, html, css, loaded }) {
  return function () {
    class ModjoolElement extends HTMLElement {
      constructor () {
        super()
        this.setupOptions()
        if (!this.mj_options.inherit) {
          this.attachShadow({ mode: 'open' })
        }
        this.mj_attr = {}
      }

      connectedCallback () {
        this.getAttributes()
        this.getBody().appendChild(document.createElement('style'))
        this.updateAll()
        console.log(this)
        loaded()
      }

      static get observedAttributes () {
        return options().attributes.map(attr => attr.toLowerCase())
      }

      getAttributes () {
        for (let i = 0; i < this.attributes.length; i++) {
          const prop = this.attributes[i].nodeName.toUpperCase()
          const val = this.attributes[i].nodeValue
          this.mj_attr[prop] = val
        }
        console.log(this.mj_attr)
      }

      attributeChangedCallback (name, oldVal, newVal) {
        console.log('Attr changed')
        this.getAttributes()
        this.updateAll()
      }

      updateAll () {
        this.updateTemplate()
        this.updateStyle()
      }

      updateStyle () {
        if (this.isConnected) {
          const cssContent = css({ ...this.mj_attr })
          /* let hasClasses = false
          if (cssContent.trim().includes('classes:')) {
            hasClasses = true
          }
          console.log(hasClasses, 'classes?') */
          this.getBody().querySelector('style').textContent = cssContent
          this.mj_lastStyle = cssContent
        }
      }

      updateTemplate () {
        if (this.isConnected) {
          this.getBody().innerHTML = html({ ...this.mj_attr })
          this.getBody().classList.add('wwwooo')
          this.getBody().appendChild(document.createElement('style')).textContent = this.mj_lastStyle
        }
      }

      setupOptions () {
        this.mj_options = { ...defaultOptions, ...options() }
        console.log('Options here:', this.mj_options)
      }

      getBody () {
        if (!this.mj_options.inherit) {
          return this.shadowRoot
        } else {
          return this
        }
      }
    }

    customElements.define(options().name, ModjoolElement)
    return ModjoolElement
  }
}
