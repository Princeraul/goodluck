/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

import gulp from 'gulp';
import imageminPng from 'imagemin-pngquant';
import spritesmith  from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../../config';

const $ = gulpLoadPlugins();

gulp.task("sprite:watch", () => {
	let spriteData = gulp.src(config.assets.images.sprite)
	.pipe(spritesmith({
	    imgName: '../images/sprite.png',
	    cssName: '_sprite.scss',
		padding: 20,
	    cssFormat: 'scss',
		cssOpts: {
	        cssClass: function (item) {
			  // 备注这个不支持scss扩展 支持css
	          // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
	          if (item.name.indexOf('-hover') !== -1) {
	            return '.icon-' + item.name.replace('-hover', ':hover');
	            // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
	          } else {
	            return '.icon-' + item.name;
	          }
	        }
      },
	}));

	let imgStream = spriteData.img
		.pipe(buffer())
		// 压缩sprite
		.pipe($.cache($.imagemin(
			[imageminPng()],
			{verbose: true}
		)))
		// 生成img output 目录地址
		.pipe(gulp.dest(config.assets.images.dest));

	let cssStream = spriteData.css
		// 生成scss output 目录地址
		.pipe(gulp.dest(config.assets.images.spriteScssDest));
	return merge(imgStream, cssStream);
});
