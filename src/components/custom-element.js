/* global Modjool */
window.potato = Modjool({
  options: () => ({
    name: 'custom-el',
    inherit: true,
    attributes: ['WIDTH', 'AMOUNT', 'FRUIT']
  }),

  html: ({ attr, self, slot }) => `
    ${slot.cool} testing pls ${slot}
    ${attr.fruit}
    <br>
    ${JSON.stringify(self)}
    <div class="go">GO</div>
  `,

  data: () => ({

  }),

  loaded ({ attr }) {
    console.log('Loaded')
  },

  unloaded () {
    console.log('Unloaded')
  },

  css: ({ attr, self }) => `
    :host {
      display: block;
      background:yellow;
    }

    ${self.select} .go {
      classes: "bg-grey-100 text-lg";
      margin-top: 6px;
      height: 100px;
      width: ${attr.width};
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
