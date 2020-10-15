import { runLifecycle } from './utils.js'
import { updateBody } from './update-body.js'

/**
 * Runs js() lifecycle event, if it exists, with an extra property indicating it has been adopted
 * Runs when adoptedCallback has been called, and element has been moved to another document
 * @param context
 * @param options
 */
function advanced (context, options) {
  if (runLifecycle(context, options, 'js', { adopted: true }) !== null) {
    updateBody(context, options)
  }
  runLifecycle(context, options, 'complete')
}

function simple () { }

export default { advanced, simple }
