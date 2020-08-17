import modjool from '../src/index.js'

jest.useFakeTimers()

test('js running', () => {
  let res = 0
  document.body.innerHTML = '<a1-1>hello</a1-1>'
  modjool.create({
    tag: 'a1-1',
    js: ({ self }) => {
      res++
      self.update()
    }
  })
  setTimeout(() => {}, 400)
  jest.runAllTimers()
  expect(res).toBe(90)
})

/*
test('HTML on page', async () => {
  document.body.innerHTML = '<a1-1>hello</a1-1>'
  modjool.create({
    tag: 'a1-1',
    html: () => 'hey'
  })
  let html = modjool.getAsync(() => {
    console.log('HI 1')
  }).then(() => document.querySelector('a1-1').innerHTML)
  console.log('HELLO 2')
  return expect(html).resolves.toBe('hevy')
  //expect(html).toBe('hevy')
  
})

test('CSS on page', async () => {
  document.body.innerHTML = '<a2-1>hello</a2-1>'
  modjool.create({
    tag: 'a2-1',
    css: () => 'background: red;'
  })
  setTimeout(() => {
    // expect(document.querySelector('a2-1').innerHTML).toBe('hey')
  })
  // await expect(document.querySelector('t2-1').innerHTML.includes('background: red;')).toBe(true)
})
*/