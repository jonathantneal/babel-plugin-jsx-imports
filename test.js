const babel = require('@babel/core')
const babelPluginTransformReactJsx = require('@babel/plugin-transform-react-jsx')
const babelPluginJsxImports = require('.')

function test (name, sourceCode, expectCode, options, jsxOptions, errorMessage) {
	/* eslint-disable no-console */

	console.log(name)

	let resultCode

	try {
		resultCode = babel.transformSync(sourceCode, {
			plugins: [
				[ babelPluginJsxImports, options ],
				[ babelPluginTransformReactJsx, jsxOptions ],
			]
		}).code
	} catch (error) {
		if (error.message === errorMessage) {
			console.log('  PASSED')

			return
		} else {
			console.log('  FAILED')
			console.log('Expected error:', JSON.stringify(errorMessage))
			console.log('Recieved error:', JSON.stringify(error.message))
			console.log({ errorMessage })

			process.exit(1)
		}
	}

	if (expectCode === resultCode) {
		console.log('  PASSED')
	} else {
		console.log('  FAILED')
		console.log('Expected:', JSON.stringify(expectCode))
		console.log('Recieved:', JSON.stringify(resultCode))

		process.exit(1)
	}
}

test(
	'babel-plugin-jsx-imports: no jsx',
	`"Hello World";`,
	`"Hello World";`
)

test(
	'babel-plugin-jsx-imports: jsx element',
	`<h1>Hello World</h1>;`,
	`import React from "react";\nReact.createElement("h1", null, "Hello World");`
)

test(
	'babel-plugin-jsx-imports: jsx fragment',
	`<>Hello World</>;`,
	`import React from "react";\nReact.createElement(React.Fragment, null, "Hello World");`
)

test(
	'babel-plugin-jsx-imports: jsx element with specific imports',
	`<h1>Hello World</h1>;`,
	`import { createElement } from "react";\ncreateElement("h1", null, "Hello World");`,
	{ pragma: '{ createElement } from react', pragmaFrag: '{ Fragment } from react' },
	{ pragma: 'createElement', pragmaFrag: 'Fragment' },
)

test(
	'babel-plugin-jsx-imports: jsx fragment with specific imports',
	`<>Hello World</>;`,
	`import { createElement, Fragment } from "react";\ncreateElement(Fragment, null, "Hello World");`,
	{ pragma: '{ createElement } from react', pragmaFrag: '{ Fragment } from react' },
	{ pragma: 'createElement', pragmaFrag: 'Fragment' },
)

test(
	'babel-plugin-jsx-imports: jsx element and fragment with specific imports',
	`<><h1>Hello World</h1></>;`,
	`import { createElement, Fragment } from "react";\ncreateElement(Fragment, null, createElement("h1", null, "Hello World"));`,
	{ pragma: '{ createElement } from react', pragmaFrag: '{ Fragment } from react' },
	{ pragma: 'createElement', pragmaFrag: 'Fragment' },
)

test(
	'babel-plugin-jsx-imports: jsx fragment with specific preact imports',
	`<>Hello World</>;`,
	`import { h, Fragment } from "preact";\nh(Fragment, null, "Hello World");`,
	{
		pragma: '{ h } from preact',
		pragmaFrag: '{ Fragment } from preact'
	},
	{ pragma: 'h', pragmaFrag: 'Fragment' }
)

!function (name) {
	console.log(name)

	try {
		const pragmaTest1 = babelPluginJsxImports.getPragma(undefined, babelPluginJsxImports.pragmaDefault)

		if (
			pragmaTest1.importName !== 'default' ||
			pragmaTest1.aliasName !== 'React' ||
			pragmaTest1.moduleName !== 'react'
		) {
			throw new Error('getPragma is not working correctly')
		}

		const pragmaTest2 = babelPluginJsxImports.getPragma('{ createElement } from react', babelPluginJsxImports.pragmaDefault)

		if (
			pragmaTest2.importName !== 'createElement' ||
			pragmaTest2.aliasName !== 'createElement' ||
			pragmaTest2.moduleName !== 'react'
		) {
			throw new Error('getPragma is not working correctly')
		}

		console.log('  PASSED')
	} catch (error) {
		process.exit(1)
	}
}(
	'babel-plugin-jsx-imports: extensions are working'
)

process.exit(0)
