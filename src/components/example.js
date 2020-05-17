/* global Modjool */
// import Modjool from '../modjool'
// import './assorted.js'
import './nested.js'
// console.time('START ALL')

Modjool.getAsync('title-header').then(b => {
  console.log('After:', b)
  if (b[0]) {
    b[0].classList.add('hello')
    b[0].classList.remove('hello')
    b[0].classList.add('hiagain')
  } else { 
    // console.log('title-header does not exist')
  }
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
