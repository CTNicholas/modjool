/**
 * Runs the lifecycle event as specified by apiProp
 * Execution process:
 *   1. If new property set, run it and finish
 *   2. If property in options, run it, and pass extra properties to instance, if set
 *   3. Else (the property has not been set), return null
 * @param {ModjoolElement} context
 * @param {Object} context.mj - The custom element's mj property
 * @param {Object} options - The custom element's options
 * @param {String} apiProp - The name of the API property
 * @param {Object} extra - Any extra properties to be passed to the API method
 * @returns {null|Object} - Null if failed, otherwise function result or {} if no result
 */
function runLifecycle ({ mj }, options, apiProp, extra = false) {
  if (mj.new && mj.new[apiProp] !== null && mj.new[apiProp] !== undefined) {
    return mj.new[apiProp]() || {}
  } else if (options[apiProp] !== undefined) {
    return (extra ? options[apiProp]({ ...mj.instance, ...extra }) : options[apiProp](mj.instance)) || {}
  } else {
    return null
  }
}

/**
 * Returns a new Proxy element, with a set proxy, attached to proxyObj
 * When proxyObj's value changed, set value of this element's corresponding attribute
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @param {Object} proxyObj - The current attribute values
 */
function attrProxy (context, options, proxyObj = {}) {
  return new Proxy(proxyObj, {
    set (obj, prop, value) {
      context.setAttribute(prop, value)
      return Reflect.set(...arguments)
    }
  })
}

export { runLifecycle, attrProxy }
