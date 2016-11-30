/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

import gulp from 'gulp';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'gulp-cssnano';
import browser from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../../config';

const $ = gulpLoadPlugins();
const browserSync = browser.create();
const processors = [
	autoprefixer(config.assets.styles.options.autoprefixer)
];

gulp.task('build:styles', () => {
	browserSync.notify('Transforming CSS with PostCSS');

	gulp.src(config.assets.styles.src)
	.pipe($.sourcemaps.init())
	.pipe($.sass().on('error', $.sass.logError))
	.pipe(postcss(processors))
	.pipe(gulp.dest(config.assets.styles.dest))
	.pipe(cssnano())
	.pipe($.rename({suffix: '.min'}))
	.pipe($.sourcemaps.write('./'))
	.pipe(gulp.dest(config.assets.styles.dest))
	.pipe($.if(config.assets.dev, gulp.dest(config.assets.fonts.releaseBuild)))
	.pipe($.filter('**/*.css'))
	.pipe(browserSync.reload({stream: true}));
});
