/**
 * module bundler with simple configure
 */
'use strict';

const packageConfig = {
    // 基础说明配置
    name: 'ts',
    version: '0.0.1',
    author: 'wujohns',
    description: 'ts test',
    license: 'MIT',

    /**
     * scripts
     */
    scripts: {
        // test: './node_modules/mocha/bin/mocha ./test/build.test.js'
    },

    engine: {
        node: '>=4.0.0'
    },

    dependencies: {
        // 基础包
        '@types/node': '^8.0.46',
        '@types/lodash': '^4.14.78',
        '@types/async': '^2.0.44',
        '@types/react': '^16.0.18',
        '@types/react-dom': '^16.0.2',
        'lodash': '^4.17.4',
        'async': '^2.5.0',
        'react': '^16.0.0',
        'react-dom': '^16.0.0'
    },

    devDependencies: {
        'webpack-2b': '^2.0.2',
        'gulp': '~3.9.1',
        'del': '^3.0.0',

        // typescript 依赖的包
        'typescript': '^2.5.3',
        'ts-loader': '^3.0.3',

        // less 编译依赖的包（css）
        'less': '^3.0.0-alpha.3',
        'style-loader': '^0.19.0',
        'css-loader': '^0.28.7',
        'less-loader': '^4.0.5',
        'less-plugin-autoprefix': '^1.5.1',
        'extract-text-webpack-plugin': '^3.0.1',

        // 其他loader（json、image）
        'json-loader': '^0.5.7'
    }
};

const fs = require('fs');
const path = require('path');
const targetFile = path.join(__dirname, '../package.json');
fs.writeFileSync(targetFile, JSON.stringify(packageConfig, null, 2), {
    encoding: 'utf8',
    flags: 'w',
    mode: 0o666
});