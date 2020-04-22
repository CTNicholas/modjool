/* global Modjool */

// <link-to url="inki.uk" tooltip="A place to learn"></link-to>
Modjool({
  options: {
    name: 'link-to',
    attributes: {
      CLICKS: null,
      WIDTH: String,
      AMOUNT: {
        type: Array,
        separator: ',',
        reactive: false
      },
      DISPLAY: Boolean,
      DOTHING: Function // dothing="x, y => x + y"
    }
  },

  html: ({ DOTHING, DISPLAY, USERNAMES, URL, TOOLTIP, SLOT, mj, eachClick }) => `
    <a ref="link" href="${URL}">${SLOT}</a>
    <span ref="tooltip" id="spanTooltip">${TOOLTIP}</span>
    ${eachClick}
    ${USERNAMES.map(name => `<div style="background-color: coral;">${name}</div>`)}

    ${USERNAMES.for(name => `
      <div style="background-color: coral;">${name}</div>
    `)}  

    ${DISPLAY === true
      ? `Message displayed if true: ${DISPLAY}` : ''
    }

    ${DISPLAY === true
      ? `Message displayed if true: ${DISPLAY}`
      : `Message if false: ${DISPLAY}`
    }

    ${USERNAMES.for(name => `
      <div>${DOTHING(name, TOOLTIP)}</div> <!-- return new Function('x', 'y', 'x + y') -->
    `)}  


    ${USERNAMES}
  `,

  for: {
    eachClick: (click, CLICKS, { mjCount, mjKey }) => `
      <a href="">Click value is ${click}</a>
    `,
    eachUrl: (url, URL) => {
      url = url.toString()
      return url
    }
  },

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
