export default function (context, { html, css }) {
  if (context.isConnected) {
    updateBody()
    updateStyle()
  }

  function updateStyle () {
    let styleTag = context.mj.body.querySelector(context.mj.instance.self.select)
    if (!styleTag) {
      styleTag = createStyleTag()
    }
    if (css) {
      styleTag.textContent = css({ ...context.mj.instance })
    }
  }

  function updateBody () {
    if (html) {
      context.mj.body.innerHTML = html({ ...context.mj.instance })
    } else {
      context.mj.body.innerHTML = context.mj.bodyContent
    }
  }

  function createStyleTag () {
    const cssTag = document.createElement('style')
    cssTag.setAttribute('id', `mj-style-${context.mj.id}`)
    return context.mj.body.appendChild(cssTag)
  }
}
