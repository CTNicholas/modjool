import state from '../state.js'
import { runLifecycle } from './utils.js'

function advanced (context, options) {
  runLifecycle(context, options, 'leave')  
  context.mj.body.innerHTML = ''
  context.mj = {}
  state.removeElement(context)
}

function simple (context, options) {
 state.removeElement(context)
}

export default { advanced, simple }