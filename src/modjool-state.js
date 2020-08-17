export default {
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
