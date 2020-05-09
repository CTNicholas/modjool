// import Modjool from '../modjool.js'
// import Modjool from '../modjool'

/* global Modjool */
console.time('START ALL')
Modjool.default({
  // inherit: true
})

const obj = {
  name: 'title-header',
  inherit: true,
  attributes: ['fruit'],

  fruit: ({ data, attr }) => {
    console.log('wow was easy')
    data.word = 'prooty' + attr.fruit
  },

  js: ({ data, self, attr }) => {
    data.word = 'flubbergump ' + attr.fruit
    console.log(`${self.id} is running!`, data)
  },

  html: ({ data, slot, attr }) => `
    hello esg slot: ${slot}<br>
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

const anElement = Modjool.create(obj)
Modjool.create({
  name: 'new-el',
  html: () => 'A new element'
})

const food = new Modjool({
  name: 'food-el',
  inherit: false,
  html: () => `g`
})

// const test = new Modjool(obj)
/*
window.YES = []

// YES.push(Modjool.create(obj))

// YES.html('hello there')

Modjool.getAsync().then(console.log)

Modjool.getAsync('title-header').then(el => console.log('title-header', el))

;(() => {
  Modjool.getAsync().then(console.log)
})()

async function hi () {
  const p = await Modjool.getAsync()
  console.log('p', p)
}

hi()
*/

Modjool.getAsync('food-el').then(b => {
  console.log('After food el', b)
})
