export default function (self, { css }) {
  if (self.isConnected && css) {
    console.log('style connected')
    const cssContent = css({ ...self.getDefaultArgs() })
    let hasClasses = false
    if (cssContent.trim().includes('classes:')) {
      hasClasses = true
    }
    console.log('Has classes?', hasClasses)
    self.getBody().querySelector('style').textContent = cssContent
    self.mj_lastStyle = cssContent
  }
}
