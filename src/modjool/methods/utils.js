function runLifecycle ({ mj }, options, func, extra = false) {
  if (mj.new && mj.new[func] !== null && mj.new[func] !== undefined) {
    mj.new[func]()
  } else if (options[func] !== undefined) {
    return (extra ? options[func]({ ...mj.instance, ...extra }) : options[func](mj.instance)) || {}
  } else {
    return null
  }
}

function attrProxy (context, options, current = {}) {
  return new Proxy(current, {
    set (obj, prop, value) {
      context.setAttribute(prop, value)
      return Reflect.set(...arguments)
    }
  })
}

export { runLifecycle, attrProxy }
