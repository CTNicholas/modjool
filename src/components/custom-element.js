import Modjool from '../modjool.js'

Modjool({
  options: () => ({
    name: 'custom-el',
    inherit: true,
    attributes: ['WIDTH', 'AMOUNT']
  }),

  loaded () {
    console.log('Loaded')
  },

  html: ({ FRUIT, AMOUNT }) => `
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"></script>
    <div>
      <button class="go" type="submit">${AMOUNT} ${FRUIT + (AMOUNT > 1 ? 's' : '')}</button>
      <button class="stop">Cancel</button>
      Cool: <slot name="cool"></slot>
    </div>
    <div x-data="{ tab: 'foo' }">
      <button :class="{ 'active': tab === 'foo' }" @click="tab = 'foo'">Foo</button>
      <button :class="{ 'active': tab === 'bar' }" @click="tab = 'bar'">Bar</button>

      <div x-show="tab === 'foo'">Tab Foo</div>
      <div x-show="tab === 'bar'">Tab Bar</div>
    </div>
  `,

  css: ({ WIDTH, mj }) => `
    :host {
      display: block;
      background:yellow;
    }

    ${mj.privateCss} .go {
      classes: "bg-grey-100 text-lg";
      margin-top: 6px;
      height: 100px;
      width: ${WIDTH};
      background: red;
    }

    .go, .stop {
      classes: "m-4 font-bold bg-grey-700 text-white";
      border: 7px solid #808080;
    }

    .stop {
      classes: "bg-white text-grey-700";
    }
  `
})
