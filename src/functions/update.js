// import createElement from './createElement.js'

export default function (context, { html, css }) {
  if (context.isConnected) {
    updateBody()
    updateStyle()
  }

  function updateStyle () {
    const parsedCss = css({ ...context.mj.instance })
    if (parsedCss) {
      let styleTag = context.mj.body.querySelector(context.mj.instance.self.select)
      if (!styleTag) {
        styleTag = createStyleTag()
      }
      styleTag.textContent = parsedCss
    }
  }

  function updateBody () {
    const parsedHtml = html({ ...context.mj.instance })
    if (parsedHtml) {
      context.mj.body.innerHTML = parsedHtml
    } else {
      context.mj.body.innerHTML = context.mj.bodyContent
      console.log('no html')
    }
  }

  function createStyleTag () {
    const cssTag = document.createElement('style')
    cssTag.setAttribute('id', `mj-style-${context.mj.id}`)
    return context.mj.body.appendChild(cssTag)
  }
}
