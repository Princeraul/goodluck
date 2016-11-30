'use strict';

import webpack from 'webpack';
import config from './config';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IP = '0.0.0.0';
const PORT = '7777';

const PROJECT_PATH = config.business;
const ROOT_PATH = PROJECT_PATH.root;
const APP_PATH = path.resolve(__dirname, PROJECT_PATH.scripts.src);

module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: [
		'webpack-dev-server/client?http://' + IP + ':' + PORT,
		APP_PATH,
	],
	// output 输出文件夹 合并以后的js会命名为app.js
	output: {
		path: ROOT_PATH,
		filename: 'js/index.[hash].js',
	},
	// add pugins 添加插件0
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hello World app',
			filename: 'index.html',
			template: PROJECT_PATH.views.root + '/index.html',
			// chunks: ['index', 'vendors'],
			inject: true, //允许插件修改哪些内容，包括head与body
			hash: true, //为静态资源生成hash值
			minify: { //压缩HTML文件
				//移除HTML中的注释
				removeComments: true,
				//删除空白符与换行符
				collapseWhitespace: false
			}
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		// new webpack.optimize.UglifyJsPlugin({minimize: true}),
		// 引入插件
		new webpack.optimize.CommonsChunkPlugin('common.js')
	],
	// loader
	module: {
		loaders: [{
			test: /\.scss$/,
			loaders: ["style", "css?sourceMap", "sass?sourceMap"]
		}, {
			test: /\.(jpg|png)$/,
			loader: "url?limit=8192",
		}, {
			test: /\.jsx?$/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}],
		perLoaders: [{
			test: /\.jsx?$/,
			include: APP_PATH,
			loader: 'jshint-loader'
		}],
	},
	// webpack-dev-server
	devServer: {
		contentBase: APP_PATH,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: PORT
	},
	// 添加source
	devtool: PROJECT_PATH.dev ? 'source-map' : false,
	jshint: {
		'esnext': true
	},
	resolve: {
		// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
		extensions: ['', '.js', '.json', '.coffee', '.css', '.scss', '.sass']
	}
};
