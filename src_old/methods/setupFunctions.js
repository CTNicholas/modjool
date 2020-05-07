export default function (self, { functions }) {
  self.mj_functions = {}
  self.mj_functionsNames = {}
  if (functions) {
    const funcs = functions ? functions() : {}
    console.log('funcssss', funcs)
    for (const [name, func] of Object.entries(funcs)) {
      class CustomFunc extends Function {
        toString () {
          return `${self.getGlobalObject(true)}.${name}()`
        }
      }
      const newFunc = new CustomFunc(func)
      console.log('afunc', name, func, newFunc)
      func()
      console.log('but am i')
      newFunc()
      self.getGlobalObject()[name] = newFunc
      self.mj_functions[name] = newFunc
      self.mj_functionsNames[name] = `${self.getGlobalObject(true)}.${name}()`
      console.log(self.mj_functions)
    }
  }
}
