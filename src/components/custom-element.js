/* global Modjool */
Modjool({
  options: {
    name: 'custom-element',
    extend: 'h1'
  },

  html: ({ FRUIT, AMOUNT }) => `
    <div>
      <button class="go" type="submit">${AMOUNT} ${FRUIT + (AMOUNT > 1 ? 's' : '')}</button>
      <button class="stop">Cancel</button>
    </div>
  `,

  css: ({ WIDTH }) => `
    div {
      classes: "bg-grey-100 text-lg";
      margin-top: 6px;
      height: 100px;
      width: 500px;
      background: red;
    }

    .go, .stop {
      classes: "m-4 font-bold bg-grey-700 text-white";
      max-width: ${WIDTH};
      border: 7px solid #808080;
    }

    .stop {
      classes: "bg-white text-grey-700";
    }
  `
})
