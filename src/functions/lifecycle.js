export default function ({ mj }, options, func, extra = false) {
  if (options[func] !== undefined) {
    return (extra ? options[func]({ ...mj.instance, ...extra }) : options[func](mj.instance)) || {}
  } else {
    return null
  }
}
