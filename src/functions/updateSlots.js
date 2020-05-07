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
    context.mj.instance.slot = slot
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
}
