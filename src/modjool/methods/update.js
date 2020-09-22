import { updateAttributes } from './update-attributes.js'
import { updateSlots } from './update-slots.js'
import { updateBody } from './update-body.js'

/**
 * Update element's attributes, slots, and body
 * @param  {...any} args - The custom element, and the element's options
 */
function updateAll (...args) {
  updateAttributes(...args)
  updateSlots(...args)
  updateBody(...args)
}

/**
 * Updates mj.new properties, and then updates body
 * apiProp corresponds to the API property name, and newVal its new value
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @param {Object} vals - Object containing new values
 */
function updateNew (context, options, vals) {
  for (const [apiProp, newVal] of Object.entries(vals)) {
    context.mj.new[apiProp] = newVal
    updateBody(context, options)
  }
}

export { updateAttributes, updateSlots, updateBody, updateAll, updateNew }
