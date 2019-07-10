# babel-plugin-jsx-imports [<img src="https://jonneal.dev/node-logo.svg" alt="Babel" width="90" height="90" align="right">][Babel]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[babel-plugin-jsx-imports] is a [Babel] plugin that automatically adds the
necessary imports when a file contains JSX.

```json
{
  "plugins": [
    "@babel/plugin-transform-react-jsx",
    "babel-plugin-jsx-imports"
  ]
}
```

```jsx
<>Hello World</>

/* becomes */

import React from "react"

React.createElement(React.Fragment, null, "Hello World")
```

**babel-plugin-jsx-imports** also lets you configure specific imports.

```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "createElement",
      "pragmaFrag": "Fragment"
    }],
    ["babel-plugin-jsx-imports", {
      "pragma": "{ createElement } from react",
      "pragmaFrag": "{ Fragment } from react"
    }]
  ]
}
```

```jsx
<>Hello World</>

/* becomes */

import { createElement, Fragment } from "react"

createElement(Fragment, null, "Hello World")
```

**babel-plugin-jsx-imports** also works well with [Preact].

```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h",
      "pragmaFrag": "Fragment"
    }],
    ["babel-plugin-jsx-imports", {
      "pragma": "{ h } from preact",
      "pragmaFrag": "{ Fragment } from preact"
    }]
  ]
}
```

```jsx
<>Hello World</>

/* becomes */

import { h, Fragment } from "preact"

h(Fragment, null, "Hello World")
```

## Usage

Add [babel-plugin-jsx-imports] to your project:

```bash
npm install babel-plugin-jsx-imports --save-dev
```

Add [babel-plugin-jsx-imports] to your Babel configuration:

```js
// babel.config.js
module.exports = {
  plugins: [
    'babel-plugin-jsx-imports'
  ]
}
```

Alternatively, configure transformations within your Babel configuration:

```js
module.exports = {
  plugins: [
    ['babel-plugin-jsx-imports', {
      /* name the pragma import */
      pragma: '{ createElement } from react',

      /* name the pragma fragment import */
      pragmaFrag: '{ Fragment } from react'
    }]
  ]
}
```

## Options

### pragma

The `pragma` option defines how the `createElement` function is imported.

```js
{
  pragma: 'React from react',
  pragma: '{ createElement } from react',
  pragma: '{ createElement as h } from react'
}
```

### pragmaFrag

The `pragmaFrag` option defines how the `Fragment` object is imported.

```js
{
  pragmaFrag: 'React from react',
  pragmaFrag: '{ Fragment } from react',
  pragmaFrag: '{ Fragment as F } from react'
}
```

[cli-img]: https://img.shields.io/travis/jonathantneal/babel-plugin-jsx-imports.svg
[cli-url]: https://travis-ci.org/jonathantneal/babel-plugin-jsx-imports
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/babel-plugin-jsx-imports.svg
[npm-url]: https://www.npmjs.com/package/babel-plugin-jsx-imports

[Babel]: https://babeljs.io/
[babel-plugin-jsx-imports]: https://github.com/jonathantneal/babel-plugin-jsx-imports
[Preact]: https://github.com/preactjs/preact
