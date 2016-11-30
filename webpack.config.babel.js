'use strict';

// import webpack form 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import config from './webpack/config';

export default{
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: [
		config.APP_PATH
	],
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		publicPath: '/build/js',
	    path: config.APP_BUILD,
	    filename: 'bundle.js'
	},
	//添加我们的插件 会自动生成一个html文件
	plugins: [
		  new HtmlwebpackPlugin({
			filename: '../index.html',
			title: 'Hello World app',
		  })
	],
	devServer: {
		contentBase: config.APP_ROOT + '/build',
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
	},
	module: {
		loaders: [
            { test: /\.css$/, loader: "style!css" },
			// { test: /\.(jpg|png)$/, loader: "url?limit=8192"},
			{ test: /\.scss$/, loader: "style!css!sass"},
        ]
	}
};
