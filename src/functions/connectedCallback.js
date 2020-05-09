import getAttributes from './getAttributes.js'

export default function (context, options) {
  context.mj.bodyContent = context.innerHTML
  initPrivateId()
  getAttributes(context, options)

  function initPrivateId () {
    if (options.id === true) {
      context.setAttribute('mj-id', context.mj.id)
    }
  }
}
