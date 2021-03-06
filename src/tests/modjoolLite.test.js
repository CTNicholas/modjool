import { modjoolLite } from '../index-umd.js'

const CLASS_NAME = 'ModjoolLiteElement'

// noinspection JSUnresolvedFunction
test('undefined element', () => {
  expect(isDefined('not-defined-lite')).toBe(false)
})

// noinspection JSUnresolvedFunction
test('single simple element', () => {
  modjoolLite.create('hello-there')
  expect(isDefined('hello-there')).toBe(true)
})

// noinspection JSUnresolvedFunction
test('multiple simple elements', () => {
  const els = modjoolLite.create('l2-1', 'l2-2', 'l2-3')
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