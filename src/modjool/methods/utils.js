import { updateBody } from './update-body'
import attributeChanged from './changed.js'

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
      if (!context.mj.settingAttributes) {
        context.setAttribute(prop, value)
      }
      return Reflect.set(...arguments)
    }
  })
}

/**
 * Returns a new Proxy element, with a set proxy, attached to proxyObj
 * When proxyObj's value changed, if not running lifecycle:
 *  - Update the body
 *  - Run complete() lifecycle event
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @param {Object} proxyObj - The current attribute values
 */
function dataProxy (context, options, proxyObj = {}) {
  return new Proxy(proxyObj, {
    set (obj, prop, value) {
      const result = Reflect.set(...arguments)
      if (!context.mj.runningLifecycle) {
        updateBody(context, options)
        runLifecycle(context, options, 'complete')
      }
      return result
    }
  })
}

/**
 * Returns an observing MutationObserver that passes
 * attributes changed to the default advanced element handler
 * for attributeChangedCallback.
 *
 * MutationObserver only watches for attribute changes to the
 * context element, and not changes to its children or other events.
 *
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @returns {MutationObserver} - The observing MutationObserver
 */
function attrObserver (context, options) {
  const observer = new MutationObserver(mutationList => {
    mutationList.forEach(mutation => {
      if (mutation.type === 'attributes') {
        attributeChanged.advanced(context, options, {
          attrName: mutation.attributeName,
          oldVal: mutation.oldValue,
          newVal: context.getAttribute(mutation.attributeName)
        })
      }
    })
  })

  // Start observing
  observer.observe(context, {
    // Watch for attribute change
    attributes: true,
    // Save old values
    attributeOldValue: true
  })

  return observer
}

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
      str = strings[0]
      for (let i = 0; i < values.length; i++) {
        str += values[i] + strings[i+1]
      }
    }
    return findAll ? context.mj.body.querySelectorAll(str) : context.mj.body.querySelector(str)
  }
}

export { attrProxy, dataProxy, attrObserver, runLifecycle, findFunction }
