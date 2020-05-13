export default function (context, options) {
  return {
    get (el) {
      return context.mj.body.querySelector(el)
    },

    when (el, event, func) {
      const theEl = this.get(el)
      theEl.addEventListener(event, func)
      return eventReturn(theEl, event, func)
    },

    on (event, func) {
      context.mj.body.addEventListener(event, func)
      return eventReturn(context.mj.body, event, func)
    },

    array (list) {
      const rep = '{{@#MJ[]£=+}}'
      const arr = list.replace('/,', rep).split(',')
      for (const index in arr) {
        arr[index] = arr[index].replace(rep, ',')
      }
      return arr
    },

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

function eventReturn (el, event, func) {
  return {
    element: el,
    type: event,
    function: func,
    stop () {
      el.removeEventListener(event, func)
    }
  }
}
