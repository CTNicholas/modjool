import mjInstanceFunc from './instanceFunc.js'

export default function (context, options) {
  const instanceId = Math.random().toString(36).slice(-6)
  const selector = options.inherit
    ? `${options.tag}[mj-id="${instanceId}"]`
    : `:host(${options.tag}[mj-id="${instanceId}"])`
  context.mj = {
    tag: options.tag,
    id: instanceId,
    attributes: {},
    body: {},
    bodyContent: '',
    styleContent: '',
    reactiveAttributes: options.attributes,
    instance: {
      attr: {},
      data: {},
      func: mjInstanceFunc(context, options),
      self: {
        id: instanceId,
        tag: options.tag,
        select: selector,
        element: {}
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
