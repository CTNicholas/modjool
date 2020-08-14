import createElement from './createElement.js'

export default function (context, options) {
  if (context.isConnected) {
    getSlots()
  }

  function getSlots () {
    let slot = ''
    const bodyFrag = createElement(context.mj.bodyContent)
    const slotList = bodyFrag.querySelectorAll('slot[name]')
    if (slotList.length > 0) {
      slot = {}
      for (const s of slotList) {
        slot[s.getAttribute('name')] = s.innerHTML
      }
    } else {
      slot = context.mj.bodyContent
    }
    if (context.slotConnected) {
    }
    context.slotConnected = true
    context.mj.instance.slot = slot
  }
}
