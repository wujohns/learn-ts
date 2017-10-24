/**
 * webpack 的配置相关
 *
 * @author wujohns
 * @data 17/10/23
 */
'use strict';

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lessPluginAutoPrefix = require('less-plugin-autoprefix');

class BBConfig {
    /**
     * 基础包打包配置
     * @param {Object} config - 简化配置
     * @param {Boolean} config.uglify - 是否压缩
     * @param {Boolean} config.sourceMap - 是否启用 sourceMap
     * @returns {Object} - 相应的 webpack 配置
     */
    static baseLibs (config) {
        const plugins = [];
        if (config.uglify) {
            plugins.push(new UglifyJsPlugin());
        }
        const webpackConfig = {
            module: {},
            plugins: plugins
        };
        if (!!config.sourceMap) {
            webpackConfig.devtool = 'inline-source-map';
        }
        return webpackConfig;
    }

    /**
     * 自定义页面打包配置
     * @param {Object} config - 简化配置
     * @param {Boolean} - config.uglify - 是否压缩
     * @param {Boolean} - config.sourceMap - 是否使用sourceMap
     * @param {String} - config.cacheDir - 缓存目录
     * @returns {Object} - 相应的 webpack 配置
     */
    static cusPages (config) {
        const plugins = [new ExtractTextPlugin('[name].css')];
        if (config.uglify) {
            plugins.push(new UglifyJsPlugin());
        }
        const tsRule = {
            test: /\.tsx?$/,
            loader: 'ts-loader'
        };
        const lessRule = {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            sourceMap: !!config.sourceMap,
                            namedExport: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: !!config.sourceMap,
                            modifyVars: {
                                site_static_host: ''
                            },
                            plugins: [
                                new lessPluginAutoPrefix({ cascade: true, browsers: ["last 5 versions"] })
                            ]
                        }
                    }
                ]
            })
        };
        const webpackConfig = {
            module: {
                rules: [tsRule, lessRule]
            },
            plugins: plugins
        };
        if (!!config.sourceMap) {
            webpackConfig.devtool = 'inline-source-map';
        }
        return webpackConfig;
    }
}

module.exports = BBConfig;