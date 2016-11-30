'use strict';

import BASEDIR from './basedir';

export default {
	host: '127.0.0.1',
	port: '7777',
	business: {
		root: BASEDIR.BSN.ROOT,
        // 默认和build一致 有静态资源服务器和cdn修改
		publicPath: '/build/js',
		views: {
			root: BASEDIR.BSN.SRC + '/views'
		},
		scripts: {
			src: BASEDIR.BSN.SRC + '/scripts/index.js',
			dest: BASEDIR.BSN.DEVELOPBUILD + '/js'
		},
	},
    demo: {
        root: './app/demo/src',
        views: {
            root: './app/demo/src/views'
        },
        images: {
            src: './app/demo/src/images',
        },
        scripts: {
			src: './app/demo/src/scripts/index.js'
		}
    }
};
