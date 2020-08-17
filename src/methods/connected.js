import state from '../state.js'
import { getAttributes, runLifecycle } from './utils.js'
import { updateBody, updateSlots } from './update.js'

function advanced (context, options) {
  const args = [context, options]
  if (!context.mj.alreadyConnected) {
    context.mj.alreadyConnected = true
    
    context.mj.bodyContent = context.innerHTML
    initPrivateId(...args)
    getAttributes(...args)
    updateSlots(...args)

    context.mj.instance.data = runLifecycle(context, options, 'data') || {}
    runLifecycle(context, options, 'ready')
    updateBody(...args)

    unhideElement(...args)
    context.mj.loaded = true

    if (runLifecycle(context, options, 'js') !== null) {
      updateBody(context, options)
    }
    state.addElement(context)
  } else {
    // Not sure if mistake...
    simple(...args)
  }
}

function simple (context, options) {
  context.mj = {}
  context.mj.tag = options.tag
  state.addElement(context)
}

export default { advanced, simple }

function initPrivateId (context, options) {
  if (options.id === true) {
    context.setAttribute('mj-id', context.mj.id)
  }
}

function unhideElement (context, options) {
  if (options.unhide) {
    context.removeAttribute('hidden')
  }
}