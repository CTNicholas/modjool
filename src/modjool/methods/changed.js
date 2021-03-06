import { runLifecycle, kebabToCamel } from './utils.js'
import { updateBody, updateAttributes } from './update.js'

/**
 * Gets current attributes, runs attribute lifecycle function, and updates body
 * Runs complete lifecycle function afterwards
 * 
 * Runs when attributeChangedCallback is called, and an observed attribute is changed
 * 
 * @param {ModjoolElement} context - The custom element to update
 * @param {Object} options - The custom element's options
 * @param {Object} attr 
 * @param {String} attr.attrName - Changed attribute name
 * @param {String} attr.oldVal - Old attribute value
 * @param {String} attr.newVal - New attribute value
 */
function advanced (context, options, { attrName, oldVal = '', newVal = '' }) {
  const args = [context, options]
  if (context.mj.loaded === true && oldVal !== newVal) {
    const lifecycleName = 'attr_' + kebabToCamel(attrName)
    updateAttributes(...args)
    runLifecycle(context, options, lifecycleName, { oldVal, newVal })
    if (!context.mj.runningLifecycle) {
      updateBody(...args)
      runLifecycle(...args, 'complete')
    }
  }
}

function simple () {}

export default { advanced, simple }
