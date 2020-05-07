/* global Modjool */
Modjool({
  name: 'gz-h1',
  html: ({ slot }) => `
    <h1>${slot}</h1>
  `,
  css: ({ self }) => `
    ${self.select} {
      font-size: var(--gz-h1-font-size);
    }
  `
}, {
  name: 'gz-s1',
  html: ({ slot }) => `
    <div>${slot}</div>
  `,
  css: ({ self }) => `
    ${self.select} {
      font-size: var(--gz-s1-font-size);
      color: var(--gz-color-light)
    }
  `
}, {
  name: 'gz-head',
  html: ({ attr }) => `
    <gz-h1>${attr.title}</gz-h1>
    <gz-s1>${attr.subtitle}</gz-s1>
  `
})
