/* global customElements, HTMLElement */

class ModjoolHead extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    console.log('modjool-head loaded')
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        opacity: 0;
        width: 0;
        height: 0;
        visibility: hidden;
        position: absolute;
        left: -1000px;
        top: -1000px;
        margin: -1px;
        padding: 0;
        clip: rect(0 0 0 0);
        overflow: hidden;
      }
    </style>
    <slot>
    </slot>
    `
  }
}
customElements.define('modjool-head', ModjoolHead)

class ModjoolBody extends HTMLElement {
  constructor () {
    super()
    // this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    console.log('modjool-head loaded')
    this.innerHTML = `
    <style>
      :host {
        all: inherit;
      }
    </style>
    <slot>
    </slot>
    `
  }
}
customElements.define('modjool-body', ModjoolBody)

function newModjoolElement ({ options, html, css, loaded }) {
  return function () {
    const defaultOptions = {
      name: 'no-name',
      inherit: true,
      attributes: []
    }
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
        this.getBody().appendChild(document.createElement('modjool-body'))
        this.mj_body = this.getBody().querySelector('modjool-body')
        console.log('body:', this.mj_body)
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
        const cssContent = css({ ...this.mj_attr })
        /* let hasClasses = false
        if (cssContent.trim().includes('classes:')) {
          hasClasses = true
        }
        console.log(hasClasses, 'classes?') */
        this.getBody().querySelector('style').textContent = cssContent
        this.mj_lastStyle = cssContent
      }

      updateTemplate () {
        if (this.isConnected) {
          this.mj_body.innerHTML = html({ ...this.mj_attr })
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

/* eslint-disable-next-line */
function Modjool (elementSettings) {
  const newElementClass = newModjoolElement(elementSettings)()
  const elName = elementSettings.options.name
  console.log(`${elName} defined?`, !!customElements.get(elName))
  return newElementClass
}
