import { updateBody } from './update-body.js'
import { camelToKebab, runLifecycle } from './utils.js'
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
        context.setAttribute(camelToKebab(prop), value)
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

export { dataProxy, attrProxy, attrObserver }
