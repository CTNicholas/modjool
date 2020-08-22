export { runLifecycle }

function runLifecycle ({ mj }, options, func, extra = false) {
  if (mj.new && mj.new[func] !== null) {
    mj.new[func]()
  } else if (options[func] !== undefined) {
    return (extra ? options[func]({ ...mj.instance, ...extra }) : options[func](mj.instance)) || {}
  } else {
    return null
  }
}
