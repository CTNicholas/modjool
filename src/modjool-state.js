export default {
  classes: [],
  elements: [],

  addClass (newClass) {
    this.classes.push(newClass)
  },

  addElement (newElement) {
    this.elements.push(newElement)
  },

  getElements (testName) {
    return this.elements.filter(el => testName ? el.mj.name === testName : true)
  }
}
