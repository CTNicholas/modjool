/* global customElements */
import newModjoolElement from './modjool-element.js'

export default function Modjool (elementSettings) {
  const newElementClass = newModjoolElement(elementSettings) // ()
  const elName = elementSettings.options().name
  console.log(`${elName} defined?`, !!customElements.get(elName))
  return newElementClass
}

window.Modjool = Modjool
