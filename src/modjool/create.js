import whenReady from './whenready.js'
/**
 * Defines or creates custom element classes from createElement function.
 *
 * If define === true:
 *   Create and define custom elements
 *   Return result (options object or array of option objects used for Modjool definition)
 *
 * If define === false:
 *   Create custom element classes, but do not define
 *   Return result (class or array of classes to be used for custom element definition)
 *
 * Execution process:
 *   1. If options not passed, define all elements not currently defined, return true
 *   2. If array passed, define all elements, return array of results
 *   3. Else, create single element, if successful, return result
 *   4. Return false if problem
 *
 * @param {Function} createElement - Function to build ModjoolElement or ModjoolLiteElement
 * @param {Object|Array|String} options - Options provided by modjool.create()
 * @param {Boolean} define - Will define element, and return options if true
 * @returns {Object|Class|Array<Object|Class>|Boolean} - See above. All 3 processes return false if failed
 */
export default function (createElement, options = [], define = true) {
  options = options.length === 1 ? options[0] : options
  if (Array.isArray(options)) {
    if (options.length === 0) {
      whenReady(() => defineAll(createElement))
      return true
    }
    const result = []
    for (const option of options) {
      result.push(createSingle(createElement, option, define))
    }
    const allSuccessful = result.every(res => res !== false)
    return allSuccessful ? result : false
  } else {
    return createSingle(createElement, options, define)
  }
}

/**
 * Creates a single ModjoolElement or ModjoolLiteElement. If a string is passed as options,
 * send false to createElement(), to denote a simple API call. If define === true,
 * returns the class instead of defining and returning options.
 * @param {Function} createElement - Function to build ModjoolElement or ModjoolLiteElement
 * @param {Object|String} options - Options provided by modjool.create()
 * @param {Boolean} define - Will define element, and return options if true
 * @returns {Object|Class|false} - True if successful, false if not
 */
function createSingle (createElement, options, define = true) {
  const isString = typeof options === 'string' || options instanceof String
  const customElement = createElement(options, !isString)
  if (define !== true) {
    return customElement.class || false
  }
  try {
    customElements.define(customElement.tag, customElement.class)
  } catch (err) {
    console.error(err)
  }
  return customElements.get(customElement.tag) ? customElement.options : false
}

/**
 * Finds all non-defined custom elements, and defines them using createSingle()
 * @param {Function} createElement - Function to build ModjoolElement or ModjoolLiteElement
 * @returns {Array} - List of all successfully defined custom element options objects
 */
function defineAll(createElement) {
  const notDefined = document.querySelectorAll(':not(:defined)')
  const list = []
  for (const el of notDefined) {
    if (!list.includes(el.tagName)) {
      createSingle(createElement, el.tagName.toLowerCase() || el.nodeName.toLowerCase() ||el.localName)
      list.push(el.tagName)
    }
  }
  return list
}
