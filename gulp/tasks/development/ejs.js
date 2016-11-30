/*
 * Author: Princeraul 
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

import gulp from 'gulp';
import ejs from 'gulp-ejs';
import gutil from 'gulp-util';
import browser from 'browser-sync';
import config from '../../config';

const browserSync = browser.create();

gulp.task('build:ejs', () => {
	gulp.src(config.assets.views.src)
	.pipe(ejs().on('error', gutil.log))
	.pipe(gulp.dest(config.assets.views.dest))
	.pipe(browserSync.reload({stream: true}));
});