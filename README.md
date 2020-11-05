<!--suppress ALL -->
<h1 align="center" style="text-align:center">
  <span></span>
  <a href="https://modjool.js.org"><img alt="modjool - custom elements  & web components" src="https://modjool-docs.vercel.app/images/mj_logo.png" align="center"></a>
  <br/>
</h1>

<div align="center" style="text-align:center">
[![npm](https://img.shields.io/npm/v/modjool?style=flat-square)](https://www.npmjs.com/package/modjool) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/modjool?color=%2346C018&label=minzip&style=flat-square)](https://bundlephobia.com/result?p=modjool@latest) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) [![NPM](https://img.shields.io/npm/l/modjool?color=%2346C018&style=flat-square)](https://www.npmjs.com/package/modjool) <!--[![GitHub last commit](https://img.shields.io/github/last-commit/CTNicholas/modjool?color=%2346C018&style=flat-square)](https://github.com/CTNicholas/modjool/)-->
</div>

# [Documentation](https://modjool.js.org)
Full guide & documentation available at the [Modjool Docs](https://modjool.js.org) website.

# Introduction
 Modjool is a lightweight JavaScript framework for creating user interface libraries
 and simple web components. It's ideal for creating UI libraries and simple reusable components, by
 allowing for easy creation of native custom elements.
 


   
## Overview of features

* **Simplicity** - simplify away classes, styling, multiple HTML tags, into one custom element
* **HTML templates** - use attributes, slots, dynamic content & more
* **CSS templates** - with scoped CSS, and all the above
* **Lifecycle events** - run JS at different points in an element's lifecycle
* **Reactive data** - body updates when the data changes
* **Pairs up** - combine with CSS libraries, such as Tailwind, Bulma, Bootstrap
 
 
## Code example
```javascript
modjool.create({
  tag: 'like-button',

  js: ({ attr, elem }) => {
    elem.onclick = () => attr.likes++    
  },

  html: ({ attr, slot }) => `
    <button>
      ${slot} • <b>${attr.likes}</b>
    </button>
  `
})
```

 ```html
<like-button likes="641">Like me!</like-button>
```

Try `<like-button>` on CodeSandbox:

[![Edit Modjool <like-button>](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/modjool-like-button-6gfyo?fontsize=14&hidenavigation=1&theme=dark&file=/like-button.js)

## Read more
[Guide](https://modjool.js.org/docs) and [API](https://modjool.js.org/api) available at the [Modjool Docs](https://modjool.js.org) website.
