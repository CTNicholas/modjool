function updateSlots (context, options) {
  if (context.isConnected) {
    const { slot, slotVal } = getSlotContent(context, options)
    context.slotConnected = true
    context.mj.instance.slot = slot
    context.mj.instance.slotVal = slotVal
  }
}

export { updateSlots }

function getSlotContent (context, { inherit }) {
  let slot
  let slotVal
  const bodyFrag = createElement(context.mj.bodyContent)
  const slotList = bodyFrag.querySelectorAll('[slot]')
  if (slotList.length > 0) {
    slot = {}
    slotVal = {}
    for (const s of slotList) {
      const slotName = s.getAttribute('slot')
      slotVal[slotName] = s.innerHTML
      if (inherit) {
        slot[slotName] = s.outerHTML
      } else {
        slot[slotName] = `<slot name="${slotName}"></slot>`
      }
    }
  } else {
    slotVal = context.mj.bodyContent
    if (inherit) {
      slot = context.mj.bodyContent
    } else {
      slot = '<slot></slot>'
    }
  }
  return { slot, slotVal }
}

function createElement (str) {
  var frag = document.createDocumentFragment()
  var elem = document.createElement('div')
  elem.innerHTML = str
  while (elem.childNodes[0]) {
    frag.appendChild(elem.childNodes[0])
  }
  return frag
}
