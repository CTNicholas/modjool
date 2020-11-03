import whenReady from './whenready.js'

/**
 * Defines or creates custom element classes from createElement function.
 * Return value wrapped in Promise
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
 * @returns {Promise<Object|Class|Array<Object|Class>|Boolean>} - See above. All 3 processes return false if failed
 */
export default function creator (createElement, options = [], define = true) {
  options = options.length === 1 ? options[0] : options
  if (Array.isArray(options)) {
    if (options.length === 0) {
      return defineAll(createElement)
    }
    const result = []
    for (const option of options) {
      result.push(createSingle(createElement, option, define))
    }
    return Promise.all(result).then(values => {
      const allSuccessful = values.every(res => res !== false)
      return allSuccessful ? values : false
    })
  } else {
    return createSingle(createElement, options, define)
  }
}

/**
 * Creates a single ModjoolElement or ModjoolLiteElement. If a string is passed as options,
 * send false to createElement(), to denote a simple API call. If define === true,
 * returns the class instead of defining and returning options.
 * Return value wrapped in Promise
 * @param {Function} createElement - Function to build ModjoolElement or ModjoolLiteElement
 * @param {Object|String} options - Options provided by modjool.create()
 * @param {Boolean} define - Will define element, and return options if true
 * @returns {Promise<Object|Class|false>} - True if successful, false if not
 */
function createSingle (createElement, options, define = true) {
  const isString = typeof options === 'string' || options instanceof String
  return createElement(options, !isString).then(customElement => {
    if (define !== true) {
      return customElement.class || false
    }
    try {
      customElements.define(customElement.tag, customElement.class)
    } catch (err) {
      console.error(err)
    }
    return customElements.get(customElement.tag) ? customElement.options : false
  })
}

/**
 * Finds all non-defined custom elements, and defines them using createSingle()
 * @param {Function} createElement - Function to build ModjoolElement or ModjoolLiteElement
 * @returns {Promise} - List of all successfully defined custom element options objects
 */
function defineAll(createElement) {
  const notDefined = document.querySelectorAll(':not(:defined)')
  const list = []
  for (const el of notDefined) {
    if (!list.includes(el.tagName)) {
      const tag = el.tagName.toLowerCase() || el.nodeName.toLowerCase() || el.localName
      list.push(tag)
    }
  }
  return new Promise(resolve => {
    whenReady(() => {
      if (list.length) {
        resolve(creator(createElement, list, true))
      } else {
        resolve(false)
      }
    })
  })
}
