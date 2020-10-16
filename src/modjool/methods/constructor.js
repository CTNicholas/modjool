import { updateBody, updateSlots, updateAll, updateNew, updateAttributes } from './update.js'
import { attrProxy, dataProxy, attrObserver, runLifecycle, findFunction } from './utils.js'
import instanceFunctions from './functions.js'
import keywords from '../config/keywords.js'

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
    observer: {},
    body: {},
    bodyContent: '',
    styleContent: '',
    currentBody: '',
    runningLifecycle: false,
    settingAttributes: false,
    loaded: false,
    reactiveAttributes: options.attributes,
    instance: {
      attr: {},
      data: {},
      elem: {},
      find: findFunction(context, options),
      findAll: findFunction(context, options, true),
      func: instanceFunctions(context, options),
      self: {
        id: instanceId,
        tag: options.tag,
        options: options,
        select: selector,
        element: {},
        update: () => updateBody(context, options, true),
        updateSlot: () => updateSlots(context, options),
        updateAttr: () => updateAttributes(context, options),
        updateAll: () => updateAll(context, options, true),
        remove: () => context.mj.body.host ? context.mj.body.host.remove() : context.mj.body.remove(),
        css: css => updateNew(context, options, { css }),
        data: data => updateNew(context, options, { data }),
        enter: enter => updateNew(context, options, { enter }),
        html: html => updateNew(context, options, { html }),
        js: js => updateNew(context, options, { js }),
        complete: complete => updateNew(context, options, { complete }),
        leave: leave => updateNew(context, options, { leave }),
        ready: ready => updateNew(context, options, { ready }),
        attrHook: (attrName, func) => {
          // If custom attribute set, and no custom attr observed, then create
          if (!options.attr.length && !context.mj.observer) {
            context.mj.observer = attrObserver(context, options)
          }
          updateNew(context, options, { [attrName]: func })
        }
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

  // Set mj-id attribute, if enabled
  if (options.modjoolId) {
    context.setAttribute('mj-id', context.mj.id)
  }

  // Create reactive features
  if (options.reactive) {
    // Create attr & data instance param proxies
    context.mj.instance.attr = attrProxy(context, options, {})
    context.mj.instance.data = dataProxy(context, options, {})

    // Create attribute MutationObserver if reactive attr not set manually
    if (!options.attr.length && optionsContainsCustomHook(options)) {
      context.mj.observer = attrObserver(context, options)
    }
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
  context.mj.instance.elem = context.mj.instance.self.element

  // Constructor complete, run "enter" lifecycle
  context.mj.constructorRun = true
  runLifecycle(context, options, 'enter')
}

function simple () {}

export default { advanced, simple }

function optionsContainsCustomHook (options) {
  for (const option of Object.keys(options)) {
    if (!keywords.includes(option)) {
      return true
    }
  }
  return false
}
