/* global Modjool */
Modjool({
  options: () => ({
    name: 'simplest-el'
  }),

  html: () => `
    TEST<slot></slot>
  `,

  css: ({ mj }) => `
    ${mj.select} {
      color: red;
    } 
  `
})
