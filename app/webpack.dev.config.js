const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MyPlugin = require('./src/server/custom-webpack/cat-plugin')
module.exports = {
	entry: {
		main: [
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			'./src/index.js',
		],
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js',
	},
	mode: 'development',
	target: 'web',
	devtool: '#source-map',
	resolveLoader: {
		alias: {
		  'cat-loader': path.resolve(__dirname, './src/server/custom-webpack/cat-loader.js')
		},
	 },
	module: {
		rules: [
			{
				test: /\.cat?$/,
				exclude: /node_modules/,
				include: __dirname + '/',
				enforce: "pre",
				use: [{
					loader: 'cat-loader',
					options: { context: __dirname + '/src' }
				}, {
					loader: 'babel-loader',
				}
				]
			
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				// Loads the javacript into html template provided.
				// Entry point is set below in HtmlWebPackPlugin in Plugins
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						//options: { minimize: true }
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader', // creates style nodes from JS strings
					'css-loader', // translates CSS into CommonJS
					'sass-loader', // compiles Sass to CSS, using Node Sass by default
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			}
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/html/index.html',
			filename: './index.html',
			excludeChunks: ['server'],
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new MyPlugin('src')


	],
}
