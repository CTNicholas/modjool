/* global Modjool */

Modjool.default({
  inherit: true
})

Modjool.create(['inner-simple', 'outer-simple'])

Modjool.create({
  tag: 'adv-one',
  html: ({ slot }) => `
    adv-one html here<br>
    slot: ${slot}<br><br>
  `,
  css: () => ':self { color: red; }',
  js: ({ self }) => { console.log(`adv-one running, ${self.id}`) }
}, {
  tag: 'adv-two',
  html: ({ slot }) => `
    adv-two html here<br>
    slot: ${slot}<br>
    <adv-one>SLOT adv-one in two SLOT</adv-one><br><br>
  `,
  css: () => ':self { color: blue; }',
  js: ({ self }) => { console.log(`adv-two running, ${self.id}`) }
}, {
  tag: 'adv-three',
  html: ({ slot }) => `adv-three html here<br>slot: ${slot}<br><br>`,
  css: () => ':self { color: blue; }',
  js: ({ self }) => { console.log(`adv-three running, ${self.id}`) }
})
