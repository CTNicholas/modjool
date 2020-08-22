import { modjool } from 'modjool'
console.log('Running tests')
let tempBody = '<div><div>inherit: false (no shadow dom):</div><div>inherit: true (shadow dom):</div></div>'
let count = 1

/* === Page tests ==================================================== */
newElement({
  html: () => `✅ html works`
})

newElement({
  html: () => `<div></div>`,
  css: () => `div::after { content: '✅ css() and html() work'}`
})

newElement({
  scopedCss: true,
  inherit: true,
  html: () => '<div>scopedCss works</div>',
  css: () => `*::before { content: '✅ ' }` /* If ticks on every element, this is not working */
})

newElement({
  html: () => '<div></div>',
  css: () => `:self div::after { content: ':self works' } div::before { content: '❌ ' } :self div::before { content: '✅ ' } `
})

newElement({
  ready: ({ self }) => { self.element.classList.add('self-test') },
  html: () => '<div>:self() works</div>',
  css: () => `:self() div::before { content: '❌ '; } :self(.self-test) div::before { content: '✅ ' !important; }`
})

newElement({
  js: ({ data, self }) => { 
    data.result = self.id && self.tag && self.select()
  },
  html: ({ data, self }) => `<div>${data.result ? '✅ self.tag, self.id, self.select works' : '❌ self.tag, self.id, self.select error'} <small>tag: ${self.tag}, id: ${self.id}, select: ${self.select()}</small></div>`
})

/* === Lifecycle tests ==================================================== */
newElement({
  js: ({ data }) => { data.text = '✅ js() and data works'},
  html: ({ data }) => `${data.text || '❌ js() and data error'}`
})

newElement({
  ready: ({ data }) => { data.text = '✅ ready() and data works'},
  html: ({ data }) => `${data.text || '❌ ready() and data error'}`
})

newElement({
  data: () => ({ num: 4 }),
  ready: ({ data }) => data.num++,
  js: ({ data }) => data.text = data.num === 5 ? '✅  data(), ready(), js() works' : '',
  html: ({ data }) => `${data.text || '❌  data(), ready(), js() error'}`
})

/* === Self tests ==================================================== */
newElement({
  js: ({ data, self }) => { 
    setTimeout(() => {
      data.text = '✅ self.update() works'
      self.update()
    })
  },
  html: ({ data }) => `${data.text || '❌ self.update() error'}`
})

newElement({
  js: ({ data, self }) => { 
    self.html('✅ self.html() works')
  },
  html: ({ data }) => `❌ self.html() error`
})

newElement({
  ready: ({ data, self }) => { 
    self.css(`div::before { content: '✅ ' }`)
  },
  html: ({ data }) => `<div>self.css() works</div>`,
  css: () => `div::before { content: '❌ ' }`
})

newElement({
  ready: ({ data, self }) => { 
    self.js(() => data.text = '✅ self.js() works')
  },
  js: ({ data }) => data.text = `❌ self.js() error`,
  html: ({ data }) => data.text
})

/* === Attributes =============================================== */
newElement({
  html: ({ attr }) => `${attr.title} ${attr.subtitle}`
}, '', { attr: {
  title: '✅',
  subtitle: 'attr works'
}})

newElement({
  ready: ({ self }) => {
    self.element.setAttribute('result', '✅ reactive attr works')
    self.updateAll()
  },
  html: ({ attr }) => `${attr.result}`
}, '', { attr: {
  result: '❌ reactive attr error'
}})


/* === Console tests ==================================================== */
newElement({
  html: () => `Check console for 4 tests`
})

newElement({
  enter: ({ self }) => { console.log('✅ enter() works') }
}, '')

newElement({
  js: ({ self }) => { self.remove() },
  leave: () => { console.log('✅ leave() and self.remove() works') },
  html: () => `❌ 'leave() and self.remove()' error`
})

newElement({
  enter: ({ data, self }) => { 
    self.leave(() => console.log('✅ self.leave() works'))
  },
  ready: ({ self }) => self.remove(),
  leave: () => console.log(`❌ self.leave() error`)
})

newElement({
  ready: ({ self }) => {
    if (self.element) {
      console.log('✅ self.element works', self.element)
    } else {
      console.log(`❌ self.element error`)
    }
  }
}, '')


/* === Setup ==================================================== */
document.querySelector('.tests').innerHTML = tempBody

function newElement(initObject, content = 'error', { tag = nextTag(), attr = {} } = {}) {
  let attrs = []
  let attrString = ''
  for (const [key, val] of Object.entries(attr)) {
    attrs.push(key)
    attrString += ` ${key}="${val}"`
  }
  modjool.create({
    tag: tag,
    attributes: attrs,
    inherit: true,
    ...initObject
  })
  const tag2 = nextTag()
  modjool.create({
    tag: tag2,
    attributes: attrs,
    inherit: false,
    ...initObject
  })
  tempBody += `<div><${tag}${attrString}>${content}</${tag}><${tag2}${attrString}>${content}</${tag2}></div>`
}

function nextTag () {
  return `a-${count++}`
}
