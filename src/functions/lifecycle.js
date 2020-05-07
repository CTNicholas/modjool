export default function ({ mj }, options, func) {
  mj.instance.data = options[func](mj.instance) || mj.instance.data
}
