const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './server/index.js',

	target: 'node',

	externals: [nodeExternals()],

	output: {
		path: path.resolve('server-build'),
		filename: 'index.js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		modules: [path.resolve(__dirname, './src'), 'node_modules'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: 'ts-loader',
					options: {
						compilerOptions: {
							"noEmit": false
						}
					},
				}],
			},
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'isomorphic-style-loader',
					// Translates CSS into CommonJS
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
						}
					},
					// Compiles Sass to CSS
					'sass-loader',
				],
				include: /\.module\.s[ac]ss$/
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'isomorphic-style-loader',
					// Translates CSS into CommonJS
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					// Compiles Sass to CSS
					'sass-loader',
				],
				exclude: /\.module\.s[ac]ss$/
			},
		]
	}
};