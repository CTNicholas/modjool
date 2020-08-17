import keywords from '../keywords.js'

function advanced (context, options) {
  if (options.attributes !== undefined) {
    return options.attributes.map(attr => {
      attr = attr.toLowerCase()
      if (!keywords.includes(attr)) {
        return attr
      } else {
        console.error(`ERROR: Modjool keyword used as element attribute name [${attr}]`)
      }
    })
  } else {
    return []
  }
}

function simple () {}

export default { advanced, simple }