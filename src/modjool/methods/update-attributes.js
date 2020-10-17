import { kebabToCamel } from './utils.js'

/**
 * If element connected, retrieve and set attributes
 * Add proxy to attr, to monitor for changes in the modjool API
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 */
function updateAttributes (context, options) {
  if (context.isConnected) {
    context.mj.settingAttributes = true
    context.mj.attributes = {}
    for (let i = 0; i < context.attributes.length; i++) {
      const prop = context.attributes[i].nodeName.toLowerCase()
      if (!prop.toLowerCase().startsWith('mj-')) {
        let val = context.attributes[i].nodeValue
        if (val === '') {
          val = true
        }
        context.mj.attributes[kebabToCamel(prop)] = val
      }
    }
    setAttr(context, options, context.mj.attributes)
    context.mj.settingAttributes = false
  }
}

export { updateAttributes }

/**
 * Delete all attributes from attr proxy element, then add new
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @param {Object} attributes - The new attributes
 */
function setAttr (context, options, attributes) {
  const attr = context.mj.instance.attr
  for (const prop of Object.keys(attr)) {
    delete attr[prop]
  }

  for (const [key, val] of Object.entries(attributes)) {
    attr[key] = val
  }
}