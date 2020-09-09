import whenReady from './whenready.js'

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
