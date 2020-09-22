import whenReady from './whenready.js'
/**
 * Creates one, or a number, of custom elements, using createElement
 * Execution process:
 *   1. If options not passed, define all elements not currently defined, return true
 *   2. If array passed, define all elements, return array of custom html tags
 *   3. Else, create single element, if successful, return custom html tag
 * @param {HTMLElement} createElement - ModjoolElement or ModjoolLiteElement
 * @param {Object} options - Options provided by modjool.create()
 * @returns {Boolean|Array|String} - See above
 */
export default function (createElement, options = []) {
  options = options.length === 1 ? options[0] : options
  if (Array.isArray(options)) {
    if (options.length === 0) {
      return whenReady(() => defineAll(createElement))
    }
    for (const option of options) {
      createSingle(createElement, option)
    }
    return options
  } else {
    return createSingle(createElement, options) ? options.tag : false
  }
}

function createSingle (createElement, options) {
  const isString = typeof options === 'string' || options instanceof String
  return createElement(!isString, options)
}

function defineAll(createElement) {
  const notDefined = document.querySelectorAll(':not(:defined)')
  const list = []
  for (const el of notDefined) {
    if (!list.includes(el.tagName)) {
      createSingle(createElement, el.tagName.toLowerCase() || el.nodeName.toLowerCase() ||el.localName)
    }
    list.push(el.tagName)
  }
  return true
}
