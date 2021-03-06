/**
 * Updates custom element's html and css, if it has changed
 * If update request sent while currently running lifecycle event,
 * return, and wait for it to finish.
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @param {Boolean} ignoreLifecycle - Ignore running lifecycle and force update
 */
function updateBody (context, options, ignoreLifecycle = false) {
  if (context.isConnected && (!context.mj.runningLifecycle || ignoreLifecycle)) {
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

export { updateBody }

/**
 * Adds HTML to document fragment
 * @param {DocumentFragment} bodyFrag
 * @param {String} newHtml
 */
function addHtml (bodyFrag, newHtml) {
  if (newHtml) {
    const tempEl = document.createElement('template')
    tempEl.innerHTML = newHtml
    bodyFrag.appendChild(tempEl.content)
  }
}

/**
 * Adds CSS to document fragment, in a style tag, with custom mj-id
 * @param {DocumentFragment} bodyFrag
 * @param {String} newCss
 * @param {ModjoolElement} context
 * @param {Boolean} scopedCss
 */
function addCss (bodyFrag, newCss, context, { scopedCss }) {
  if (newCss) {
    const cssTag = document.createElement('style')
    cssTag.setAttribute('id', `mj-style-${context.mj.id}`)
    cssTag.textContent = scopedCss ? addSelector(context.mj.instance.self.select, newCss) : newCss
    bodyFrag.appendChild(cssTag)
  }
}

/**
 * Gets HTML for custom element, and returns
 * Returns self.html() if set, then HTML hook, then body content
 * @param {ModjoolElement} context
 * @param {Function} html
 * @returns {String} - updated HTML
 */
function getHtml (context, { html }) {
  if (context.mj.new.html) {
    return context.mj.new.html({ ...context.mj.instance })
  }
  return html({ ...context.mj.instance }) || context.mj.bodyContent
}

/**
 * Gets CSS for custom element, and returns
 * Returns self.css() if set, then CSS hook, then style content
 * @param {ModjoolElement} context
 * @param {Object} options
 * @param {Function} options.css
 * @returns {String} - The updated CSS
 */
function getCss (context, { css }) {
  if (context.mj.new.css) {
    return context.mj.new.css ({ ...context.mj.instance })
  }
  return css({ ...context.mj.instance }) || context.mj.styleContent
}

/**
 * Removes all HTML from element (quicker than innerHTML = '')
 * @param {Node} body
 */
function deleteElementHtml (body) {
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
}

/**
 * Adds custom element selector to css and returns
 * @param {Function}  selfSelect - CSS selector function for self
 * @param {String} css - CSS to change
 * @returns {String} - The updated CSS
 */
function addSelector (selfSelect, css) {
  const selectorRegex = /(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{/]*\s*){[\s\S]*?}/gm
  return css.replace(selectorRegex, (match, part) => {
    const split = part.trimStart().split(',')
    match = match.trimStart()
    const result = doCommaLoop(selfSelect, match, split)
    return result.join(', ') + match.slice(part.length)
  })
}

/**
 * Loops through selectors, adds self selector to each css selector
 * @param {Function} selfSelect
 * @param {String} match - Matched regex
 * @param {Array} split - Matched regex split into selectors
 * @returns {Array} - Updated selectors
 */
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
