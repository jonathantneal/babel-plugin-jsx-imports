const getPragma = (pragma, pragmaDefault) => {
	// matches: `importName1 from moduleName`
	// matches: `importName1 as aliasName1 from moduleName`
	// matches: `{ importName2 } from moduleName`
	// matches: `{ importName2 as aliasName2 } from moduleName`
	const importMatch = /^\s*(?:([^\s]+)(?:\s+as\s+([^\s]+))?|\{\s*([^\s]+)(?:\s+as\s+([^\s]+))?\s*\})\s+from\s+(.*[^\s])\s*$/

	const isPragmaMatchable = typeof pragma === 'string' && importMatch.test(pragma)

	if (isPragmaMatchable) {
		const [, importName1, aliasName1, importName2, aliasName2, moduleName] = String(pragma).match(importMatch)

		const hasAlias = Boolean(aliasName1 || aliasName2)
		const isNamedImport = Boolean(aliasName1 || importName2)
		const aliasName = hasAlias ? aliasName1 || aliasName2 : importName1 || importName2
		const importName = isNamedImport ? importName1 || importName2 : 'default'

		return Object.assign(
			Object.create(null),
			pragmaDefault,
			{ importName, aliasName, moduleName }
		)
	} else {
		return Object.assign(
			Object.create(null),
			pragmaDefault,
			pragma
		)
	}
}

export default getPragma
