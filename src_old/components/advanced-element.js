/* global Modjool */

// <link-to url="inki.uk" tooltip="A place to learn"></link-to>
Modjool({
  options: () => ({
    name: 'link-to'
  }),

  attributes: () => ({
    CLICKS: null,
    WIDTH: String,
    AMOUNT: {
      type: Array,
      separator: ',',
      reactive: false
    },
    DISPLAY: Boolean,
    DOTHING: Function // dothing="x, y => x + y" --probably don't implement
  }),

  attributes2: () => ({
    CLICKS: null, WIDTH: String, AMOUNT: Array
  }),

  attributes3: () => [
    'CLICKS', 'WIDTH'
  ],

  html: ({ DOTHING, DISPLAY, USERNAMES, URL, TOOLTIP, SLOT, mj, eachClick, slot, attr }) => `
    <a ref="link" href="${URL}">${SLOT}</a>
    <span ref="tooltip" id="spanTooltip">${TOOLTIP}</span>
    ${eachClick}
    ${USERNAMES.map(name => `<div style="background-color: coral;">${name}</div>`)}

    ${USERNAMES.for(name => `
      <div>
        <span style="background-color: coral;">${name}</span>
      </div>
    `)}  

    ${USERNAMES.for(name => `<div style="background-color: coral;">${name}</div>`)}  

    ${DISPLAY === true
      ? `Message displayed if true: ${DISPLAY}` : ''
    }

    ${DISPLAY === true
      ? `Message displayed if true: ${DISPLAY}`
      : `Message if false: ${DISPLAY}`
    }

    ${DISPLAY === true
      ? `
      <div class="mt-header">
        <h1 id="a-title-name">${attr.title}</h1>
        <div class="mt-subtitle">${slot.subtitle}</div>
        <img class="mt-img" src="${attr.img}" />
      </div>
      `
      : `
      <div class="mt-header">
        <h1 id="a-title-name">No title selected</h1>
        <img class="mt-img mt-empty" src="${attr['default-img']}" />
      </div>
      `
    }

    ${DISPLAY === true ? `
      <span>Messaged displayed if true ${DISPLAY}</span>
      ` : `
      <span>Message displayed if false</span>
    `}

    ${USERNAMES.for(name => `
      <div>${DOTHING(name, TOOLTIP)}</div> <!-- return new Function('x', 'y', 'x + y') -->
    `)}  

    ${slot}

    ${slot.name}


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
