// import Modjool from '../modjool.js'
// import Modjool from '../modjool'

// import Modjool from "../modjool"

/* global Modjool */
console.time('START ALL')
Modjool.default({
  // inherit: true
})

Modjool.createSingle('hello-there')
Modjool.create(['hello-one', 'hello-two', 'hello-three'])

Modjool.create([{
  tag: 'hello-four'
}, {
  tag: 'hello-five'
}])

Modjool.create({
  tag: 'modj-select',

  data: ({ attr }) => ({
    list: attr.list.split(',')
  }),

  html: ({ attr, data }) => `
    <ol>
      ${data.list.map(item => `
        <li><a href="${attr.link}${item}">${item}</a></li>
      `).join('')}
    </ol>
  `,

  html2: ({ attr, func }) => `
    ${func.for(attr.list, (item, two) => `
      <li><a href="${attr.link}${item}">${item}</a></li>
    `)}

    ${attr.list.for(item => `
      <li><a href="${attr.link}${item}">${item}</a></li>
    `)}
  `,

  css: () => `
    a:hover {
      color: red;
    }
  `
})

Modjool.create({
  tag: 'modj-h1',
  inherit: false,
  self: ({ attr }) => ({
    id: attr.slug,
    href: `#${attr.slug}`,
    class: 'food',
    style: 'width: 40px;'
  }),
  html: ({ attr, slot }) => `
    <a href="#${attr.slug}">${attr.title}</a>
  `,
  css: ({ self }) => `
    ${self.select} {
      inherit: all;
    }
  `
})

const obj = {
  tag: 'title-header',
  inherit: false,
  attributes: ['fruit'],

  fruit: ({ data, attr }) => {
    console.log('wow was easy')
    data.word = 'prooty' + attr.fruit
  },

  js: ({ data, self, attr }) => {
    data.word = 'flubbergump ' + attr.fruit
    console.log(`${self.id} is running!`, data)
  },

  data: ({ attr }) => ({
    cool: `Working well ${attr.fruit}`
  }),

  html: ({ data, slot, attr }) => `
    Data: ${data.cool}<br>
    SLOT: <br><br>
    ${slot}
    <br><br><modj-h1>s</modj-h1>
    fruit: ${attr.fruit}<br>
    a word: ${data.word}
  `,

  css: ({ self, attr }) => `
     ${self.select} {
      font-size: 18px;
      font-weight: bold;
      color: ${attr.color};
    }
    h3 {
      font-size: 5px;
      font-style: italic;
    }
  `
}

const anElement = Modjool.create(obj)
Modjool.create({
  tag: 'new-el',
  html: () => 'A new element'
})

const food = new Modjool({
  tag: 'food-el',
  inherit: false,
  html: () => 'g'
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
