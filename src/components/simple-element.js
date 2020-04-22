/* global Modjool */
Modjool({
  options: () => ({
    name: 'title-header',
    inherit: true
  }),

  html: ({ TITLE, SUBTITLE }) => `
    <h1>${TITLE}</h1>
    ${SUBTITLE ? `
      <h3>${SUBTITLE}</h3>` : ''
    }
  `,

  css: ({ SIZE }) => `
    h1 {
      font-size: ${12 * SIZE}px;
      font-weight: bold;
    }
    h3 {
      font-size: ${8 * SIZE}px;
      font-style: italic;
    }
  `,

  css2: ({ SIZE, mj }) => `
    ${mj.select} {
      --size: ${SIZE};
    }
    h1 {
      font-size: calc(12px * var(--size));
      font-weight: bold;
    }
    h3 {
      font-size: calc(8px * var(--size));
      font-style: italic;
    }
  `
})
