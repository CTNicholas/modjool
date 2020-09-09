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
      context.dispatchEvent(new Event('mj-defined'))
    }
  }
}

function simple (context, options) {
  context.mj = {}
  context.mj.tag = options.tag
  state.addElement(context)
  context.dispatchEvent(new Event('mj-defined'))
}

export default { advanced, simple }

function waitForParentElements (context, func) {
  if (context.mj.constructorRun) {
    try {
      const closest = context.closest(':not(:defined)')
      if (closest === null) {
        func()
      } else {
        //Wait for parent to be ready
        const definedFunc = () => {
          waitForParentElements(context, func)
          closest.removeEventListener('mj-defined', definedFunc)
        }
        closest.addEventListener('mj-defined', definedFunc)
      }
    } catch (err) {
      if (!state.warnings.includes(':defined') && err.includes(':defined')) {
        state.warnings.push(':defined')
        console.warn('[Modjool] Browser does not support :defined CSS selector, possible custom element nesting bugs')
        func()
      } else {
        console.error(err)
      }
    }
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