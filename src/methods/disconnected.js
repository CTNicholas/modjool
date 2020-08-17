import state from '../state.js'
import { runLifecycle } from './utils.js'

function advanced (context, options) {
  state.removeElement(context)
  runLifecycle(context, options, 'leave')  
}

function simple (context, options) {
 state.removeElement(context)
}

export default { advanced, simple }