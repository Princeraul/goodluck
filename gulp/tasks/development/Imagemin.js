/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

import gulp from 'gulp';
import imageminPng from 'imagemin-pngquant';
import imageminGif from 'imagemin-gifsicle';
import imageminJpg from 'imagemin-jpeg-recompress';
import imageminSvgo from 'imagemin-svgo';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../../config';

const $ = gulpLoadPlugins();

gulp.task('imagemin:watch', () => {
    return gulp.src(config.assets.images.src)
    .pipe($.cache($.imagemin(
        [imageminPng(),
        imageminJpg(),
        imageminGif(),
        imageminSvgo()],
        {verbose: true}
    )))
    .on('error', console.error.bind(console))
	.pipe(gulp.dest(config.assets.images.dest))
    .pipe($.if(config.assets.dev, gulp.dest(config.assets.fonts.releaseBuild)));
});
