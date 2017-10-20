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
        'lodash': '^4.17.4',
        'async': '^2.5.0'
    },

    devDependencies: {
        // 
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