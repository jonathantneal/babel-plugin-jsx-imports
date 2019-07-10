import { pragmaDefault, pragmaFragDefault } from './lib/pragmaDefaults'
import getPragma from './lib/getPragma'
import initializer from './lib/initializer'

const initializerClone = initializer.bind(null)
const pluginExtensions = { getPragma, pragmaDefault, pragmaFragDefault }

const plugin = Object.assign(
	initializerClone,
	pluginExtensions
)

export default plugin
