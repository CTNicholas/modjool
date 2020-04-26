/* global Modjool */
Modjool({
  options: () => ({
    name: 'custom-el',
    inherit: true,
    attributes: ['WIDTH', 'AMOUNT']
  }),

  loaded () {
    console.log('Loaded')
  },

  html: ({ FRUIT, AMOUNT, mj, slot }) => `
    ${slot.cool} testing pls ${slot}
  `,

  css: ({ WIDTH, mj }) => `
    :host {
      display: block;
      background:yellow;
    }

    ${mj.select} .go {
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
