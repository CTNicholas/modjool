// import Modjool from '../modjool.js'

Modjool.default({
  // inherit: true
})

const obj = {
  name: 'title-header',
  inherit: true,

  js: () => {
    console.log('Running!')
  },

  html: ({ slot, attr }) => `
    hello esg slot: ${slot.two || slot}<br>
    fruit: ${attr.fruit}
  `,

  css: ({ self }) => `
     ${self.select} {
      font-size: 18px;
      font-weight: bold;
    }
    h3 {
      font-size: 5px;
      font-style: italic;
    }
  `
}

// const test = new Modjool(obj)

window.YES = Modjool.create(obj)

console.log('YES', YES)

// YES.html('hello there')
