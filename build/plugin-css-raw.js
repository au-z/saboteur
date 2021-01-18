const fs = require('fs').promises
const postcss = require('postcss')
const postcssEasyImport = require('postcss-easy-import')
const cssnano = require('cssnano')({preset: 'default'})
const execa = require('execa')

module.exports = function plugin(snowpackConfig, options = {}) {
	return {
		name: 'plugin-css-raw',
		resolve: {
			input: ['.css'],
			output: ['.js'],
		},
		async load({filePath}) {
			const input = await fs.readFile(filePath, {encoding: 'utf-8'})

			const {config} = options
			const flags = []
			if(config) flags.push(`--config ${config}`)

			const {stdout} = await execa('postcss', flags, {
				cwd: snowpackConfig.root || process.cwd(),
				input,
			})

			if(stdout) return {
				'.js': {code: `export default ${JSON.stringify(stdout)}`},
			}
		},
	}
}