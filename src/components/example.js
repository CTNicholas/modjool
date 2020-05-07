// import Modjool from '../modjool.js'

console.log(Modjool)

const obj = {
  name: 'title-header',

  js: () => {
    console.log('Running!')
  },

  html: ({ attr }) => `
    <h1>${attr.title}</h1>
    
    ${attr.subtitle ? `
    <h3>${attr.subtitle}</h3>
    ` : ''}
  `,

  css: ({ attr }) => `
    h1 {
      font-size: ${12 * attr.size}px;
      font-weight: bold;
    }
    h3 {
      font-size: ${8 * attr.size}px;
      font-style: italic;
    }
  `
}

// const test = new Modjool(obj)

Modjool.create(obj)
