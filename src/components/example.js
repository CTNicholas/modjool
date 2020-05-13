// import Modjool from '../modjool.js'
// import Modjool from '../modjool'

import Modjool from "../modjool"

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
}, {
  tag: 'hello-six'
}])

Modjool.create({
  tag: 'modj-select',

  data: ({ attr }) => ({
    list: attr.list.split(','),
    upper (word) {
      return word.toUpperCase()
    }
  }),

  html: ({ attr, data }) => `
    <ol>
      ${data.list.map(item => `
        <li><a href="${attr.link}${item}">${item}</a></li>
      `).join('')}
    </ol>
    ${data.upper(attr.link)}
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
  inherit: true,
  attributes: ['fruit', 'class'],

  fruit: ({ data, attr }) => {
    data.word = 'prooty' + attr.fruit
  },

  class: () => {
    console.log('class changed')
  },

  js: ({ data, self, attr }) => {
    data.word = 'flubbergump ' + attr.fruit
    console.log(`${self.id} is running!`, data)
  },

  loaded: ({ self, func, attr }) => {
    const a = func.on('click', () => console.log('hi'))

    a.stop()

    const b = func.when('a', 'click', () => {
      console.log('clicka')
      b.stop()
    })

    /* const b = func.when('a', 'click', () => {
      func.removeOn('click', a)
    })
    func.when('h6', 'click', () => {
      func.removeWhen('a', 'click', b)
    }) */
  },

  data: ({ attr }) => ({
    cool: `Working well ${attr.fruit}`
  }),

  html: ({ data, slot, attr }) => `
    ${['sdsf', 'asfasf', 'asfgsag']}
    ${JSON.stringify({ sas: 'sdsf', af: 'asfasf', aa: 'asfgsag' })}
    Data: ${data.cool}<br>
    SLOT: <br><br>
    ${slot}
    <br><br><a>click me</a><modj-h1>s</modj-h1><h6>or me</h6>
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
  html: ({ attr, func }) => `
    &lt;food-el&gt;
    <br>
    ${func.for(attr.diet, (item, count) => `
      Item Number ${count} is a ${item}
    `)}
    <br>
    &lt;/food-el&gt;
    <br><br>
  `
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

Modjool.getAsync('title-header').then(b => {
  console.log('After:', b)
  b[0].classList.add('hello')
  b[0].classList.remove('hello')
  b[0].classList.add('hiagain')
})

Modjool.getAsync().then(a => {
  const titleStyle = 'font-family: sans-serif; font-size: 28px; color: #2D86C9; font-weight: 700;'
  const titleOverline = `${titleStyle} text-decoration: overline; text-decoration-color:`
  console.log(
    '%cmodj%co%co%cl',
    titleStyle,
    `${titleOverline} #3EFF7E;`,
    `${titleOverline} #56E2EC;`,
    titleStyle)
  const regStyle = 'color: #555; font-size: 14px; font-family: sans-serif;'
  console.log(
    `%cThere are %c${a.length} custom elements %con this page`,
    regStyle,
    `${regStyle} color: #099739; font-weight: 700; cursor: pointer;`,
    regStyle)
  console.log('Open me:', {
    get getElements () {
      console.log(Modjool.get())
      return ''
    }
  })
})
