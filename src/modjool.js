const defaultOptions = {
  name: 'no-name',
  inherit: true,
  reactiveAttributes: []
}

/* global customElements, HTMLElement */
function newModjoolElement ({ options, html, css }) {
  class ModjoolElement extends HTMLElement {
    constructor () {
      super()
      this.setupOptions()
      if (!options.inherit) {
        this.attachShadow({ mode: 'open' })
      }
      this.mj_attr = {}
    }

    connectedCallback () {
      this.getAttributes()
      this.getBody().appendChild(document.createElement('style'))
      this.updateAll()
    }

    static get observedAttributes () {
      return options.reactiveAttributes.map(attr => attr.toLowerCase())
    }

    getAttributes () {
      for (let i = 0; i < this.getBody().attributes.length; i++) {
        const prop = this.getBody().attributes[i].nodeName.toUpperCase()
        const val = this.getBody().attributes[i].nodeValue
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
      const cssContent = css({ ...this.mj_attr })
      let hasClasses = false
      if (cssContent.trim().includes('classes:')) {
        hasClasses = true
      }
      console.log(hasClasses, 'classes?')
      this.getBody().querySelector('style').textContent = cssContent
      this.mj_lastStyle = cssContent
    }

    updateTemplate () {
      this.getBody().innerHTML = html({ ...this.mj_attr })
      this.getBody().appendChild(document.createElement('style')).textContent = this.mj_lastStyle
    }

    setupOptions () {
      options = { ...defaultOptions, ...options }
      console.log('Options', options)
    }

    getBody () {
      if (!options.inherit) {
        return this.shadowRoot
      } else {
        return this
      }
    }
  }

  customElements.define(options.name, ModjoolElement)
  return ModjoolElement
}

/* eslint-disable-next-line */
function Modjool (elementSettings) {
  const newElementClass = newModjoolElement(elementSettings)
  const elName = elementSettings.options.name
  console.log(`${elName} defined?`, !!customElements.get(elName))
  return newElementClass
}
