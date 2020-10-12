import { updateBody, updateSlots, updateAll, updateNew, updateAttributes } from './update.js'
import { attrProxy, dataProxy, runLifecycle } from './utils.js'
import instanceFunctions from './functions.js'

/**
 * Initialises the custom element's mj property, builds shadow DOM,
 * then runs enter() lifecycle event
 * 
 * Runs when the custom element's constructor is called
 * 
 * Properties of mj to note: 
 *   - body, refers to the shadow DOM (if enabled), or the current element
 *   - instance, the object sent to the modjool custom element hooks
 *     - Includes attr, data, func, self, slot, slotVal
 *     - Self contains a number of methods relating to the current body of the element
 *   - new, if new API values have been manually set for the element, they are here
 * 
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 */
function advanced (context, options) {
  const instanceId = Math.random().toString(36).slice(-6)
  const selector = function (rule = '') {
    if (options.shadowDom) {
      return `:host(${options.tag}[mj-id="${instanceId}"]${rule})`
    } else {
      return `${options.tag}[mj-id="${instanceId}"]${rule}`
    }
  }
  context.mj = {}
  context.mj = {
    tag: options.tag,
    id: instanceId,
    attributes: {},
    body: {},
    bodyContent: '',
    styleContent: '',
    currentBody: '',
    runningLifecycle: false,
    settingAttributes: false,
    loaded: false,
    reactiveAttributes: options.attributes,
    instance: {
      attr: options.reactive ? attrProxy(context, options, {}) : {},
      data: options.reactive ? dataProxy(context, options, {}) : {},
      func: instanceFunctions(context, options),
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
      slotVal: {}
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

  // Create shadow DOM, if enabled
  if (options.shadowDom) {
    context.attachShadow({ mode: 'open' })
    context.mj.body = context.shadowRoot
  } else {
    context.mj.body = context
  }

  // If shadow DOM, set self.element to the host (the element containing the shadow DOM)
  context.mj.instance.self.element = context.mj.body.host ? context.mj.body.host : context.mj.body
  
  context.mj.constructorRun = true
  runLifecycle(context, options, 'enter')
}

function simple () {}

export default { advanced, simple }
