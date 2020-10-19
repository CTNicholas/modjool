/**
 * Runs the lifecycle event as specified by apiProp
 * Execution process:
 *   1. If already running lifecycle, return null
 *   2. If new property set, run it and finish
 *   3. If property in options, run it, and pass extra properties to instance, if set
 *   4. Else (the property has not been set), return null
 * @param {ModjoolElement} context
 * @param {Object} context.mj - The custom element's mj property
 * @param {Object} options - The custom element's options
 * @param {String} apiProp - The name of the API property
 * @param {Object} extra - Any extra properties to be passed to the API method
 * @returns {null|Object} - Null if failed, otherwise function result or {} if no result
 */
function runLifecycle ({ mj }, options, apiProp, extra = false) {
  let result = null
  let alreadyRunningLifecycle = false
  if (mj.runningLifecycle) {
    alreadyRunningLifecycle = true
  } else {
    mj.runningLifecycle = true
  }

  // If new replacement lifecycle event has been set, run it
  if (mj.new && mj.new[apiProp] !== null && mj.new[apiProp] !== undefined) {
    result = mj.new[apiProp]() || undefined
  }

  // Run regular lifecycle, add extra options if needed
  if (result === null && options[apiProp] !== undefined) {
    result = (extra ? options[apiProp]({ ...mj.instance, ...extra }) : options[apiProp](mj.instance)) || undefined
  }

  if (!alreadyRunningLifecycle) {
    mj.runningLifecycle = false
  }
  return result
}

/**
 * Returns a shortcut function for context.querySelector, compatible with
 * tagged template literals, and regular strings.
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @param {Boolean} findAll - Optional, return querySelectorAll
 * @returns {function(String|Array, ...[String]): *}
 */
function findFunction (context, options, findAll = false) {
  return function (strings, ...values) {
    let str
    if (typeof strings === 'string' || strings instanceof String) {
      str = strings
    } else {
      // Build template string
      str = strings[0]
      for (let i = 0; i < values.length; i++) {
        str += values[i] + strings[i + 1]
      }
    }
    return findAll ? context.mj.body.querySelectorAll(str) : context.mj.body.querySelector(str)
  }
}

/**
 * Converts kebab-case to camelCase
 * Uses a cache for speed
 * @type {function(*): *}
 * @param {String} - String to convert
 * @returns {String} - Converted string
 */
const kebabToCamel = kebabCamelCache()

/**
 * Converts camelCase to kebab-case
 * Uses a cache for speed
 * @type {function(*): *}
 * @param {String} - String to convert
 * @returns {String} - Converted string
 */
const camelToKebab = kebabCamelCache(true)

export { runLifecycle, findFunction, kebabToCamel, camelToKebab }

/**
 * Creates a cache of kebab-case to camelCase conversions, and vice-versa
 * Returns two functions, one for conversion either way, returning
 * from cache if already converted
 * @param {Boolean} camelToKebab - If true, convert FROM camel, instead of TO
 * @returns {function(*): (*)} -
 */
function kebabCamelCache (camelToKebab = false) {
  const camelCache = {}
  const kebabCache = {}

  if (camelToKebab) {
    // camelCase to kebab-case
    return function (str) {
      // Check cache
      if (camelCache[str]) {
        return camelCache[str]
      }

      // Return str if not camelCase (has any capital letters)
      if (str === str.toLowerCase()) {
        return str
      }

      // Convert, add to cache, return
      const result = str.replace(/[A-Z]/g, "-$&").toLowerCase()
      camelCache[str] = result
      kebabCache[result] = str
      return result
    }
  }

  // kebab-case to camelCase
  // (quicker than regex in every browser but Firefox)
  return function (str) {
    // Check cache
    if (kebabCache[str]) {
      return kebabCache[str]
    }

    // Return str if not kebab case (has any hyphens)
    if (!str.includes('-')) {
      return str
    }

    // Convert, add to cache, return
    const result = str
      .split('-')
      .map((item, index) =>
        index
          ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
          : item.toLowerCase())
      .join("")
    kebabCache[str] = result
    camelCache[result] = str
    return result
  }
}