/**
 * ts前端工程研究
 *
 * @author wujohns
 * @date 17/10/20
 */
'use strict';

const _ = require('lodash');
const async = require('async');
const del = require('del');
const gulp = require('gulp');
const webpack2b = require('webpack-2b');

const BBConfig = require('./bbconfig');

// 基础包编译配置
const baseLibsPackConfig = {
    libs: [
        { src: 'lodash', expose: 'lodash' },
        { src: 'async', expose: 'async' },
        { src: 'react', expose: 'react' },
        { src: 'react-dom', expose: 'react-dom' }
    ],
    savePath: './dist/libs/base_libs.js'
};
const baseLibsExternals = webpack2b.getExternals(baseLibsPackConfig);

// 页面编译配置
const pagesPackConfig = {
    pages: [
        { name: 'index', src: ['./src/index.tsx'] }
    ],
    destDir: './dist/pages',
    externals: baseLibsExternals
};

gulp.task('libs', (callback) => {
    const webpackConfig = BBConfig.baseLibs({
        uglify: false,
        sourceMap: true
    });
    webpack2b.libsPack(baseLibsPackConfig, webpackConfig, callback);
});

// TODO 解决 ts 编译时的缓存
gulp.task('pages', (callback) => {
    const webpackConfig = BBConfig.cusPages({
        uglify: false,
        sourceMap: true
    });
    webpack2b.pagesPack(pagesPackConfig, webpackConfig, callback);
});

gulp.task('dev', ['libs', 'pages']);