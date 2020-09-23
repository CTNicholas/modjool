import state from './state.js'
import createElement from './create.js'
import ModjoolElement from './element.js'

export default { 
  create,
  createUndefined,
  options, 
  get, 
  getAsync, 
  getUndefined, 
  getUndefinedAsync,
  complete,
  wait
}

/**
 * Creates one or more Modjool elements, using the advanced or simple API
 * @param  {...Array|Object|String} options - One of four inputs:
 *   1. An array of objects for the advanced API
 *   2. An array of strings for the simple API
 *   3. A single object for the advanced API
 *   4. A single string for the simple API
 * @returns {Boolean} - True if successful, false if not
 */
function create (...options) {
  return createElement(ModjoolElement, options)    
}

/**
 * Defines all non-defined custom elements
 * @returns {Boolean} - True if successful, false if not
 */
function createUndefined () {
  return createElement(ModjoolElement, [])
}

/**
 * Set the default options for all following modjool.create() calls. Options are merged
 * with the default options.
 * @param {Object} defaults - Options to apply
 * @returns {Object} - The current options, after merging
 */
function options (defaults) {
  state.config = { ...state.config,  ...defaults }
  return state.config
}

/**
 * Returns a list of elements that are  defined, and currently attached to the DOM,
 * that match the elementTag. If no argument, return all currently defined elements
 * @param {String} elementTag - The tag of the custom element
 * @returns {Array} - Array of selected elements
 */
function get (className = false) {
  return state.getElements(className)
}

/**
 * Returns a promise, resolving with the result of modjool.get(), after all custom
 * elements have loaded to the DOM
 * @param {String} elementTag - The tag of the custom element
 * @returns {Promise<Array>} - Promise resolving with the array of selected elements
 */
function getAsync (className) {
  return wait().then(() => get(className))
}

/**
 * Returns a list of all currently undefined elements
 * @returns {NodeList} - A non-live NodeList containing all matched elements
 */
function getUndefined () {
  return document.querySelectorAll(':not(:defined)')
}

/**
 * Returns a promise, resolving with the result of modjool.getUndefined(), after all
 * custom elements have loaded to the DOM
 * @returns {Promise<Array>} - Promise resolving with the array of selected elements
 */
function getUndefinedAsync () {
  return wait().then(() => getUndefined())
}

/**
 * Runs func after all Modjool elements have loaded
 * @param {Function} func - Function to run
 */
function complete (func) {
  wait().then(() => func())
}

/**
 * Returns a promose that waits until all Modjool elements have been loaded, then resolves
 * @returns {Promise} - Promsie that resolves when Modjool loaded
 */
function wait () {
  return new Promise((resolve, reject) => {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setTimeout(() => {
        resolve()
      }, 0)
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          resolve()
        }, 1)
      })
    }
  })
}
