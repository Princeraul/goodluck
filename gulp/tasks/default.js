/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';
import gulp from 'gulp';

/**
 * Run task browsersync:development
 */
gulp.task('default', [
	'browsersync:development',
	'fonts',
	'imagemin:watch',
	'sprite:watch',
	'build:watch'
]);
