/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

import gulp from 'gulp';
import browser from 'browser-sync';
import config from '../../config';

const browserSync = browser.create();

gulp.task('build:watch', () => {
	console.log('thank you use gulp-generator of Princeraul');
	gulp.watch(config.assets.styles.src, ['build:styles']);
	gulp.watch(config.assets.scripts.src, ['build:scripts']);
	gulp.watch(config.assets.views.src, ['build:ejs']).on('change', browserSync.reload);
	gulp.watch(config.assets.images.sprite, ['sprite:watch']);
	gulp.watch(config.assets.images.src, ['imagemin:watch']);
});
