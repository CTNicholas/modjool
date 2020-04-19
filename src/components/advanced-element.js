/* global Modjool */

// <link-to url="inki.uk" tooltip="A place to learn"></link-to>
Modjool({
  options: {
    name: 'link-to'
  },

  html: ({ URL, TOOLTIP, SLOT }) => `
    <a href="${URL}">${SLOT}</a>
    <span id="spanTooltip">${TOOLTIP}</span>
  `,

  data: () => ({
    linkClicked: false
  }),

  events: {
    'a.link': {
      click: ({ linkClicked, spanTooltip }) => {
        linkClicked = false
        spanTooltip.classList.add('hidden')
      }
    },
    button: {
      'mouseover mouseout': ({ event }) => {
        event.target.classList.toggle('mousehover')
      }
    }
  },

  css: () => `
    a {
      classes: "font-bold underline";
    }

    span {

    }
  `
})
