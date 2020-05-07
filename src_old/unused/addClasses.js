/*
    addClasses (code) {
      const classRegex = /<[\s]*([A-Za-z0-9_:]*[\\.#]{1}[^\s><]+)/g
      const classArray = []
      let classes = classRegex.exec(code)
      while (classes != null) {
        classArray.push(classes[1])
        classes = classRegex.exec(code)
      }
      console.log(classArray)
      for (let cla of classArray) {
        cla = cla.split(/([\\.#])/)
        const classObj = {}
        classObj.
      }
      console.log(classArray[1].split(/([\\.#])/))
    }
    */
