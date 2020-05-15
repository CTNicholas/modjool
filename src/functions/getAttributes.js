export default function (context, options) {
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
