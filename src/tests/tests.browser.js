// noinspection NpmUsedModulesInstalled
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

// noinspection SpellCheckingInspection
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
  html: ({ data }) => `<div>${data.result ? '✅ self.tag, self.id, self.select works' : '❌ self.tag, self.id, self.select error'}`
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
  data: () => ({ text: '❌' }),
  ready: ({ data }) => { data.text += ' reactive data error' },
  js: ({ data }) => {
    setTimeout(() => { data.text = '✅ reactive data works' })
  },
  html: ({ data }) => `${data.text}`
})

// noinspection all
newElement({
  data: () => ({ importantTest: '❌' }),
  ready: ({ data }) => { data.importantTest += ' data hook error' },
  data_importantTest: ({ oldVal, newVal }) => {
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
  js: ({ data, elem }) => {
    elem.onclick = () => false
    data.count++
    setTimeout(() => {
      data.listen = elem.onclick()
    })
  },
  complete: ({ data, elem }) => {
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
  js: ({ self }) => {
    setTimeout(() => {
      selfUpdateTest = '✅ self.update() works'
      self.update()
    })
  },
  html: () => selfUpdateTest
})

newElement({
  js: ({ self }) => {
    self.html(({ slot }) => slot)
  },
  html: () => `❌ self.html() error`
}, '✅ self.html() works')

newElement({
  ready: ({ self }) => {
    self.css(() => `div::before { content: '✅ ' }`)
  },
  html: () => `<div>self.css() works</div>`,
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
    self.attrHook('test', () => {
      data.result = '✅ self.attrHook() works'
    })
    attr.test = 'hello'
  },
  html: ({ data }) => `${data.result}`
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

// noinspection JSUnusedGlobalSymbols
newElement({
  data: () => ({ result: 0 }),
  js: ({ self }) => {
    self.element.setAttribute('result', '1')
    self.element.setAttribute('result-two', '2')
  },
  attr_result: ({ data }) => { data.result++ },
  attr_resultTwo: ({ data }) => { data.result++ },
  html: ({ data }) => `${data.result === 4 ? '✅ attrHook works' : '❌ attrHook error'}`
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
  html: ({ data }) => `${data.result.length ? data.result : data.error}`
}, '', { attr: {
    result: '❌ change attr proxy error'
  }})

newElement({
  js: ({ attr, data }) => {
    data.result = data.result ? data.result : '❌ attr MutationObserver lifecycle error'
    if (attr.result.startsWith('❌')) {
      attr.result = '✅ attr MutationObserver lifecycle works'
    }
  },
  attr_result: ({ attr, data, oldVal, newVal }) => {
    if (oldVal && oldVal.startsWith('❌') && newVal.startsWith('✅')) {
      data.result = attr.result
    }
  },
  html: ({ data }) => `${data.result}`
}, '', { attr: {
    result: '❌ attr lifecycle error'
  }})

// noinspection JSUnresolvedVariable
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
  html: ({ data }) => `${data.res || '❌ camel to kebab attr error'}`
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
    if (!data.diff) { // noinspection SpellCheckingInspection
      console.log(`❌ multiple slotVals error \nslot: ${slot.icon} \nslotVal: ${slotVal.icon}`)
    }
  },
  html: ({ data, slotVal }) => `
    ${data.diff ? slotVal.icon : data.error}
  `,
  css: () => `
    span span::before { content: '❌ multiple slotVals error' }
    span::before { content: '✅ multiple slotVals work'}
  `
}, '<span slot="icon"><span></span></span><span slot="text"><span></span></span>')

// noinspection JSUnresolvedVariable
newElement({
  html: ({ slot }) => slot.three ? '❌ nested slot ignored error' : slot.one + slot.two
}, '<span slot="one">✅ <span slot="three"></span></span><span slot="two">nested slot ignored works</span>')

// noinspection JSUnresolvedVariable
modjool.create({
  tag: 'slot-nest-test-1',
  html: ({ slot }) => slot.two
})
// noinspection JSUnresolvedVariable
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

newElement({
  js: ({ data, findSlot }) => {
    data.res = findSlot`` && findSlot``.getAttribute('data-test') === 'hi' ? '✅ findSlot with el slot works' : '❌ findSlot with el slot error'
  },
  html: ({ data, slot }) => `${slot}${data.res}`
}, '<div data-test="hi"></div>')

newElement({
  js: ({ findSlot, self }) => {
    const result = findSlot`` && findSlot``.getAttribute('data-test') === 'hi'
    if (result) {
      self.html(() => '✅ findSlot with no defined slot works')
    }
  }
}, '<span data-test="hi">❌ findSlot with no defined slot error</span>')

newElement({
  js: ({ findSlot, self }) => {
    const result = findSlot`` === undefined
    if (result) {
      self.html(() => '✅ findSlot with zero slots works')
    }
  },
  html: () => `❌ findSlot with zero slots error`
})

newElement({
  js: ({ data, findSlot }) => {
    data.res = findSlot`` === undefined ? '✅ findSlot with no el works' : '❌ findSlot with no el error'
  },
  html: ({ data }) => `${data.res}`
}, 'a test slot')

newElement({
  js: ({ findSlot }) => {
    findSlot`one`.innerHTML = '✅ findSlot with multiple works'
  },
  html: ({ slot }) => `
    ${slot.one}${slot.two}
  `
}, '<span slot="one">❌ findSlot with multiple error</span><span slot="two"></span>')

newElement({
  js: ({ data, findSlot, self }) => {
    const result = findSlot`one` && findSlot`one`.getAttribute('data-test') === 'hi'
    if (result) {
      self.html(() => '✅ findSlot multi no defined slot works')
    }
  }
}, '<span slot="one" data-test="hi">❌ findSlot multi no defined slot error</span><span slot="two"></span>')

newElement({
  js: ({ data, findSlot, self }) => {
    const result = findSlot`` && findSlot``.length === 3 && findSlot``[0].getAttribute('data-test') === 'hi'
    if (result) {
      self.html(() => '✅ findSlot multi no argument works')
    }
  }
}, '<span slot="one" data-test="hi">❌ findSlot multi no argument error</span><span slot="two"></span><span slot="three"></span>')



/* === Nesting ==================================================== */
modjool.create({
  tag: 'nest-test-1',
  html: () => `✅ init before nesting works`
})
newElement({
  html: () => `<nest-test-1></nest-test-1>`
}, '❌ init before nesting error')


newElement({
  html: () => `<nest-test-2></nest-test-2>`
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
  html: () => `✅ alternate nesting before works`
}, '<nest-test-3></nest-test-3>')

newElement({
  html: () => `✅ alternate nesting after works`
}, '<nest-test-4></nest-test-4>')
modjool.create({
  tag: 'nest-test-4',
  html: () => `❌ alternate nesting after error`
})

newElement({
  html: () => `<nest-test-5-1></nest-test-5-1>`
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
  enter: () => {
    console.log('✅ enter() works')
    logTest1++
  },
  ready: () => {
    if (logTest1 < 1) { console.log('❌ enter() error') }
  }
}, '')

newElement({
  js: ({ self }) => { self.remove() },
  leave: () => { console.log('✅ leave() and self.remove() works') },
  html: () => `❌ 'leave() and self.remove()' error`
})

newElement({
  enter: ({ self }) => {
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



/* === Lifecycle example ======================================== */
const exampleDelay = 100
// noinspection all
newElement({
  enter: ({ self }) =>      setTimeout(() => console.log(`0 enter       ${self.tag} ${self.id}`), exampleDelay),
  data: ({ self }) =>      (setTimeout(() => console.log(`1 data        ${self.tag} ${self.id}`), exampleDelay), { test: 'test' }),
  ready: ({ self }) =>      setTimeout(() => console.log(`2 ready       ${self.tag} ${self.id}`), exampleDelay),
  data_test: ({ self }) =>  setTimeout(() => console.log(`d data_[prop] ${self.tag} ${self.id}`), exampleDelay),
  attr_test: ({ self }) =>  setTimeout(() => console.log(`a attr_[name] ${self.tag} ${self.id}`), exampleDelay),
  js: ({ self }) =>         setTimeout(() => console.log(`3 js          ${self.tag} ${self.id}`), exampleDelay),
  complete: ({ self }) =>   setTimeout(() => console.log(`4 complete    ${self.tag} ${self.id}`), exampleDelay),
  html: ({ self }) =>      (setTimeout(() => console.log(`h html        ${self.tag} ${self.id}`), exampleDelay), ''),
  css: ({ self }) =>       (setTimeout(() => console.log(`c css         ${self.tag} ${self.id}`), exampleDelay), ''),
}, '', { attr: { test: 'value' } })



/* === Method tests ==================================================== */
modjool.wait().then(() => {
  const notDef1 = document.querySelectorAll(':not(:defined)')
  modjool.create().then(res => {
    const notDef2 = document.querySelectorAll(':not(:defined)')
    if (notDef1.length > 0 && notDef2.length === 0) {
      console.log('✅ auto-define create() works')
    } else {
      console.log('❌ auto-define create() error')
    }
  })
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
  let attrString = ''
  for (const [key, val] of Object.entries(attr)) {
    attrString += ` ${key}="${val}"`
  }
  modjool.create({
    tag: tag,
    shadowDom: false,
    ...initObject
  })
  const tag2 = nextTag()
  modjool.create({
    tag: tag2,
    shadowDom: true,
    ...initObject
  })
  tempBody += `<div><${tag}${attrString}>${content}</${tag}><${tag2}${attrString}>${content}</${tag2}></div>`
}

function nextTag () {
  return `a-${count++}`
}
