export default function (self, { html }) {
  if (self.isConnected) {
    if (html) {
      self.getBody().innerHTML = html({ attr: self.mj_attr, slot: self.mj_slots, modj: self.mj_system_attr })
    } else {
      self.getBody().innerHTML = self.mj_initial
    }

    self.getBody().appendChild(document.createElement('style')).textContent = self.mj_lastStyle || ''
  }
}
