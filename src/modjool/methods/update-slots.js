/**
 * If element connected, get and set slot and slotVal
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 */
function updateSlots (context, options) {
  if (context.isConnected) {
    const { slot, slotVal } = getSlotContent(context, options)
    context.slotConnected = true
    context.mj.instance.slot = slot
    context.mj.instance.slotVal = slotVal
  }
}

export { updateSlots }

/**
 * Gets slot and slotVal content. If multiple slots, return an object with 
 * slot names as properties. 
 * Explained:
 *   slot: HTML required to output the current slot in html() or css()
 *   slotVal: The HTML content of the slot as a string
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options
 * @param {Boolean} options.inherit - True if shadow DOM disabled, fslse if enabled
 * @returns {Object} - slot & slotVal content
 */
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

/**
 * Create an document fragment containing a specified element, and returns it
 * @param {String} htmlString - innerHTML of element
 * @returns {DocumentFragment} - Fragment containing parsed htmlString
 */
function createElement (htmlString) {
  const frag = document.createDocumentFragment()

  //Temporary element
  const elem = document.createElement('div')
  elem.innerHTML = htmlString

  // While not empty, move first child to parent, return without elem
  while (elem.childNodes[0]) {
    frag.appendChild(elem.childNodes[0])
  }
  return frag
}
