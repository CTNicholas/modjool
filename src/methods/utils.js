export { getAttributes, runLifecycle }

function getAttributes (context, options) {
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
  context.mj.instance.attr = context.mj.attributes
}

function runLifecycle ({ mj }, options, func, extra = false) {
  if (options[func] !== undefined) {
    return (extra ? options[func]({ ...mj.instance, ...extra }) : options[func](mj.instance)) || {}
  } else {
    return null
  }
}
