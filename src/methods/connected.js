import state from '../state.js'
import { runLifecycle } from './utils.js'
import { updateBody, updateSlots, updateAttributes } from './update.js'

function advanced (context, options) {
  const args = [context, options]
  if (!context.mj.alreadyConnected) {
    context.mj.alreadyConnected = true

    if (options.inherit) {
      waitForParentElements(context, () => connectToDom())
    } else {
      connectToDom()
    }

    function connectToDom () {
      context.mj.bodyContent = context.innerHTML
      initPrivateId(...args)
      updateAttributes(...args)
      updateSlots(...args)
      
      context.mj.instance.data = context.mj.new.data || runLifecycle(context, options, 'data') || {}
      runLifecycle(context, options, 'ready')
      updateBody(...args)
      
      unhideElement(...args)
      context.mj.loaded = true
      
      if (runLifecycle(context, options, 'js') !== null) {
        updateBody(context, options)
      }
      state.addElement(context)
    }
  }
}

function simple (context, options) {
  context.mj = {}
  context.mj.tag = options.tag
  state.addElement(context)
}

export default { advanced, simple }

function waitForParentElements (context, func) {
  try {
    if (context.closest(':not(:defined)') === null) {
      func()
    }
  } catch (err) {
    if (!state.warnings.includes(':defined')) {
      state.warnings.push(':defined')
      console.warn('[Modjool] Browser does not support :defined CSS selector, possible custom element nesting bugs')
    }
    func()
  }
}

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