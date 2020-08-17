import config from './config.js'
import state from './state.js'
import createElement from './create.js'
import ModjoolElement from './element.js'

export default { create, options, get, getAsync }

function create (...options) {
  return createElement(ModjoolElement, options)    
}

function options (defaults) {
  Object.assign(config, defaults)
}

function get (className = false) {
  return state.getElements(className)
}

function getAsync (className) {
  return new Promise((resolve, reject) => {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setTimeout(() => {
        resolve(get(className))
      }, 0)
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          resolve(get(className))
        }, 10)
      })
    }
  })
}
