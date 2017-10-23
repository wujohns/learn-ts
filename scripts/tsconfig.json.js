/**
 * tsconfig
 */
'use strict';

const tsConfig = {
    'compilerOptions': {
        'target': 'es5',
        'outDir': 'dist',
        'module': 'commonjs',
        'jsx': 'react',
        'noImplicitAny': true,  // 默认为 false，置为 true 时不会自动将未定义的类型转为 any，编译时检查更为严格
        'inlineSourceMap': true
    },
    'includes': [
        'src/*.ts'
    ]
};

const fs = require('fs');
const path = require('path');
const targetFile = path.join(__dirname, '../tsconfig.json');
fs.writeFileSync(targetFile, JSON.stringify(tsConfig, null, 2), {
    encoding: 'utf8',
    flags: 'w',
    mode: 0o666
});