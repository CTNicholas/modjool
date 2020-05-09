export default function ({ mj }, options, func) {
  if (options[func] !== undefined) { options[func](this.mj.instance) }
}
