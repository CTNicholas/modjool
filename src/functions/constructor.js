export default function (self, options) {
  self.mj = {}
  if (options.inherit) {
    self.attachShadow({ mode: 'open' })
  }
  self.mj.id = Math.random().toString(36).slice(-8)
}
