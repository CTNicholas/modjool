import state from './state.js'
import createElement from './create.js'
import ModjoolElement from './element.js'

export default { create, options, get, getAsync, wait }

function create (...options) {
  return createElement(ModjoolElement, options)    
}

function options (defaults) {
  state.config = { ...state.config,  ...defaults }
}

function get (className = false) {
  return state.getElements(className)
}

function getAsync (className) {
  return wait().then(() => get(className))
}

function wait () {
  return new Promise((resolve, reject) => {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setTimeout(() => {
        resolve()
      }, 0)
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          resolve()
        }, 1) // 10 before
      })
    }
  })
}
