/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../../config';

const $ = gulpLoadPlugins();

gulp.task('fonts', () => {
	gulp.src(config.assets.fonts.src)
	.pipe(gulp.dest(config.assets.fonts.dest))
	.pipe($.if(config.assets.dev, gulp.dest(config.assets.fonts.releaseBuild)));
});
