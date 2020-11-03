// noinspection JSUnusedGlobalSymbols
/**
 * Returns a series of functions passed to instance, for use in the modjool API
 * Functions: get, when, on, array, for
 * @param {ModjoolElement} context - The custom element
 * @returns {Object} - The object containing the functions
 */
export default function (context) {
  // noinspection JSUnusedGlobalSymbols
  return {
    /**
     * A shorter query selector
     * @param {String} el - CSS selector
     * @returns {HTMLElement} -  Query selector result
     */
    get (el) {
      return context.mj.body.querySelector(el)
    },

    /**
     * Quick event listener - when 'el' does 'event' run 'func'
     * @param {String} el - CSS selector
     * @param {String} event - JS event name
     * @param {Function} func - Function to be run
     * @returns {Object} - A event return object
     */
    when (el, event, func) {
      const theEl = this.get(el)
      theEl.addEventListener(event, func)
      return eventReturn(theEl, event, func)
    },

    /**
     * Quick event listener for context - when 'context' does 'event' run 'func'
     * @param {String} event - JS event name
     * @param {Function} func - Function to be run
     * @returns {Object} - A event return object
     */
    on (event, func) {
      context.mj.body.addEventListener(event, func)
      return eventReturn(context.mj.body, event, func)
    },

    // Converts 'list' to array
    /**
     * Takes a list and convert it to an array
     * @param {String} list - A comma separated list
     * @returns {Array} - Converted list
     */
    array (list) {
      const rep = '{{@#MJ[]£=+}}'
      const arr = list.replace('/,', rep).split(',')
      for (const index in arr) {
        arr[index] = arr[index].replace(rep, ',')
      }
      return arr
    },

    /**
     * Takes a comma separated list, converts to array, runs function on each
     * Add all functions results together, and returns
     * @param {String} list - A comma separated list
     * @param {Function} func - Function to be run
     * @returns {String} - Result of function, joined
     */
    for (list, func = a => a) {
      const theList = Array.isArray(list) ? list : this.array(list)
      let result = ''
      for (const index in theList) {
        result += func(theList[index], index)
      }
      return result
    }
  }
}

/**
 * Returns an object that allows for easy removing of set event listeners
 * @param {HTMLElement} el - The element 
 * @param {String} event - JS Event name
 * @param {Function} func - The function to be removed
 */
function eventReturn (el, event, func) {
  // noinspection JSUnusedGlobalSymbols
  return {
    element: el,
    type: event,
    function: func,
    stop () {
      el.removeEventListener(event, func)
    }
  }
}
