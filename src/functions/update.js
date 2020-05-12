export default function (context, { html, css }) {
  if (context.isConnected) {
    var tempEl = document.createElement('template')
    const bodyString = html({ ...context.mj.instance }) || context.mj.bodyContent
    tempEl.innerHTML = bodyString
    const bodyFrag = document.createDocumentFragment()
    bodyFrag.appendChild(tempEl.content)

    const parsedCss = css({ ...context.mj.instance })
    if (parsedCss) {
      const cssTag = document.createElement('style')
      cssTag.setAttribute('id', `mj-style-${context.mj.id}`)
      cssTag.textContent = parsedCss
      bodyFrag.appendChild(cssTag)
    }
    while (context.firstChild) {
      context.removeChild(context.firstChild)
    }
    context.mj.body.appendChild(bodyFrag)
  }
}
