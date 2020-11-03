/**
 * Runs func when the entire DOM has loaded
 * @param {Function} func - The function to be run
 */
export default function (func) {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    func()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      func()
    })
  }
}
