/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../../config';

let $ = gulpLoadPlugins();

gulp.task('build:scripts', () => {
	gulp.src(config.assets.scripts.src)
	.pipe($.sourcemaps.init())
	.pipe($.rename({suffix: '.min'}))
	.pipe($.uglify())
	.on('error', console.error.bind(console))
	.pipe($.sourcemaps.write('.'))
	.pipe(gulp.dest(config.assets.scripts.dest));
});
