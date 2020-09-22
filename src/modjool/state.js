import config from './config/config.js'

export default {
  config: config,
  warnings: [],

  classes: [],
  elements: [],

  addClass (newClass) {
    this.classes.push(newClass)
  },

  addElement (newElement) {
    this.elements.push(newElement)
  },

  removeElement (oldElement) {
    this.elements = this.elements.filter(el => el  !== oldElement)
  },

  getElements (testName) {
    return this.elements.filter(el => testName ? el.mj.tag === testName : true)
  }
}
