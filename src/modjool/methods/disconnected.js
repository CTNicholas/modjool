import state from '../state.js'
import { runLifecycle } from './utils.js'

/**
 * Runs the leave() lifecycle event, empties body & mj, removes element from state
 * Runs when disconnectedCallback is called, and element is removed from DOM
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 */
function advanced (context, options) {
  runLifecycle(context, options, 'leave')  
  context.mj.body.innerHTML = ''
  context.mj = {}
  state.removeElement(context)
}

/**
 * Removes element from state
 * Runs when disconnectedCallback is called, and element is removed from DOM
 * @param {ModjoolElement} context - The custom element to update
 * @param {Object} options - The custom element's options
 */
function simple (context, options) {
 state.removeElement(context)
}

export default { advanced, simple }
