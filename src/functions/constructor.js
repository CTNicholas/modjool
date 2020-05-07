export default function (context, options) {
  const instanceId = Math.random().toString(36).slice(-8)
  context.mj = {
    id: instanceId,
    attributes: {},
    body: {},
    bodyContent: '',
    styleContent: '',
    instance: {
      attr: {},
      data: {},
      self: {
        id: instanceId,
        name: options.name,
        select: ''
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
}
