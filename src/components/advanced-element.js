/* global Modjool */

// <link-to url="inki.uk" tooltip="A place to learn"></link-to>
Modjool({
  options: {
    name: 'link-to'
  },

  html: ({ URL, TOOLTIP, SLOT }) => `
    <a ref="link" href="${URL}">${SLOT}</a>
    <span ref="tooltip" id="spanTooltip">${TOOLTIP}</span>
  `,

  data: ({ CLICKS, data }) => ({
    linkClicked: false,
    baseClicks: 10,
    totalClicks: data.baseClicks + CLICKS,
    clickCalc: ({ CLICKS, data }) => {
      let val = data.baseClicks * data.totalClicks
      if (data.linkClicked) {
        val += 10
      } else {
        val -= 5
      }
      return val
    }
  }),

  data2: ({ CLICKS }) => {
    const linkClicked = false
    const baseClicks = 10
    const totalClicks = baseClicks + CLICKS
    return [linkClicked, baseClicks, totalClicks]
  },

  events: {
    'a @ click mouseover': ({ data }) => {
      data.linkClicked = true
    },
    '#spanTooltip @ mouseover mouseout': () => {

    }
  },

  events2: {
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
