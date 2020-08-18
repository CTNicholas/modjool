import { updateBody, updateSlots, updateAll, updateHtml } from './update.js'
import FUNCTIONS from './functions.js'

function advanced (context, options) {
  const instanceId = Math.random().toString(36).slice(-6)
  const selector = function (rule = '') {
    if (options.inherit) {
      return `${options.tag}[mj-id="${instanceId}"]${rule}`
    } else {
      return `:host(${options.tag}[mj-id="${instanceId}"]${rule})`
    }
  }
  context.mj = {
    tag: options.tag,
    id: instanceId,
    attributes: {},
    body: {},
    bodyContent: '',
    styleContent: '',
    loaded: false,
    reactiveAttributes: options.attributes,
    instance: {
      attr: {},
      data: {},
      func: FUNCTIONS(context, options),
      self: {
        id: instanceId,
        tag: options.tag,
        select: selector,
        element: {},
        update: () => updateBody(context, options),
        updateSlots: () => updateSlots(context, options),
        updateAll: () => updateAll(context, options),
        html: html => updateHtml(context, options, { html })
      },
      slot: {}
    },
    options: options
  }
  if (options.inherit === false) {
    context.attachShadow({ mode: 'open' })
    context.mj.body = context.shadowRoot
  } else {
    context.mj.body = context
  }
  context.mj.instance.self.element = context.mj.body
}

function simple () {}

export default { advanced, simple }