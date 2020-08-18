function updateAll (...args) {
  updateSlots(...args)
  updateBody(...args)
}

function updateHtml (context, options, { html }) {
  context.mj.body.innerHTML = html
  console.log(context.mj.body.innerHTML)
  updateBody(context, options)
}

function updateSlots (context, options) {
  if (context.isConnected) {
    let slot = getSlotContent(context)
    context.slotConnected = true
    context.mj.instance.slot = slot
  }
}

function updateBody (context, { html, css, inherit, scopedCss }) {
  if (context.isConnected) {
    var tempEl = document.createElement('template')
    const bodyString = html({ ...context.mj.instance }) || context.mj.bodyContent
    tempEl.innerHTML = bodyString
    const bodyFrag = document.createDocumentFragment()
    bodyFrag.appendChild(tempEl.content)

    const parsedCss = css({ ...context.mj.instance })
    if (parsedCss) {
      const cssTag = document.createElement('style')
      cssTag.setAttribute('id', `mj-style-${context.mj.id}`)
      cssTag.textContent = scopedCss ? addSelector(context.mj.instance.self.select, parsedCss) : parsedCss
      bodyFrag.appendChild(cssTag)
    }
    while (context.mj.body.firstChild) {
      context.mj.body.removeChild(context.mj.body.firstChild)
    }
    context.mj.body.appendChild(bodyFrag)
  }
}

export { updateBody, updateSlots, updateHtml, updateAll }

function getSlotContent (context) {
  let slot
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
  return slot
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

function addSelector (selfSelect, css) {
  const selectorRegex = /^(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{/]*\s*){[\s\S]*?}/gm
  return css.replace(selectorRegex, (match, part) => {
    const split = part.trimStart().split(',')
    match = match.trimStart()
    const result = doCommaLoop(selfSelect, match, split)
    return result.join(', ') + match.slice(part.length)
  })
}

function doCommaLoop (selfSelect, match, split) {
  for (const str in split) {
    const regex = /:self\(([^\s]*)\)/im
    const regRes = split[str].match(regex)
    if (regRes) {
      split[str] = split[str].replace(regRes[0], selfSelect(regRes[1]))
    } else if (split[str].includes(':self')) {
      split[str] = split[str].replace(':self', selfSelect())
    } else {
      split[str] = `${selfSelect()} ${split[str]}`
    }
  }
  return split
}
