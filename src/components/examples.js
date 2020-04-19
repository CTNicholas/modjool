events: {
  'button.stop': {
    click: ({ baseVal, totalAmount }) => {
      totalAmount = baseVal
    }
  },
  button: {
    'mouseover mouseout': ({ event }) => {
      event.target.classList.toggle('mousehover')
    }
  }
},





html: ({ URL, TOOLTIP, SLOT }) => `
    <a.link href="${URL}">${SLOT}</a>
    <span.tooltip>${TOOLTIP}</span>
  `,

  data: () => ({
    linkClicked: false
  }),

  events: {
    'a.link': {
      click: ({ linkClicked, elements }) => { 
        linkClicked = false
        elements['span.tooltip'].classList.add('hidden')
      }
    },
    button: {
      'mouseover mouseout': ({ event }) => {
        event.target.classList.toggle('mousehover')
      }
    }
  },