const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
	mode: 'none',
	entry: ['./tests/suite.js'],
	output: {
		filename: 'test-suite.js',
		path: path.resolve(__dirname, 'dist')
	},
	target: 'node',
	externals: [nodeExternals()],
	resolve: {
		fallback: {
			fs: 'empty'
		}
	},
	/*plugins: [
		new WebpackShellPlugin({
			onBuildExit: "./node_modules/mocha/bin/mocha dist/testSuite.js"
		})
	],*/
	module: {
		rules: [
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: 'style-loader', // inject CSS to page
					}, {
						loader: 'css-loader', // translates CSS into CommonJS modules
					}, {
						loader: 'sass-loader' // compiles Sass to CSS
					}
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
				  {
					loader: 'file-loader',
					options: {
					  name: '[name].[ext]',
					  outputPath: 'fonts/'
					}
				  }
				]
			}
		]
	}
}