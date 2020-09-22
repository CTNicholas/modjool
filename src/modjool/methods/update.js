import { updateAttributes } from './update-attributes.js'
import { updateSlots } from './update-slots.js'
import { updateBody } from './update-body.js'

function updateAll (...args) {
  updateAttributes(...args)
  updateSlots(...args)
  updateBody(...args)
}

function updateNew (context, options, vals) {
  for (const [key, val] of Object.entries(vals)) {
    context.mj.new[key] = val
    updateBody(context, options)
  }
}

export { updateAttributes, updateSlots, updateBody, updateAll, updateNew }
