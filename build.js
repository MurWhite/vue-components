/**
 * Created by BaiBai on 2017/2/6.
 */
require('shelljs/global');
var path = require('path');
var webpack = require('webpack');

var PATHS = require('./config/paths');
var webpackConfig = require('./webpack.config');

var assetsPath = PATHS.distDir;
rm('-rf', assetsPath);
mkdir('-p', assetsPath);

webpack(webpackConfig, function (err,stats) {
    if (err) throw err;
    console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: true,
        chunkModules: false
    }));
});
