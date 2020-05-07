/* global customElements, HTMLElement, MutationObserver */
import defaultOptions from './modjool-config.js'
import mjSetupFunctions from './methods/setupFunctions.js'
import mjGetSlots from './methods/getSlots.js'
import mjUpdateTemplate from './methods/updateTemplate.js'
import mjUpdateStyle from './methods/updateStyle.js'

import createAnElement from './methods/createElement.js'

export default function newModjoolElement (elementSettings) {
  const {
    options = {},
    data = {},
    functions = {},
    html = '',
    css = '',
    loaded = () => {},
    unloaded = () => {}
  } = elementSettings
  // return function () {
  class ModjoolElement extends HTMLElement {
    constructor (...args) {
      const forPolyfill = super(...args)
      this.setupOptions()
      if (!this.mj_options.inherit) {
        this.attachShadow({ mode: 'open' })
      }
      this.setupInitialVariables()
      this.setupFunctions()
      this.startDomObserver()
      return forPolyfill
    }

    connectedCallback () {
      console.log('conn', this.mj_observer)
      this.setupPrivateId()
      this.getAttributes()
      this.createStyleTag()
      this.updateAll()
      loaded({ ...this.getDefaultArgs() })
    }

    disconnectedCallback () {
      unloaded()
      this.stopDomObserver()
    }

    static get observedAttributes () {
      return options().attributes !== undefined ? options().attributes.map(attr => attr.toLowerCase()) : []
    }

    getAttributes () {
      for (let i = 0; i < this.attributes.length; i++) {
        const prop = this.attributes[i].nodeName.toLowerCase()
        if (!prop.toLowerCase().startsWith('mj-')) {
          const val = this.attributes[i].nodeValue
          this.mj_attr[prop] = val
        }
      }
      console.log('Get:', this.mj_attr)
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
      this.stopDomObserver()
      mjUpdateStyle(this, elementSettings)
      this.startDomObserver()
    }

    updateTemplate () {
      this.stopDomObserver()
      mjGetSlots(this)
      mjUpdateTemplate(this, elementSettings)
      this.startDomObserver()
    }

    getDefaultArgs () {
      return {
        attr: this.mj_attr,
        self: this.mj_system_attr,
        data: {},
        modj: {},
        func: this.mj_functions
      }
    }

    startDomObserver () {
      if (this.mj_options.reactiveDom) {
        const opt = {
          childList: true,
          characterData: true,
          subtree: true
        }
        this.mj_observer = new MutationObserver(() => {
          this.mj_initialHtml = this.innerHTML
          this.mj_initial = createAnElement(this.innerHTML)
          this.updateAll()
          console.log('dom updated')
        })
        this.mj_observer.observe(this.getBody(), opt)
      }
    }

    stopDomObserver () {
      if (this.mj_options.reactiveDom) {
        this.mj_observer.disconnect()
      }
    }

    createStyleTag () {
      const cssTag = document.createElement('style')
      cssTag.setAttribute('id', `mj-style-${this.mj_id}`)
      cssTag.textContent = this.mj_lastStyle || ''
      this.getBody().appendChild(cssTag)
    }

    setupPrivateId () {
      if (options().privateId || this.mj_options.privateId) {
        this.setAttribute('mj-id', this.mj_id)
        this.mj_idcss = `[mj-id="${this.mj_id}"]`
        this.mj_system_attr = { ...this.mj_system_attr, select: this.mj_idcss }
      }
    }

    setupFunctions () {
      mjSetupFunctions(this, elementSettings)
    }

    setupInitialVariables () {
      this.mj_id = Math.random().toString(36).slice(-8)
      window.modjool = { ...window.modjool }
      window.modjool[`mj_${this.mj_id}`] = { ...window.modjool[`mj_${this.mj_id}`] }
      this.mj_attr = {}
      this.mj_system_attr = { name: this.mj_options.name, id: this.mj_id }
      this.mj_initialHtml = this.innerHTML
      this.mj_initial = createAnElement(this.innerHTML)
    }

    getGlobalObject (asString = false) {
      if (!asString) {
        return window.modjool[`mj_${this.mj_id}`]
      } else {
        return `window.modjool.mj_${this.mj_id}`
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
  console.log(new ModjoolElement())
  return new ModjoolElement()
  // }
}
