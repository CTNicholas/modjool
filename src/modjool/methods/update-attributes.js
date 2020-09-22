import { attrProxy } from './utils.js'

function updateAttributes (context, options) {
  if (context.isConnected) {
    context.mj.attributes = {}
    for (let i = 0; i < context.attributes.length; i++) {
      const prop = context.attributes[i].nodeName.toLowerCase()
      if (!prop.toLowerCase().startsWith('mj-')) {
        let val = context.attributes[i].nodeValue
        if (val === '') {
          val = true
        }
        context.mj.attributes[prop] = val
      }
    }
    context.mj.instance.attr = attrProxy(context, options, context.mj.attributes)
  }
}

export { updateAttributes }
