export default function (func) {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    return func()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      return func()
    })
  }
}
