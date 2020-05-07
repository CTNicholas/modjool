/* global Modjool */
Modjool({
  options: () => ({
    name: 'title-header',
    inherit: true
  }),

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
})
