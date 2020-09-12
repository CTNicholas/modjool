import { attrProxy } from './utils.js'

function updateAll (...args) {
  updateAttributes(...args)
  updateSlots(...args)
  updateBody(...args)
}

function updateNew (context, options, vals) {
  for (const [key, val] of Object.entries(vals)) {
    context.mj.new[key] = val
    updateBody(context, options)
  }
}

function updateAttributes (context, options) {
  if (context.isConnected) {
    context.mj.attributes = {}
    for (let i = 0; i < context.attributes.length; i++) {
      const prop = context.attributes[i].nodeName.toLowerCase()
      if (!prop.toLowerCase().startsWith('mj-')) {
        let val = context.attributes[i].nodeValue
        if (val === '') {
          val = true
        }
        context.mj.attributes[prop] = val
      }
    }
    context.mj.instance.attr = attrProxy(context, options, context.mj.attributes)
  }
}

function updateSlots (context, options) {
  if (context.isConnected) {
    let slot = getSlotContent(context, options)
    context.slotConnected = true
    context.mj.instance.slot = slot
  }
}

function updateBody (context, options) {
  if (context.isConnected) {
    const newHtml = getHtml(context, options)
    const newCss = getCss(context, options)
    const newBody = newHtml + newCss

    if (newBody !== context.mj.currentBody) {
      let bodyFrag = document.createDocumentFragment()
      addHtml(bodyFrag, newHtml)
      addCss(bodyFrag, newCss, context, options)

      deleteElementHtml(context.mj.body)
      context.mj.body.appendChild(bodyFrag)
      context.mj.currentBody = newBody
    }
  }
}

export { updateBody, updateSlots, updateAttributes, updateNew, updateAll }

function addHtml (bodyFrag, newHtml) {
  if (newHtml) {
    const tempEl = document.createElement('template')
    tempEl.innerHTML = newHtml
    bodyFrag.appendChild(tempEl.content)
  }
}

function addCss (bodyFrag, newCss, context, { scopedCss }) {
  if (newCss) {
    const cssTag = document.createElement('style')
    cssTag.setAttribute('id', `mj-style-${context.mj.id}`)
    cssTag.textContent = scopedCss ? addSelector(context.mj.instance.self.select, newCss) : newCss
    bodyFrag.appendChild(cssTag)
  }
}

function getHtml (context, { html }) {
  return context.mj.new.html || html({ ...context.mj.instance }) || context.mj.bodyContent
}

function getCss (context, { css, scopedCss }) {
  return context.mj.new.css || css({ ...context.mj.instance }) || context.mj.styleContent
}

function deleteElementHtml (body) {
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
}

function getSlotContent (context, { inherit }) {
  let slot
  const bodyFrag = createElement(context.mj.bodyContent)
  const slotList = bodyFrag.querySelectorAll('[slot]')
  if (slotList.length > 0) {
    slot = {}
    for (const s of slotList) {
      const slotName = s.getAttribute('slot')
      if (inherit) {
        slot[slotName] = s.outerHTML
      } else {
        slot[slotName] = `<slot name="${slotName}"></slot>`
      }
    }
  } else {
    if (inherit) {
      slot = context.mj.bodyContent
    } else {
      slot = '<slot></slot>'
    }
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
  const selectorRegex = /(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{/]*\s*){[\s\S]*?}/gm
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
