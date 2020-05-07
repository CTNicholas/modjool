export default function (self, { html }) {
  if (self.isConnected) {
    if (html) {
      self.getBody().innerHTML = html({
        ...self.getDefaultArgs(),
        slot: self.mj_slots
        /* {
          doThing: () => {
            function a () {
              console.log('working')
            }
            const fname = 'doThing'
            console.log('fname', fname, self.getGlobalObject(), self.getGlobalObject(true))
            self.getGlobalObject()[fname] = a
            return `${self.getGlobalObject(true)}.${fname}()`
          }
        } */
      })
    } else {
      self.getBody().innerHTML = self.mj_initial
    }

    self.createStyleTag()
  }
}
