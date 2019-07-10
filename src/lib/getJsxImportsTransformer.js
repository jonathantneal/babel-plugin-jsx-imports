const getJsxImportsTransformer = (t, opt) => {
	const transformer = {
		name: 'jsx-imports',
		visitor: {
			JSXElement: {
				enter (path, { file }) {
					file.set('hasJsxElement', true)
				}
			},
			JSXFragment: {
				enter (path, { file }) {
					file.set('hasJsxElement', true)
					file.set('hasJsxFragment', true)
				}
			},
			Program: {
				exit (path, { file }) {
					const importSpecifiersByModuleName = Object.create(null)

					if (file.get('hasJsxElement')) {
						const isAliasAlreadyBound = path.scope.hasBinding(opt.pragma.aliasName)

						if (!isAliasAlreadyBound) {
							importSpecifiersByModuleName[opt.pragma.moduleName] = importSpecifiersByModuleName[opt.pragma.moduleName] || []

							const isImportNameDefault = opt.pragma.importName === 'default'

							importSpecifiersByModuleName[opt.pragma.moduleName].push(
								isImportNameDefault
									? t.importDefaultSpecifier(
										t.identifier(opt.pragma.aliasName)
									)
								: t.importSpecifier(
									t.identifier(opt.pragma.aliasName),
									t.identifier(opt.pragma.importName)
								)
							)
						}
					}

					if (file.get('hasJsxFragment')) {
						const isAliasAlreadyBound = path.scope.hasBinding(opt.pragmaFrag.aliasName)

						if (!isAliasAlreadyBound) {
							importSpecifiersByModuleName[opt.pragmaFrag.moduleName] = importSpecifiersByModuleName[opt.pragmaFrag.moduleName] || []

							const isImportNameDefault = opt.pragmaFrag.importName === 'default'

							importSpecifiersByModuleName[opt.pragmaFrag.moduleName].push(
								isImportNameDefault
									? t.importDefaultSpecifier(
										t.identifier(opt.pragmaFrag.aliasName)
									)
								: t.importSpecifier(
									t.identifier(opt.pragmaFrag.aliasName),
									t.identifier(opt.pragmaFrag.importName)
								)
							)
						}
					}

					Object.keys(importSpecifiersByModuleName).forEach(
						moduleName => {
							let hasDefaultSpecifier = false

							const specifiers = importSpecifiersByModuleName[moduleName].filter(
								specifier => {
									const isDefaultSpecifier = specifier.type === 'ImportDefaultSpecifier'

									if (hasDefaultSpecifier && isDefaultSpecifier) {
										return false
									}

									hasDefaultSpecifier = hasDefaultSpecifier || isDefaultSpecifier

									return true
								}
							)

							path.unshiftContainer(
								'body',
								t.importDeclaration(
									specifiers,
									t.stringLiteral(moduleName)
								)
							)
						}
					)
				}
			}
		}
	}

	return transformer
}

export default getJsxImportsTransformer
