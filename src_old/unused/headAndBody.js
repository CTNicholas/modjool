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