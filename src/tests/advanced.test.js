import { modjool } from '../index-umd.js'

const CLASS_NAME = 'ModjoolElement'
let count = 1

test('modjool initialised', () => {
  const el = newElement({
    html: () => `hi`
  }, 'hello')
  expect(document.body.innerHTML.includes('mj-id')).toBe(true)
})

/* Jest does not support this
test('innerHTML', () => {
  const el = newElement({
    html: () => `banana`
  }, 'apple', 'fruit-el')
  return modjool.getAsync('fruit-el').then((theEl) => {
    theEl = theEl[0]
    console.log(el.innerHTML)
    console.log(theEl.innerHTML)
    expect(theEl.innerHTML).toBe('banana')
  })
})
*/

function newElement(initObject, content, tag = nextTag()) {
  modjool.create({
    tag: tag,
    ...initObject
  })
  document.body.innerHTML = `<${tag}>${content}</${tag}>`
  return document.body.querySelector(tag)
}

function nextTag () {
  return `a-${count++}`
}