'use strict';

import options from './options/seting';

const assets = options.business;

export default {
    APP_ROOT: assets.root,
    APP_PATH: assets.scripts.src,
    APP_PUBLIC_PATH: assets.publicPath,
    APP_BUILD: assets.scripts.dest
};
