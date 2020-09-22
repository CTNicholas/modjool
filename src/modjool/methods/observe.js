import keywords from '../config/keywords.js'

/**
 * If attributes set in options, retrieve and pass to browser for observation
 * Runs when observedAttributes is called, before element construction
 * @param {ModjoolElement} context - The custom element
 * @param {Object} options - The custom element's options
 * @returns {Array} - Array of observed attributes
 */
function advanced (context, options) {
  if (options.attr !== undefined) {
    return options.attr.map(attr => {
      attr = attr.toLowerCase()
      if (!keywords.includes(attr)) {
        return attr
      } else {
        console.error(`[Modjool] ERROR: Keyword used as element attribute name [${attr}]`)
      }
    })
  } else {
    return []
  }
}

function simple () {}

export default { advanced, simple }
