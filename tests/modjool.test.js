import { modjool } from '../src/index-umd.js'

const CLASS_NAME = 'ModjoolElement'

test('undefined element', () => {
  expect(isDefined('not-defined')).toBe(false)
})

test('single simple element', () => {
  const el = modjool.create('t1-1')
  expect(isDefined('t1-1')).toBe(true)
})

test('multiple simple elements', () => {
  const els = modjool.create('t2-1', 't2-2', 't2-3')
  expect(areDefined(els)).toBe(true)
})

test('single advanced element', () => {
  const el = modjool.create({
    tag: 't3-1'
  })
  expect(isDefined('t3-1')).toBe(true)
})

test('single advanced element with options', () => {
  const el = modjool.create({
    tag: 't4-1',
    data: () => ({}),
    ready: () => {},
    js: () => {},
    html: () => ``,
    css: () => ``
  })
  expect(isDefined('t4-1')).toBe(true)
})

test('multiple advanced elements', () => {
  let els = modjool.create({ tag: 't5-1' }, { tag: 't5-2' }, { tag: 't5-3' })
  els = els.map(el => el.tag)
  expect(areDefined(els)).toBe(true)
})

test('multiple simple and advanced elements', () => {
  let els = modjool.create('t6-1', { tag: 't6-2' }, 't6-3' )
  els = els.map(el => el.tag || el )
  expect(areDefined(els)).toBe(true)
})

function check (tag) {
  return customElements.get(tag)
}

function isDefined (tag, className = CLASS_NAME) {
  const el = `${check(tag)}`
  return el.startsWith(`function ${className}()`) || el.startsWith(`class ${className}`)
}

function areDefined (tagArr, className = CLASS_NAME) {
  return tagArr.every(tag => isDefined(tag, className))
}