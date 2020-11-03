import state from './state.js'
import createElement from './create.js'
import ModjoolElement from './element.js'

// noinspection JSUnusedGlobalSymbols
export default {
  create,
  createClass,
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
 * Creates and defines one or more Modjool elements, using the advanced or simple API
 * Returns options object, or array of options objects
 * @param  {...Array|Object|String} options - One of four inputs:
 *   1. An array of objects for the advanced API
 *   2. An array of strings for the simple API
 *   3. A single object for the advanced API
 *   4. A single string for the simple API
 * @returns {Promise<Object|Array<Object>>} - Options object(s)
 */
function create (...options) {
  return createElement(ModjoolElement, options, true)
}

/**
 * Creates classes for one or more Modjool elements, using the advanced or simple API
 * Returns ModjoolElement class, or array of ModjoolElement classes
 * Return value wrapped in Promise
 * Returned class can be used in customElements.define:
 *
 * modjool.createClass('tag-name').then(modjoolClass => {
 *   customElements.define('tag-name', modjoolClass)
 * }
 * @param  {...Array|Object|String} options - One of four inputs:
 *   1. An array of objects for the advanced API
 *   2. An array of strings for the simple API
 *   3. A single object for the advanced API
 *   4. A single string for the simple API
 * @returns {Promise<Class|Array<Class>>} - ModjoolElement class
 */
function createClass (...options) {
  return createElement(ModjoolElement, options, false)
}

/**
 * Defines all non-defined custom elements
 * @returns {Promise<Boolean>} - True
 */
function createUndefined () {
  return createElement(ModjoolElement, [], true)
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
 * @param {String} className - The tag of the custom element
 * @returns {Array} - Array of selected elements
 */
function get (className = '') {
  return state.getElements(className)
}

/**
 * Returns a promise, resolving with the result of modjool.get(), after all custom
 * elements have loaded to the DOM
 * @param {String} className - The tag of the custom element
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
 * @returns {Promise<NodeList>} - Promise resolving with the array of selected elements
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
 * Returns a promise that waits until all Modjool elements have been loaded, then resolves
 * @returns {Promise} - Promise that resolves when Modjool loaded
 */
function wait () {
  // noinspection JSUnusedLocalSymbols
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
