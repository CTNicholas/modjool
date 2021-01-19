/**
 * If element connected, get and set slot and slotVal
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 */
function updateSlots (context, options) {
  if (context.isConnected) {
    const { slot, slotVal, slotElem } = getSlotContent(context, options)
    context.mj.instance.slot = slot
    context.mj.instance.slotVal = slotVal
    context.mj.instance.slotElem = slotElem
  }
}

export { updateSlots }

/**
 * Gets slot and slotVal content. If multiple slots, return an object with
 * slot names as properties. Only top-level elements returned as slots.
 * Explained:
 *   slot: HTML required to output the current slot in html() or css()
 *   slotVal: The HTML content of the slot as a string
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @returns {Object} - slot & slotVal content
 */
function getSlotContent (context, options) {
  let slot
  let slotVal
  let slotElem
  const tempId = 'mj-8Wi7fiDtPtAWMhLQop1Smg'
  context.mj.bodyContent = context.mj.bodyContent.trim()
  const bodyFrag = createElement(context.mj.bodyContent, tempId)
  const slotList = bodyFrag.querySelectorAll(`#${tempId} > [slot]`)

  if (slotList.length > 0) {
    // Multiple slots
    slot = {}
    slotVal = {}
    slotElem = {}

    for (const s of slotList) {
      const slotName = s.getAttribute('slot')
      slotVal[slotName] = s.innerHTML
      slot[slotName] = options.shadowDom ? `<slot name="${slotName}"></slot>` : s.outerHTML
    }

  } else {
    // Single slot
    const hasContent = context.mj.bodyContent.length
    const shadowSlot = hasContent ? '<slot></slot>' : ''
    const normalSlot = hasContent ? `<slot>${context.mj.bodyContent}</slot>` : context.mj.bodyContent
    slotVal = context.mj.bodyContent
    slot = options.shadowDom ? shadowSlot : normalSlot
  }
  return { slot, slotVal, slotElem }
}

/**
 * Create an document fragment containing a specified element, and returns it,
 * contained in a div element with the ID specified
 * @param {String} htmlString - innerHTML of element
 * @param {String} id - ID of parent element
 * @returns {DocumentFragment} - Fragment containing parsed htmlString
 */
function createElement (htmlString, id = '') {
  const frag = document.createDocumentFragment()
  const elem = document.createElement('div')
  elem.innerHTML = htmlString
  elem.id = id
  frag.appendChild(elem)
  return frag
}
