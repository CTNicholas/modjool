import keywords from '../config/keywords.js'

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