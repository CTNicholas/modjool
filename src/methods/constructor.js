import { updateBody, updateSlots, updateAll, updateNew } from './update.js'
import { runLifecycle } from './utils.js'
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
        updateSlot: () => updateSlots(context, options),
        updateAttr: () => updateAttributes(context, options),
        updateAll: () => updateAll(context, options),
        remove: () => context.mj.body.host ? context.mj.body.host.remove() : context.mj.body.remove(),
        css: css => updateNew(context, options, { css }),
        data: data => updateNew(context, options, { data }),
        enter: enter => updateNew(context, options, { enter }),
        html: html => updateNew(context, options, { html }),
        js: js => updateNew(context, options, { js }),
        leave: leave => updateNew(context, options, { leave }),
        ready: ready => updateNew(context, options, { ready }),
      },
      slot: {},
    },
    new: {
      css: null,
      data: null,
      enter: null,
      html: null,
      js: null,
      leave: null,
      ready: null,
    },
    options: options
  }
  if (options.inherit === false) {
    context.attachShadow({ mode: 'open' })
    context.mj.body = context.shadowRoot
  } else {
    context.mj.body = context
  }
  context.mj.instance.self.element = context.mj.body.host ? context.mj.body.host : context.mj.body
  runLifecycle(context, options, 'enter')
}

function simple () {}

export default { advanced, simple }