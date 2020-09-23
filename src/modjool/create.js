import whenReady from './whenready.js'
/**
 * Creates one, or a number, of custom elements, using createElement
 * Execution process:
 *   1. If options not passed, define all elements not currently defined, return true
 *   2. If array passed, define all elements, return array of html tags
 *   3. Else, create single element, if successful, return custom html tag
 * @param {HTMLElement} createElement - ModjoolElement or ModjoolLiteElement
 * @param {Object|Array|String} options - Options provided by modjool.create()
 * @returns {Boolean|Array|String} - See above. All 3 processes return false if failed
 */
export default function (createElement, options = []) {
  options = options.length === 1 ? options[0] : options
  if (Array.isArray(options)) {
    if (options.length === 0) {
      return whenReady(() => defineAll(createElement)) || false
    }
    const result = []
    for (const option of options) {
      result.push(createSingle(createElement, option))
    }
    return result.every(res => res === true) ? options : false
  } else {
    return createSingle(createElement, options) ? options.tag : false
  }
}

/**
 * Creates a single ModjoolElement or ModjoolLiteElement. If a string is passed as options,
 * send false to createElement(), to denote a simple API call.
 * @param {HTMLElement} createElement  - ModjoolElement or ModjoolLiteElement
 * @param {Object|String} options - Options provided by modjool.create()
 * @returns {Boolean} - True if successful, false if not
 */
function createSingle (createElement, options) {
  const isString = typeof options === 'string' || options instanceof String
  return createElement(options, !isString)
}

/**
 * Finds all non-defined custom elements, and defines them using createSingle()
 * @param {HTMLElement} createElement  - ModjoolElement or ModjoolLiteElement
 * @returns {Array} - List of all successfully defined custom element tag names
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
