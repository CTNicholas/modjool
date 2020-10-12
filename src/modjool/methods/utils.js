import { updateBody } from './update-body'

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
  mj.runningLifecycle = true

  // If new replacement lifecycle event has been set, run it
  if (mj.new && mj.new[apiProp] !== null && mj.new[apiProp] !== undefined) {
    result = mj.new[apiProp]() || {}
  }

  // Run regular lifecycle, add extra options if needed
  if (result === null && options[apiProp] !== undefined) {
    result = (extra ? options[apiProp]({ ...mj.instance, ...extra }) : options[apiProp](mj.instance)) || {}
  }

  mj.runningLifecycle = false
  return result
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
      if (!context.settingAttributes) {
        context.setAttribute(prop, value)
        return Reflect.set(...arguments)
      }
    }
  })
}

/**
 * Returns a new Proxy element, with a set proxy, attached to proxyObj
 * When proxyObj's value changed, update the body, if not already updating
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @param {Object} proxyObj - The current attribute values
 */
function dataProxy (context, options, proxyObj = {}) {
  return new Proxy(proxyObj, {
    set (obj, prop, value) {
      const result = Reflect.set(...arguments)
      updateBody(context, options)
      return result
    }
  })
}

export { runLifecycle, attrProxy, dataProxy }
