// import Modjool from '../modjool.js'

import Modjool from '../modjool'

Modjool.default({
  // inherit: true
})

const obj = {
  name: 'title-header',
  inherit: true,

  js: ({ data, self, attr }) => {
    data.word = 'flubbergump ' + attr.fruit
    console.log(`${self.id} is running!`, data)
    return data
  },

  html: ({ data, slot, attr }) => `
    hello esg slot: ${slot.two || slot}<br>
    fruit: ${attr.fruit}<br>
    a word: ${data.word}
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

Modjool.create({
  name: 'new-el',
  html: () => 'A new element'
})

// const test = new Modjool(obj)

window.YES = []
// YES.push(Modjool.create(obj))
console.log('Final:', Modjool.create(obj))

// YES.html('hello there')

console.log(Modjool.get())
console.log(Modjool.get('title-header'))
