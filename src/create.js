export default function (createElement, options) {
  options = options.length === 1 ? options[0] : options
  if (Array.isArray(options)) {
    for (const option of options) {
      createSingle(option)
    }
    return options
  } else {
    return createSingle(options) ? options.tag : false
  }

  function createSingle (options) {
    const isString = typeof options === 'string' || options instanceof String
    return createElement(!isString, options)
  }
}

