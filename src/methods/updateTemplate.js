export default function (self, { html }) {
  if (self.isConnected) {
    if (html) {
      self.getBody().innerHTML = html({ ...self.getDefaultArgs(), slot: self.mj_slots })
    } else {
      self.getBody().innerHTML = self.mj_initial
    }

    self.createStyleTag()
  }
}
