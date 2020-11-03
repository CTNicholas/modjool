import config from './config/config.js'

/**
 * Keeps track of the state of Modjool. New elements are added and removed
 * as they are added and removed from the page.
 */
export default {
  config: config,
  warnings: [],

  classes: [],
  elements: [],

  /**
   * Adds an element to the elements array
   * @param {ModjoolElement} newElement - The element to be added
   */
  addElement (newElement) {
    this.elements.push(newElement)
  },

  /**
   * Removes an element from the elements array
   * @param {ModjoolElement} oldElement - The element to be removed
   */
  removeElement (oldElement) {
    this.elements = this.elements.filter(el => el  !== oldElement)
  },

  /**
   * Returns a list of elements that are  defined, and currently attached to the DOM,
   * that match the elementTag. If no argument, return all currently defined elements
   * @param {String} elementTag - The tag of the custom element
   * @returns {Array} - Array of selected elements
   */
  getElements (elementTag) {
  // noinspection JSIncompatibleTypesComparison
    return elementTag ? this.elements.filter(el => el.mj.tag === elementTag) : this.elements
  }
}
