/**
 * Default options object for modjool.create()
 */
export default {
  tag: 'no-name',
  attr: [],
  shadowDom: false,
  modjoolId: true,
  scopedCss: true,
  unhide: false,
  reactive: true,
  enter: undefined,
  ready: undefined,
  js: undefined,
  complete: undefined,
  leave: undefined,
  html: () => '',
  css: () => '',
}
