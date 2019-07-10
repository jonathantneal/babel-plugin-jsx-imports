import { pragmaDefault, pragmaFragDefault } from './pragmaDefaults'
import getJsxImportsTransformer from './getJsxImportsTransformer'
import getPragma from './getPragma'

const initializer = (api, opt) => {
	opt = Object.assign(Object.create(null), opt)

	opt.pragma = getPragma(opt.pragma, pragmaDefault)
	opt.pragmaFrag = getPragma(opt.pragmaFrag, pragmaFragDefault)

	const transformer = getJsxImportsTransformer(api.types, opt)

	return transformer
}

export default initializer
