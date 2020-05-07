export default function (self) {
  if (self.isConnected) {
    let slot = ''
    const slotList = self.mj_initial.querySelectorAll('slot[name]')
    console.log('Slotlist', slotList)
    if (slotList.length > 0) {
      slot = {}
      for (const s of slotList) {
        console.log('SLOT:', s, s.getAttribute('name'))
        slot[s.getAttribute('name')] = s.innerHTML
      }
      console.log('Final list:', slot)
    } else {
      slot = self.mj_initialHtml
    }
    self.mj_slots = slot
    console.log(slot)
  }
}
