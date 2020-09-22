import { runLifecycle } from './utils.js'
import { updateBody, updateAttributes } from './update.js'

function advanced (context, options, { attrName, oldVal, newVal }) {
  const args = [context, options]
  if (context.mj.loaded && oldVal !== newVal) {
    updateAttributes(...args)
    runLifecycle(...args, attrName, { oldVal, newVal })
    updateBody(...args)
    if (runLifecycle(...args, 'js') !== null) {
      updateBody(...args)
    }
  }
}

function simple () {}

export default { advanced, simple }