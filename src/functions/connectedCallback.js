export default function (context, options) {
  context.mj.bodyContent = context.innerHTML
  initPrivateId()
  getAttributes()

  function getAttributes () {
    for (let i = 0; i < context.attributes.length; i++) {
      const prop = context.attributes[i].nodeName.toLowerCase()
      if (!prop.toLowerCase().startsWith('mj-')) {
        const val = context.attributes[i].nodeValue
        context.mj.attributes[prop] = val
      }
    }
    context.mj.instance.attr = context.mj.attributes
  }

  function initPrivateId () {
    if (options.id === true) {
      context.setAttribute('mj-id', context.mj.id)
      context.mj.instance.self.select = `${context.mj.name}[mj-id="${context.mj.id}"]`
    }
  }
}
