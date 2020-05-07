/* global Modjool */
window.potato = Modjool({
  options: () => ({
    name: 'custom-el',
    inherit: true,
    attributes: ['WIDTH', 'AMOUNT', 'FRUIT']
  }),

  html: ({ attr, self, slot, func, evnt }) => `
    ${slot.cool} testing pls ${slot}
    ${attr.fruit}
    <br>
    ${JSON.stringify(self)}
    <div class="go" onclick="${func.doThing()}">GO NOW</div>${func.doThing.toString()}
  `,

  data: () => ({

  }),

  functions: () => ({
    doThing () {
      console.log('HELLO I\'M WORKING')
    },
    doSecondThing () {
      console.log('second one')
    }
  }),

  events: () => ({

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