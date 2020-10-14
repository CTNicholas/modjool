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
  html: () => '',
  css: () => '',
  js: undefined,
  enter: undefined,
  ready: undefined,
  leave: undefined
}
