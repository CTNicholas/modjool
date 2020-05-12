export default function ({ mj }, options, func) {
  if (options[func] !== undefined) {
    return options[func](mj.instance)
  } else {
    return null
  }
}
