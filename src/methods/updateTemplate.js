export default function (self, { html }) {
  if (self.isConnected) {
    if (html) {
      self.getBody().innerHTML = html({ ...self.mj_attr, slot: self.mj_slots })
    } else {
      self.getBody().innerHTML = self.mj_initial
    }

    self.getBody().appendChild(document.createElement('style')).textContent = self.mj_lastStyle || ''
  }
}
