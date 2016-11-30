/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

import gulp from 'gulp';
import browser from 'browser-sync';
import config from '../../config';

const browserSync = browser.create();

gulp.task('browsersync:development', () => {
	let files = [
		config.assets.views.dest + '/css/*.css',
        config.assets.views.dest + '/js/*.js',
        config.assets.views.dest + '/images/**',
        config.assets.views.dest + '/*.html',
        config.assets.views.dest + '/fonts/*'
	];

	browserSync.init(files, {
		server: {
			baseDir: './',
			directory: true
		},
		open: false,
		port: 7777,
		// 展示整个app目录，需要注释startpath生效
		startPath: config.assets.views.dest + 'index.html'
	});
});
