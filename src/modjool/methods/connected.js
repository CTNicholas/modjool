import state from '../state.js'
import { runLifecycle } from './utils.js'
import { updateBody, updateSlots, updateAttributes } from './update.js'

/**
 * Initialises the custom element, after it's added to the page
 * Runs when connectedCallback is called, and element is added to DOM
 * 
 * Execution process:
 *   1. Wait for parents to be defined
 *   2. Set mj-id
 *   3. Get attributes, slots, data
 *   4. Run ready() lifecycle event, and update body (get html() and css())
 *   5. Unhide element if enabled, context.mj.loaded = true
 *   6. If js() used, run js() lifecycle event if given, then update body again
 *   7. Add to defined elements, and dispatch mj-defined custom event
 * 
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 */
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

/**
 * Adds element to list of elements, dispatches mj-defined custom event
 * Runs when simple element is connected to DOM
 * @param {ModjoolElement} context - the custom element to update
 * @param {Object} options - The custom element's options
 */
function simple (context, options) {
  context.mj = {}
  context.mj.tag = options.tag
  state.addElement(context)
  context.dispatchEvent(new Event('mj-defined'))
}

export default { advanced, simple }

/**
 * Waits for parent elements to define themselves, before running func.
 * Execution process:
 *   1. If constructor already run, continue, else do nothing and finish
 *   2. If element has any non-defined custom element parents, run func and finish
 *   3. Add mj-defined custom event to non-defined parent element
 *   4. When parent executes mj-defined, recursively check for more parents
 *   5. Repeat until finish
 * @param {ModjoolElement} context
 * @param {Function} func - Function to be run when ready
 */
function waitForParentElements (context, func) {
  if (context.mj.constructorRun) {
    try {
      const closest = context.closest(':not(:defined)')
      if (closest === null) {
        func()
      } else {
        const definedFunc = () => {
          // Check for more non-defined elements
          waitForParentElements(context, func)
          // When called, remove this listener from newly defined parent
          closest.removeEventListener('mj-defined', definedFunc)
        }
        // Wait for parent element to be defined, then call definedFunc
        closest.addEventListener('mj-defined', definedFunc)
      }
    } catch (err) {
      // If warning not already logged
      if (!state.warnings.includes(':defined') && err.toString().includes(':defined')) {
        state.warnings.push(':defined')
        console.warn('[Modjool] Browser does not support :defined CSS selector, possible custom element nesting bugs')
        func()
      } else {
        console.error(err)
      }
    }
  }
}

/**
 * If options.id is true, set mj-id attribute to context.mj.id value
 * @param {ModjoolElement} context 
 * @param {Object} options 
 */
function initPrivateId (context, options) {
  if (options.id === true) {
    context.setAttribute('mj-id', context.mj.id)
  }
}

/**
 * If options.unhide is true, unhide object by removing hidden attribute
 * @param {ModjoolElement} context 
 * @param {Object} options 
 */
function unhideElement (context, options) {
  if (options.unhide) {
    context.removeAttribute('hidden')
  }
}