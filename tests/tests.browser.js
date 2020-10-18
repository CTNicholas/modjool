import { modjool } from 'modjool'
console.log('Running tests')
let tempBody = '<div><div>shadowDom false:</div><div>shadowDom true:</div></div>'
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
  html: () => `<style>div.specificcsstest:before { content: '❌ css affecting element error'; }</style><div class="specificcsstest"></div>`,
  css: () => `div.specificcsstest:before { content: '✅ css affecting element works' !important; }`
}, '')

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
  html: ({ data, self }) => `<div>${data.result ? '✅ self.tag, self.id, self.select works' : '❌ self.tag, self.id, self.select error'}`
})

newElement({
  js: ({ data, self }) => {
    data.result = self.id && self.tag && self.select()
  },
  html: ({ data, self }) => `<div>${data.result ? '✅' : '❌'} <small>tag: ${self.tag}, id: ${self.id}, select: ${self.select()}</small></div>`
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

newElement({
  data: ({ data }) => ({ text: '❌' }),
  ready: ({ data }) => { data.text += ' reactive data error' },
  js: ({ data }) => {
    setTimeout(() => { data.text = '✅ reactive data works' })
  },
  html: ({ data }) => `${data.text}`
})

newElement({
  data: ({ data }) => ({ importantTest: '❌' }),
  ready: ({ data }) => { data.importantTest += ' data hook error' },
  dataImportantTest: ({ data, oldVal, newVal }) => {
    const success = oldVal === '❌' && newVal.endsWith('error')
    return success ? '✅ data hook works' : newVal
  },
  html: ({ data }) => `${data.importantTest}`
})

newElement({
  js: ({ data }) => data.text = '✅ complete() works',
  complete: ({ data }) => {
    data.text = '❌ complete() error'
  },
  html: ({ data }) => `${data.text}`
})

newElement({
  js: ({ data }) => data.text = '❌ force complete() update error' ,
  complete: ({ data, self }) => {
    data.text = '✅ force complete() update works'
    self.update()
  },
  html: ({ data }) => `${data.text}`
})

newElement({
  data: () => ({ count: 0 }),
  js: ({ data, elem, self }) => {
    elem.onclick = () => false
    data.count++
    setTimeout(() => {
      data.listen = elem.onclick()
    })
  },
  complete: ({ data, elem, self }) => {
    data.count++
    elem.onclick = () => true
  },
  html: ({ data }) => `${data.listen && data.count === 2 ? '✅ complete() listener works' : '❌ complete() listener error'}`
})

/*
Can never work, MutationObserver is async, can't tell if lifecycle running or not
newElement({
  complete: ({ attr, elem, self }) => {
    attr.text = '❌ attr non-reactivity complete() error'
  },
  html: ({ attr }) => `${attr.text}`
}, '', { attr: {
    text: '✅ attr non-reactivity complete() works'
  }
})
*/


/* === Self tests ==================================================== */
let selfUpdateTest = '❌ self.update() error'
newElement({
  js: ({ data, self }) => {
    setTimeout(() => {
      selfUpdateTest = '✅ self.update() works'
      self.update()
    })
  },
  html: ({ data }) => selfUpdateTest
})

newElement({
  js: ({ data, self }) => {
    self.html(({ slot, self }) => slot)
  },
  html: ({ data }) => `❌ self.html() error`
}, '✅ self.html() works')

newElement({
  ready: ({ data, self }) => {
    self.css(() => `div::before { content: '✅ ' }`)
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

newElement({
  ready: ({ attr, data, self }) => {
    data.result = '❌ self.attrHook() error'
    self.attrHook('test', () => data.result = '✅ self.attrHook() works')
    attr.test = 'hello'
  },
  html: ({ attr, data }) => `${data.result}`
}, '')



/* === Attributes =============================================== */
newElement({
  html: ({ attr }) => `${attr.title} ${attr.subtitle}`
}, '', { attr: {
    title: '✅',
    subtitle: 'attr works'
  }})

newElement({
  attr: ['result'],
  js: ({ self }) => {
    self.element.setAttribute('result', '✅ reactive attr works')
  },
  html: ({ attr }) => `${attr.result}`
}, '', { attr: {
    result: '❌ reactive attr error'
  }})

newElement({
  data: () => ({ result: 0 }),
  js: ({ self }) => {
    self.element.setAttribute('result', '1')
    self.element.setAttribute('result-two', '2')
  },
  attrResult: ({ data }) => { data.result++ },
  attrResultTwo: ({ data }) => { data.result++ },
  html: ({ data }) => `${data.result === 2 ? '✅ attrHook works' : '❌ attrHook error'}`
}, '', { attr: {
    result: 'one',
    ['result-two']: 'two'
  }})

newElement({
  attr: ['result'],
  ready: ({ attr, data, self }) => {
    data.error = attr.result
    attr.result = '✅ change attr proxy works'
    data.result = self.element.getAttribute('result')
  },
  html: ({ attr, data }) => `${data.result.length ? data.result : data.error}`
}, '', { attr: {
    result: '❌ change attr proxy error'
  }})

newElement({
  js: ({ attr, data, self }) => {
    data.result = data.result ? data.result : '❌ attr MutationObserver lifecycle error'
    if (attr.result.startsWith('❌')) {
      attr.result = '✅ attr MutationObserver lifecycle works'
    }
  },
  attrResult: ({ attr, data, self, oldVal, newVal }) => {
    if (oldVal.startsWith('❌') && newVal.startsWith('✅')) {
      data.result = attr.result
    }
  },
  html: ({ attr, data }) => `${data.result}`
}, '', { attr: {
    result: '❌ attr lifecycle error'
  }})

newElement({
  html: ({ attr }) => `${attr.kebabCase || '❌ kebab to camel attr error'}`
}, '', { attr: {
    ['kebab-case']: '✅ kebab to camel attr works'
  }})

newElement({
  js: ({ attr, data, elem }) => {
    attr.camelCase = 'potato'
    if (elem.getAttribute('camel-case') === 'potato') {
      data.res = '✅ camel to kebab attr works'
    }
  },
  html: ({ attr, data }) => `${data.res || '❌ camel to kebab attr error'}`
}, '')



/* === Slots ==================================================== */
newElement({
  html: ({ slot }) => `${slot || '❌ single slot error'}`
}, '✅ single slot works')

newElement({
  html: ({ slot }) => `
    ${slot.icon && slot.text ? slot.icon + slot.text : '❌ multiple slots error'}
  `
}, '<span slot="icon">✅ </span><span slot="text">multiple slots work</span>')

newElement({
  html: ({ slotVal }) => `${slotVal || '❌ single slotVal error'}`
}, '✅ single slotVal works')

newElement({
  ready: ({ data, slot, slotVal }) => {
    data.diff = slot.icon !== slotVal.icon && slotVal.icon === slotVal.text
    data.error = `❌ multiple slotVals error`
    if (!data.diff) console.log(`❌ multiple slotVals error \nslot: ${slot.icon} \nslotVal: ${slotVal.icon}`)
  },
  html: ({ data, slotVal }) => `
    ${data.diff ? slotVal.icon : data.error}
  `,
  css: () => `
    span span::before { content: '❌ multiple slotVals error' }
    span::before { content: '✅ multiple slotVals work'}
  `
}, '<span slot="icon"><span></span></span><span slot="text"><span></span></span>')

newElement({
  html: ({ slot }) => slot.three ? '❌ nested slot ignored error' : slot.one + slot.two
}, '<span slot="one">✅ <span slot="three"></span></span><span slot="two">nested slot ignored works</span>')

modjool.create({
  tag: 'slot-nest-test-1',
  html: ({ slot }) => slot.two
})
newElement({
  html: ({ slot }) => slot.two || Object.keys(slot).length !== 2 ? '❌ nested slots error' : '✅ nested slots work'
}, `<span slot="three">✅</span><span slot="four">nested slot ignored works</span><slot-nest-test-1>
<span slot="one"></slot><span slot="two">❌ nested slot error</slot>
</slot-nest-test-1>`)

newElement({
  js: ({ data, slot, slotVal }) =>  {
    data.result = slot === '' && slotVal === ''
  },
  html: ({ data }) => data.result ? '✅ empty slot works' : '❌ empty slot error'
})



/* === Find ==================================================== */
newElement({
  js: ({ data, elem, find, self }) => {
    if (self.options.shadowDom === false && find`span` === elem.querySelector('span')) {
      data.text = '✅ find querySelector works'
    }
    if (self.options.shadowDom === true && find`span` === elem.shadowRoot.querySelector('span')) {
      data.text = '✅ find querySelector works'
    }
  },
  html: ({ data, slot }) => `<span></span>${data.text || slot}`
}, '❌ find querySelector error')

newElement({
  js: ({ data, elem, findAll, self }) => {
    if (self.options.shadowDom === false && findAll`span`.length === elem.querySelectorAll('span').length) {
      data.text = '✅ findAll querySelectorAll works'
    }
    if (self.options.shadowDom === true && findAll`span`.length === elem.shadowRoot.querySelectorAll('span').length) {
      data.text = '✅ findAll querySelectorAll works'
    }
  },
  html: ({ data, slot }) => `<span></span><span></span>${data.text || slot}`
}, '❌ find querySelector error')



/* === Nesting ==================================================== */
modjool.create({
  tag: 'nest-test-1',
  html: () => `✅ init before nesting works`
})
newElement({
  html: ({ slot }) => `<nest-test-1></nest-test-1>`
}, '❌ init before nesting error')


newElement({
  html: ({ slot }) => `<nest-test-2></nest-test-2>`
}, '❌ init after nesting error')
modjool.create({
  tag: 'nest-test-2',
  html: () => `✅ init after nesting works`
})

modjool.create({
  tag: 'nest-test-3',
  html: () => `❌ alternate nesting before error`
})
newElement({
  html: ({ slot }) => `✅ alternate nesting before works`
}, '<nest-test-3></nest-test-3>')

newElement({
  html: ({ slot }) => `✅ alternate nesting after works`
}, '<nest-test-4></nest-test-4>')
modjool.create({
  tag: 'nest-test-4',
  html: () => `❌ alternate nesting after error`
})

newElement({
  html: ({ slot }) => `<nest-test-5-1></nest-test-5-1>`
}, '❌ double nesting error')
modjool.create({
  tag: 'nest-test-5-1',
  html: () => `<nest-test-5-2></nest-test-5-2>`
})
modjool.create({
  tag: 'nest-test-5-2',
  html: () => `✅ double nesting works`
})



/* === Console tests ==================================================== */
newElement({
  html: () => `Check console for more tests`
})

let logTest1 = 0
newElement({
  enter: ({ self }) => {
    console.log('✅ enter() works')
    logTest1 = 1
  },
  ready: () => {
    if (logTest1 < 1) { console.log('❌ enter() error') }
    logTest1 = 0
  }
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



/* === Method tests ==================================================== */
modjool.wait().then(() => {
  const notDef1 = document.querySelectorAll(':not(:defined)')
  modjool.create()
  const notDef2 = document.querySelectorAll(':not(:defined)')
  if (notDef1.length > 0 && notDef2.length === 0) {
    console.log('✅ auto-define create() works')
  } else {
    console.log('❌ auto-define create() error')
  }
})

modjool.getAsync('a-1').then(a => {
  if (a.length > 0) {
    console.log('✅ getAsync() and get() works')
  } else {
    console.log('❌ getAsync() and get() error')
  }
})



/* === Setup ==================================================== */
document.querySelector('.tests').innerHTML += tempBody

function newElement(initObject, content = '', { tag = nextTag(), attr = {} } = {}) {
  let attrs = []
  let attrString = ''
  for (const [key, val] of Object.entries(attr)) {
    attrs.push(key)
    attrString += ` ${key}="${val}"`
  }
  modjool.create({
    tag: tag,
    // attr: attrs,
    shadowDom: false,
    ...initObject
  })
  const tag2 = nextTag()
  modjool.create({
    tag: tag2,
    // attr: attrs,
    shadowDom: true,
    ...initObject
  })
  tempBody += `<div><${tag}${attrString}>${content}</${tag}><${tag2}${attrString}>${content}</${tag2}></div>`
}

function nextTag () {
  return `a-${count++}`
}
